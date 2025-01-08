import "reflect-metadata";
import express from "express";
import cors from "cors";
import { apiRoutes } from "./routes";
import { envConfig } from "@push-manager/shared";
import { responseMiddleware } from "./middlewares/response.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { AppDataSource } from "./configs/db.config";

const app = express();
const port = envConfig.server.port;

app.use(
  cors({
    origin: envConfig.web.url + ":" + envConfig.web.port,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 데이터베이스 초기화
AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch(console.error);

// 미들웨어 등록
app.use(responseMiddleware());

// API 라우트 설정
app.use("/api", apiRoutes);

// 에러 미들웨어는 항상 마지막에 등록
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
