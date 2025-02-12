import { NextFunction, Request, Response } from "express";
import { IAppSettingService } from "../../interfaces/admin/appSetting.interface";

export class AppSettingController {
  constructor(private readonly appSettingService: IAppSettingService) {}

  getAppSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const appSettings = await this.appSettingService.getAppSettings();
      res.success(appSettings);
    } catch (error) {
      next(error);
    }
  };
}
