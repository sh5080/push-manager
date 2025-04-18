export interface PushDBConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  clientDir: string;
}

export interface FirebaseConfig {
  projectId: string;
  privateKeyId: string;
  privateKey: string;
  clientEmail: string;
  clientId: string;
}

export interface ApnsConfig {
  keyId: string;
  teamId: string;
  privateKey: string;
  bundleId: string;
}

export interface OneSignalConfig {
  appId: string;
  apiKey: string;
}

export interface PushConfig {
  firebase: FirebaseConfig;
  apns: ApnsConfig;
  oneSignal: OneSignalConfig;
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
  env: string;
  jwt: {
    rs256: {
      publicKey: string;
      privateKey: string;
    };
    hs256: string;
    accessJwtExpiration: number;
    refreshJwtExpiration: number;
  };
  redis: {
    host: string;
    port: number;
    password: string;
  };
}

export interface WebConfig {
  url: string;
  port: number;
}

export interface AdminDBConfig {
  username: string;
  password: string;
  host: string;
  port: number;
  database: string;
}

export interface AwsConfig {
  accessKeyId: string;
  secretAccessKey: string;
}

export interface EnvConfig {
  pushDB: PushDBConfig;
  push: PushConfig;
  server: ServerConfig;
  web: WebConfig;
  adminDB: AdminDBConfig;
  aws: AwsConfig;
}
