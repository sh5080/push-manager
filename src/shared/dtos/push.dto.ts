import { Type } from "class-transformer";
import { AppIdEnum } from "../types/constants/common.const";
import { IPushQueue } from "../types/entities/pushQueue.entity";
import {
  IsEnum,
  Min,
  Max,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsArray,
  ArrayMinSize,
  IsDateString,
} from "class-validator";
import "reflect-metadata";

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
  @Type(() => Number)
  limit?: number;
}

export class CreatePushDto {
  @IsString()
  @IsNotEmpty({ message: "푸시 제목은 필수입니다." })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: "푸시 내용은 필수입니다." })
  content!: string;

  @IsArray()
  @ArrayMinSize(1, { message: "최소 1개 이상의 식별자가 필요합니다." })
  @IsString({ each: true })
  identifyArray!: string[];

  @IsOptional()
  @IsDateString({}, { message: "유효한 날짜 형식이 아닙니다." })
  sendDateString?: string;

  @IsOptional()
  @IsUrl({}, { message: "유효한 이미지 URL을 입력해주세요." })
  fname?: string;

  @IsOptional()
  @IsUrl({}, { message: "유효한 URL을 입력해주세요." })
  plink?: string;

  @IsEnum(AppIdEnum, {
    message: "유효하지 않은 targetMode입니다. (FREED: 0, TEST: 1, PROD: 2)",
  })
  targetMode!: (typeof AppIdEnum)[keyof typeof AppIdEnum];
}
