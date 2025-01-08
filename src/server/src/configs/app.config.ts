import { envConfig, AppIdEnum } from "@push-manager/shared";

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
