import oracledb from "oracledb";
import { Sequelize } from "sequelize";
import { envConfig } from "@push-manager/shared";

oracledb.initOracleClient({ libDir: envConfig.pushDB.clientDir });
oracledb.fetchAsString = [oracledb.NUMBER];

export const sequelize = new Sequelize({
  dialect: "oracle",
  username: envConfig.pushDB.username,
  password: envConfig.pushDB.password,
  host: envConfig.pushDB.host,
  port: envConfig.pushDB.port,
  dialectOptions: {
    connectString: `${envConfig.pushDB.host}:${envConfig.pushDB.port}/${envConfig.pushDB.database}`,
    oracleClient: { _oracledb: oracledb },
  },
  define: { timestamps: false, freezeTableName: true },
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
});
