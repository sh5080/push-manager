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
  PUSH_APP_KEY: Joi.string().required(),
  PUSH_APP_SECRET: Joi.string().required(),
  PUSH_APP_TEST_IDENTIFY: Joi.string().required(),
  SERVER_PORT: Joi.number().required(),
  FRONTEND_URL: Joi.string().required(),
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
  push: {
    key: envVars.PUSH_APP_KEY,
    secret: envVars.PUSH_APP_SECRET,
    testIdentify: envVars.PUSH_APP_TEST_IDENTIFY,
  },
  web: {
    url: envVars.FRONTEND_URL,
  },
  server: {
    port: envVars.SERVER_PORT,
  },
};
