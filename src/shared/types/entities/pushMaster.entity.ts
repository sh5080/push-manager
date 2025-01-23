import { StepEnum } from "../constants/pushQueue.const";

export interface IPushMaster {
  cmpncode: string;
  msgidx: string;
  pmode: string;
  step: (typeof StepEnum)[keyof typeof StepEnum];
  fpstep: (typeof StepEnum)[keyof typeof StepEnum];
  rstartDate: string;
  rendDate: string;
}

export interface IPushMasterWithMsg extends IPushMaster {
  title: string;
  message: string;
}
