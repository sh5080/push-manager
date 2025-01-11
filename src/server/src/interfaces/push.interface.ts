import {
  CreatePushDto,
  GetRecentPushesDto,
  UpdatePushStatusDto,
} from "@push-manager/shared";
import { PushMaster } from "../entities/pushMaster.entity";
import { TblPushstsmsg } from "../models/init-models";

export interface IPushService {
  createPushes(dto: CreatePushDto): Promise<number>;
  getRecentPushes(dto: GetRecentPushesDto): Promise<TblPushstsmsg[]>;
  getScheduledPushes(): Promise<PushMaster[]>;
  getPushStsMsgDetail(idx: string): Promise<TblPushstsmsg | null>;
  updatePushStatus(dto: UpdatePushStatusDto): Promise<UpdatePushStatusDto>;
}
