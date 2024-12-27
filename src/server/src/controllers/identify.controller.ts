import { NextFunction, Request, Response } from "express";
import {
  GetIdentifiesDto,
  CreateIdentifyDto,
  UpdateIdentifyDto,
} from "@push-manager/shared/dtos/identify.dto";
import { validateDto } from "@push-manager/shared/utils/validate.util";
import { IIdentifyService } from "../interfaces/identify.interface";

export class IdentifyController {
  constructor(private readonly identifyService: IIdentifyService) {}

  getIdentifies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await validateDto(GetIdentifiesDto, req.query);
      const identifies = await this.identifyService.getIdentifies(dto);

      res.success(identifies);
    } catch (error) {
      next(error);
    }
  };

  createIdentify = async (req: Request, res: Response) => {
    // ... 생성 로직
  };

  updateIdentify = async (req: Request, res: Response) => {
    // ... 수정 로직
  };

  deleteIdentify = async (req: Request, res: Response) => {
    // ... 삭제 로직
  };
}
