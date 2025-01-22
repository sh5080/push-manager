import {
  Model,
  ModelStatic,
  QueryTypes,
  Sequelize,
  Transaction,
} from "sequelize";
import { PaginatedResponse, Rnum } from "@push-manager/shared";

interface PaginationOptions {
  page: number;
  pageSize: number;
  orderBy: string;
  orderDirection?: "ASC" | "DESC";
  replacements?: Record<string, any>;
}

export async function paginationQuery<T>(
  sequelize: Sequelize,
  options: PaginationOptions & { model?: ModelStatic<Model> },
  innerQuery: string
): Promise<PaginatedResponse<T>> {
  const {
    page,
    pageSize,
    orderBy,
    orderDirection = "DESC",
    model,
    replacements = {},
  } = options;
  const offset = (page - 1) * pageSize;

  const paginatedQuery = `
    SELECT * FROM (
      SELECT a.*, ROWNUM as "rnum" FROM (
        ${innerQuery}
        ORDER BY ${orderBy} ${orderDirection}
      ) a WHERE ROWNUM <= :endRow
    ) WHERE "rnum" > :startRow
  `;

  const fromClause = innerQuery.substring(innerQuery.indexOf("FROM"));
  const countQuery = `SELECT COUNT(*) as "total" ${fromClause}`;

  const queryOptions = model
    ? {
        model,
        mapToModel: true,
        type: QueryTypes.SELECT,
      }
    : {
        type: QueryTypes.SELECT,
      };

  const [results, total] = await Promise.all([
    sequelize.query(paginatedQuery, {
      ...queryOptions,
      replacements: {
        ...replacements,
        startRow: offset,
        endRow: offset + pageSize,
      },
    }),
    sequelize.query<{ total: number }>(countQuery, {
      type: QueryTypes.SELECT,
      replacements,
    }),
  ]);

  const totalPages = Math.ceil(total[0].total / pageSize);

  return {
    data: results as (T & Rnum)[],
    total: total[0].total,
    page,
    pageSize,
    totalPages,
  };
}

export class BaseRepository<T extends Model> {
  constructor(protected model: ModelStatic<T>) {}

  async getTableName() {
    const tableInfo = this.model.getTableName();
    return typeof tableInfo === "string" ? tableInfo : tableInfo.tableName;
  }

  protected async findOneWithRownum<T extends Model>(data: {
    where: any;
    attributes: string[];
  }): Promise<T | null> {
    if (!this.model) {
      throw new Error("Sequelize model is not initialized");
    }

    const { where, attributes } = data;
    const whereWithoutRownum = { ...where };
    delete whereWithoutRownum[Symbol.for("and")];

    const tableName = await this.getTableName();
    const query = `
      SELECT * FROM (
        SELECT ${attributes
          .map((attr) => `"${attr.toUpperCase()}" AS "${attr.toLowerCase()}"`)
          .join(", ")}
        FROM ${tableName}
        WHERE ${Object.entries(whereWithoutRownum)
          .map(([key, value]) => `"${key.toUpperCase()}" = ?`)
          .join(" AND ")}
        ORDER BY "IDX" ASC
      ) WHERE ROWNUM = 1
    `;

    const [result] = await this.model.sequelize!.query(query, {
      type: QueryTypes.SELECT,
      raw: true,
      replacements: Object.values(whereWithoutRownum),
    });

    if (!result) {
      return null;
    }

    return result as T;
  }

  protected async getNextSeq(sequenceName: string): Promise<number> {
    if (!this.model?.sequelize) {
      throw new Error("Sequelize is not initialized");
    }

    const [result] = await this.model.sequelize.query<{
      NEXTVAL: number;
    }>(`SELECT "${sequenceName}".NEXTVAL FROM DUAL`, {
      type: QueryTypes.SELECT,
    });

    if (!result?.NEXTVAL) {
      throw new Error(`Failed to get next value for sequence: ${sequenceName}`);
    }

    return result.NEXTVAL;
  }

