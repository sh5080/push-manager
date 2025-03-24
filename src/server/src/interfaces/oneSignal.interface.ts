import {
  OneSignalMessageIdDto,
  OneSignalOutcomeDto,
  OneSignalPushDto,
  OneSignalSubscriptionDto,
  OneSignalTemplateDto,
  OneSignalUserDto,
  PushQueueResponse,
} from "@push-manager/shared";
import {
  OneSignalMessageResult,
  OneSignalOutcomeResult,
  OneSignalUserResult,
} from "@push-manager/shared/types/entities/oneSignal.entity";

export interface IOneSignalService {
  sendPush(dto: OneSignalPushDto): Promise<PushQueueResponse>;
  createSubscription(dto: OneSignalSubscriptionDto): Promise<string>;
  createUser(dto: OneSignalUserDto): Promise<OneSignalUserResult>;
  getUser(externalId: string): Promise<OneSignalUserResult>;
  getCsv(dto: OneSignalMessageIdDto): Promise<string>;
  getMessage(dto: OneSignalMessageIdDto): Promise<OneSignalMessageResult>;
  createTemplate(dto: OneSignalTemplateDto): Promise<string>;
  getOutcomes(dto: OneSignalOutcomeDto): Promise<OneSignalOutcomeResult>;
}
