import {
  IsOptional,
  IsNumber,
  IsString,
  IsNotEmpty,
  Min,
  Max,
} from "class-validator";
import { Type } from "class-transformer";
import "reflect-metadata";

export class GetIdentifiesDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  teamId?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  appId?: number;
}

export class GetIdentifyDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  idx!: number;
}

export class CreateIdentifyDto {
  @Min(1, { message: "앱은 1 이상 3 이하의 숫자만 입력해주세요." })
  @Max(3, { message: "앱은 1 이상 3 이하의 숫자만 입력해주세요." })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  appId!: number;

  @IsString()
  @IsNotEmpty()
  identify!: string;

  @Min(1, { message: "팀은 1 이상 2 이하의 숫자만 입력해주세요." })
  @Max(2, { message: "팀은 1 이상 2 이하의 숫자만 입력해주세요." })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  teamId!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class UpdateIdentifyDto {
  @IsString()
  @IsNotEmpty()
  identify!: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  teamId!: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  appId!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;
}
