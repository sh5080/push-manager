import { AppSetting, Maintenance } from "@/src/models/admin/init-models";
import {
  CreateMaintenanceDto,
  IAppSettingWithMaintenance,
  UpdateMaintenanceDto,
  UpdateNoticeBarDto,
} from "@push-manager/shared";

export interface IAppSettingService {
  createMaintenance(dto: CreateMaintenanceDto): Promise<Maintenance>;
  updateMaintenance(dto: UpdateMaintenanceDto): Promise<Maintenance>;
  updateNoticeBar(dto: UpdateNoticeBarDto): Promise<AppSetting>;
  getAppSettings(): Promise<IAppSettingWithMaintenance>;
}
