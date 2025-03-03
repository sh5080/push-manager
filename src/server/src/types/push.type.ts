import { CreatePushDto, OneSignalPushDto } from "@push-manager/shared";

export interface CreateBasePushDto {
  dto: CreatePushDto;
  campaignCode: number;
  sendDate: string;
  now: string;
}

export interface PushMsgStats {
  stats: {
    sent: number;
    failed: number;
    opened: number;
  };
}

export interface PushNotificationJobData extends OneSignalPushDto {
  batch: string[];
  logId: number;
}
