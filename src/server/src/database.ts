import { DataSource } from "typeorm";
import { envConfig } from "@push-manager/shared/configs/env.config";

export class DatabaseService {
  private static instance: DatabaseService;
  private dataSource: DataSource;

  private constructor() {
    this.dataSource = new DataSource({
      type: "oracle",
      host: envConfig.typeorm.host,
      port: envConfig.typeorm.port,
      username: envConfig.typeorm.username,
      password: envConfig.typeorm.password,
      serviceName: envConfig.typeorm.database,
      entities: [
        /* your entities */
      ],
      synchronize: false,
      poolSize: 10,
    });
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async getConnection(): Promise<DataSource> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
    return this.dataSource;
  }
}
