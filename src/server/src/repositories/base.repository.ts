import { DataSource, ObjectType, SelectQueryBuilder } from "typeorm";
import { transformDbToEntity } from "../utils/transform.util";
import { Model, ModelStatic, QueryTypes, Sequelize } from "sequelize";
import { PaginatedResponse, Rnum } from "@push-manager/shared";

interface PaginationOptions {
  page: number;
  pageSize: number;
  orderBy: string;
  orderDirection?: "ASC" | "DESC";
}

export async function paginationQuery<T>(
  sequelize: Sequelize,
  options: PaginationOptions,
  innerQuery: string
): Promise<PaginatedResponse<T>> {
  const { page, pageSize, orderBy, orderDirection = "DESC" } = options;
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

  const [results, total] = await Promise.all([
    sequelize.query(paginatedQuery, {
      replacements: {
        startRow: offset,
        endRow: offset + pageSize,
      },
      type: QueryTypes.SELECT,
    }),
    sequelize.query<{ total: number }>(countQuery, {
      type: QueryTypes.SELECT,
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

export class BaseRepository<
  T extends Record<string, any>,
  M extends Model = Model
> {
  protected sequelizeModel?: ModelStatic<M>;

  constructor(
    protected readonly dataSource: DataSource,
    private readonly entityClass: new () => T,
    sequelizeModel?: ModelStatic<M>
  ) {
    this.sequelizeModel = sequelizeModel;
  }

  protected getRepository(entity: ObjectType<T>) {
    if (!this.dataSource) {
      throw new Error("DataSource is not initialized");
    }
    return this.dataSource.getRepository(entity);
  }

  protected async execute<R>(
    queryBuilder: SelectQueryBuilder<T>,
    callback: (qb: SelectQueryBuilder<T>) => Promise<any[]>
  ): Promise<T[]> {
    try {
      const rawResults = await callback(queryBuilder);
      return rawResults.map((row) =>
        transformDbToEntity(row, this.entityClass)
      );
    } catch (error) {
      throw error;
    }
  }

  protected async executeRaw(
    query: string,
    parameters: any[] = []
  ): Promise<T[]> {
    try {
      const rawResults = await this.dataSource.query(query, parameters);
      const result = rawResults.map((row: any) =>
        transformDbToEntity(row, this.entityClass)
      );
      console.log("result: ", result);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getTableName() {
    const tableInfo = this.sequelizeModel!.getTableName();
    return typeof tableInfo === "string" ? tableInfo : tableInfo.tableName;
  }
  protected async findOneWithRownum<T extends Model>(data: {
    where: any;
    attributes: string[];
  }): Promise<T | null> {
    if (!this.sequelizeModel) {
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

    const [result] = await this.sequelizeModel.sequelize!.query(query, {
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
    if (!this.sequelizeModel?.sequelize) {
      throw new Error("Sequelize is not initialized");
    }

    const [result] = await this.sequelizeModel.sequelize.query<{
      NEXTVAL: number;
    }>(`SELECT "${sequenceName}".NEXTVAL FROM DUAL`, {
      type: QueryTypes.SELECT,
    });

    if (!result?.NEXTVAL) {
      throw new Error(`Failed to get next value for sequence: ${sequenceName}`);
    }

    return result.NEXTVAL;
  }

  protected async createWithSeq<M extends Model>(data: {
    values: any;
    fields: string[];
  }) {
    if (!this.sequelizeModel?.sequelize) {
      throw new Error("Sequelize is not initialized");
    }

    const { values, fields } = data;

    const tableName = await this.getTableName();

    const sequenceName = `${tableName}_SEQ`;
    const nextId = await this.getNextSeq(sequenceName);

    const allFields = fields.map((field) => field.toUpperCase());
    const allValues = [nextId, ...Object.values(values)];

    await this.sequelizeModel.sequelize.query(
      `INSERT INTO ${tableName} ("${allFields.join('", "')}") 
       VALUES (${allFields.map(() => "?").join(", ")})`,
      {
        type: QueryTypes.INSERT,
        replacements: allValues,
      }
    );
    return await this.findOneWithRownum<M>({
      where: { idx: nextId },
      attributes: fields,
    });
  }
}
