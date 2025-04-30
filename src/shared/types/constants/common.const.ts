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

export const memberGrade = {
  AS05: "AS05",
  AS04: "AS04",
  AS03: "AS03",
  AS02: "AS02",
  AS01: "AS01",
  AS00: "AS00",
} as const;