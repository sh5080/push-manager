export interface IDeviceToken {
  idx: number;
  appId: string;
  token: string;
  deviceType: string;
  activity: string;
  wDate: Date;
  uDate: Date;
  activityProc?: string;
  optAgree: string;
}

export interface IDeviceTokenOption {
  identify: string;
  appVersion: string;
  osVersion: string;
  country: string;
  appIntVersion: number;
  sdkVersion: number;
  timezone: number;
}
