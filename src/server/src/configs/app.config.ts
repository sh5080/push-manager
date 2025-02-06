import { envConfig, AppIdEnum } from "@push-manager/shared";

const { keyFreed, keyFreed2, keyPrd, secretFreed, secretFreed2, secretPrd } =
  envConfig.push;

export const APP_CONFIG = {
  [AppIdEnum.FREED]: {
    appId: keyFreed,
    appSecret: secretFreed,
  },
  [AppIdEnum.TEST]: {
    appId: keyFreed2,
    appSecret: secretFreed2,
  },
  [AppIdEnum.PROD]: {
    appId: keyPrd,
    appSecret: secretPrd,
  },
} as const;

export const REX = {
  PASSWORD:
    /^(?!.*(.)\1{2})(?:(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}|(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}|(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}|(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}|(?=.*[A-Z])(?=.*[a-z]).{10,}|(?=.*[A-Z])(?=.*\d).{10,}|(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{10,}|(?=.*[a-z])(?=.*\d).{10,}|(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{10,}|(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{10,})$/,
  REX_VEHICLE_NO:
    /(^[0-9]{2,3}-[가-힣]-[0-9]{4}$)|(^(서울|부산|대구|인천|광주|대전|울산|세종|강원|경기|경남|경북|전남|전북|충남|충북|제주) [0-9]{2}-[가-힣]-[0-9]{4}$)/,
};

export const CONST = {
  STATIC_BUCKET_NAME: {
    dev: "static-int-dev.membership.lge.co.kr",
    stg: "static-int-stg.membership.lge.co.kr",
    prd: "static-int.membership.lge.co.kr",
    freed: "ex-mono-static.travelflan.com",
  },
  STATIC_URL: {
    dev: "https://static-dev.membership.lge.co.kr",
    stg: "https://static-stg.membership.lge.co.kr",
    prd: "https://static.membership.lge.co.kr",
    freed: "https://ex-mono-static.travelflan.com",
  },
  PLATFORM: {
    IOS: {
      BUNDLE_ID: {
        dev: "kr.co.lge.lgemma.dev",
        stg: "kr.co.lge.lgemma.stg",
        prd: "kr.co.lge.lgemma",
        freed: "kr.co.lge.lgemma.freed",
      },
      TEAM_ID: "5SKT5H4CPQ",
    },
    ANDROID: {
      PACKAGE_NAME: {
        dev: "com.lge.lgemembership.dev",
        stg: "com.lge.lgemembership.stg",
        prd: "com.lge.lgemembership",
        freed: "com.lge.lgemembership.freed",
      },
    },
  },
};
export const EXT = {
  ACCOUNT: {
    // 한영본
    ENDPOINTS: {
      dev: "https://accountdev.lge.co.kr",
      stg: "https://accountstg.lge.co.kr",
      prd: "https://account.lge.co.kr",
      freed: "https://freed-account.ngrok.dev",
    },
    APIS: {
      SESSION_SSO: ["/api/session/sso", "POST"], // 회원세션 SSO 발급 (인증)
      SESSION_GET: ["/api/session/get", "GET"], // 회원세션 조회 (인증)
      SESSION_REFRESH: ["/api/session/refresh", "POST"], // 회원세션 Token 갱신 (인증)
      SESSION_CHECK: ["/api/session/check", "POST"], // 회원세션 유효성 체크 (인증)
      MEMBER_GET: ["/api/member/get", "GET"], // 회원 조회
      GET_AGREE_MKT: ["/api/terms/getAgreeMKT", "GET"], // 마케팅 약관 조회
      AGREE_MKTS: ["/api/terms/agreeMKTs", "POST"], // 마케팅 약관 일괄 동의 (인증)
      GET_AGREE_LBS: ["/api/terms/getAgreeLBS", "GET"], // 위치정보 약관 조회
      AGREE_LBS: ["/api/terms/agreeLBS", "POST"], // 위치정보 약관 동의 (인증)
      USE_LBS: ["/api/terms/useLBS", "POST"], // 위치정보 사용 동의
    },
    SECRETS: {
      X_LG_CLIENT_ID: "lgmbr-main-app",
      X_LG_CLIENT_SECRET: {
        dev: "8V2PbeD7-5VNl-UECBf-fpUQ-Goyviu6Pnf2J",
        stg: "ThIJtLAS-6HRC-wo6ff-j8eH-pn0cIuP3VW3A",
        prd: "qvB2wu7b-D3at-rxswZ-f6f1-Mg89qZx4hxpO",
        freed: "ThIJtLAS-6HRC-wo6ff-j8eH-pn0cIuP3VW3A",
      },
      AES: {
        FRONT: ["!1_lgekor_fro_member@account.lge", "!1_lgekor_fro_me"],
        API: ["!2_lgekor_api_member@account.lge", "!2_lgekor_api_me"],
      },
      OAUTH2_BACKEND_URL: {
        dev: "https%3A%2F%2Fqa-kr.lgeapi.com%2F",
        stg: "https%3A%2F%2Fqa-kr.lgeapi.com%2F",
        prd: "https%3A%2F%2Fkr.lgeapi.com%2F",
        freed: "https%3A%2F%2Fqa-kr.lgeapi.com%2F",
      },
    },
  },
  NEWBEST: {
    // 뉴베스트
    ENDPOINTS: {
      dev: "http://10.185.217.196:8180",
      stg: "http://qanewbest.lge.com",
      prd: "https://newbest.lge.com",
      freed: "https://freed-newbest.ngrok.dev",
    },
    APIS: {
      RETRIEVE_REST_MBS_CUST: ["/mbsmgt/retrieveRestMbsCust.do", "POST"], // 멤버십 고객정보 조회
      RETRIEVE_MOBL_COUP_CUST_ARRAY_NEW: [
        "/mbsmgt/retrieveMoblCoupCustArrayNew.do",
        "POST",
      ], // 멤버십 주차쿠폰, 무상이전쿠폰 조회
      RETRIEVE_OBS_USER_MBS_COUPON_LIST: [
        "/obs/retrieveOBSUserMbsCouponList.do",
        "POST",
      ], // 멤버십 회원등급 쿠폰 조회
      INSERT_CUST_ACT: ["/mbsapp/insertCustAct.do", "POST"], // 장소 진입 (와이파이 위치정보 기반) 고객 위치정보 전송, SEED X
      REQ_MBS_POINT_IF: ["/lbst/reqmbspointif.do", "POST"], // 멤버십 포인트 사용이력 조회
      SAVE_PRESENT_POINT: ["/bestshop/savePresentPoint.do", "POST"], // 멤버십 포인트 선물
      SAVE_APP_COUPON_CUST: ["/bestshop/saveAppCouponCust.do", "POST"], // 앱 쿠폰 저장
    },
    SECRETS: {
      LGOBSORDERNWBEST: {
        API_KEY: "+IkPXLidYYi9nGhmcdKmD+lBxmB6JceZoFP3BokrGp8=",
        SYMMETRIC_KEY: btoa("LGOBSORDERNWBEST"),
      },
      REPRESENTFORBEST: {
        API_KEY: "siknvOJgpghF0UgqhW+Dh+lBxmB6JceZoFP3BokrGp8=",
        SYMMETRIC_KEY: btoa("REPRESENTFORBEST"),
      },
    },
  },
  NEWCRM: {
    // 뉴CRM
    ENDPOINTS: {
      dev: "https://dev-apigw-ext.lge.com:7221",
      stg: "https://dev-apigw-ext.lge.com:7221",
      prd: "https://apigw-ext.lge.com:7211",
      freed: "https://dev-apigw-ext.lge.com:7221",
    },
    APIS: {
      GET_CRM_VIP_CUST_BUY_SALES_SUPPORT: [
        "/gateway/newcrm/api2db/getCrmVipCustBuySalesSupport",
        "POST",
      ], // 제품 구매내역 조회
      GET_CRM_VIP_AF_SERVICE_SALES_SUPPORT: [
        "/gateway/newcrm/api2db/getCrmVipAfServiceSalesSupport",
        "POST",
      ], // 3년 무상서비스 대상제품 조회
    },
    SECRETS: {
      X_GATEWAY_APIKEY: "27637da3-4210-4627-af72-3044cb13aa02",
    },
  },
  CSMS: {
    // CSMS
    ENDPOINTS: {
      dev: "http://devcsms.lge.com",
      stg: "http://qacsms.lge.com:83",
      prd: "https://csms.lge.com:447",
      freed: "https://freed-csms.ngrok.dev",
    },
    APIS: {
      BRS_XRMCS_IF_RETRIEVEALLCONTLIST_WSP: ["/rest/api/cs/cont.do", "POST"], // 고객계약 조회
      BRS_XRMCS_IF_RETRIEVESIMPLECONTLIST_WSP: [
        "/rest/api/cs/cont-simple.do",
        "POST",
      ], // 고객계약 간략조회
      BRS_XRMCS_IF_RETRIEVEALLCONTDETAILLIST_WSP: [
        "/rest/api/cs/cont-dtl.do",
        "POST",
      ], // 고객계약 상세조회
      BRS_XRMVI_WS_RETRIEVECUSTOMERVISITHISLIST: [
        "/rest/api/vi/schedule.do",
        "POST",
      ], // 방문일정 조회
      BRS_XRMBI_IF_RECEIPTINFO_WSP: ["/rest/api/bi/bill.do", "POST"], // 수금정보 조회
    },
    SECRETS: {
      X_CSMS_CLIENT_ID: "MEMAPP",
      CSMS_ENC_SECUKEY: "2021_MEMBER_APP!",
    },
  },
};
