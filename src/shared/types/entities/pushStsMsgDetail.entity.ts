import { IPushStsMsg } from "./pushStsMsg.entity";

export interface IPushStsMsgDetail extends IPushStsMsg {
  detail?: {
    msgIdx: number;
    startd?: Date;
    appid?: string;
    sent?: number;
    failed?: number;
    opened?: number;
    udate?: Date;
    deviceType?: string;
    userId?: string;
    sendType?: string;
    appdel?: number;
    sms?: number;
    recent?: number;
  }[];
}
