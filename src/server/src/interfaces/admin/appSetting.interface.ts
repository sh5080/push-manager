import { IAppSettingWithMaintenance } from "@push-manager/shared";

export interface IAppSettingService {
  getAppSettings(): Promise<IAppSettingWithMaintenance>;
}
