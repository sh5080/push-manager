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
): Optional<TblFpQueueCreationAttributes, "queueIdx"> {
  const { dto, campaignCode, sendDate, now } = baseDto;
  return {
    appKey: APP_CONFIG[dto.appId].appId,
    appSecret: APP_CONFIG[dto.appId].appSecret,
    msgTitle: dto.title,
    sendDate: sendDate,
    msgContents: dto.content,
    step: StepEnum.PENDING,
    pMode: PModeEnum.CAMP,
    fName: dto.fName,
    sendStat: SendStatEnum.SEND_NOW,
    pLink: dto.pLink || "",
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
    pTag: dto.pTag || "",
    beschmode: dto.beschMode,
    wDate: now,
    uDate: now,
    cmpncode: campaignCode,
    androidBadge: 0,
    androidSound: "default",
    iosBadge: 0,
    iosSound: "default",
  };
}
