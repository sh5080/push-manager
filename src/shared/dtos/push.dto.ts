import { IPushQueue } from "../types/entities/pushQueue.entity";

export interface TestPushDto
  extends Omit<
    IPushQueue,
    | "IDENTIFY"
    | "SENDDATE"
    | "QUEUEIDX"
    | "STEP"
    | "ANDROID_SOUND"
    | "ANDROID_BADGE"
    | "IOS_SOUND"
    | "IOS_BADGE"
    | "WDATE"
    | "UDATE"
  > {
  /**
   * 메시지 발송 후 몇 분 뒤에 발송할지 설정합니다.
   * @default 1
   */
  sendInMinutes?: number;
}
export interface ProdPushDto
  extends Required<
    Omit<
      IPushQueue,
      | "IDENTIFY"
      | "SENDDATE"
      | "QUEUEIDX"
      | "STEP"
      | "ANDROID_SOUND"
      | "ANDROID_BADGE"
      | "IOS_SOUND"
      | "IOS_BADGE"
      | "WDATE"
      | "UDATE"
    >
  > {
  /**
   * 발송할 날짜와 시간을 지정합니다.
   * @example 'YYYY-MM-DD HH:MM' 형식의 문자열
   */
  sendDateString: string;
}
