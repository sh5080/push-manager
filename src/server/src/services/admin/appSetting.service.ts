import { IAppSettingService } from "@/src/interfaces/admin/appSetting.interface";
import { AppSettingRepository } from "../../repositories/admin/appSetting.repository";
import {
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
} from "@push-manager/shared";

export class AppSettingService implements IAppSettingService {
  constructor(private readonly appSettingRepository: AppSettingRepository) {}

  async createMaintenance(dto: CreateMaintenanceDto) {
    return await this.appSettingRepository.createMaintenance(dto);
  }

  async updateMaintenance(dto: UpdateMaintenanceDto) {
    const maintenance = await this.appSettingRepository.getMaintenanceById(
      dto.id
    );
    if (!maintenance) {
      throw new Error("Maintenance not found");
    }
    const result = await this.appSettingRepository.updateMaintenance(dto);
    if (result[0] === 0) {
      throw new Error("Maintenance not found");
    }
    const updatedMaintenance = result[1][0];
    return updatedMaintenance;
  }

  async getAppSettings() {
    const appSettings = await this.appSettingRepository.getAppSettings();
    const maintenances = await this.appSettingRepository.getMaintenances();

    return { appSettings, maintenances };
  }
}
