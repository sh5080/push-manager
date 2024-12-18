import { Logger } from "typeorm";
import { createLogger, format, transports } from "winston";
import * as fs from "fs";
import * as path from "path";
import "winston-daily-rotate-file";

export class QueryLogger implements Logger {
  constructor() {
    // logs 디렉토리 생성
    const logDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
  }
  private logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [
      new transports.DailyRotateFile({
        filename: "logs/query-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxFiles: "365d",
        maxSize: "100m",
      }),
    ],
  });

  logQuery(query: string, parameters?: any) {
    this.logger.info("Query 실행", {
      query,
      parameters,
      timestamp: new Date().toISOString(),
    });
  }

  logQueryError(error: string | Error, query: string, parameters?: any) {
    this.logger.error("Query 에러", {
      error: error instanceof Error ? error.message : error,
      query,
      parameters,
      timestamp: new Date().toISOString(),
    });
  }

  logQuerySlow(time: number, query: string, parameters?: any) {
    this.logger.warn("Slow Query 감지", {
      time,
      query,
      parameters,
      timestamp: new Date().toISOString(),
    });
  }

  logSchemaBuild(message: string) {
    this.logger.info("Schema Build", {
      message,
      timestamp: new Date().toISOString(),
    });
  }

  logMigration(message: string) {
    this.logger.info("Migration", {
      message,
      timestamp: new Date().toISOString(),
    });
  }

  log(level: "log" | "info" | "warn", message: any) {
    switch (level) {
      case "log":
      case "info":
        this.logger.info(message);
        break;
      case "warn":
        this.logger.warn(message);
        break;
    }
  }
}
