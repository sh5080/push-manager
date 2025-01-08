import oracledb from "oracledb";
import { DataSource } from "typeorm";
import { envConfig } from "@push-manager/shared";
import { PushQueue } from "../entities/pushQueue.entity";
import { PushSend } from "../entities/pushSend.entity";
import { DeviceToken } from "../entities/deviceToken.entity";
import { PushMsg } from "../entities/pushMsg.entity";
import { PushStsMsg } from "../entities/pushStsMsg.entity";
import { PushStsSendStatsDay } from "../entities/pushStsSendStatsDay.entity";
import { AppPushUser } from "../entities/appPushUser.entity";
import { DeviceTokenOption } from "../entities/deviceTokenOption.entity";
import { PushMaster } from "../entities/pushMaster.entity";
import { TestIdentify } from "../entities/testIdentify.entity";

oracledb.initOracleClient({ libDir: envConfig.typeorm.clientDir });

export const AppDataSource = new DataSource({
  type: "oracle",
  host: envConfig.typeorm.host,
  port: envConfig.typeorm.port,
  username: envConfig.typeorm.username,
  password: envConfig.typeorm.password,
  serviceName: envConfig.typeorm.database,
  entities: [
    PushMaster,
    PushQueue,
    PushSend,
    PushMsg,
    PushStsMsg,
    PushStsSendStatsDay,
    DeviceToken,
    DeviceTokenOption,
    AppPushUser,
    TestIdentify,
  ],
  synchronize: false,
});
