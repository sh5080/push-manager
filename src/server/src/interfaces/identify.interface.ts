import {
  CreateIdentifyDto,
  GetIdentifiesDto,
  UpdateIdentifyDto,
} from "@push-manager/shared";
import { TestIdentify } from "../entities/testIdentify.entity";

export interface IIdentifyService {
  createIdentify(dto: CreateIdentifyDto): Promise<number>;
  getIdentifies(dto: GetIdentifiesDto): Promise<TestIdentify[]>;
  updateIdentify(dto: UpdateIdentifyDto): Promise<TestIdentify>;
  deleteIdentify(idx: number): Promise<void>;
}
