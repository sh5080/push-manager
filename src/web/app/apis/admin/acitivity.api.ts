import { validateDto } from "@push-manager/shared/utils/validate.util";
import { BaseAPI } from "../base.api";
import { PaginatedResponse, IActivityWithBestshopNm } from "@push-manager/shared";
import { GetActivityDto } from "@push-manager/shared/dtos/admin/appSetting.dto";

class ActivityAPI extends BaseAPI {
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
      `/api/admin/activity?${queryParams}`
    );
  }

  async updateActivityExcel(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return this.fetchBlob(
      `/api/admin/activity/excel`,
      { method: "PUT", body: formData }
    );
  }
}

export const activityApi = new ActivityAPI();
