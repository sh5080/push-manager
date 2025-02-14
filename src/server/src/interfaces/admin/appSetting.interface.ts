import { Maintenance } from "@/src/models/admin/init-models";
import {
  CreateMaintenanceDto,
  IAppSettingWithMaintenance,
} from "@push-manager/shared";

export interface IAppSettingService {
  createMaintenance(dto: CreateMaintenanceDto): Promise<Maintenance>;
  getAppSettings(): Promise<IAppSettingWithMaintenance>;
}
