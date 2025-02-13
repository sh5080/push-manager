import {
  StepEnum,
  SendStatEnum,
  AndPriorityEnum,
  IsEtiquetteEnum,
  OfbTimeEnum,
  OptAgreeEnum,
  PModeEnum,
} from "../constants/pushQueue.const";
import {
  IPushStsMsgDetail,
  IPushStsMsgOpenInfo,
  IPushStsMsgResult,
} from "./pushStsMsgDetail.entity";

export interface IPushStsMsg {
  idx: string;
  userId?: string;
  appId?: string;
  sendDate?: Date;
  cronDate?: Date;
  cronComplatedate?: Date;
  wDate: Date;
  uDate: Date;
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
  fName?: string;
  isAndroid?: string;
  isIos?: string;
  andErrorMessage?: string;
  errorMessage?: string;
  tmpMessage?: string;
  oMode?: (typeof PModeEnum)[keyof typeof PModeEnum];
  retry?: number;
  link?: string;
  idlistFlag?: string;
  isBulk?: string;
  labelCode?: string;
  title?: string;
  bgColor?: string;
  fontColor?: string;
  sendspeed?: number;
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

export interface IPushStsMsgWithDetail extends IPushStsMsg {
  detail: IPushStsMsgDetail[];
  result: IPushStsMsgResult[];
  openinfo: IPushStsMsgOpenInfo[];
}
