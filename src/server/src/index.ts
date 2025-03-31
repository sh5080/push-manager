import "reflect-metadata";
import express from "express";
import cors from "cors";
import { apiRoutes } from "./routes";
import { envConfig } from "@push-manager/shared";
import { responseMiddleware } from "./middlewares/response.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { setupDatabase } from "./configs/db.config";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { createBullBoard } from "@bull-board/api";
import { ExpressAdapter } from "@bull-board/express";
import { QueueService } from "./services/queue.service";
import { authMiddleware } from "./middlewares/auth.middleware";

export const setupApp = () => {
  const app = express();
  const { url, port: webPort } = envConfig.web;

  app.use(
    cors({
      origin: url + ":" + webPort,
      credentials: true,
      allowedHeaders: ["Authorization", "Content-Type"],
      exposedHeaders: ["Authorization"],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const queueService = new QueueService();

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath("/admin/queues");

  createBullBoard({
    queues: [
      new BullAdapter(queueService.getQueue("default")),
      new BullAdapter(queueService.getQueue("bullBoard")),
      new BullAdapter(queueService.getQueue("push")),
    ],
    serverAdapter,
  });

  app.use("/admin/queues", serverAdapter.getRouter());

  app.use(responseMiddleware());
  app.use("/api", authMiddleware.authenticate, apiRoutes);
  app.use(errorMiddleware);

  return app;
};

export const app = setupApp();

if (require.main === module) {
  const port = envConfig.server.port;
  const { url } = envConfig.web;

  setupDatabase().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${url}:${port}`);
      console.log("port: ", port);
      console.log("url: ", url);
    });
  });
}
