import { IsNotEmpty, IsOptional } from "class-validator";
import "reflect-metadata";
import type { CouponType } from "../../types/newbest.type";
import { CouponPoolStatus } from "../../types/constants/coupon.const";

export class GetCouponsDto {
  @IsNotEmpty()
  type!: CouponType;

  @IsOptional()
  page?: number;

  @IsOptional()
  pageSize?: number;

  @IsOptional()
  sn?: string;

  @IsOptional()
  status?: (typeof CouponPoolStatus)[keyof typeof CouponPoolStatus] | "ALL";

  @IsOptional()
  memNo?: string;

  @IsOptional()
  redeemedAtFrom?: Date;

  @IsOptional()
  redeemedAtTo?: Date;
}

export class GetMemberCouponsDto {
  @IsNotEmpty()
  memNo!: string;

  @IsNotEmpty()
  type!: CouponType;
}
