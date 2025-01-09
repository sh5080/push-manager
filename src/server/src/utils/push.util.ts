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
} from "@push-manager/shared";
import { CreateBasePushDto } from "../types/push.type";

export function createPushBaseData(
  baseDto: CreateBasePushDto
): Partial<PushQueue> {
  const { dto, campaignCode, sendDate, now } = baseDto;
  return {
    appKey: APP_CONFIG[dto.appId].appId,
    appSecret: APP_CONFIG[dto.appId].appSecret,
    msgTitle: dto.title,
    sendDate: sendDate,
    msgContents: dto.content,
    step: StepEnum.PENDING,
    pMode: PModeEnum.CAMP,
    fName: dto.fname,
    sendStat: SendStatEnum.SEND_NOW,
    pLink: dto.plink || "",
    customKey1: dto.customKey1 === "maskingtext" ? "maskingtext" : "",
    customValue1: dto.customKey1 === "maskingtext" ? dto.customValue1 : "",
    labelCode: dto.labelCode || "",
    bgColor: dto.bgColor || "",
    fontColor: dto.fontColor || "",
    andPriority: dto.andPriority || AndPriorityEnum.MEDIUM,
    isEtiquette: dto.isetIquette || IsEtiquetteEnum.NO,
    etiquetteStime: dto.etiqueStime,
    etiquetteEtime: dto.etiqueEtime,
    ofbTime: OfbTimeEnum.ONE_W,
    optAgree: OptAgreeEnum.AGREE,
    pTag: dto.ptag || "",
    beschMode: dto.beschMode,
    wDate: now,
    uDate: now,
    cmpnCode: campaignCode,
  };
}
