"use server";

import { pushController } from "@/server/controllers/pushController";
import {
  OptAgreeEnum,
  PModeEnum,
  SendStatEnum,
} from "@/shared/entities/pushQueue";
import { ProdPushDto } from "@/shared/dtos/push";

const pushService = pushController.getPushService();

export async function createPush(formData: FormData) {
  try {
    const pushData: ProdPushDto = {
      MSGTITLE: formData.get("MSGTITLE") as string,
      MSGCONTENTS: formData.get("MSGCONTENTS") as string,
      sendDateString: formData.get("SENDDATE") as string,
      SEND_STAT:
        formData.get("isScheduled") === "true"
          ? SendStatEnum.SCHEDULED
          : SendStatEnum.SEND_NOW,
      APPKEY: formData.get("APPKEY") as string,
      APPSECRET: formData.get("APPSECRET") as string,
      PMODE: formData.get("PMODE") as PModeEnum,
      OPTAGREE: formData.get("OPTAGREE") as OptAgreeEnum,
    };

    const campaignCode = await pushService.createBulkPush([], pushData);
    return campaignCode;
  } catch (error) {
    console.error("푸시 생성 실패:", error);
    throw new Error("푸시 생성 중 오류가 발생했습니다.");
  }
}

export async function getRecentPushes(limit: number = 10) {
  try {
    const recentPushes = await pushService.getRecentPushes(limit);
    return recentPushes;
  } catch (error) {
    console.error("최근 푸시 조회 실패:", error);
    throw new Error("최근 푸시 조회 중 오류가 발생했습니다.");
  }
}

export async function getPushHistory(page: number = 1, limit: number = 10) {
  try {
    const history = await pushService.getPushHistory(page, limit);
    return history;
  } catch (error) {
    console.error("푸시 이력 조회 실패:", error);
    throw new Error("푸시 이력 조회 중 오류가 발생했습니다.");
  }
}

export async function getPushStats() {
  try {
    const stats = await pushService.getPushStats();
    return stats;
  } catch (error) {
    console.error("푸시 통계 조회 실패:", error);
    throw new Error("푸시 통계 조회 중 오류가 발생했습니다.");
  }
}
