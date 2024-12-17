export interface ExcelResult {
  messageData: MessageData;
  identifyArray: string[];
}

export interface MessageData {
  msgTitle: string;
  msgContents: string;
}

export interface PushResultStats {
  totalCount: number;
  resultCounts: { result: string; count: number }[];
  missingCount: number;
}
