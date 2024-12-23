import {
  CreatePushDto,
  GetRecentPushesDto,
  PushResponse,
} from "@push-manager/shared/dtos/push.dto";
import { IPushStsMsg } from "@push-manager/shared/types/entities/pushStsMsg.entity";
import { validateDto } from "@push-manager/shared/utils/validate.util";
import { BaseAPI } from "./base.api";

interface SendPushResponse {
  success: boolean;
  message: string;
  pushId?: string;
}

export class PushAPI extends BaseAPI {
  private static instance: PushAPI;

  private constructor() {
    super();
  }

  public static getInstance(): PushAPI {
    if (!PushAPI.instance) {
      PushAPI.instance = new PushAPI();
    }
    return PushAPI.instance;
  }

  async getRecentPushes(dto: GetRecentPushesDto): Promise<IPushStsMsg[]> {
    const validatedDto = await validateDto(GetRecentPushesDto, dto);
    const { limit, targetMode } = validatedDto;

    return this.customFetch<IPushStsMsg[]>(
      `/api/push/recent?limit=${limit}&targetMode=${targetMode}`
    );
  }

  async getPushHistory(
    page: number = 1,
    limit: number = 10
  ): Promise<PushResponse> {
    return this.customFetch<PushResponse>(
      `/api/push/history?page=${page}&limit=${limit}`
    );
  }

  async getPushStats() {
    return this.customFetch<any>("/api/push/stats");
  }

  async sendPush(dto: CreatePushDto): Promise<SendPushResponse> {
    await validateDto(CreatePushDto, dto);
    const formData = new FormData();

    if (dto.identifyArray) {
      formData.append("identifyArray", dto.identifyArray.join("\n"));
    }
    if (dto.fname) {
      formData.append("imageUrl", dto.fname);
    }
    formData.append("title", dto.title);
    formData.append("content", dto.content);

    return this.customFetch<SendPushResponse>("/api/push", {
      method: "POST",
      body: formData,
    });
  }
}
