import { OneSignalException } from "@push-manager/shared";
import { pushConfig } from "../../configs/push.config";
import { OneSignalResponse } from "../../types/push.type";

export class OneSignalApi {
  private readonly apiKey: string;
  private readonly appId: string;

  constructor() {
    this.apiKey = pushConfig.oneSignal.apiKey;
    this.appId = pushConfig.oneSignal.appId;
  }

  /**
   * OneSignal API를 통해 푸시 알림 전송
   */
  async sendNotification(
    identifyArray: string[],
    title: string,
    content: string,
    subtitle?: string,
    deepLink?: string,
    sendDate?: string
  ): Promise<OneSignalResponse> {
    const response = await fetch(
      "https://api.onesignal.com/notifications?c=push",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Key ${this.apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          app_id: this.appId,
          include_aliases: { external_id: identifyArray },
          headings: { en: title },
          subtitle: subtitle ? { en: subtitle } : undefined,
          contents: { en: content },
          url: deepLink,
          target_channel: "push",
          send_after: sendDate,
        }),
      }
    );

    const result = await response.json();
    if (result.errors) {
      throw new OneSignalException(result.errors[0]);
    }
    return result;
  }
}
