import {
  Repository,
  ObjectLiteral,
  SelectQueryBuilder,
  EntityTarget,
} from "typeorm";
import { DatabaseLogger } from "../utils/logger.util";
import { AppDataSource } from "../configs/database";

export class BaseRepository<T extends ObjectLiteral> {
  protected logger = DatabaseLogger.getInstance();

  protected getRepository(entity: EntityTarget<T>): Repository<T> {
    return AppDataSource.getRepository(entity);
  }

  protected async execute<R>(
    queryBuilder: SelectQueryBuilder<T>,
    executeFn: (qb: SelectQueryBuilder<T>) => Promise<R>
  ): Promise<R> {
    this.logger.logQuery(queryBuilder.getQuery(), queryBuilder.getParameters());

    try {
      return await executeFn(queryBuilder);
    } catch (error) {
      this.logger.logError(
        error as Error,
        queryBuilder.getQuery(),
        queryBuilder.getParameters()
      );
      throw error;
    }
  }

  protected async executeRawQuery<R>(
    query: string,
    parameters: any[] = []
  ): Promise<R> {
    this.logger.logQuery(query, parameters);

    try {
      return await this.getRepository(
        this.constructor as EntityTarget<T>
      ).query(query, parameters);
    } catch (error) {
      this.logger.logError(error as Error, query, parameters);
      throw error;
    }
  }
}
