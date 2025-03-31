import { BaseAPI } from "../base.api";
import { LoginDto } from "@push-manager/shared/dtos/admin/auth.dto";
import { validateDto } from "@push-manager/shared/utils/validate.util";
import { IAdmin } from "@push-manager/shared";

class AuthAPI extends BaseAPI {
  async login(dto: LoginDto): Promise<IAdmin> {
    const validatedDto = await validateDto(LoginDto, dto);

    return await this.customFetch<IAdmin>(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(validatedDto),
    });
  }
}

export const authApi = new AuthAPI();
