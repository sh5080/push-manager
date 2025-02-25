import * as dotenv from "dotenv";
import Joi from "joi";
import { EnvConfig } from "../types/config.type";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const envSchema = Joi.object({
  JWT_HS256_SECRET: Joi.string().required(),

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
    jwtSecret: envVars.JWT_HS256_SECRET,
  },
};
