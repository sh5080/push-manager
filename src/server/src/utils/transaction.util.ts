import { AppDataSource } from "../configs/db.config";
import { QueryRunner } from "typeorm";

type TransactionCallback<T> = (queryRunner: QueryRunner) => Promise<T>;

export async function queryRunnerCreation<T>(
  callback: TransactionCallback<T>,
  useTransaction: boolean = true
): Promise<T> {
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    if (useTransaction) {
      await queryRunner.startTransaction();
    }

    const result = await callback(queryRunner);

    if (useTransaction) {
      await queryRunner.commitTransaction();
    }

    return result;
  } catch (error) {
    if (useTransaction) {
      await queryRunner.rollbackTransaction();
    }
    throw error;
  } finally {
    await queryRunner.release();
  }
}
