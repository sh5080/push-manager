import { PushQueue } from "../entities/pushQueue.entity";
import { APP_CONFIG } from "../configs/app.config";
import {
  AndPriorityEnum,
  IsEtiquetteEnum,
  OfbTimeEnum,
  OptAgreeEnum,
  PModeEnum,
  SendStatEnum,
  StepEnum,
} from "@push-manager/shared/types/constants/pushQueue.const";
import { CreateBasePushDto } from "../types/push.type";

export function createPushBaseData(
  baseDto: CreateBasePushDto
): Partial<PushQueue> {
  const { dto, campaignCode, sendDate, now } = baseDto;
  return {
    APPKEY: APP_CONFIG[dto.appId].appId,
    APPSECRET: APP_CONFIG[dto.appId].appSecret,
    MSGTITLE: dto.title,
    SENDDATE: sendDate,
    MSGCONTENTS: dto.content,
    STEP: StepEnum.PENDING,
    PMODE: PModeEnum.CAMP,
    FNAME: dto.fname,
    SEND_STAT: SendStatEnum.SEND_NOW,
    PLINK: dto.plink || "",
    CUSTOM_KEY_1: dto.customKey1 === "maskingtext" ? "maskingtext" : "",
    CUSTOM_VALUE_1: dto.customKey1 === "maskingtext" ? dto.customValue1 : "",
    LABEL_CODE: dto.labelCode || "",
    BGCOLOR: dto.bgColor || "",
    FONTCOLOR: dto.fontColor || "",
    AND_PRIORITY: dto.andPriority || AndPriorityEnum.MEDIUM,
    ISETIQUETTE: dto.isetIquette || IsEtiquetteEnum.NO,
    ETIQUETTE_STIME: dto.etiqueStime,
    ETIQUETTE_ETIME: dto.etiqueEtime,
    OFB_TIME: OfbTimeEnum.ONE_W,
    OPTAGREE: OptAgreeEnum.AGREE,
    PTAG: dto.ptag || "",
    BESCHMODE: dto.beschMode,
    WDATE: now,
    UDATE: now,
    CMPNCODE: campaignCode,
  };
}
