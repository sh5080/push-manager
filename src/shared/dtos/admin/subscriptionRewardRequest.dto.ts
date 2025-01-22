import { IsNotEmpty } from "class-validator";
import "reflect-metadata";

export class GetSubscriptionRewardRequestsDto {
  @IsNotEmpty()
  startAt!: Date;

  @IsNotEmpty()
  endAt!: Date;
}
