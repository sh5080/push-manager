export interface TypeOrmConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  clientDir: string;
}

export interface PushConfig {
  key: string;
  secret: string;
  testIdentify: string;
}

export interface ServerConfig {
  port: number;
}

export interface WebConfig {
  url: string;
}

export interface EnvConfig {
  typeorm: TypeOrmConfig;
  push: PushConfig;
  server: ServerConfig;
  web: WebConfig;
}
