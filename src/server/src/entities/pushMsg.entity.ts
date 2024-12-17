import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("TBL_PUSHMSG")
export class PushMsg {
  @PrimaryGeneratedColumn({ name: "IDX" })
  idx!: number;

  @Column({ name: "USER_ID", length: 50 })
  userId!: string;

  @Column({ name: "APPID", length: 50 })
  appId!: string;

  @Column({ name: "TITLE", length: 200 })
  title!: string;

  @Column({ name: "MESSAGE", length: 4000 })
  message!: string;

  @Column({ name: "SEND_STAT", length: 4 })
  sendStat!: string;

  @Column({ name: "SENDDATE" })
  sendDate!: Date;

  @Column({ name: "WDATE" })
  wDate!: Date;

  @Column({ name: "UDATE" })
  uDate!: Date;

  @Column({ name: "STEP", length: 4 })
  step!: string;

  @Column({ name: "RESULTDATE" })
  resultDate!: Date;

  @Column({ name: "ANDROID_SOUND", length: 50, nullable: true })
  androidSound!: string;

  @Column({ name: "IOS_BADGE", default: 0 })
  iosBadge!: number;

  @Column({ name: "IOS_SOUND", length: 50, nullable: true })
  iosSound!: string;

  @Column({ name: "CUSTOME_KEY_1", length: 100, nullable: true })
  customKey1!: string;

  @Column({ name: "CUSTOME_VALUE_1", length: 1000, nullable: true })
  customValue1!: string;

  @Column({ name: "CUSTOM_KEY_2", length: 100, nullable: true })
  customKey2!: string;

  @Column({ name: "CUSTOME_VALUE_2", length: 200, nullable: true })
  customValue2!: string;

  @Column({ name: "CUSTOME_KEY_3", length: 100, nullable: true })
  customKey3!: string;

  @Column({ name: "CUSTOME_VALUE_3", length: 200, nullable: true })
  customValue3!: string;

  @Column({ name: "ERRORMESSAGE", length: 200, nullable: true })
  errorMessage!: string;

  @Column({ name: "FNAME", length: 256, nullable: true })
  fName!: string;

  @Column({ name: "ANDROID_TITLE", length: 100, nullable: true })
  androidTitle!: string;

  @Column({ name: "ISANDROID", length: 1, default: "N" })
  isAndroid!: string;

  @Column({ name: "ISIOS", length: 1, default: "N" })
  isIos!: string;

  @Column({ name: "IOS_ERRORMESSAGE", length: 200, nullable: true })
  iosErrorMessage!: string;

  @Column({ name: "AND_ERRORMESSAGE", length: 200, nullable: true })
  andErrorMessage!: string;

  @Column({ name: "ANDROID_BADGE", nullable: true })
  androidBadge!: number;

  @Column({ name: "LINK", length: 500, nullable: true })
  link!: string;

  @Column({ name: "RETRY", default: 1 })
  retry!: number;

  @Column({ name: "LNGT_MESSAGE", nullable: true })
  lngtMessage!: string;

  @Column({ name: "O_MODE", length: 4, nullable: true })
  oMode!: string;

  @Column({ name: "ISBULK", length: 1, default: "N" })
  isBulk!: string;

  @Column({ name: "LABEL_CODE", length: 10, nullable: true })
  labelCode!: string;

  @Column({ name: "BGCOLOR", length: 7, nullable: true })
  bgColor!: string;

  @Column({ name: "FONTCOLOR", length: 7, nullable: true })
  fontColor!: string;

  @Column({ name: "SNEDSPEED", default: 3 })
  sendSpeed!: number;

  @Column({ name: "ISETIQUETTE", length: 1, default: "N" })
  isEtiquette!: string;

  @Column({ name: "ETIQUETTE_STIME", nullable: true })
  etiquetteStime!: number;

  @Column({ name: "ETIQUETTE_ETIME", nullable: true })
  etiquetteEtime!: number;

  @Column({ name: "OFB_TIME", length: 3, default: "1w" })
  ofbTime!: string;

  @Column({ name: "AND_PRIORITY", length: 1, default: "M" })
  andPriority!: string;

  @Column({ name: "AND_SEND_COUNT", default: 0 })
  andSendCount!: number;

  @Column({ name: "IOS_SEND_COUNT", default: 0 })
  iosSendCount!: number;

  @Column({ name: "OPTAGREE", length: 4, default: "0000" })
  optAgree!: string;

  @Column({ name: "AB_GIDX", nullable: true })
  abGidx!: number;

  @Column({ name: "AB_SENDTYPE", length: 4, nullable: true })
  abSendType!: string;

  @Column({ name: "AB_DEVICE_CNT", default: 0 })
  abDeviceCnt!: number;

  @Column({ name: "CREATE_USER_ID", length: 50, nullable: true })
  createUserId!: string;

  @Column({ name: "UPDATE_USER_ID", length: 50, nullable: true })
  updateUserId!: string;
}