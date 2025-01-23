import {
  AddToQueueDto,
  CreatePushDto,
  GetPushQueuesDto,
  GetRecentPushesDto,
  IPushMasterWithMsg,
  IPushStsMsg,
  PaginatedResponse,
  ConfirmPushQueueDto,
} from "@push-manager/shared";
import { TblFpMaster, TblFpQueue, TblPushstsmsg } from "../models/init-models";

export interface IPushService {
  createPushes(dto: CreatePushDto): Promise<number>;
  getRecentPushes(dto: GetRecentPushesDto): Promise<TblPushstsmsg[]>;
  getScheduledPushes(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<IPushMasterWithMsg>>;
  getPushStsMsgDetail(idx: string): Promise<IPushStsMsg | null>;
  getPushQueues(dto: GetPushQueuesDto): Promise<PaginatedResponse<TblFpQueue>>;
  addToQueue(dto: AddToQueueDto): Promise<number>;
  confirmPushQueue(dto: ConfirmPushQueueDto): Promise<TblFpMaster>;
}
