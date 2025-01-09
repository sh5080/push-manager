import {
  CreatePushDto,
  GetRecentPushesDto,
  UpdatePushStatusDto,
} from "@push-manager/shared";
import { PushStsMsg } from "../entities/pushStsMsg.entity";
import { PushMaster } from "../entities/pushMaster.entity";
import { PushStsSendStatsDay } from "../entities/pushStsSendStatsDay.entity";

export interface IPushService {
  createPushes(dto: CreatePushDto): Promise<number>;
  getRecentPushes(dto: GetRecentPushesDto): Promise<PushStsMsg[]>;
  getScheduledPushes(): Promise<PushMaster[]>;
  getPushStsMsgDetail(idx: number): Promise<PushStsMsg | null>;
  updatePushStatus(dto: UpdatePushStatusDto): Promise<UpdatePushStatusDto>;
  // getPushHistory(page: number, limit: number): Promise<any>;
  // getPushStats(): Promise<any>;
  // getPushDetail(campaignCode: number): Promise<any>;
}
