import { AppSetting, Maintenance } from "@/src/models/admin/init-models";
import {
  CreateMaintenanceDto,
  IAppSettingWithMaintenance,
  UpdateMaintenanceDto,
  UpdateNoticeBarDto,
  GetActivityDto,
} from "@push-manager/shared";
import { activity } from "../../db/migrations/schema";

export interface IAppSettingService {
  createMaintenance(dto: CreateMaintenanceDto): Promise<Maintenance>;
  updateMaintenance(dto: UpdateMaintenanceDto): Promise<Maintenance>;
  updateNoticeBar(dto: UpdateNoticeBarDto): Promise<AppSetting>;
  getAppSettings(): Promise<IAppSettingWithMaintenance>;
  getActivity(dto: GetActivityDto): Promise<(typeof activity.$inferSelect)[]>;
}
