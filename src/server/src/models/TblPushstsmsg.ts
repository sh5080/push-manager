import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblPushstsmsgAttributes {
  androidBadge?: any;
  androidSound?: string;
  andErrorMessage?: string;
  andPriority?: string;
  andSendCount?: any;
  appId?: string;
  bgColor?: string;
  cronDate?: string;
  cronIdx?: any;
  cronComplatedate?: string;
  customKey1?: string;
  customKey2?: string;
  customKey3?: string;
  customValue1?: string;
  customValue2?: string;
  customValue3?: string;
  errorMessage?: string;
  etiquetteEtime?: any;
  etiquetteStime?: any;
  fName?: string;
  fontColor?: string;
  idlistFlag?: string;
  idx: any;
  iosBadge?: any;
  iosErrorMessage?: string;
  iosSendCount?: any;
  iosSound?: string;
  isAndroid?: string;
  isBulk?: string;
  isEtiquette?: string;
  isIos?: string;
  labelCode?: string;
  link?: string;
  ofbTime?: string;
  optAgree?: string;
  oMode?: string;
  resultDate?: string;
  retry?: any;
  sendDate?: string;
  sendspeed?: any;
  sendStat?: string;
  step?: string;
  targetFilter?: string;
  title?: string;
  tmpMessage?: string;
  uDate: string;
  userId?: string;
  wDate: string;
}

export type TblPushstsmsgPk = "idx";
export type TblPushstsmsgId = TblPushstsmsg[TblPushstsmsgPk];
export type TblPushstsmsgOptionalAttributes =
  | "androidBadge"
  | "androidSound"
  | "andErrorMessage"
  | "andPriority"
  | "andSendCount"
  | "appId"
  | "bgColor"
  | "cronDate"
  | "cronIdx"
  | "cronComplatedate"
  | "customKey1"
  | "customKey2"
  | "customKey3"
  | "customValue1"
  | "customValue2"
  | "customValue3"
  | "errorMessage"
  | "etiquetteEtime"
  | "etiquetteStime"
  | "fName"
  | "fontColor"
  | "idlistFlag"
  | "iosBadge"
  | "iosErrorMessage"
  | "iosSendCount"
  | "iosSound"
  | "isAndroid"
  | "isBulk"
  | "isEtiquette"
  | "isIos"
  | "labelCode"
  | "link"
  | "ofbTime"
  | "optAgree"
  | "oMode"
  | "resultDate"
  | "retry"
  | "sendDate"
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
  andErrorMessage?: string;
  andPriority?: string;
  andSendCount?: any;
  appId?: string;
  bgColor?: string;
  cronDate?: string;
  cronIdx?: any;
  cronComplatedate?: string;
  customKey1?: string;
  customKey2?: string;
  customKey3?: string;
  customValue1?: string;
  customValue2?: string;
  customValue3?: string;
  errorMessage?: string;
  etiquetteEtime?: any;
  etiquetteStime?: any;
  fName?: string;
  fontColor?: string;
  idlistFlag?: string;
  idx!: any;
  iosBadge?: any;
  iosErrorMessage?: string;
  iosSendCount?: any;
  iosSound?: string;
  isAndroid?: string;
  isBulk?: string;
  isEtiquette?: string;
  isIos?: string;
  labelCode?: string;
  link?: string;
  ofbTime?: string;
  optAgree?: string;
  oMode?: string;
  resultDate?: string;
  retry?: any;
  sendDate?: string;
  sendspeed?: any;
  sendStat?: string;
  step?: string;
  targetFilter?: string;
  title?: string;
  tmpMessage?: string;
  uDate!: string;
  userId?: string;
  wDate!: string;

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
        andErrorMessage: {
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
        appId: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "APPID",
        },
        bgColor: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "BGCOLOR",
        },
        cronDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "CRONDATE",
        },
        cronIdx: {
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
        errorMessage: {
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
        fName: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "FNAME",
        },
        fontColor: {
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
        iosErrorMessage: {
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
        isAndroid: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "ISANDROID",
        },
        isBulk: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "ISBULK",
        },
        isEtiquette: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "ISETIQUETTE",
        },
        isIos: {
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
        optAgree: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "OPTAGREE",
        },
        oMode: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "O_MODE",
        },
        resultDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "RESULTDATE",
        },
        retry: {
          type: "NUMBER",
          allowNull: true,
          field: "RETRY",
        },
        sendDate: {
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
        uDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: "UDATE",
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "USER_ID",
        },
        wDate: {
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
