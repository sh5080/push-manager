import {
  CreatePushDto,
  GetRecentPushesDto,
  IPushMasterWithMsg,
  IPushStsMsg,
  PaginatedResponse,
  UpdatePushStatusDto,
} from "@push-manager/shared";
import { TblPushstsmsg } from "../models/init-models";

export interface IPushService {
  createPushes(dto: CreatePushDto): Promise<number>;
  getRecentPushes(dto: GetRecentPushesDto): Promise<TblPushstsmsg[]>;
  getScheduledPushes(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<IPushMasterWithMsg>>;
  getPushStsMsgDetail(idx: string): Promise<IPushStsMsg | null>;
  updatePushStatus(dto: UpdatePushStatusDto): Promise<UpdatePushStatusDto>;
}
