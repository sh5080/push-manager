import { BaseRepository } from "../base.repository";
import { AppSetting, Maintenance } from "../../models/admin/init-models";
import { IAppSetting, IMaintenance } from "@push-manager/shared";

export class AppSettingRepository extends BaseRepository<AppSetting> {
  appSettingAttributes: string[];
  maintenanceAttributes: string[];
  constructor() {
    super(AppSetting);
    this.appSettingAttributes = Object.keys(AppSetting.getAttributes() || {});
    this.maintenanceAttributes = Object.keys(Maintenance.getAttributes() || {});
  }

  async getAppSettings() {
    return (await AppSetting.findAll({
      raw: true,
    })) as unknown as IAppSetting[];
  }
  async getMaintenances() {
    return (await Maintenance.findAll({
      raw: true,
    })) as unknown as IMaintenance[];
  }
}
