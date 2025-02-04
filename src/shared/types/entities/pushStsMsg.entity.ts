import {
  StepEnum,
  SendStatEnum,
  AndPriorityEnum,
  IsEtiquetteEnum,
  OfbTimeEnum,
  OptAgreeEnum,
  PModeEnum,
} from "../constants/pushQueue.const";
import { IPushStsMsgDetail } from "./pushStsMsgDetail.entity";

export interface IPushStsMsg {
  idx: string;
  userId?: string;
  appid?: string;
  senddate?: Date;
  crondate?: Date;
  cronComplatedate?: Date;
  wdate: Date;
  udate: Date;
  step?: (typeof StepEnum)[keyof typeof StepEnum];
  resultdate?: Date;
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
  iosErrormessage?: string;
  fname?: string;
  isandroid?: string;
  isios?: string;
  andErrormessage?: string;
  errormessage?: string;
  tmpMessage?: string;
  oMode?: (typeof PModeEnum)[keyof typeof PModeEnum];
  retry?: number;
  link?: string;
  idlistFlag?: string;
  isbulk?: string;
  labelCode?: string;
  title?: string;
  bgcolor?: string;
  fontcolor?: string;
  sendspeed?: number;
  isetiquette?: (typeof IsEtiquetteEnum)[keyof typeof IsEtiquetteEnum];
  etiquetteStime?: number;
  etiquetteEtime?: number;
  ofbTime?: (typeof OfbTimeEnum)[keyof typeof OfbTimeEnum];
  andPriority?: (typeof AndPriorityEnum)[keyof typeof AndPriorityEnum];
  andSendCount?: number;
  iosSendCount?: number;
  optagree?: (typeof OptAgreeEnum)[keyof typeof OptAgreeEnum];
  sendStat?: (typeof SendStatEnum)[keyof typeof SendStatEnum];
  targetFilter?: string;
  cronidx?: number;
}

export interface IPushStsMsgWithDetail extends IPushStsMsg {
  detail: IPushStsMsgDetail[];
}
