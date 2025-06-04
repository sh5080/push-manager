import { validateDto } from "@push-manager/shared/utils/validate.util";
import { BaseAPI } from "../base.api";
import {
  IActivityWithBestshopNm,
  IAppSettingWithMaintenance,
  IMaintenance,
  INoticeBar,
} from "@push-manager/shared";
import {
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
  UpdateNoticeBarDto,
} from "@push-manager/shared/dtos/admin/appSetting.dto";
import { GetActivityDto } from "@push-manager/shared/dtos/admin/appSetting.dto";
import { PaginatedResponse } from "@push-manager/shared";

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
  async getActivity(
    dto: GetActivityDto
  ): Promise<PaginatedResponse<IActivityWithBestshopNm>> {
    const validatedDto = await validateDto(GetActivityDto, dto);
    const {
      page,
      pageSize,
      kind,
      memNo,
      eventId,
      level,
      submissions,
    } = validatedDto;

    const params = {
      kind,
      page: page?.toString(),
      pageSize: pageSize?.toString(),
      memNo,
      eventId,
      level,
      submissions,
    };

    const queryParams = new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    );

    return this.customFetch<PaginatedResponse<IActivityWithBestshopNm>>(
      `/api/admin/appSetting/activity?${queryParams}`
    );
  }
}

export const appSettingApi = new AppSettingAPI();
