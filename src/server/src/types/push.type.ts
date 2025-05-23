import {
  CreatePushDto,
  OneSignalPushDto,
  StepEnum,
} from "@push-manager/shared";

export interface CreateBasePushDto {
  dto: CreatePushDto;
  campaignCode: number;
  sendDate: string;
  now: string;
}

export interface UpdateMasterStatusDto {
  campaignCode: number;
  step: (typeof StepEnum)[keyof typeof StepEnum];
  endDate: string;
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

export interface OneSignalResponse {
  id: string;
  external_id: string | null;
}
