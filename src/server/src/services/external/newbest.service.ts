import spacetime from "spacetime";
import {
  INewBestRes,
  IRetrieveRestMbsCustRes,
  NewBestErrorException,
} from "@push-manager/shared";
import { KISA_SEED_ECB } from "../../utils/kisa-seed";
import { EXT } from "../../configs/app.config";

export class NewbestService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly symmetricKey: string;

  constructor() {
    this.baseUrl = EXT.NEWBEST.ENDPOINTS.prd;
    this.apiKey = EXT.NEWBEST.SECRETS.LGOBSORDERNWBEST.API_KEY;
    this.symmetricKey = EXT.NEWBEST.SECRETS.LGOBSORDERNWBEST.SYMMETRIC_KEY;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          apikey: this.apiKey,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new NewBestErrorException("FDE-C-901,1");
      }

      const cRes = await response.text();
      const pRes = KISA_SEED_ECB.decrypt(
        this.symmetricKey,
        cRes.replace(/\s/g, "")
      );
      const jRes: INewBestRes<T> = JSON.parse(pRes);

      if (jRes.RTN_CD !== "S") {
        throw new NewBestErrorException(
          `FDE-C-901,2 [${jRes.RTN_CD}: ${jRes.RTN_MSG}]`
        );
      }

      return jRes.OutResult[0];
    } catch (error) {
      throw error;
    }
  }

  async getMemberInfo(ci: string): Promise<IRetrieveRestMbsCustRes> {
    const encryptedBody = KISA_SEED_ECB.encrypt(
      this.symmetricKey,
      JSON.stringify({
        P_RQST_FLAG: "LGEA",
        P_USER_NM: "LGEA_USER",
        P_SSN_CI: ci,
      })
    );

    return this.request<IRetrieveRestMbsCustRes>(
      EXT.NEWBEST.APIS.RETRIEVE_REST_MBS_CUST[0],
      {
        method: EXT.NEWBEST.APIS.RETRIEVE_REST_MBS_CUST[1],
        headers: { apikey: EXT.NEWBEST.SECRETS.LGOBSORDERNWBEST.API_KEY },
        body: encryptedBody,
      }
    );
  }

  async getCoupons(memNo: string, type: "P" | "F") {
    const now = spacetime.now("Asia/Seoul");
    const encryptedBody = KISA_SEED_ECB.encrypt(
      this.symmetricKey,
      JSON.stringify({
        IN_ARR_PSET: [
          {
            P_CUST_ID: "",
            P_MBS_CUST_ID: memNo,
            P_COUPON_TYPE: type,
            P_COUPON_NO: "",
            P_USE_YN: "",
            P_USE_ORG_CD: "",
            P_USE_ID: "",
            P_RECEIPT_NO: "",
          },
        ],
      })
    );

    return this.request(EXT.NEWBEST.APIS.RETRIEVE_MOBL_COUP_CUST_ARRAY_NEW[0], {
      method: EXT.NEWBEST.APIS.RETRIEVE_MOBL_COUP_CUST_ARRAY_NEW[1],
      headers: {
        timeStamp: now.unixFmt("yyyyMMddHHmmss"),
      },
      body: encryptedBody,
    });
  }

  // ... 필요한 다른 API 메서드들 추가
}
