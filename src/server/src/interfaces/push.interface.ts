import { ProdPushDto } from "@push-manager/shared/dtos/push.dto";

export interface IPushService {
  createBulkPush(
    identifyArray: string[],
    dto: ProdPushDto,
    maxBatchSize: number
  ): Promise<number>;
}
