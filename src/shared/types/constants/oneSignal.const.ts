export const OneSignalOutcomeName = {
  CLICK: "os__click",
  CONFIRMED_DELIVERY: "os__confirmed_delivery",
  SESSION_DURATION: "os__session_duration",
};

export const OneSignalOutcomeAggregation = {
  COUNT: "count",
  SUM: "sum",
};

export const OneSignalTimeRange = {
  ONE_HOUR: "1h",
  ONE_DAY: "1d",
  ONE_MONTH: "1mo",
};

export const OneSignalPlatform = {
  IOS: "0",
  ANDROID: "1",
  FIRE_OS: "2",
  CHROME: "5",
  FIREFOX: "8",
  EMAIL: "11",
  SMS: "14",
  SAFARI: "17",
};

export const OneSignalAttribution = {
  DIRECT: "direct",
  INFLUENCED: "influenced",
  UNATTRIBUTED: "unattributed",
  TOTAL: "total",
};

export type OneSignalOutcomeNameType =
  (typeof OneSignalOutcomeName)[keyof typeof OneSignalOutcomeName];
export type OneSignalOutcomeAggregationType =
  (typeof OneSignalOutcomeAggregation)[keyof typeof OneSignalOutcomeAggregation];
export type OneSignalTimeRangeType =
  (typeof OneSignalTimeRange)[keyof typeof OneSignalTimeRange];
export type OneSignalPlatformType =
  (typeof OneSignalPlatform)[keyof typeof OneSignalPlatform];
export type OneSignalAttributionType =
  (typeof OneSignalAttribution)[keyof typeof OneSignalAttribution];

export type PushType = "AndroidPush" | "iOSPush";
