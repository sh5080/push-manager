import "reflect-metadata";
import express from "express";
import cors from "cors";
import { apiRoutes } from "./routes";
import { envConfig } from "@push-manager/shared";
import { responseMiddleware } from "./middlewares/response.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { sequelize, sequelizeAdmin } from "./configs/db.config";
import { initModels } from "./models/init-models";
import { initializeRelations } from "./models/relations";
import { initAdminModels } from "./models/admin/init-models";
import { initializeAdminRelations } from "./models/admin/relations";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { createBullBoard } from "@bull-board/api";
import { ExpressAdapter } from "@bull-board/express";
import { QueueService } from "./services/queue.service";

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
    initializeAdminRelations();
    console.log("Sequelize Admin Models and Relations initialized");
  })
  .catch(console.error);

// QueueService 인스턴스 생성
const queueService = new QueueService();

// Bull Board 설정
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [
    new BullAdapter(queueService.getQueue("default")),
    new BullAdapter(queueService.getQueue("bullBoard")),
  ],
  serverAdapter,
});

console.log("Bull Board initialized");

// Bull Board 라우트 설정
app.use("/admin/queues", serverAdapter.getRouter());

app.use(responseMiddleware());
app.use("/api", apiRoutes);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on ${url}:${port}`);
  console.log("port: ", port);
  console.log("url: ", url);
});
