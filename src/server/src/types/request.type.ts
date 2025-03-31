import { Request } from "express";
import { UserPayload } from "./response.type";

export interface AuthRequest extends Request {
  user?: UserPayload;
}
