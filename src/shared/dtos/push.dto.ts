import { Transform, Type } from "class-transformer";
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
  IsNumber,
  MaxLength,
  ArrayMaxSize,
} from "class-validator";
import "reflect-metadata";
import {
  AndPriorityEnum,
  BeschModeEnum,
  IsEtiquetteEnum,
  OfbTimeEnum,
  OptAgreeEnum,
  StepEnum,
} from "../types/constants/pushQueue.const";
import { PaginationDto } from "./common.dto";
import {
  OneSignalOutcomeAggregation,
  OneSignalPlatform,
  OneSignalTimeRange,
  type PushType,
  type OneSignalAttributionType,
  type OneSignalOutcomeAggregationType,
  type OneSignalPlatformType,
  type OneSignalTimeRangeType,
} from "../types/constants/oneSignal.const";

export interface PushResponse {
  pushes: IPushQueue[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class CreatePushDto {
  @IsString()
  @MaxLength(50, { message: "푸시 제목은 최대 50자까지만 가능합니다." })
  @IsNotEmpty({ message: "푸시 제목은 필수입니다." })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: "푸시 내용은 필수입니다." })
  content!: string;

  @IsArray()
  @ArrayMinSize(1, { message: "최소 1개 이상의 식별자가 필요합니다." })
  @IsString({ each: true })
  identifyArray!: string[];

  @IsDateString({}, { message: "유효한 날짜 형식이 아닙니다." })
  @IsNotEmpty({ message: "발송 시간은 필수입니다." })
  sendDateString!: string;

  @IsOptional()
  fName?: string;

  @IsOptional()
  pLink?: string;

  @IsEnum(AppIdEnum, {
    message: "유효하지 않은 appId입니다. (FREED: 0, TEST: 1, PROD: 2)",
  })
  appId!: (typeof AppIdEnum)[keyof typeof AppIdEnum];

  @IsOptional()
  @IsString()
  customKey1?: string;

  @IsOptional()
  @IsString()
  customValue1?: string;

  @IsOptional()
  @IsString()
  labelCode?: string;

  @IsOptional()
  @IsString()
  bgColor?: string;

  @IsOptional()
  @IsString()
  fontColor?: string;

  @IsEnum(AndPriorityEnum, {
    message: "유효하지 않은 andPriority입니다. (MEDIUM: M, HIGH: H)",
  })
  @IsOptional()
  andPriority?: (typeof AndPriorityEnum)[keyof typeof AndPriorityEnum];

  @IsEnum(IsEtiquetteEnum, {
    message: "유효하지 않은 isetIquette입니다. (NO: N, YES: Y)",
  })
  @IsOptional()
  isetIquette?: (typeof IsEtiquetteEnum)[keyof typeof IsEtiquetteEnum];

  @IsOptional()
  etiqueStime?: number;

  @IsOptional()
  etiqueEtime?: number;

  @IsOptional()
  @IsEnum(OfbTimeEnum, {
    message: "유효하지 않은 ofbTime입니다. (ONE_W: 1, ONE_M: 2, ONE_D: 3)",
  })
  ofbTime?: (typeof OfbTimeEnum)[keyof typeof OfbTimeEnum];

  @IsOptional()
  @IsEnum(OptAgreeEnum, {
    message: "유효하지 않은 optAgree입니다. (AGREE: 1000, DISAGREE: 0000)",
  })
  optAgree?: (typeof OptAgreeEnum)[keyof typeof OptAgreeEnum];

  @IsOptional()
  @IsString()
  pTag?: string;

  @IsOptional()
  @IsString()
  beschMode?: (typeof BeschModeEnum)[keyof typeof BeschModeEnum];

  @IsOptional()
  isReady?: boolean;
}

export class GetRecentPushesDto {
  @IsEnum(AppIdEnum, {
    message: "유효하지 않은 targetMode입니다. (FREED: 0, TEST: 1, PROD: 2)",
  })
  @Type(() => Number)
  targetMode!: (typeof AppIdEnum)[keyof typeof AppIdEnum];

