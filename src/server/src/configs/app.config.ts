import { envConfig } from "@push-manager/shared/configs/env.config";
import { AppIdEnum } from "@push-manager/shared/types/constants/common.const";

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
