export interface IPushStsMsgDetail {
  sent: number;
  failed: number;
  opened: number;
  deviceType: string;
  appdel: number;
}

export interface IPushStsMsgResult {
  idx: string;
  msgIdx: string;
  result: string;
  resultMsg: string;
  senddate: string;
  opened: number;
  deviceType: string;
  tokenIdx: string;
}
