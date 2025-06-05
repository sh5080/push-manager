import { NextFunction, Request, Response } from "express";
import { IAppSettingService } from "../../interfaces/admin/appSetting.interface";
import {
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
  UpdateNoticeBarDto,
  validateDto,
} from "@push-manager/shared";

export class AppSettingController {
  constructor(private readonly appSettingService: IAppSettingService) {}

  createMaintenance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = await validateDto(CreateMaintenanceDto, req.body);
      const maintenance = await this.appSettingService.createMaintenance(dto);
      res.success(maintenance);
    } catch (error) {
      next(error);
    }
  };

  updateMaintenance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = await validateDto(UpdateMaintenanceDto, req.body);
      const maintenance = await this.appSettingService.updateMaintenance(dto);
      res.success(maintenance);
    } catch (error) {
      next(error);
    }
  };

  updateNoticeBar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await validateDto(UpdateNoticeBarDto, req.body);
      const noticeBar = await this.appSettingService.updateNoticeBar(dto);
      res.success(noticeBar);
    } catch (error) {
      next(error);
    }
  };

  getAppSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const appSettings = await this.appSettingService.getAppSettings();
      res.success(appSettings);
    } catch (error) {
      next(error);
    }
  };
}
