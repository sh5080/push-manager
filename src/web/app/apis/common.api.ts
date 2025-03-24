import { PresignedUrlDto } from "@push-manager/shared/dtos/common.dto";
import { validateDto } from "@push-manager/shared/utils/validate.util";
import { BaseAPI } from "./base.api";
import { IPresignedUrl } from "@push-manager/shared/types/entities/common.entity";

class CommonAPI extends BaseAPI {
  async getPresignedUrl(dto: PresignedUrlDto): Promise<IPresignedUrl> {
    const validatedDto = await validateDto(PresignedUrlDto, dto);
    const { fileName, path, contentType } = validatedDto;
    return await this.customFetch<IPresignedUrl>(
      `/api/image/presigned-url?fileName=${fileName}&path=${path}&contentType=${contentType}`
    );
  }
}
export const commonApi = new CommonAPI();
