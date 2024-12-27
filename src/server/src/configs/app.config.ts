import { envConfig } from "@push-manager/shared/configs/env.config";
import { AppIdEnum } from "@push-manager/shared/types/constants/common.const";

const { keyFreed, keyFreed2, keyPrd, secretFreed, secretFreed2, secretPrd } =
  envConfig.push;

export const APP_CONFIG = {
  [AppIdEnum.FREED]: {
    appId: keyFreed,
    appSecret: secretFreed,
  },
  [AppIdEnum.TEST]: {
    appId: keyFreed2,
    appSecret: secretFreed2,
  },
  [AppIdEnum.PROD]: {
    appId: keyPrd,
    appSecret: secretPrd,
  },
} as const;
