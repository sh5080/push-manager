export const StepEnum = {
  PENDING: "R",
  SENDING: "S",
  COMPLETED: "C",
  FAILED: "F",
  RESULT: "T",
} as const;

export const PModeEnum = {
  TARGET: "STOS",
  TARGET_FIRST: "STOE",
  ALL: "DEFT",
  CAMP: "CAMP",
} as const;

export const SendStatEnum = {
  SEND_NOW: "0001",
  SCHEDULED: "0002",
} as const;

export const AndPriorityEnum = {
  MEDIUM: "M",
  HIGH: "H",
} as const;

export const IsEtiquetteEnum = {
  NO: "N",
  YES: "Y",
} as const;

export const OfbTimeEnum = {
  TWO_H: "2h",
  FOUR_H: "4h",
  ONE_D: "1d",
  THREE_D: "3d",
  FIVE_D: "5d",
  ONE_W: "1w",
} as const;

export const OptAgreeEnum = {
  AGREE: "1000",
  DISAGREE: "0000",
} as const;

export const BeschModeEnum = {
  OR: "0001",
  AND: "0002",
} as const;
