import { IAppSettingService } from "@/src/interfaces/admin/appSetting.interface";
import { AppSettingRepository } from "../../repositories/admin/appSetting.repository";
import {
  CreateMaintenanceDto,
  NotFoundException,
  UpdateMaintenanceDto,
  UpdateNoticeBarDto,
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
      throw new NotFoundException("Maintenance not found");
    }
    const result = await this.appSettingRepository.updateMaintenance(dto);
    if (result[0] === 0) {
      throw new NotFoundException("Maintenance not found");
    }
    const updatedMaintenance = result[1][0];
    return updatedMaintenance;
  }

  async updateNoticeBar(dto: UpdateNoticeBarDto) {
    const appSetting = await this.appSettingRepository.getAppSettings();

    if (!appSetting.map((item) => item.key).includes("NOTICE_BAR")) {
      throw new NotFoundException("NoticeBar not found");
    }

    const result = await this.appSettingRepository.updateNoticeBar(dto);
    if (result[0] === 0) {
      throw new NotFoundException("NoticeBar not found");
    }
    const updatedNoticeBar = result[1][0];
    return updatedNoticeBar;
  }

  async getAppSettings() {
    const appSettings = await this.appSettingRepository.getAppSettings();
    const maintenances = await this.appSettingRepository.getMaintenances();

    return { appSettings, maintenances };
  }
}
