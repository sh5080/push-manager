import { Request, Response } from "express";
import { PushService } from "../services/push.service";

export class PushController {
  private pushService: PushService;

  constructor() {
    this.pushService = new PushService();
  }

  createBulkPush = async (req: Request, res: Response) => {
    try {
      const { identifyArray, ...pushDto } = req.body;
      const campaignCode = await this.pushService.createBulkPush(
        identifyArray,
        pushDto
      );
      res.status(201).json({ campaignCode });
    } catch (error) {
      console.error("Error in bulk push creation:", error);
      res
        .status(500)
        .json({ error: "푸시 메시지 생성 중 오류가 발생했습니다." });
    }
  };

  getRecentPushes = async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit) || 10;
      const pushes = await this.pushService.getRecentPushes(limit);
      res.json(pushes);
    } catch (error) {
      res.status(500).json({ error: "최근 푸시 조회 중 오류가 발생했습니다." });
    }
  };

  getPushHistory = async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const history = await this.pushService.getPushHistory(page, limit);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: "푸시 이력 조회 중 오류가 발생했습니다." });
    }
  };

  getPushStats = async (_req: Request, res: Response) => {
    try {
      const stats = await this.pushService.getPushStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "푸시 통계 조회 중 오류가 발생했습니다." });
    }
  };

  getPushDetail = async (req: Request, res: Response) => {
    try {
      const campaignCode = Number(req.params.campaignCode);
      const push = await this.pushService.getPushDetail(campaignCode);

      if (!push) {
        return res.status(404).json({ error: "푸시를 찾을 수 없습니다." });
      }

      res.json(push);
    } catch (error) {
      res.status(500).json({ error: "푸시 상세 조회 중 오류가 발생했습니다." });
    }
  };
}
