import { BaseAPI } from "../base.api";
import { IAppSettingWithMaintenance } from "@push-manager/shared";

class AppSettingAPI extends BaseAPI {
  async getAppSettings(): Promise<IAppSettingWithMaintenance> {
    return this.customFetch<IAppSettingWithMaintenance>(
      `/api/admin/appSetting`
    );
  }
}

export const appSettingApi = new AppSettingAPI();
