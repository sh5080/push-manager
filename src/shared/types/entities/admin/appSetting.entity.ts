export interface IAppSetting {
  id: number;
  key: string;
  value: string;
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
