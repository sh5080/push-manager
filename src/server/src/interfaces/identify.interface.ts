import {
  CreatePushDto,
  GetRecentPushesDto,
  UpdatePushStatusDto,
} from "@push-manager/shared/dtos/push.dto";
import { PushStsMsg } from "../entities/pushStsMsg.entity";
import {
  CreateIdentifyDto,
  GetIdentifiesDto,
  UpdateIdentifyDto,
} from "@push-manager/shared/dtos/identify.dto";
import { TestIdentify } from "../entities/testIdentify.entity";

export interface IIdentifyService {
  createIdentify(dto: CreateIdentifyDto): Promise<number>;
  getIdentifies(dto: GetIdentifiesDto): Promise<TestIdentify[]>;
  updateIdentify(dto: UpdateIdentifyDto): Promise<TestIdentify>;
  deleteIdentify(idx: number): Promise<void>;
}
