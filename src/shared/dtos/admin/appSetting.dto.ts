import { IsNotEmpty } from "class-validator";
import "reflect-metadata";

export class CreateMaintenanceDto {
  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  noticeAt!: Date;

  @IsNotEmpty()
  startAt!: Date;

  @IsNotEmpty()
  endAt!: Date;
}

export class UpdateMaintenanceDto extends CreateMaintenanceDto {
  @IsNotEmpty()
  id!: number;

  @IsNotEmpty()
  isActive!: boolean;
}
