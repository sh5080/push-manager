export interface INoticeBar {
  link: string;
  content: string;
  startAt: Date;
  endAt: Date;
  isActive: boolean;
  platform: string;
}

export interface IFooter {
  html: string;
}

export type IAppSettingKey = "NOTICE_BAR" | "FOOTER";
export type IAppSettingValue = INoticeBar | IFooter;

export interface IAppSetting {
  id: number;
  key: IAppSettingKey;
  value: IAppSettingValue;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMaintenance {
  id: number;
  description: string;
  isActive: boolean;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;
  noticeAt: Date;
}

export interface IAppSettingWithMaintenance {
  appSettings: IAppSetting[];
  maintenances: IMaintenance[];
}
