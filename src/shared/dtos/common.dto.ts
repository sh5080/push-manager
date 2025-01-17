import { Type } from "class-transformer";
import { Max, Min } from "class-validator";

export class PaginationDto {
  @Min(1, { message: "page는 최소 1 이상이어야 합니다." })
  @Type(() => Number)
  page!: number;

  @Min(1, { message: "pageSize는 최소 1 이상이어야 합니다." })
  @Max(100, { message: "pageSize는 최대 100 이하이어야 합니다." })
  @Type(() => Number)
  pageSize!: number;
}
