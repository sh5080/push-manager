import { IsNotEmpty } from "class-validator";
import "reflect-metadata";

export class GetMemberByMemNoDto {
  @IsNotEmpty()
  memNo!: string;
}
