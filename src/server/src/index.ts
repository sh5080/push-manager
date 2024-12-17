import express from "express";
import cors from "cors";

import { pushRoutes } from "./routes/push.route";
import { DatabaseService } from "./database";
import { envConfig } from "@push-manager/shared/configs/env.config";

const app = express();
const port = envConfig.server.port;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// 데이터베이스 초기화
DatabaseService.getInstance()
  .getConnection()
  .then(() => console.log("Database connected"))
  .catch(console.error);

// 라우트 설정
app.use("/api/push", pushRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
