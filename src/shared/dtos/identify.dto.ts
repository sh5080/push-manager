import { IsOptional, IsNumber, IsString, IsNotEmpty } from "class-validator";

export class GetIdentifiesDto {
  @IsNumber()
  @IsOptional()
  teamId?: number;

  @IsNumber()
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
