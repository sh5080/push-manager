import {
  GetActivityDto,
  PaginatedResponse,
  IActivityWithBestshopNm,
} from "@push-manager/shared";

export interface IActivityService {
  getActivity(
    dto: GetActivityDto
  ): Promise<PaginatedResponse<IActivityWithBestshopNm>>;
  updateActivityExcel(
    dto: IActivityWithBestshopNm[]
  ): Promise<{ updatedCount: number; updatedData: IActivityWithBestshopNm[] }>;
}
