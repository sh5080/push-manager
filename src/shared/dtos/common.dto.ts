import { Type } from "class-transformer";
import { IsNotEmpty, IsString, Max, Min } from "class-validator";
import "reflect-metadata";

export class PaginationDto {
  @Min(1, { message: "page는 최소 1 이상이어야 합니다." })
  @Type(() => Number)
  page!: number;

  @Min(1, { message: "pageSize는 최소 1 이상이어야 합니다." })
  @Max(100, { message: "pageSize는 최대 100 이하이어야 합니다." })
  @Type(() => Number)
  pageSize!: number;
}

export class PresignedUrlDto {
  @IsString()
  @IsNotEmpty()
  fileName!: string;

  @IsString()
  @IsNotEmpty()
  path!: string;

  @IsString()
  @IsNotEmpty()
  contentType!: string;
}
