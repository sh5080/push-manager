import { IsOptional } from "class-validator";
import "reflect-metadata";

export class GetMemberDto {
  @IsOptional()
  memNo?: string;

  @IsOptional()
  ci?: string;

  @IsOptional()
  phoneNumber?: string;
}
