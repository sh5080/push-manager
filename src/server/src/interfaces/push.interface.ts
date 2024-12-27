import {
  CreatePushDto,
  GetRecentPushesDto,
  UpdatePushStatusDto,
} from "@push-manager/shared/dtos/push.dto";
import { PushStsMsg } from "../entities/pushStsMsg.entity";

export interface IPushService {
  createPushes(dto: CreatePushDto): Promise<number>;
  getRecentPushes(dto: GetRecentPushesDto): Promise<PushStsMsg[]>;
  updatePushStatus(dto: UpdatePushStatusDto): Promise<UpdatePushStatusDto>;
  // getPushHistory(page: number, limit: number): Promise<any>;
  // getPushStats(): Promise<any>;
  // getPushDetail(campaignCode: number): Promise<any>;
}
