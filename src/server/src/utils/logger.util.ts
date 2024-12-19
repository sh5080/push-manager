import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import * as path from "path";
import * as fs from "fs";

export class DatabaseLogger {
  private static instance: DatabaseLogger;
  private logger: any;

  private constructor() {
    const logDir = path.join(process.cwd(), "logs", "database");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    this.logger = createLogger({
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message, ...meta }) => {
          return `[${timestamp}] ${level.toUpperCase()}: ${message}\n${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
          }`;
        })
      ),
      transports: [
        new transports.DailyRotateFile({
          filename: "logs/database/query-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxFiles: "30d",
          maxSize: "100m",
          level: "info",
        }),
        new transports.DailyRotateFile({
          filename: "logs/database/error-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxFiles: "30d",
          maxSize: "100m",
          level: "error",
        }),
      ],
    });
  }

  public static getInstance(): DatabaseLogger {
    if (!DatabaseLogger.instance) {
      DatabaseLogger.instance = new DatabaseLogger();
    }
    return DatabaseLogger.instance;
  }

  logQuery(query: string, parameters?: any) {
    this.logger.info("SQL Query", {
      query,
      parameters,
      stack: new Error().stack?.split("\n").slice(2).join("\n"),
    });
  }

  logError(error: Error, query?: string, parameters?: any) {
    this.logger.error("Database Error", {
      error: error.message,
      stack: error.stack,
      query,
      parameters,
    });
  }
}
