import {
  SendStatEnum,
  AndPriorityEnum,
  StepEnum,
  PModeEnum,
  IsEtiquetteEnum,
  OfbTimeEnum,
  OptAgreeEnum,
  BeschModeEnum,
} from "../constants/pushQueue.const";

export interface IPushQueue {
  queueidx: number;
  appkey: string;
  appsecret: string;
  msgtitle: string;
  senddate?: () => string;
  resultdate?: string;
  feedbackdate?: string;
  msgcontents: string;
  identify: string;
  step?: (typeof StepEnum)[keyof typeof StepEnum];
  pmode?: (typeof PModeEnum)[keyof typeof PModeEnum];
  fname?: string;
  sendStat?: (typeof SendStatEnum)[keyof typeof SendStatEnum];
  androidSound?: string;
  androidBadge?: number;
  iosSound?: string;
  iosBadge?: number;
  plink?: string;
  customKey1?: string;
  customValue1?: string;
  customKey2?: string;
  customValue2?: string;
  customKey3?: string;
  customValue3?: string;
  labelCode?: string;
  bgcolor?: string;
  fontcolor?: string;
  andPriority?: (typeof AndPriorityEnum)[keyof typeof AndPriorityEnum];
  isetiquette?: (typeof IsEtiquetteEnum)[keyof typeof IsEtiquetteEnum];
  etiquetteStime?: number;
  etiquetteEtime?: number;
  ofbTime?: (typeof OfbTimeEnum)[keyof typeof OfbTimeEnum];
  optagree?: (typeof OptAgreeEnum)[keyof typeof OptAgreeEnum];
  ptag?: string;
  beschmode?: (typeof BeschModeEnum)[keyof typeof BeschModeEnum];

  wdate?: () => string;
  udate?: () => string;
}
