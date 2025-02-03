import { NextFunction, Request, Response } from "express";
import { IPushService } from "../interfaces/push.interface";
import {
  AddToQueueDto,
  CreatePushDto,
  GetPushQueuesDto,
  GetRecentPushesDto,
  GetScheduledPushesDto,
  ConfirmPushQueueDto,
  validateDto,
  GetTargetPushesDto,
} from "@push-manager/shared";

export class PushController {
  constructor(private readonly pushService: IPushService) {}

  createPushes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await validateDto(CreatePushDto, req.body);
      const campaignCode = await this.pushService.createPushes(dto);
      res.success(campaignCode);
    } catch (error) {
      console.error("Error in bulk push creation:", error);
      next(error);
    }
  };

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

  getTargetPushes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, pageSize, targetMode, startDate, endDate, step } =
        req.query;

      const dto = await validateDto(GetTargetPushesDto, {
        page: Number(page) || 1,
        pageSize: Number(pageSize) || 10,
        targetMode: Number(targetMode),
        startDate,
        endDate,
        step,
      });

      const pushes = await this.pushService.getTargetPushes(dto);
      res.success(pushes);
    } catch (error) {
      next(error);
    }
  };

  getScheduledPushes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = await validateDto(GetScheduledPushesDto, {
        page: Number(req.query.page) || 1,
        pageSize: Number(req.query.pageSize) || 10,
      });
      const { page, pageSize } = dto;

      const pushes = await this.pushService.getScheduledPushes(page, pageSize);
      res.success(pushes);
    } catch (error) {
      next(error);
    }
  };

  getPushStsMsgDetail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const idx = req.params.idx;
      const detail = await this.pushService.getPushStsMsgDetail(idx);
      res.success(detail);
    } catch (error) {
      next(error);
    }
  };

  getPushQueues = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await validateDto(GetPushQueuesDto, {
        cmpncode: Number(req.params.cmpncode),
        page: Number(req.query.page) || 1,
        pageSize: Number(req.query.pageSize) || 10,
      });
      const queues = await this.pushService.getPushQueues(dto);
      res.success(queues);
    } catch (error) {
      next(error);
    }
  };

  addToQueue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await validateDto(AddToQueueDto, {
        identifies: req.body.identifies,
        cmpncode: Number(req.params.cmpncode),
      });
      const result = await this.pushService.addToQueue(dto);
      res.success(result);
    } catch (error) {
      next(error);
    }
  };

  confirmPushQueue = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = await validateDto(ConfirmPushQueueDto, req.body);

      const result = await this.pushService.confirmPushQueue(dto);
      res.success(result);
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
