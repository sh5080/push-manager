import { z } from "zod";

export const pushSchema = z.object({
  MSGTITLE: z
    .string()
    .min(1, "제목을 입력해주세요")
    .max(100, "제목은 100자를 초과할 수 없습니다"),

  MSGCONTENTS: z
    .string()
    .min(1, "내용을 입력해주세요")
    .max(1000, "내용은 1000자를 초과할 수 없습니다"),

  SENDDATE: z.string().min(1, "발송일시를 선택해주세요"),

  PMODE: z.enum(["CAMP", "DEFT"], {
    required_error: "발송 유형을 선택해주세요",
  }),

  SEND_STAT: z.enum(["0001", "0002"]).default("0001"),

  APPKEY: z.string().default(process.env.PUSH_APP_KEY || ""),

  APPSECRET: z.string().default(process.env.PUSH_APP_SECRET || ""),

  // 선택적 필드들
  FNAME: z.string().optional(),
  PLINK: z.string().optional(),
  CUSTOM_KEY_1: z.string().optional(),
  CUSTOM_VALUE_1: z.string().optional(),
  CUSTOM_KEY_2: z.string().optional(),
  CUSTOM_VALUE_2: z.string().optional(),
  CUSTOM_KEY_3: z.string().optional(),
  CUSTOM_VALUE_3: z.string().optional(),
  LABEL_CODE: z.string().optional(),
  BGCOLOR: z.string().optional(),
  FONTCOLOR: z.string().optional(),
  AND_PRIORITY: z.enum(["M", "H"]).optional(),
  ISETIQUETTE: z.enum(["N", "Y"]).optional(),
  ETIQUETTE_STIME: z.number().optional(),
  ETIQUETTE_ETIME: z.number().optional(),
  OFB_TIME: z.enum(["2h", "4h", "1d", "3d", "5d", "1w"]).optional(),
  OPTAGREE: z.enum(["1000", "0000"]).default("1000"),
  PTAG: z.string().optional(),
  BESCHMODE: z.enum(["0001", "0002"]).optional(),
});

export type PushFormData = z.infer<typeof pushSchema>;

export interface PushStats {
  todayCount: number;
  monthlyCount: number;
  successRate: number;
}

export interface RecentPush {
  QUEUEIDX: number;
  MSGTITLE: string;
  MSGCONTENTS: string;
  SENDDATE: string;
  PMODE: string;
  STEP: string;
  TOTAL_COUNT: number;
  SUCCESS_COUNT: number;
}
