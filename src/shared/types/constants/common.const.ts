export const PushTypeEnum = {
  TARGET: 0,
  ALL: 1,
} as const;

export const AppIdEnum = {
  FREED: 0,
  TEST: 1,
  PROD: 2,
} as const;

export const TeamIdEnum = {
  FREED: 0,
  LG: 1,
} as const;

export const SortBy = {
  CREATED_AT: "createdAt",
  UPDATED_AT: "updatedAt",
} as const;

export const SortOption = {
  LATEST: 0,
  NAME: 1,
} as const;

export type SortOptionType = (typeof SortOption)[keyof typeof SortOption];

export const Order = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type OrderType = (typeof Order)[keyof typeof Order];

export const MemberGrade = {
  Bronze: "AS05",
  Silver: "AS04",
  Gold: "AS03",
  Platinum: "AS02",
  Diamond: "AS01",
  DiamondBlack: "AS00",
} as const;

export const GradeName = {
  AS05: "브론즈",
  AS04: "실버",
  AS03: "골드",
  AS02: "플래티넘",
  AS01: "다이아몬드",
  AS00: "다이아몬드 블랙",
} as const;

export const ButtonText = {
  EXCEL_DOWNLOAD: "엑셀 다운로드",
  DOWNLOAD_LOADING: "다운로드 중...",
} as const;

export type ButtonTextType = (typeof ButtonText)[keyof typeof ButtonText];
