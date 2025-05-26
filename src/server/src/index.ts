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
import { CronJobService } from "./services/cronJob.service";
import { RedisService } from "./services/redis.service";

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
  app.use("/api", apiRoutes);
  app.use(errorMiddleware);

  return app;
};

export const app = setupApp();

if (require.main === module) {
  const port = envConfig.server.port;
  const { url } = envConfig.web;

  setupDatabase().then(() => {
    const server = app.listen(port, () => {
      console.log(`Server is running on ${url}:${port}`);
      console.log("port: ", port);
      console.log("url: ", url);

      // 예약 데이터 자동 엑셀 내보내기 크론 작업 시작
      try {
        const cronJobService = new CronJobService();
        cronJobService.startCronJobs();
        console.log("예약 데이터 자동 내보내기 크론 작업이 시작되었습니다.");
      } catch (error) {
        console.error("크론 작업 시작 중 오류 발생:", error);
      }
    });

    // 애플리케이션 종료 처리
    const gracefulShutdown = () => {
      console.log("애플리케이션 종료 시작...");
      server.close(() => {
        console.log("HTTP 서버가 종료되었습니다.");
        // Redis 연결 종료
        try {
          RedisService.getInstance().closeConnection();
          console.log("Redis 연결이 종료되었습니다.");
        } catch (error) {
          console.error("Redis 연결 종료 중 오류 발생:", error);
        }
        console.log("애플리케이션이 안전하게 종료되었습니다.");
        process.exit(0);
      });
    };

    // 종료 신호 처리
    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  });
}
