import {
  StepEnum,
  SendStatEnum,
  AndPriorityEnum,
  IsEtiquetteEnum,
  OfbTimeEnum,
  OptAgreeEnum,
  PModeEnum,
} from "../constants/pushQueue.const";

export interface IPushStsMsg {
  idx: number;
  userId?: string;
  appId?: string;
  sendDate?: Date;
  cronDate?: Date;
  cronCompleteDate?: Date;
  wdate: Date;
  udate: Date;
  step?: (typeof StepEnum)[keyof typeof StepEnum];
  resultDate?: Date;
  androidSound?: string;
  androidBadge?: number;
  iosBadge?: number;
  iosSound?: string;
  customKey1?: string;
  customValue1?: string;
  customKey2?: string;
  customValue2?: string;
  customKey3?: string;
  customValue3?: string;
  iosErrorMessage?: string;
  fname?: string;
  isAndroid?: string;
  isIos?: string;
  androidErrorMessage?: string;
  errorMessage?: string;
  tmpMessage?: string;
  oMode?: (typeof PModeEnum)[keyof typeof PModeEnum];
  retry?: number;
  link?: string;
  idListFlag?: string;
  isBulk?: string;
  labelCode?: string;
  title?: string;
  bgColor?: string;
  fontColor?: string;
  sendSpeed?: number;
  isEtiquette?: (typeof IsEtiquetteEnum)[keyof typeof IsEtiquetteEnum];
  etiquetteStime?: number;
  etiquetteEtime?: number;
  ofbTime?: (typeof OfbTimeEnum)[keyof typeof OfbTimeEnum];
  andPriority?: (typeof AndPriorityEnum)[keyof typeof AndPriorityEnum];
  andSendCount?: number;
  iosSendCount?: number;
  optAgree?: (typeof OptAgreeEnum)[keyof typeof OptAgreeEnum];
  sendStat?: (typeof SendStatEnum)[keyof typeof SendStatEnum];
  targetFilter?: string;
  cronIdx?: number;
}
