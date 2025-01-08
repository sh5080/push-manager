import {
  AndPriorityEnum,
  IsEtiquetteEnum,
  OfbTimeEnum,
  OptAgreeEnum,
  PModeEnum,
  SendStatEnum,
  StepEnum,
} from "@push-manager/shared/types/constants/pushQueue.const";
import { IPushStsMsg } from "@push-manager/shared/types/entities/pushStsMsg.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { PushMaster } from "./pushMaster.entity";

@Entity("TBL_PUSHSTSMSG")
export class PushStsMsg implements IPushStsMsg {
  @PrimaryGeneratedColumn({ name: "IDX" })
  idx!: number;

  @Column({ name: "USER_ID", length: 50, nullable: true })
  userId?: string;

  @Column({ name: "APPID", length: 50, nullable: true })
  appid?: string;

  @Column({ name: "SENDDATE", type: "date", nullable: true })
  senddate?: Date;

  @Column({ name: "CRONDATE", type: "date", nullable: true })
  crondate?: Date;

  @Column({ name: "CRON_COMPLATEDATE", type: "date", nullable: true })
  cronComplatedate?: Date;

  @CreateDateColumn({ name: "WDATE", type: "date" })
  wdate!: Date;

  @UpdateDateColumn({ name: "UDATE", type: "date" })
  udate!: Date;

  @Column({ type: "varchar", name: "STEP", length: 4, nullable: true })
  step?: (typeof StepEnum)[keyof typeof StepEnum];

  @Column({ name: "RESULTDATE", type: "date", nullable: true })
  resultdate?: Date;

  @Column({ name: "ANDROID_SOUND", length: 50, nullable: true })
  androidSound?: string;

  @Column({
    name: "ANDROID_BADGE",
    type: "number",
    precision: 11,
    nullable: true,
  })
  androidBadge?: number;

  @Column({ name: "IOS_BADGE", type: "number", precision: 11, nullable: true })
  iosBadge?: number;

  @Column({ name: "IOS_SOUND", length: 50, nullable: true })
  iosSound?: string;

  @Column({ name: "CUSTOM_KEY_1", length: 100, nullable: true })
  customKey1?: string;

  @Column({ name: "CUSTOM_VALUE_1", length: 200, nullable: true })
  customValue1?: string;

  @Column({ name: "CUSTOM_KEY_2", length: 100, nullable: true })
  customKey2?: string;

  @Column({ name: "CUSTOM_VALUE_2", length: 200, nullable: true })
  customValue2?: string;

  @Column({ name: "CUSTOM_KEY_3", length: 100, nullable: true })
  customKey3?: string;

  @Column({ name: "CUSTOM_VALUE_3", length: 200, nullable: true })
  customValue3?: string;

  @Column({ name: "IOS_ERRORMESSAGE", length: 200, nullable: true })
  iosErrormessage?: string;

  @Column({ name: "FNAME", length: 256, nullable: true })
  fname?: string;

  @Column({ name: "ISANDROID", length: 1, nullable: true })
  isandroid?: string;

  @Column({ name: "ISIOS", length: 1, nullable: true })
  isios?: string;

  @Column({ name: "AND_ERRORMESSAGE", length: 200, nullable: true })
  andErrormessage?: string;

  @Column({ name: "ERRORMESSAGE", length: 200, nullable: true })
  errormessage?: string;

  @Column({ name: "TMP_MESSAGE", length: 4000, nullable: true })
  tmpMessage?: string;

  @Column({
    type: "varchar",
    name: "O_MODE",
    length: 4,
    default: PModeEnum.TARGET,
    nullable: true,
  })
  oMode?: (typeof PModeEnum)[keyof typeof PModeEnum];

  @Column({
    name: "RETRY",
    type: "number",
    precision: 11,
    default: 0,
    nullable: true,
  })
  retry?: number;

  @Column({ name: "LINK", length: 500, nullable: true })
  link?: string;

  @Column({ name: "IDLIST_FLAG", length: 4, nullable: true })
  idlistFlag?: string;

  @Column({ name: "ISBULK", length: 1, nullable: true })
  isbulk?: string;

  @Column({ name: "LABEL_CODE", length: 10, nullable: true })
  labelCode?: string;

  @Column({ name: "TITLE", length: 100, nullable: true })
  title?: string;

  @Column({ name: "BGCOLOR", length: 7, nullable: true })
  bgcolor?: string;

  @Column({ name: "FONTCOLOR", length: 7, nullable: true })
  fontcolor?: string;

  @Column({
    name: "SENDSPEED",
    type: "number",
    precision: 11,
    default: 3,
    nullable: true,
  })
  sendspeed?: number;

  @Column({
    type: "varchar",
    name: "ISETIQUETTE",
    length: 1,
    default: "Y",
    nullable: true,
  })
  isetiquette?: (typeof IsEtiquetteEnum)[keyof typeof IsEtiquetteEnum];

  @Column({
    name: "ETIQUETTE_STIME",
    type: "number",
    precision: 4,
    nullable: true,
  })
  etiquetteStime?: number;

  @Column({
    name: "ETIQUETTE_ETIME",
    type: "number",
    precision: 4,
    nullable: true,
  })
  etiquetteEtime?: number;

  @Column({
    type: "varchar",
    name: "OFB_TIME",
    length: 3,
    default: OfbTimeEnum.ONE_W,
    nullable: true,
  })
  ofbTime?: (typeof OfbTimeEnum)[keyof typeof OfbTimeEnum];

  @Column({
    type: "varchar",
    name: "AND_PRIORITY",
    length: 1,
    default: AndPriorityEnum.MEDIUM,
    nullable: true,
  })
  andPriority?: (typeof AndPriorityEnum)[keyof typeof AndPriorityEnum];

  @Column({
    name: "AND_SEND_COUNT",
    type: "number",
    precision: 11,
    default: 0,
    nullable: true,
  })
  andSendCount?: number;

  @Column({
    name: "IOS_SEND_COUNT",
    type: "number",
    precision: 11,
    default: 0,
    nullable: true,
  })
  iosSendCount?: number;

  @Column({
    name: "OPTAGREE",
    type: "varchar",
    length: 4,
    default: OptAgreeEnum.DISAGREE,
    nullable: true,
  })
  optagree?: (typeof OptAgreeEnum)[keyof typeof OptAgreeEnum];

  @Column({
    name: "SEND_STAT",
    type: "varchar",
    length: 4,
    default: SendStatEnum.SEND_NOW,
    nullable: true,
  })
  sendStat?: (typeof SendStatEnum)[keyof typeof SendStatEnum];

  @Column({ name: "TARGET_FILTER", length: 10, nullable: true })
  targetFilter?: string;

  @Column({ name: "CRONIDX", type: "number", precision: 11, nullable: true })
  cronidx?: number;

  @OneToMany(() => PushMaster, (master) => master.pushStsMsg)
  pushMasters?: PushMaster[];
}
