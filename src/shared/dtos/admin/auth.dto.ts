import { IsNotEmpty } from "class-validator";
import "reflect-metadata";

export class LoginDto {
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
