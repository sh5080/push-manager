import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblPushstsmsgAttributes {
  androidBadge?: any;
  androidSound?: string;
  andErrormessage?: string;
  andPriority?: string;
  andSendCount?: any;
  appid?: string;
  bgcolor?: string;
  crondate?: string;
  cronidx?: any;
  cronComplatedate?: string;
  customKey1?: string;
  customKey2?: string;
  customKey3?: string;
  customValue1?: string;
  customValue2?: string;
  customValue3?: string;
  errormessage?: string;
  etiquetteEtime?: any;
  etiquetteStime?: any;
  fname?: string;
  fontcolor?: string;
  idlistFlag?: string;
  idx: any;
  iosBadge?: any;
  iosErrormessage?: string;
  iosSendCount?: any;
  iosSound?: string;
  isandroid?: string;
  isbulk?: string;
  isetiquette?: string;
  isios?: string;
  labelCode?: string;
  link?: string;
  ofbTime?: string;
  optagree?: string;
  oMode?: string;
  resultdate?: string;
  retry?: any;
  senddate?: string;
  sendspeed?: any;
  sendStat?: string;
  step?: string;
  targetFilter?: string;
  title?: string;
  tmpMessage?: string;
  udate: string;
  userId?: string;
  wdate: string;
}

export type TblPushstsmsgPk = "idx";
export type TblPushstsmsgId = TblPushstsmsg[TblPushstsmsgPk];
export type TblPushstsmsgOptionalAttributes =
  | "androidBadge"
  | "androidSound"
  | "andErrormessage"
  | "andPriority"
  | "andSendCount"
  | "appid"
  | "bgcolor"
  | "crondate"
  | "cronidx"
  | "cronComplatedate"
  | "customKey1"
  | "customKey2"
  | "customKey3"
  | "customValue1"
  | "customValue2"
  | "customValue3"
  | "errormessage"
  | "etiquetteEtime"
  | "etiquetteStime"
  | "fname"
  | "fontcolor"
  | "idlistFlag"
  | "iosBadge"
  | "iosErrormessage"
  | "iosSendCount"
  | "iosSound"
  | "isandroid"
  | "isbulk"
  | "isetiquette"
  | "isios"
  | "labelCode"
  | "link"
  | "ofbTime"
  | "optagree"
  | "oMode"
  | "resultdate"
  | "retry"
  | "senddate"
  | "sendspeed"
  | "sendStat"
  | "step"
  | "targetFilter"
  | "title"
  | "tmpMessage"
  | "userId";
export type TblPushstsmsgCreationAttributes = Optional<
  TblPushstsmsgAttributes,
  TblPushstsmsgOptionalAttributes
>;

