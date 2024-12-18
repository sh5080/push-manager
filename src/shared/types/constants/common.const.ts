import { envConfig } from "@push-manager/shared/configs/env.config";

export const AppIdEnum = {
  FREED: "0",
  TEST: "1",
  PROD: "2",
} as const;

export const APP_CONFIG = {
  [AppIdEnum.FREED]: {
    appId: envConfig.push.keyFreed,
    appSecret: envConfig.push.secretFreed,
  },
  [AppIdEnum.TEST]: {
    appId: envConfig.push.keyFreed2,
    appSecret: envConfig.push.secretFreed2,
  },
  [AppIdEnum.PROD]: {
    appId: envConfig.push.keyPrd,
    appSecret: envConfig.push.secretPrd,
  },
} as const;
