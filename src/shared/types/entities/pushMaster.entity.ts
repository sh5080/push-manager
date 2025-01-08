import { IPushStsMsg } from "./pushStsMsg.entity";

export interface IPushMaster {
  cmpncode: string;
  step: string;
  pMode: string;
  rStartDate: Date;
  rEndDate: Date;
  tStartDate: Date;
  tEndDate: Date;
  sendDate: Date;
  msgIdx: number;
  appKey: string;
  appSecret: string;
  wDate: Date;
}

export interface IPushMasterWithMsg extends IPushMaster {
  pushStsMsg: IPushStsMsg;
}
