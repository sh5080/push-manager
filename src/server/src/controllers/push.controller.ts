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
  OneSignalPushDto,
  OneSignalSubscriptionDto,
  OneSignalUserDto,
  OneSignalMessageIdDto,
  OneSignalOutcomeDto,
  UpdateQueueDto,
} from "@push-manager/shared";
import { initFirebase } from "../configs/firebase.config";
import { pushConfig } from "../configs/push.config";
import apn from "node-apn";
import { IOneSignalService } from "../interfaces/oneSignal.interface";

export class PushController {
  constructor(
    private readonly pushService: IPushService,
    private readonly oneSignalService: IOneSignalService
  ) {}

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
      const { page, pageSize, targetMode, startDate, endDate, step, title } =
        req.query;

      const dto = await validateDto(GetTargetPushesDto, {
        page: Number(page) || 1,
        pageSize: Number(pageSize) || 10,
        targetMode: Number(targetMode),
        startDate,
        endDate,
        step,
        title,
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

  updateQueue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cmpncode = Number(req.params.cmpncode);
      console.log(req.body);
      const dto = await validateDto(UpdateQueueDto, req.body);
      await this.pushService.updateQueue(cmpncode, dto);
      res.success({ message: "Queue updated successfully" });
    } catch (error) {
      next(error);
    }
  };

  deleteQueue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cmpncode = Number(req.params.cmpncode);
      await this.pushService.deleteQueue(cmpncode);
      res.success({ message: "Queue deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.query.token as string;
      const admin = initFirebase();
      // FCM 검증
      try {
        await admin
          .messaging()
          .send({ token, data: { validate: "true" } }, true);
        return res.success({ isValid: true, platform: "FCM" });
      } catch (fcmError) {
        // APNS 검증
        try {
          const apnProvider = new apn.Provider({
            token: {
              key: pushConfig.apns.privateKey,
              keyId: pushConfig.apns.keyId,
              teamId: pushConfig.apns.teamId,
            },
            production: true, // 개발용은 false, 프로덕션은 true
          });

          const notification = new apn.Notification();
          notification.topic = pushConfig.apns.bundleId;

          const result = await apnProvider.send(notification, token);
          apnProvider.shutdown();

          return res.success({
            isValid: !result.failed.length,
            platform: "APNS",
            response: result,
          });
        } catch (apnsError: any) {
          return res.success({
            isValid: false,
            platform: "APNS",
            reason: apnsError.message,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  };
  sendOneSignalPush = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = await validateDto(OneSignalPushDto, req.body);
      const result = await this.oneSignalService.sendPush(dto);
      res.success(result);
    } catch (error) {
      next(error);
    }
  };

  createOneSignalSubscription = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = await validateDto(OneSignalSubscriptionDto, req.body);
      const result = await this.oneSignalService.createSubscription(dto);
      res.success(result);
    } catch (error) {
      next(error);
    }
  };

  createOneSignalUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = await validateDto(OneSignalUserDto, req.body);
      const result = await this.oneSignalService.createUser(dto);
      res.success(result);
    } catch (error) {
      next(error);
    }
  };

  getOneSignalUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = await validateDto(OneSignalUserDto, req.query);
      const result = await this.oneSignalService.getUser(dto.externalId);
      res.success(result);
    } catch (error) {
      next(error);
    }
  };

  getOneSignalMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = await validateDto(OneSignalMessageIdDto, req.query);
      const result = await this.oneSignalService.getMessage(dto);
      res.success(result);
    } catch (error) {
      next(error);
    }
  };

  getOneSignalOutcomes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = await validateDto(OneSignalOutcomeDto, req.query);
      const result = await this.oneSignalService.getOutcomes(dto);
      res.success(result);
    } catch (error) {
      next(error);
    }
  };
}
