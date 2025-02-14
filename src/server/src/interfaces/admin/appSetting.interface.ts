import { Maintenance } from "@/src/models/admin/init-models";
import {
  CreateMaintenanceDto,
  IAppSettingWithMaintenance,
  UpdateMaintenanceDto,
} from "@push-manager/shared";

export interface IAppSettingService {
  createMaintenance(dto: CreateMaintenanceDto): Promise<Maintenance>;
  updateMaintenance(dto: UpdateMaintenanceDto): Promise<Maintenance>;
  getAppSettings(): Promise<IAppSettingWithMaintenance>;
}