export class TblPushstsmsg
  extends Model<TblPushstsmsgAttributes, TblPushstsmsgCreationAttributes>
  implements TblPushstsmsgAttributes
{
  androidBadge?: any;
  androidSound?: string;
  andErrormessage?: string;
  andPriority?: string;
  andSendCount?: any;
  appid?: string;
  bgcolor?: string;
  crondate?: string;
  cronidx?: any;
  cronComplatedate?: string;
  customKey1?: string;
  customKey2?: string;
  customKey3?: string;
  customValue1?: string;
  customValue2?: string;
  customValue3?: string;
  errormessage?: string;
  etiquetteEtime?: any;
  etiquetteStime?: any;
  fname?: string;
  fontcolor?: string;
  idlistFlag?: string;
  idx!: any;
  iosBadge?: any;
  iosErrormessage?: string;
  iosSendCount?: any;
  iosSound?: string;
  isandroid?: string;
  isbulk?: string;
  isetiquette?: string;
  isios?: string;
  labelCode?: string;
  link?: string;
  ofbTime?: string;
  optagree?: string;
  oMode?: string;
  resultdate?: string;
  retry?: any;
  senddate?: string;
  sendspeed?: any;
  sendStat?: string;
  step?: string;
  targetFilter?: string;
  title?: string;
  tmpMessage?: string;
  udate!: string;
  userId?: string;
  wdate!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushstsmsg {
    return TblPushstsmsg.init(
      {
        androidBadge: {
          type: "NUMBER",
          allowNull: true,
          field: "ANDROID_BADGE",
        },
        androidSound: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "ANDROID_SOUND",
        },
        andErrormessage: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "AND_ERRORMESSAGE",
        },
        andPriority: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "AND_PRIORITY",
        },
        andSendCount: {
          type: "NUMBER",
          allowNull: true,
          field: "AND_SEND_COUNT",
        },
        appid: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "APPID",
        },
        bgcolor: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "BGCOLOR",
        },
        crondate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "CRONDATE",
        },
        cronidx: {
          type: "NUMBER",
          allowNull: true,
          field: "CRONIDX",
        },
        cronComplatedate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "CRON_COMPLATEDATE",
        },
        customKey1: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "CUSTOM_KEY_1",
        },
        customKey2: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "CUSTOM_KEY_2",
        },
        customKey3: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "CUSTOM_KEY_3",
        },
        customValue1: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "CUSTOM_VALUE_1",
        },
        customValue2: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "CUSTOM_VALUE_2",
        },
        customValue3: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "CUSTOM_VALUE_3",
        },
        errormessage: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "ERRORMESSAGE",
        },
        etiquetteEtime: {
          type: "NUMBER",
          allowNull: true,
          field: "ETIQUETTE_ETIME",
        },
        etiquetteStime: {
          type: "NUMBER",
          allowNull: true,
          field: "ETIQUETTE_STIME",
        },
        fname: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "FNAME",
        },
        fontcolor: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "FONTCOLOR",
        },
        idlistFlag: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "IDLIST_FLAG",
        },
        idx: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          field: "IDX",
        },
        iosBadge: {
          type: "NUMBER",
          allowNull: true,
          field: "IOS_BADGE",
        },
        iosErrormessage: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "IOS_ERRORMESSAGE",
        },
        iosSendCount: {
          type: "NUMBER",
          allowNull: true,
          field: "IOS_SEND_COUNT",
        },
        iosSound: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "IOS_SOUND",
        },
        isandroid: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "ISANDROID",
        },
        isbulk: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "ISBULK",
        },
        isetiquette: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "ISETIQUETTE",
        },
        isios: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "ISIOS",
        },
        labelCode: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "LABEL_CODE",
        },
        link: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "LINK",
        },
        ofbTime: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "OFB_TIME",
        },
        optagree: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "OPTAGREE",
        },
        oMode: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "O_MODE",
        },
        resultdate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "RESULTDATE",
        },
        retry: {
          type: "NUMBER",
          allowNull: true,
          field: "RETRY",
        },
        senddate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "SENDDATE",
        },
        sendspeed: {
          type: "NUMBER",
          allowNull: true,
          field: "SENDSPEED",
        },
        sendStat: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "SEND_STAT",
        },
        step: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "STEP",
        },
        targetFilter: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "TARGET_FILTER",
        },
        title: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "TITLE",
        },
        tmpMessage: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "TMP_MESSAGE",
        },
        udate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: "UDATE",
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "USER_ID",
        },
        wdate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: "WDATE",
        },
      },
      {
        sequelize,
        tableName: "TBL_PUSHSTSMSG",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "idx_pushstsmsg_sc",
            fields: [{ name: "STEP" }, { name: "CRONDATE" }],
          },
          {
            name: "idx_tbl_pushstsmsg_asisu",
            fields: [
              { name: "APPID" },
              { name: "STEP" },
              { name: "IDLIST_FLAG" },
              { name: "SENDDATE" },
              { name: "USER_ID" },
            ],
          },
          {
            name: "idx_tbl_pushstsmsg_ss",
            fields: [{ name: "STEP" }, { name: "SENDDATE" }],
          },
          {
            name: "idx_tbl_pushstsmsg_us",
            fields: [{ name: "USER_ID" }, { name: "SENDDATE" }],
          },
          {
            name: "pk_tbl_pushstsmsg",
            unique: true,
            fields: [{ name: "IDX" }],
          },
        ],
      }
    );
  }
}
