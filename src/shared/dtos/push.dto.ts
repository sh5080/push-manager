import { AppIdEnum } from "../types/constants/common.const";
import { IPushQueue } from "../types/entities/pushQueue.entity";
import { IsEnum, Min, Max } from "class-validator";

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

export interface PushResponse {
  pushes: IPushQueue[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
export class GetRecentPushesDto {
  @IsEnum(AppIdEnum, {
    message: "유효하지 않은 targetMode입니다. (FREED: 0, TEST: 1, PROD: 2)",
  })
  targetMode!: (typeof AppIdEnum)[keyof typeof AppIdEnum];

  @Min(1, { message: "limit는 최소 1 이상이어야 합니다." })
  @Max(100, { message: "limit는 최대 100까지만 가능합니다." })
  limit?: number;
}
