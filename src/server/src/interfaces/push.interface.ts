import {
  CreatePushDto,
  GetRecentPushesDto,
  UpdatePushStatusDto,
} from "@push-manager/shared";
import { PushStsMsg } from "../entities/pushStsMsg.entity";
import { PushMaster } from "../entities/pushMaster.entity";

export interface IPushService {
  createPushes(dto: CreatePushDto): Promise<number>;
  getRecentPushes(dto: GetRecentPushesDto): Promise<PushStsMsg[]>;
  getScheduledPushes(): Promise<PushMaster[]>;
  updatePushStatus(dto: UpdatePushStatusDto): Promise<UpdatePushStatusDto>;
  // getPushHistory(page: number, limit: number): Promise<any>;
  // getPushStats(): Promise<any>;
  // getPushDetail(campaignCode: number): Promise<any>;
}
