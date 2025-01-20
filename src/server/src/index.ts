import "reflect-metadata";
import express from "express";
import cors from "cors";
import { apiRoutes } from "./routes";
import { envConfig } from "@push-manager/shared";
import { responseMiddleware } from "./middlewares/response.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { AppDataSource, sequelize, sequelizeAdmin } from "./configs/db.config";
import { initModels } from "./models/init-models";
import { initializeRelations } from "./models/relations";
import { initAdminModels } from "./models/admin/init-models";

const app = express();
const port = envConfig.server.port;
const { url, port: webPort } = envConfig.web;

app.use(
  cors({
    origin: url + ":" + webPort,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppDataSource.initialize()
  .then(() => console.log("TypeORM Database connected"))
  .catch(console.error);

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize Database connected");
    initModels(sequelize);
    initializeRelations();
    console.log("Sequelize Models and Relations initialized");
  })
  .catch(console.error);

sequelizeAdmin
  .authenticate()
  .then(() => {
    console.log("Sequelize Admin Database connected");
    initAdminModels(sequelizeAdmin);
    console.log("Sequelize Admin Models and Relations initialized");
  })
  .catch(console.error);

app.use(responseMiddleware());
app.use("/api", apiRoutes);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on ${url}:${port}`);
  console.log("port: ", port);
  console.log("url: ", url);
});
