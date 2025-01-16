import {
  CreateIdentifyDto,
  GetIdentifiesDto,
  UpdateIdentifyDto,
} from "@push-manager/shared";
import { TestIdentify } from "../models/TestIdentify";

export interface IIdentifyService {
  createIdentify(dto: CreateIdentifyDto): Promise<TestIdentify>;
  getIdentifies(dto: GetIdentifiesDto): Promise<TestIdentify[]>;
  getIdentify(idx: number): Promise<TestIdentify | null>;
  updateIdentify(dto: UpdateIdentifyDto): Promise<TestIdentify>;
  deleteIdentify(idx: number): Promise<number>;
}
