import { DataSource, ObjectType, SelectQueryBuilder } from "typeorm";
import { transformDbToEntity } from "../utils/transform.util";

export class BaseRepository<T extends Record<string, any>> {
  constructor(
    protected readonly dataSource: DataSource,
    private readonly entityClass: new () => T
  ) {}

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
}
