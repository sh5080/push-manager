import {
  CreatePushDto,
  GetRecentPushesDto,
  PushResponse,
  GetScheduledPushesDto,
} from "@push-manager/shared/dtos/push.dto";
import { IPushMasterWithMsg } from "@push-manager/shared/types/entities/pushMaster.entity";
import { IPushStsMsg } from "@push-manager/shared/types/entities/pushStsMsg.entity";
import { validateDto } from "@push-manager/shared/utils/validate.util";
import { BaseAPI } from "./base.api";
import { PaginatedResponse } from "@push-manager/shared";

interface SendPushResponse {
  success: boolean;
  message: string;
  pushId?: string;
}

export class PushAPI extends BaseAPI {
  private static instance: PushAPI;

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

  async getScheduledPushes(
    dto: GetScheduledPushesDto
  ): Promise<PaginatedResponse<IPushMasterWithMsg>> {
    const validatedDto = await validateDto(GetScheduledPushesDto, dto);
    const { page, pageSize } = validatedDto;

    return this.customFetch<PaginatedResponse<IPushMasterWithMsg>>(
      `/api/push/scheduled?page=${page}&pageSize=${pageSize}`
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

  async getPushDetail(idx: string): Promise<IPushStsMsg> {
    return this.customFetch<IPushStsMsg>(`/api/push/detail/${idx}`);
  }

  async sendPush(dto: CreatePushDto): Promise<SendPushResponse> {
    const validatedDto = await validateDto(CreatePushDto, {
      ...dto,
      sendDateString: dto.sendDateString?.replace("T", " "),
    });

    return this.customFetch<SendPushResponse>("/api/push", {
      method: "POST",
      body: JSON.stringify(validatedDto),
    });
  }
}

export const pushApi = PushAPI.getInstance();
