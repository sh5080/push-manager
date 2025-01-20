import * as dotenv from "dotenv";
import Joi from "joi";
import { EnvConfig } from "../types/config.type";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const envSchema = Joi.object({
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_PORT: Joi.number().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_CLIENTDIR: Joi.string().required(),
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
});

const { error, value: envVars } = envSchema.validate(process.env, {
  allowUnknown: true,
  abortEarly: false,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envConfig: EnvConfig = {
  typeorm: {
    host: envVars.TYPEORM_HOST,
    port: parseInt(envVars.TYPEORM_PORT, 10),
    username: envVars.TYPEORM_USERNAME,
    password: envVars.TYPEORM_PASSWORD,
    database: envVars.TYPEORM_DATABASE,
    clientDir: envVars.TYPEORM_CLIENTDIR,
  },
  admin: {
    dbUsername: envVars.ADMIN_DB_USERNAME,
    dbPassword: envVars.ADMIN_DB_PASSWORD,
    dbHost: envVars.ADMIN_DB_HOST,
    dbPort: parseInt(envVars.ADMIN_DB_PORT, 10),
    dbDatabase: envVars.ADMIN_DB_DATABASE,
  },
  push: {
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
  },
};
