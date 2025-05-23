import * as dotenv from "dotenv";
import Joi from "joi";
import { EnvConfig } from "../types/config.type";
import path from "path";

const envPath =
  process.env.NODE_ENV === "test"
    ? path.resolve(__dirname, "../.env.test")
    : path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });

const envSchema = Joi.object({
  PUSH_DB_HOST: Joi.string().required(),
  PUSH_DB_PORT: Joi.number().required(),
  PUSH_DB_USERNAME: Joi.string().required(),
  PUSH_DB_PASSWORD: Joi.string().required(),
  PUSH_DB_DATABASE: Joi.string().required(),
  PUSH_DB_CLIENTDIR: Joi.string().required(),

  ADMIN_DB_USERNAME: Joi.string().required(),
  ADMIN_DB_PASSWORD: Joi.string().required(),
  ADMIN_DB_HOST: Joi.string().required(),
  ADMIN_DB_PORT: Joi.number().required(),
  ADMIN_DB_DATABASE: Joi.string().required(),

  PUSH_APP_KEY_PRD: Joi.string().required(),
  PUSH_APP_SECRET_PRD: Joi.string().required(),
  PUSH_APP_KEY_STG: Joi.string().required(),
  PUSH_APP_SECRET_STG: Joi.string().required(),
  PUSH_APP_KEY_FREED: Joi.string().required(),
  PUSH_APP_SECRET_FREED: Joi.string().required(),
  PUSH_APP_TEST_IDENTIFY: Joi.string().required(),
  NEXT_PUBLIC_SERVER_PORT: Joi.number().required(),
  NEXT_PUBLIC_FRONTEND_URL: Joi.string().required(),
  NEXT_PUBLIC_FRONTEND_PORT: Joi.number().required(),

  FIREBASE_PROJECT_ID: Joi.string().required(),
  FIREBASE_PRIVATE_KEY: Joi.string().required(),
  FIREBASE_CLIENT_EMAIL: Joi.string().required(),
  FIREBASE_CLIENT_ID: Joi.string().required(),
  APNS_KEY_ID: Joi.string().required(),
  APNS_TEAM_ID: Joi.string().required(),
  APNS_PRIVATE_KEY: Joi.string().required(),
  APNS_BUNDLE_ID: Joi.string().required(),

  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),

  JWT_RS256_PUBLIC_KEY: Joi.string().required(),
  JWT_RS256_PRIVATE_KEY: Joi.string().required(),
  JWT_HS256_SECRET: Joi.string().required(),
  ACCESS_JWT_EXPIRATION: Joi.number().required(),
  REFRESH_JWT_EXPIRATION: Joi.number().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().required(),
});

const { error, value: envVars } = envSchema.validate(process.env, {
  allowUnknown: true,
  abortEarly: false,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envConfig: EnvConfig = {
  pushDB: {
    host: envVars.PUSH_DB_HOST,
    port: parseInt(envVars.PUSH_DB_PORT, 10),
    username: envVars.PUSH_DB_USERNAME,
    password: envVars.PUSH_DB_PASSWORD,
    database: envVars.PUSH_DB_DATABASE,
    clientDir: envVars.PUSH_DB_CLIENTDIR,
  },
  adminDB: {
    username: envVars.ADMIN_DB_USERNAME,
    password: envVars.ADMIN_DB_PASSWORD,
    host: envVars.ADMIN_DB_HOST,
    port: parseInt(envVars.ADMIN_DB_PORT, 10),
    database: envVars.ADMIN_DB_DATABASE,
  },
  aws: {
    accessKeyId: envVars.AWS_ACCESS_KEY_ID,
    secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
  },
  push: {
    firebase: {
      projectId: envVars.FIREBASE_PROJECT_ID,
      privateKeyId: envVars.FIREBASE_PRIVATE_KEY_ID,
      privateKey: envVars.FIREBASE_PRIVATE_KEY,
      clientEmail: envVars.FIREBASE_CLIENT_EMAIL,
      clientId: envVars.FIREBASE_CLIENT_ID,
    },
    apns: {
      keyId: envVars.APNS_KEY_ID,
      teamId: envVars.APNS_TEAM_ID,
      privateKey: envVars.APNS_PRIVATE_KEY,
      bundleId: envVars.APNS_BUNDLE_ID,
    },
    oneSignal: {
      appId: envVars.ONESIGNAL_APP_ID,
      apiKey: envVars.ONESIGNAL_API_KEY,
    },
    keyPrd: envVars.PUSH_APP_KEY_PRD,
    secretPrd: envVars.PUSH_APP_SECRET_PRD,
    keyStg: envVars.PUSH_APP_KEY_STG,
    secretStg: envVars.PUSH_APP_SECRET_STG,
    keyFreed: envVars.PUSH_APP_KEY_FREED,
    secretFreed: envVars.PUSH_APP_SECRET_FREED,
    keyFreed2: envVars.PUSH_APP_KEY_FREED2,
    secretFreed2: envVars.PUSH_APP_SECRET_FREED2,
    testIdentify: envVars.PUSH_APP_TEST_IDENTIFY,
  },
  web: {
    url: envVars.NEXT_PUBLIC_FRONTEND_URL,
    port: envVars.NEXT_PUBLIC_FRONTEND_PORT,
  },
  server: {
    port: envVars.NEXT_PUBLIC_SERVER_PORT,
    env: envVars.NODE_ENV,
    jwt: {
      rs256: {
        publicKey: envVars.JWT_RS256_PUBLIC_KEY,
        privateKey: envVars.JWT_RS256_PRIVATE_KEY,
      },
      hs256: envVars.JWT_HS256_SECRET,
      accessJwtExpiration: envVars.ACCESS_JWT_EXPIRATION,
      refreshJwtExpiration: envVars.REFRESH_JWT_EXPIRATION,
    },
    redis: {
      host: envVars.REDIS_HOST,
      port: envVars.REDIS_PORT,
      password: envVars.REDIS_PASSWORD,
    },
  },
};
