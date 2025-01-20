export interface TypeOrmConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  clientDir: string;
}

export interface PushConfig {
  keyPrd: string;
  secretPrd: string;
  keyStg: string;
  secretStg: string;
  keyFreed: string;
  secretFreed: string;
  keyFreed2: string;
  secretFreed2: string;
  testIdentify: string;
}

export interface ServerConfig {
  port: number;
}

export interface WebConfig {
  url: string;
  port: number;
}

export interface AdminConfig {
  dbUsername: string;
  dbPassword: string;
  dbHost: string;
  dbPort: number;
  dbDatabase: string;
}

export interface EnvConfig {
  typeorm: TypeOrmConfig;
  push: PushConfig;
  server: ServerConfig;
  web: WebConfig;
  admin: AdminConfig;
}
