import { IsOptional, IsNumber, IsString, IsNotEmpty } from "class-validator";
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
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  appId!: number;

  @IsString()
  @IsNotEmpty()
  identify!: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  teamId!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class UpdateIdentifyDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  idx!: number;

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
