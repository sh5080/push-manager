import { IsOptional, IsNumber, IsString, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

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

export class CreateIdentifyDto {
  @IsNumber()
  appId!: number;

  @IsString()
  @IsNotEmpty()
  identify!: string;
}

export class UpdateIdentifyDto {
  @IsNumber()
  idx!: number;

  @IsString()
  @IsNotEmpty()
  identify!: string;
}
