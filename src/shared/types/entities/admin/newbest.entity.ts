export interface IAccountRes<T> {
  resultCode: string;
  resultMsg: string;
  data: T;
}

export interface ISessionSsoRes {
  empMbrNo: string;
  empUsrId: string;
  empUsrIdTp:
    | "LGE"
    | "LGP"
    | "MYLG"
    | "KKO"
    | "NAV"
    | "GGL"
    | "APPL"
    | "FBK"
    | "AMZ"
    | "LINE";
  empDispUsrId: string;
  accessToken: string;
  refreshToken: string;
  unifyId: string;
}

export interface ISessionRefreshRes {
  accessToken: string;
  refreshToken: string;
  oauth2BackendUrl: string;
  unifyId: string;
}

export interface ISessionCheckRes {
  unifyId: string;
}

export interface IMemberGetRes {
  unifyId: string;
  ci: string;
  eml?: string;
  cphn: string;
  mbrNm?: string;
  memNo: string;
}

export interface INewBestRes<T> {
  RTN_CD: string;
  RTN_MSG: string;
  OutResult: T;
}

export interface IRetrieveRestMbsCustRes {
  CUST_NO: string;
  CUST_NM: string;
  MBS_CUST_ID: string;
  MBS_CARD_NO: string;
  LGE_CUST_GRD_CD: "AS05" | "AS04" | "AS03" | "AS02" | "AS01" | "AS00";
  LGE_CUST_GRD_NM: string;
  LGE_CUST_GRD_NM_DISP: string;
  CUST_GRD_ST_DATE: string;
  CUST_GRD_ED_DATE: string;
  TEL_NO1?: string;
  TEL_NO2?: string;
  TEL_DDD?: string;
  POST_CD?: string;
  SMS_RCV_YN?: "Y" | "N";
  ADDR1?: string;
  ADDR2?: string;
  ADDR3?: string;
  SIGNATURE_MDL_PUR_CUST_YN?: "Y" | "N";
  SEX?: "M" | "F";
  EMAIL_RCV_YN?: "Y" | "N";
  BIRTHDAY_DATE?: string;
  REMAIN_POINT?: number;
  DM_RCV_YN?: "Y" | "N";
  EMAIL_ID?: string;
  MOBILE_NO1?: string;
  MOBILE_NO2?: string;
  MOBILE_DDD?: string;
  TM_RCV_YN?: "Y" | "N";
  PI_MOTION_YN?: "Y" | "N";
}

export interface IRetrieveMoblCoupCustArrayNewRes {
  COUPON_NO: string;
  COUPON_ID: string;
  COUPON_NM: string;
  COUPON_TYPE: "P" | "F";
  MBS_CUST_ID: string;
  CUST_NO: string;
  CUST_NM: string;
  USE_YN: "Y" | "N";
  USE_DT: string;
  USE_ORG_CD: string;
  USE_ID: string;
  BAS_YM: string;
  COUPON_ST_DT: string;
  COUPON_ED_DT: string;
  GRD_CD: "AS05" | "AS04" | "AS03" | "AS02" | "AS01" | "AS00";
  GRD_ST_DT: string;
  GRD_ED_DT: string;
}

export interface INewBestObsRes<T> {
  ERR_CODE: string;
  ERR_MSG: string;
  OUTPUT: T[];
}

export interface IRetrieveObsUserMbsCouponListRes {
  COUPON_NO: string;
  COUPON_NM: string;
  COUPON_TYPE: "RATE" | "PRICE";
  COUPON_AMT: number;
  COUPON_AMT_MIN: number;
  COUPON_AMT_MAX: number;
  START_DATE_TIME: string;
  END_DATE_TIME: string;
  USE_YN: "Y" | "N";
  USE_DT?: string;
  USE_NO?: string;
  USE_ONLINE_YN?: "Y" | "N";
  ITEMLIST?: string;
}

export interface INewBestSimpleRes {
  errCode: string;
  errMsg: string;
}
