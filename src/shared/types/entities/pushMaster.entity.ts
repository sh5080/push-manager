import { StepEnum } from "../constants/pushQueue.const";

export interface IPushMaster {
  cmpncode: string;
  msgIdx: string;
  pMode: string;
  step: (typeof StepEnum)[keyof typeof StepEnum];
  fpStep: (typeof StepEnum)[keyof typeof StepEnum];
  rStartDate: string;
  rEndDate: string;
}

export interface IPushMasterWithMsg extends IPushMaster {
  title: string;
  message: string;
  appId: string;
}
