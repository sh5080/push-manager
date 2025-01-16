import {
  CreateIdentifyDto,
  GetIdentifiesDto,
  UpdateIdentifyDto,
} from "@push-manager/shared/dtos/identify.dto";
import { validateDto } from "@push-manager/shared/utils/validate.util";
import { BaseAPI } from "./base.api";
import { ITestIdentify } from "@push-manager/shared/types/entities/testIdentify.entity";

class IdentifyAPI extends BaseAPI {
  // 식별자 목록 조회
  async getIdentifies(dto: GetIdentifiesDto): Promise<ITestIdentify[]> {
    const validatedDto = await validateDto(GetIdentifiesDto, dto);
    const queryParams = new URLSearchParams();

    if (validatedDto.teamId) {
      queryParams.append("teamId", validatedDto.teamId.toString());
    }
    if (validatedDto.appId) {
      queryParams.append("appId", validatedDto.appId.toString());
    }

    return this.customFetch<ITestIdentify[]>(
      `/api/identify?${queryParams.toString()}`
    );
  }

  // 식별자 생성
  async createIdentify(dto: CreateIdentifyDto): Promise<ITestIdentify> {
    const validatedDto = await validateDto(CreateIdentifyDto, dto);

    return this.customFetch<ITestIdentify>("/api/identify", {
      method: "POST",
      body: JSON.stringify(validatedDto),
    });
  }

  // 식별자 수정
  async updateIdentify(dto: UpdateIdentifyDto): Promise<ITestIdentify> {
    const validatedDto = await validateDto(UpdateIdentifyDto, dto);

    return this.customFetch<ITestIdentify>(
      `/api/identify/${validatedDto.idx}`,
      {
        method: "PATCH",
        body: JSON.stringify(validatedDto),
      }
    );
  }

  // 식별자 삭제
  async deleteIdentify(idx: number): Promise<void> {
    return this.customFetch<void>(`/api/identify/${idx}`, {
      method: "DELETE",
    });
  }
}

export const identifyApi = new IdentifyAPI();
