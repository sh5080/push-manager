import { IPushStsMsg } from "./pushStsMsg.entity";

export interface IPushMaster {
  cmpncode: string;
  msgidx: string;
  pmode: string;
  step: string;
  rstartDate: string;
  rendDate: string;
}

export interface IPushMasterWithMsg extends IPushMaster {
  title: string;
  message: string;
}
