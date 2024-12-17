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
  // 필수 필드
  QUEUEIDX: number;
  APPKEY: string;
  APPSECRET: string;
  MSGTITLE: string;
  SENDDATE?: Date;
  RESULTDATE?: Date;
  FEEDBACKDATE?: Date;
  MSGCONTENTS: string;
  IDENTIFY: string;
  STEP?: (typeof StepEnum)[keyof typeof StepEnum];
  PMODE?: (typeof PModeEnum)[keyof typeof PModeEnum];
  FNAME?: string;
  SEND_STAT?: (typeof SendStatEnum)[keyof typeof SendStatEnum];
  ANDROID_SOUND?: string;
  ANDROID_BADGE?: number;
  IOS_SOUND?: string;
  IOS_BADGE?: number;

  PLINK?: string;
  CUSTOM_KEY_1?: string;
  CUSTOM_VALUE_1?: string;
  CUSTOM_KEY_2?: string;
  CUSTOM_VALUE_2?: string;
  CUSTOM_KEY_3?: string;
  CUSTOM_VALUE_3?: string;
  LABEL_CODE?: string;
  BGCOLOR?: string;
  FONTCOLOR?: string;
  AND_PRIORITY?: (typeof AndPriorityEnum)[keyof typeof AndPriorityEnum];
  ISETIQUETTE?: (typeof IsEtiquetteEnum)[keyof typeof IsEtiquetteEnum];
  ETIQUETTE_STIME?: number;
  ETIQUETTE_ETIME?: number;
  OFB_TIME?: (typeof OfbTimeEnum)[keyof typeof OfbTimeEnum];
  OPTAGREE?: (typeof OptAgreeEnum)[keyof typeof OptAgreeEnum];
  PTAG?: string;
  BESCHMODE?: (typeof BeschModeEnum)[keyof typeof BeschModeEnum];

  WDATE?: Date;
  UDATE?: Date;
}
