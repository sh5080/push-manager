import {
  CreatePushDto,
  GetRecentPushesDto,
  GetScheduledPushesDto,
  GetPushQueuesDto,
  AddToQueueDto,
  ConfirmPushQueueDto,
  GetTargetPushesDto,
} from "@push-manager/shared/dtos/push.dto";
import { IPushMasterWithMsg } from "@push-manager/shared/types/entities/pushMaster.entity";
import { IPushStsMsg } from "@push-manager/shared/types/entities/pushStsMsg.entity";
import { validateDto } from "@push-manager/shared/utils/validate.util";
import { BaseAPI } from "./base.api";
import {
  IPushMaster,
  IPushQueue,
  PaginatedResponse,
} from "@push-manager/shared";

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

  async getTargetPushes(
    dto: GetTargetPushesDto
  ): Promise<PaginatedResponse<IPushStsMsg>> {
    const validatedDto = await validateDto(GetTargetPushesDto, dto);
    const { page, pageSize, targetMode, startDate, endDate, step } =
      validatedDto;
    return this.customFetch<PaginatedResponse<IPushStsMsg>>(
      `/api/push?page=${page}&pageSize=${pageSize}&targetMode=${targetMode}&startDate=${startDate}&endDate=${endDate}&step=${step}`
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

  async getPushQueues(
    dto: GetPushQueuesDto
  ): Promise<PaginatedResponse<IPushQueue>> {
    const validatedDto = await validateDto(GetPushQueuesDto, dto);
    const { cmpncode, page, pageSize } = validatedDto;

    return this.customFetch<PaginatedResponse<IPushQueue>>(
      `/api/push/queue/${cmpncode}?page=${page}&pageSize=${pageSize}`
    );
  }

  async addToQueue(dto: AddToQueueDto): Promise<void> {
    const validatedDto = await validateDto(AddToQueueDto, dto);
    const { cmpncode } = validatedDto;

    return this.customFetch<void>(`/api/push/queue/${cmpncode}`, {
      method: "POST",
      body: JSON.stringify(validatedDto),
    });
  }

  async confirmScheduledPush(dto: ConfirmPushQueueDto): Promise<IPushMaster> {
    const validatedDto = await validateDto(ConfirmPushQueueDto, dto);

    return this.customFetch<IPushMaster>(`/api/push/queue/confirm`, {
      method: "PATCH",
      body: JSON.stringify(validatedDto),
    });
  }
}

export const pushApi = PushAPI.getInstance();
