import { IsOptional } from "class-validator";
import "reflect-metadata";
import { PaginationDto } from "../common.dto";
import type {
  SortOptionType,
  OrderType,
} from "../../types/constants/common.const";
export class GetMemberDto {
  @IsOptional()
  memNo?: string;

  @IsOptional()
  ci?: string;

  @IsOptional()
  phoneNumber?: string;
}

export class GetMemberListDto extends PaginationDto {
  @IsOptional()
  createdAt?: string;

  @IsOptional()
  option?: SortOptionType;

  @IsOptional()
  order?: OrderType;
}
