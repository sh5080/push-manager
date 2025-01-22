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
import { Optional } from "sequelize";
import { TblFpQueueCreationAttributes } from "../models/TblFpQueue";

export function createPushBaseData(
  baseDto: CreateBasePushDto
): Optional<TblFpQueueCreationAttributes, "queueidx"> {
  const { dto, campaignCode, sendDate, now } = baseDto;
  return {
    appkey: APP_CONFIG[dto.appId].appId,
    appsecret: APP_CONFIG[dto.appId].appSecret,
    msgtitle: dto.title,
    senddate: sendDate,
    msgcontents: dto.content,
    step: StepEnum.PENDING,
    pmode: PModeEnum.CAMP,
    fname: dto.fname,
    sendStat: SendStatEnum.SEND_NOW,
    plink: dto.plink || "",
    customKey1: dto.customKey1 === "maskingtext" ? "maskingtext" : "",
    customValue1: dto.customKey1 === "maskingtext" ? dto.customValue1 : "",
    labelCode: dto.labelCode || "",
    bgcolor: dto.bgColor || "",
    fontcolor: dto.fontColor || "",
    andPriority: dto.andPriority || AndPriorityEnum.MEDIUM,
    isetiquette: dto.isetIquette || IsEtiquetteEnum.NO,
    etiquetteStime: dto.etiqueStime,
    etiquetteEtime: dto.etiqueEtime,
    ofbTime: OfbTimeEnum.ONE_W,
    optagree: OptAgreeEnum.AGREE,
    ptag: dto.ptag || "",
    beschmode: dto.beschMode,
    wdate: now,
    udate: now,
    cmpncode: campaignCode,
    androidBadge: 0,
    androidSound: "default",
    iosBadge: 0,
    iosSound: "default",
  };
}
