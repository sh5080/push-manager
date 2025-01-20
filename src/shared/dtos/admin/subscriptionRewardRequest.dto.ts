import { IsNotEmpty, IsString } from "class-validator";
import "reflect-metadata";

export class GetSubscriptionRewardRequestsDto {
  @IsString()
  @IsNotEmpty()
  startAt!: string;

  @IsString()
  @IsNotEmpty()
  endAt!: string;
}
