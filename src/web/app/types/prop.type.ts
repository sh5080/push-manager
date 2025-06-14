export type ButtonVariant =
  | "line"
  | "point"
  | "red-point"
  | "green-point"
  | "blue-point"
  | "blue-solid"
  | "solid"
  | "square-line"
  | "square-point"
  | "square-red"
  | "square-green"
  | "square-green-transparent"
  | "square-solid";

export type ButtonSize = "32" | "38" | "46";

export type PositionType = "top" | "right" | "bottom" | "left" | "center";

export type StatusChipType = "master" | "message";

export type StepEnumType = 0 | 1 | 2 | 3 | 4 | 5;

export type DeviceType = "A" | "I";

export type StatKey = "sent" | "opened" | "failed" | "appdel";

export type MemberSearchType = "memNo" | "ci" | "phoneNumber";

export type MaintenanceModeType = "create" | "edit";

export type PushType = "oneSignal" | "fingerPush";

export interface MaintenanceFormData {
  description: string;
  noticeAt: string;
  startAt: string;
  endAt: string;
  isActive: boolean;
}

export interface TableHeader {
  key: string;
  label: string;
  sortable?: boolean;
}
