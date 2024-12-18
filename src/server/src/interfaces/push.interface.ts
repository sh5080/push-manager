import { ProdPushDto } from "@push-manager/shared/dtos/push.dto";

export interface IPushService {
  createBulkPush(
    identifyArray: string[],
    pushDto: ProdPushDto
  ): Promise<number>;
  getRecentPushes(limit: number): Promise<any[]>;
  getPushHistory(page: number, limit: number): Promise<any>;
  getPushStats(): Promise<any>;
  getPushDetail(campaignCode: number): Promise<any>;
}
