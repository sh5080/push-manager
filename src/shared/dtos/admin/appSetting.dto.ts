import { Transform, Type } from "class-transformer";
import {
  IsUrl,
  IsDateString,
  IsBoolean,
  IsIn,
  ValidateNested,
  IsNotEmpty,
} from "class-validator";
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

class NoticeBarValue {
  @IsUrl(
    {
      protocols: ["https"],
    },
    {
      message: "URL은 https://로 시작하는 유효한 형식이어야 합니다.",
    }
  )
  link!: string;

  @IsDateString()
  startAt!: string;

  @IsDateString()
  endAt!: string;

  @IsNotEmpty()
  content!: string;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  })
  isActive!: boolean;

  @IsIn(["ALL", "AOS", "IOS"])
  platform!: string;
}

export class UpdateNoticeBarDto {
  @ValidateNested()
  @Type(() => NoticeBarValue)
  @IsNotEmpty()
  value!: NoticeBarValue;
}
