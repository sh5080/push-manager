import { BaseRepository } from "../base.repository";
import { AppSetting, Maintenance } from "../../models/admin/init-models";
import {
  CreateMaintenanceDto,
  IAppSetting,
  IMaintenance,
} from "@push-manager/shared";

export class AppSettingRepository extends BaseRepository<AppSetting> {
  appSettingAttributes: string[];
  maintenanceAttributes: string[];
  constructor() {
    super(AppSetting);
    this.appSettingAttributes = Object.keys(AppSetting.getAttributes() || {});
    this.maintenanceAttributes = Object.keys(Maintenance.getAttributes() || {});
  }

  async createMaintenance(dto: CreateMaintenanceDto) {
    return await Maintenance.create({
      ...dto,
      updatedAt: new Date(),
    });
  }

  async getAppSettings() {
    return (await AppSetting.findAll({
      raw: true,
    })) as unknown as IAppSetting[];
  }
  async getMaintenances() {
    return (await Maintenance.findAll({
      raw: true,
      order: [["id", "DESC"]],
    })) as unknown as IMaintenance[];
  }
}
