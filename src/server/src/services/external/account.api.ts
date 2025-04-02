import {
  IAccountRes,
  IMemberGetRes,
  NewBestException,
} from "@push-manager/shared";

import { EXT } from "../../configs/app.config";
import { base64ToUtf8, utf8ToBase64 } from "../../utils/crypto.util";
export class AccountApi {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = EXT.ACCOUNT.ENDPOINTS.prd;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const pRes = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
        },
      });

      const jRes: IAccountRes<string> = await pRes.json();
      if (jRes.resultCode !== "000") {
        throw new NewBestException(
          `FDE-C-901,2 [${jRes.resultCode}: ${jRes.resultMsg}]`
        );
      }
      const jResData: IMemberGetRes = JSON.parse(base64ToUtf8(jRes.data));
      return jResData as T;
    } catch (error) {
      throw error;
    }
  }

  async getMemberInfo(ci: string): Promise<IMemberGetRes> {
    const base64Payload = utf8ToBase64(JSON.stringify({ ci }));
    return await this.request<IMemberGetRes>(
      `${EXT.ACCOUNT.APIS.MEMBER_GET[0]}?${base64Payload}`,
      {
        method: EXT.ACCOUNT.APIS.MEMBER_GET[1],
        headers: {
          X_LG_CLIENT_ID: EXT.ACCOUNT.SECRETS.X_LG_CLIENT_ID,
          X_LG_CLIENT_SECRET: EXT.ACCOUNT.SECRETS.X_LG_CLIENT_SECRET.prd,
        },
      }
    );
  }
}
