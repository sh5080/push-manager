import { IsNotEmpty } from "class-validator";
import "reflect-metadata";
import { CouponType } from "../../types/newbest.type";

export class GetMemberCouponsDto {
  @IsNotEmpty()
  memNo!: string;

  @IsNotEmpty()
  type!: CouponType;
}
