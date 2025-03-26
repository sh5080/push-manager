import oracledb from "oracledb";
import { Sequelize } from "sequelize";
import { envConfig } from "@push-manager/shared";
import fs from "fs";
import path from "path";
import { drizzle as drizzleORM } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { initAdminModels } from "../models/admin/init-models";
import { initializeAdminRelations } from "../models/admin/relations";
import { initModels } from "../models/init-models";
import { initializeRelations } from "../models/relations";

const logDMLQuery = (query: string) => {
  const isDMLQuery = /^(?!BEGIN|COMMIT).*\b(INSERT|UPDATE|DELETE)\b/i.test(
    query.trim()
  );

  if (isDMLQuery) {
    const now = new Date();
    const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const dateStr = kstDate.toISOString().split("T")[0];

    const logEntry = `[${kstDate.toISOString()}] 
Query: ${query}
----------------------------------------\n`;

    const logDir = path.join(__dirname, "../../logs/dml");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    fs.appendFileSync(path.join(logDir, `${dateStr}.log`), logEntry);
  }
};

const client = postgres({
  host: envConfig.adminDB.host,
  port: envConfig.adminDB.port,
  database: envConfig.adminDB.database,
  username: envConfig.adminDB.username,
  password: envConfig.adminDB.password,
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
  onnotice: (notice) => console.log("Database notice:", notice),
  debug: (connection, query, params, types) => {
    logDMLQuery(query);
  },
});

export const drizzle = drizzleORM(client);

oracledb.initOracleClient({ libDir: envConfig.pushDB.clientDir });
oracledb.fetchAsString = [oracledb.NUMBER];

export const sequelize = new Sequelize({
  dialect: "oracle",
  username: envConfig.pushDB.username,
  password: envConfig.pushDB.password,
  host: envConfig.pushDB.host,
  port: envConfig.pushDB.port,
  timezone: "+09:00",
  dialectOptions: {
    connectString: `${envConfig.pushDB.host}:${envConfig.pushDB.port}/${envConfig.pushDB.database}`,
    oracleClient: { _oracledb: oracledb },
  },
  define: { timestamps: false, freezeTableName: true },
  logging: (sql: string) => {
    console.log(sql);
    logDMLQuery(sql);
  },
});

export const sequelizeAdmin = new Sequelize({
  dialect: "postgres",
  username: envConfig.adminDB.username,
  password: envConfig.adminDB.password,
  host: envConfig.adminDB.host,
  port: envConfig.adminDB.port,
  database: envConfig.adminDB.database,
  dialectOptions: { pool_timeout: 0 },
  define: { timestamps: false, freezeTableName: true },
  logging: (sql: string) => {
    console.log(sql);
    logDMLQuery(sql);
  },
});

export const redisConfig = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
};

export const setupDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize Database connected");
    initModels(sequelize);
    initializeRelations();
    console.log("Sequelize Models and Relations initialized");

    await sequelizeAdmin.authenticate();
    console.log("Sequelize Admin Database connected");
    initAdminModels(sequelizeAdmin);
    initializeAdminRelations();
    console.log("Sequelize Admin Models and Relations initialized");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
