import { IAppSettingService } from "@/src/interfaces/admin/appSetting.interface";
import { AppSettingRepository } from "../../repositories/admin/appSetting.repository";
import { CreateMaintenanceDto } from "@push-manager/shared";

export class AppSettingService implements IAppSettingService {
  constructor(private readonly appSettingRepository: AppSettingRepository) {}

  async createMaintenance(dto: CreateMaintenanceDto) {
    return await this.appSettingRepository.createMaintenance(dto);
  }

  async getAppSettings() {
    const appSettings = await this.appSettingRepository.getAppSettings();
    const maintenances = await this.appSettingRepository.getMaintenances();

    return { appSettings, maintenances };
  }
}
