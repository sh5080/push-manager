import { validateDto } from "@push-manager/shared/utils/validate.util";
import { BaseAPI } from "../base.api";
import {
  IAppSettingWithMaintenance,
  IMaintenance,
  INoticeBar,
} from "@push-manager/shared";
import {
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
  UpdateNoticeBarDto,
} from "@push-manager/shared/dtos/admin/appSetting.dto";

class AppSettingAPI extends BaseAPI {
  async createMaintenance(dto: CreateMaintenanceDto) {
    const validatedDto = await validateDto(CreateMaintenanceDto, dto);
    return this.customFetch<IMaintenance>(`/api/admin/appSetting/maintenance`, {
      method: "POST",
      body: JSON.stringify(validatedDto),
    });
  }

  async updateMaintenance(dto: UpdateMaintenanceDto) {
    const validatedDto = await validateDto(UpdateMaintenanceDto, dto);
    return this.customFetch<IMaintenance>(
      `/api/admin/appSetting/maintenance/${dto.id}`,
      {
        method: "PUT",
        body: JSON.stringify(validatedDto),
      }
    );
  }

  async updateNoticeBar(dto: UpdateNoticeBarDto) {
    const validatedDto = await validateDto(UpdateNoticeBarDto, dto);
    return this.customFetch<INoticeBar>(`/api/admin/appSetting/noticeBar`, {
      method: "PUT",
      body: JSON.stringify(validatedDto),
    });
  }

  async getAppSettings(): Promise<IAppSettingWithMaintenance> {
    return this.customFetch<IAppSettingWithMaintenance>(
      `/api/admin/appSetting`
    );
  }
}

export const appSettingApi = new AppSettingAPI();
