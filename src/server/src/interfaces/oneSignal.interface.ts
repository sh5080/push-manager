import { OneSignalPushDto, PushQueueResponse } from "@push-manager/shared";

export interface IOneSignalService {
  sendPush(dto: OneSignalPushDto): Promise<PushQueueResponse>;
}
