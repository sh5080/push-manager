import { NextFunction, Request, Response } from "express";
import {
  CreateIdentifyDto,
  GetIdentifiesDto,
  GetIdentifyDto,
  UpdateIdentifyDto,
  validateDto,
} from "@push-manager/shared";
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

  createIdentify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await validateDto(CreateIdentifyDto, req.body);
      const identify = await this.identifyService.createIdentify(dto);
      res.success(identify);
    } catch (error) {
      next(error);
    }
  };

  updateIdentify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await validateDto(UpdateIdentifyDto, req.body);
      const identify = await this.identifyService.updateIdentify(
        Number(req.params.idx),
        dto
      );
      res.success(identify);
    } catch (error) {
      next(error);
    }
  };

  deleteIdentify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.identifyService.deleteIdentify(Number(req.params.idx));
      res.success(null, 204);
    } catch (error) {
      next(error);
    }
  };
}