  @Min(1, { message: "limit는 최소 1 이상이어야 합니다." })
  @Max(100, { message: "limit는 최대 100까지만 가능합니다." })
  @Type(() => Number)
  limit?: number;
}

export class GetTargetPushesDto extends PaginationDto {
  @IsEnum(AppIdEnum, {
    message: "유효하지 않은 targetMode입니다. (FREED: 0, TEST: 1, PROD: 2)",
  })
  @IsOptional()
  targetMode?: (typeof AppIdEnum)[keyof typeof AppIdEnum];

  @IsNotEmpty()
  startDate!: string;

  @IsNotEmpty()
  endDate!: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(StepEnum, {
    message: "유효하지 않은 상태값입니다.",
  })
  @Transform(({ value }) => {
    return value === "undefined" ? undefined : value;
  })
  @IsOptional()
  step?: (typeof StepEnum)[keyof typeof StepEnum];
}

export class GetScheduledPushesDto extends PaginationDto {}

export class ConfirmPushQueueDto {
  @IsNotEmpty({ message: "캠페인 코드는 필수입니다." })
  campaignCode!: number;

  @IsEnum(StepEnum, {
    message: "유효하지 않은 상태값입니다.",
  })
  step!: (typeof StepEnum)[keyof typeof StepEnum];
}

export class GetPushQueuesDto extends PaginationDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty({ message: "캠페인 코드는 필수입니다." })
  cmpncode!: number;
}

export class AddToQueueDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  identifies!: string[];

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty({ message: "캠페인 코드는 필수입니다." })
  cmpncode!: number;
}

export class UpdateQueueDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}

export class OneSignalPushDto {
  @IsArray()
  @ArrayMinSize(1, { message: "최소 1개 이상의 식별자가 필요합니다." })
  @ArrayMaxSize(200000, { message: "식별자는 최대 20만개까지만 가능합니다." })
  @IsString({ each: true })
  identifyArray!: string[];

  @IsString()
  @IsNotEmpty({ message: "타이틀은 필수입니다." })
  title!: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsNotEmpty({ message: "내용은 필수입니다." })
  content!: string;

  @IsUrl()
  @IsOptional()
  deepLink?: string;

  @IsDateString()
  @IsOptional()
  sendDate?: string;

  @IsEnum(AppIdEnum, {
    message: "유효하지 않은 appId입니다. (FREED: 0, TEST: 1, PROD: 2)",
  })
  appId!: (typeof AppIdEnum)[keyof typeof AppIdEnum];
}

export class OneSignalOutcomeDto {
  @IsArray()
  @IsString({ each: true })
  outcomeNames!: string[];

  @IsOptional()
  @IsEnum(OneSignalOutcomeAggregation, {
    message: "유효하지 않은 출력 집계 유형입니다.",
  })
  aggregation?: OneSignalOutcomeAggregationType;

  @IsOptional()
  @IsEnum(OneSignalTimeRange, {
    message: "유효하지 않은 시간 범위 유형입니다.",
  })
  timeRange?: OneSignalTimeRangeType;

  @IsOptional()
  @IsEnum(OneSignalPlatform, {
    message: "유효하지 않은 플랫폼 유형입니다.",
  })
  platforms?: OneSignalPlatformType[];

  @IsOptional()
  attribution?: OneSignalAttributionType;
}

export class OneSignalMessageIdDto {
  @IsString()
  @IsNotEmpty({ message: "메시지 ID는 필수입니다." })
  messageId!: string;
}

export class OneSignalTemplateDto {
  @IsString()
  @IsNotEmpty({ message: "템플릿 이름은 필수입니다." })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: "템플릿 내용은 필수입니다." })
  contents!: string;
}

export class OneSignalSubscriptionDto {
  @IsString()
  @IsNotEmpty({ message: "타입은 필수입니다." })
  type!: PushType;

  @IsString()
  @IsNotEmpty({ message: "식별자는 필수입니다." })
  externalId!: string;

  @IsString()
  @IsNotEmpty({ message: "토큰은 필수입니다." })
  token!: string;
}

export class OneSignalUserDto {
  @IsString()
  @IsNotEmpty({ message: "식별자는 필수입니다." })
  externalId!: string;
}
