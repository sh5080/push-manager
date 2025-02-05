import { StepEnum } from "../constants/pushQueue.const";
import { IDeviceToken, IDeviceTokenOption } from "./deviceToken.entity";

export interface IPushStsMsgDetail {
  sent: number;
  failed: number;
  opened: number;
  deviceType: string;
  appdel: number;
}

export interface IPushStsMsgResult {
  idx: string;
  msgIdx: string;
  result: (typeof StepEnum)[keyof typeof StepEnum];
  resultMsg: string;
  sendDate: string;
  opened: number;
  deviceType: string;
  tokenIdx: string;
  deviceToken: IDeviceToken;
  option: IDeviceTokenOption;
}
