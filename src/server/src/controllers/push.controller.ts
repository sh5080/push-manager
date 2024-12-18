import { NextFunction, Request, Response } from "express";
import { IPushService } from "../interfaces/push.interface";
import { GetRecentPushesDto } from "@push-manager/shared/dtos/push.dto";
import { validateDto } from "@push-manager/shared/utils/validate.util";

export class PushController {
  constructor(private readonly pushService: IPushService) {}

  // createBulkPush = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { identifyArray, ...pushDto } = req.body;
  //     const campaignCode = await this.pushService.createBulkPush(
  //       identifyArray,
  //       pushDto
  //     );
  //     res.success({ campaignCode });
  //   } catch (error) {
  //     console.error("Error in bulk push creation:", error);
  //     next(error);
  //   }
  // };

  getRecentPushes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await validateDto(GetRecentPushesDto, {
        limit: req.query.limit || 10,
        targetMode: req.query.targetMode,
      });

      const pushes = await this.pushService.getRecentPushes(dto);
      res.success(pushes);
    } catch (error) {
      next(error);
    }
  };

  // getPushHistory = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const page = Number(req.query.page) || 1;
  //     const limit = Number(req.query.limit) || 10;
  //     const history = await this.pushService.getPushHistory(page, limit);
  //     res.success(history);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // getPushStats = async (_req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const stats = await this.pushService.getPushStats();
  //     res.success(stats);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // getPushDetail = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const campaignCode = Number(req.params.campaignCode);
  //     const push = await this.pushService.getPushDetail(campaignCode);

  //     if (!push) {
  //       throw new NotFoundException("푸시를 찾을 수 없습니다.");
  //     }

  //     res.success(push);
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}
