import {
  AddToQueueDto,
  CreatePushDto,
  GetPushQueuesDto,
  GetRecentPushesDto,
  IPushMasterWithMsg,
  PaginatedResponse,
  ConfirmPushQueueDto,
  GetTargetPushesDto,
  IPushStsMsgWithDetail,
  UpdateQueueDto,
} from "@push-manager/shared";
import { TblFpMaster, TblFpQueue, TblPushstsmsg } from "../models/init-models";

export interface IPushService {
  createPushes(dto: CreatePushDto): Promise<number>;
  getRecentPushes(dto: GetRecentPushesDto): Promise<TblPushstsmsg[]>;
  getTargetPushes(
    dto: GetTargetPushesDto
  ): Promise<PaginatedResponse<TblPushstsmsg>>;
  getScheduledPushes(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<IPushMasterWithMsg>>;
  getPushStsMsgDetail(idx: string): Promise<IPushStsMsgWithDetail | null>;
  getPushQueues(dto: GetPushQueuesDto): Promise<PaginatedResponse<TblFpQueue>>;
  addToQueue(dto: AddToQueueDto): Promise<number>;
  confirmPushQueue(dto: ConfirmPushQueueDto): Promise<TblFpMaster>;
  updateQueue(
    cmpncode: number,
    dto: UpdateQueueDto
  ): Promise<void>;
  deleteQueue(cmpncode: number): Promise<void>;
}