  protected async createWithSeq<T extends Model>(data: {
    values: any;
    fields: string[];
    pkField?: string;
    sequenceName?: string;
  }) {
    if (!this.model?.sequelize) {
      throw new Error("Sequelize is not initialized");
    }

    const { values, fields, pkField = "IDX" } = data;
    const tableName = await this.getTableName();
    const sequenceName = data.sequenceName || `${tableName}_SEQ`;

    const nextId = await this.getNextSeq(sequenceName);

    const allFields = [pkField, ...fields].map((field) => {
      const attribute = this.model?.rawAttributes[field];
      return attribute?.field || field.toUpperCase();
    });

    const allValues = [nextId, ...Object.values(values)];

    await this.model.sequelize.query(
      `INSERT INTO ${tableName} ("${allFields.join('", "')}") 
       VALUES (${allFields.map(() => "?").join(", ")})`,
      {
        type: QueryTypes.INSERT,
        replacements: allValues,
        model: this.model,
      }
    );

    return await this.findOneWithRownum<T>({
      where: { [pkField.toLowerCase()]: nextId },
      attributes: [pkField.toLowerCase(), ...fields],
    });
  }

  protected async bulkCreateWithSeq<M extends object>(data: {
    values: M[];
    fields: string[];
    pkField?: string;
    sequenceName?: string;
    transaction?: Transaction;
  }) {
    if (!this.model?.sequelize) {
      throw new Error("Sequelize is not initialized");
    }

    const { pkField = "IDX", transaction } = data;
    const tableName = await this.getTableName();
    const sequenceName = data.sequenceName || `${tableName}_SEQ`;

    try {
      const seqValues = await Promise.all(
        data.values.map(() => this.getNextSeq(sequenceName))
      );

      const fieldMappings = Object.entries(this.model.getAttributes()).reduce(
        (acc, [fieldName, attr]) => {
          const dbField = (attr.field || fieldName).toLowerCase();
          acc[dbField] = fieldName.toLowerCase();
          return acc;
        },
        {} as Record<string, string>
      );

      const allFields = [pkField, ...data.fields].map((field) => {
        const attribute = this.model?.getAttributes()[field];
        return attribute?.field || field.toUpperCase();
      });

      const allValues = data.values.map((value, index) => {
        const mappedValue = {
          [pkField.toLowerCase()]: seqValues[index],
        } as Record<string, any>;
        Object.entries(value as Record<string, any>).forEach(([key, val]) => {
          mappedValue[key.toLowerCase()] =
            typeof val === "function" ? val() : val;
        });
        return mappedValue;
      });

      const placeholders = allValues
        .map((record) => {
          return `(${allFields
            .map((field) => {
              const modelField = fieldMappings[field.toLowerCase()];
              const value = record[modelField];
              return typeof value === "string" &&
                value.toUpperCase().includes("SYSDATE")
                ? value.toUpperCase()
                : "?";
            })
            .join(", ")})`;
        })
        .join(", ");

      const query = `
        INSERT INTO ${tableName} ("${allFields.join('", "')}") 
        VALUES ${placeholders}
      `;

      const flatValues = allValues.flatMap((record) => {
        return allFields
          .map((field) => {
            const modelField = fieldMappings[field.toLowerCase()];
            const value = record[modelField];

            if (
              typeof value === "string" &&
              value.toUpperCase().includes("SYSDATE")
            ) {
              return undefined;
            }
            return value !== undefined ? value : null;
          })
          .filter((val) => val !== undefined);
      });

      console.log("Original Values:", allValues);
      console.log("Flattened Values:", flatValues);
      console.log("Field mappings:", fieldMappings);

      return await this.model.sequelize.query(query, {
        type: QueryTypes.INSERT,
        replacements: flatValues,
        model: this.model,
        transaction,
        mapToModel: true,
      });
    } catch (error: any) {
      console.error("Error in bulkCreateWithSeq:", {
        message: error.message,
        stack: error.stack,
        recordCount: data.values.length,
        query: error?.sql,
      });
      throw error;
    }
  }
}
