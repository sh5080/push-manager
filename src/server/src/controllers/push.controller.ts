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
} from "@push-manager/shared";
import { initFirebase } from "../configs/firebase.config";
import { pushConfig } from "../configs/push.config";
import apn from "node-apn";

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
      const { identifyArray, title, content, subtitle, deepLink, sendDate } =
        dto;
      const url = "https://api.onesignal.com/notifications?c=push";
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Key ${pushConfig.oneSignal.apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          app_id: pushConfig.oneSignal.appId,
          include_aliases: { external_id: identifyArray },
          headings: { en: title },
          subtitle: { en: subtitle },
          contents: { en: content },
          url: deepLink,
          target_channel: "push",
          send_after: sendDate,
        }),
      };

      const data = await fetch(url, options);

      const result = await data.json();
      if (result.errors) {
        throw new Error(result.errors[0]);
      }
      res.success(result);
    } catch (error) {
      next(error);
    }
  };
}
