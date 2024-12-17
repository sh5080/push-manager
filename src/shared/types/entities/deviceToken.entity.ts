export interface IDeviceToken {
  IDX: number;
  APPID: string;
  TOKEN: string;
  DEVICE_TYPE: string;
  ACTIVITY: string;
  WDATE: Date;
  UDATE: Date;
  ACTIVITY_PROC?: string;
  OPTAGREE?: string;
}
