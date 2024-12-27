import {
  CreatePushDto,
  GetRecentPushesDto,
} from "@push-manager/shared/dtos/push.dto";
import { PushStsMsg } from "../entities/pushStsMsg.entity";

export interface IPushService {
  createPushes(dto: CreatePushDto): Promise<number>;
  getRecentPushes(dto: GetRecentPushesDto): Promise<PushStsMsg[]>;
  // getPushHistory(page: number, limit: number): Promise<any>;
  // getPushStats(): Promise<any>;
  // getPushDetail(campaignCode: number): Promise<any>;
}
