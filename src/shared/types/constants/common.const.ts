import { envConfig } from "@push-manager/shared/configs/env.config";

export const PushTypeEnum = {
  TARGET: 0,
  ALL: 1,
} as const;

export const AppIdEnum = {
  FREED: 0,
  TEST: 1,
  PROD: 2,
} as const;

export const TeamIdEnum = {
  FREED: 0,
  LG: 1,
} as const;

const { keyFreed, keyFreed2, keyPrd } = envConfig.push;

export const APP_ID_LIST = [keyFreed, keyFreed2, keyPrd];
