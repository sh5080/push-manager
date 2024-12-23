import "reflect-metadata";
import express from "express";
import cors from "cors";

import { pushRoutes } from "./routes/push.route";
import { envConfig } from "@push-manager/shared/configs/env.config";
import { responseMiddleware } from "./middlewares/response.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { AppDataSource } from "./configs/database";

const app = express();
const port = envConfig.server.port;

app.use(
  cors({
    origin: envConfig.web.url + ":" + envConfig.web.port,
    credentials: true,
  })
);
app.use(express.json());

// 데이터베이스 초기화
AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch(console.error);

// 미들웨어 등록
app.use(responseMiddleware());

// 라우트 설정
app.use("/api/push", pushRoutes);

// 에러 미들웨어는 항상 마지막에 등록
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
