import { ProdPushDto } from "@shared/dtos/push";

export interface IPushService {
  createBulkPush(
    identifyArray: string[],
    dto: ProdPushDto,
    maxBatchSize: number
  ): Promise<number>;
}
