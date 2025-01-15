import "reflect-metadata";
import { SequelizeAuto } from "sequelize-auto";
import oracledb from "oracledb";
import { config } from "dotenv";
import { resolve } from "path";
import { AutoOptions } from "sequelize-auto";
import { Dialect } from "sequelize";

config({ path: resolve(__dirname, "../../../shared/.env") });

async function generateModels() {
  oracledb.initOracleClient({ libDir: process.env.TYPEORM_CLIENTDIR });

  const options: AutoOptions = {
    directory: "./src/models",
    dialect: "oracle" as Dialect,
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    lang: "ts",
    caseModel: "p",
    caseFile: "p",
    caseProp: "c",
    singularize: true,
    useDefine: false,
    noAlias: true,
    noInitModels: false,
    spaces: true,
    indentation: 2,
    schema: process.env.TYPEORM_USERNAME,
    additional: {
      timestamps: false,
    },
  };

  const auto = new SequelizeAuto(
    options.database!,
    options.username!,
    options.password!,
    options
  );

  try {
    await auto.run();
    console.log("Models generated successfully!");
  } catch (error) {
    console.error("Error generating models:", error);
  }
}

generateModels().catch(console.error);
