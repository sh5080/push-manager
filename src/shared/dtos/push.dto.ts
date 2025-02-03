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
  IsNumber,
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
  @IsUrl({}, { message: "유효한 이미지 URL을 입력해주세요." })
  fname?: string;

  @IsOptional()
  @IsUrl({}, { message: "유효한 URL을 입력해주세요." })
  plink?: string;

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
  ptag?: string;

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
