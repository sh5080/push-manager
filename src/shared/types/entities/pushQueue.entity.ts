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
  queueIdx: number;
  appKey: string;
  appSecret: string;
  msgTitle: string;
  sendDate?: () => string;
  resultDate?: string;
  feedbackDate?: string;
  msgContents: string;
  identify: string;
  step?: (typeof StepEnum)[keyof typeof StepEnum];
  pMode?: (typeof PModeEnum)[keyof typeof PModeEnum];
  fName?: string;
  sendStat?: (typeof SendStatEnum)[keyof typeof SendStatEnum];
  androidSound?: string;
  androidBadge?: number;
  iosSound?: string;
  iosBadge?: number;
  pLink?: string;
  customKey1?: string;
  customValue1?: string;
  customKey2?: string;
  customValue2?: string;
  customKey3?: string;
  customValue3?: string;
  labelCode?: string;
  bgColor?: string;
  fontColor?: string;
  andPriority?: (typeof AndPriorityEnum)[keyof typeof AndPriorityEnum];
  isEtiquette?: (typeof IsEtiquetteEnum)[keyof typeof IsEtiquetteEnum];
  etiquetteStime?: number;
  etiquetteEtime?: number;
  ofbTime?: (typeof OfbTimeEnum)[keyof typeof OfbTimeEnum];
  optAgree?: (typeof OptAgreeEnum)[keyof typeof OptAgreeEnum];
  pTag?: string;
  beschmode?: (typeof BeschModeEnum)[keyof typeof BeschModeEnum];
  cmpncode?: number;
  extra1?: string;
  extra2?: string;
  extra3?: string;
  failToChannel?: string;
  rno?: string;
  sno?: string;
  txtMsgContents?: string;
  txtMsgTitle?: string;
  wDate?: () => string;
  uDate?: () => string;
}
