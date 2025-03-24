import { OneSignalException } from "@push-manager/shared";
import { pushConfig } from "../../configs/push.config";
import { OneSignalResponse } from "../../types/push.type";
import {
  OneSignalOutcomeResult,
  OneSignalAttribution,
  OneSignalPlatform,
  OneSignalTimeRange,
  OneSignalTimeRangeType,
  OneSignalPlatformType,
  OneSignalAttributionType,
  OneSignalOutcomeNameType,
  OneSignalOutcomeAggregationType,
} from "@push-manager/shared/types/constants/oneSignal.const";

export class OneSignalApi {
  private readonly apiKey: string;
  private readonly appId: string;

  constructor() {
    this.apiKey = pushConfig.oneSignal.apiKey;
    this.appId = pushConfig.oneSignal.appId;
  }
  private async requestFetch(url: string, options: RequestInit) {
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.errors) {
      throw new OneSignalException(result.errors[0], response.status);
    }
    return result;
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
    const url = "https://api.onesignal.com/notifications?c=push";
    const options = {
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
    };
    return await this.requestFetch(url, options);
  }

  /**
   * OneSignal View Outcomes API를 통해 푸시 알림 성과 지표 조회
   * @param outcomeNames 조회할 성과 지표 이름 (예: "os__click", "os__session_duration")
   * @param timeRange 시간 범위 (예: "1d", "7d", "30d")
   * @param platforms 플랫폼 (예: "0" - iOS, "1" - Android)
   * @param attribution 귀속 모델 (예: "direct", "influenced", "all")
   */
  async getOutcomes(
    outcomeNames: string[],
    timeRange: OneSignalTimeRangeType = OneSignalTimeRange.ONE_MONTH,
    platforms: OneSignalPlatformType[] = [
      OneSignalPlatform.IOS,
      OneSignalPlatform.ANDROID,
    ],
    attribution: OneSignalAttributionType = OneSignalAttribution.TOTAL
  ): Promise<OneSignalOutcomeResult> {
    const url = `https://api.onesignal.com/apps/${
      this.appId
    }/outcomes?outcome_names=${outcomeNames.join(
      ","
    )}&outcome_time_range=${timeRange}&outcome_platforms=${platforms.join(
      ","
    )}&outcome_attribution=${attribution}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Key ${this.apiKey}`,
      },
    };

    return await this.requestFetch(url, options);
  }

  /**
   * 기본 Outcome 이름과 집계 타입을 조합하여 완전한 Outcome 이름 생성
   * @param name Outcome 이름
   * @param aggregation 집계 타입
   * @returns 완전한 Outcome 이름 (예: "os__click.count")
   */
  static formatOutcomeName(
    name: OneSignalOutcomeNameType | string,
    aggregation: OneSignalOutcomeAggregationType
  ): string {
    return `${name}.${aggregation}`;
  }

  async getCsv(notificationId: string): Promise<string> {
    const url = `https://api.onesignal.com/notifications/${notificationId}/export_events?app_id=${this.appId}`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Key ${this.apiKey}`,
        "content-type": "application/json",
      },
    };
    return await this.requestFetch(url, options);
  }
  async getMessage(notificationId: string): Promise<string> {
    const url = `https://api.onesignal.com/notifications/${notificationId}?app_id=${this.appId}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Key ${this.apiKey}`,
        "content-type": "application/json",
      },
    };
    return await this.requestFetch(url, options);
  }
  async createTemplate(name: string, contents: string): Promise<string> {
    const url = `https://api.onesignal.com/templates`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Key ${this.apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        headings: { en: "제목" },
        subtitle: { en: "부제목" },
        contents: { en: contents },
        app_id: this.appId,
      }),
    };
    return await this.requestFetch(url, options);
  }
  async createUser(externalId: string): Promise<string> {
    const url = `https://api.onesignal.com/apps/${this.appId}/users`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          language: "en",
          timezone_id: "Asia/Seoul",
          country: "KR",
        },
        identity: { external_id: externalId },
      }),
    };

    return await this.requestFetch(url, options);
  }
  async getUser(): Promise<string> {
    const url = `https://api.onesignal.com/apps/${this.appId}/users/by/external_id/1009624565`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Key ${this.apiKey}`,
      },
    };

    return await this.requestFetch(url, options);
  }
  async createSubscription(
    type: "AndroidPush" | "iOSPush",
    externalId: string,
    token: string
  ): Promise<string> {
    const url = `https://api.onesignal.com/apps/${this.appId}/users/by/external_id/${externalId}/subscriptions`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Key ${this.apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        subscription: {
          type: type,
          token: token,
        },
      }),
    };

    return await this.requestFetch(url, options);
  }
}
