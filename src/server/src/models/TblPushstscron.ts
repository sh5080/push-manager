import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblPushstscronAttributes {
  androidBadge?: any;
  androidSound?: string;
  andPriority?: string;
  appId?: string;
  bgColor?: string;
  crontask?: string;
  cronEndDate?: string;
  cronRepeat?: string;
  cronRepeatStr?: string;
  cronSql?: any;
  cronStartDate?: string;
  cronTime?: string;
  customKey1?: string;
  customKey2?: string;
  customKey3?: string;
  customValue1?: string;
  customValue2?: string;
  customValue3?: string;
  dbidx?: any;
  etiquetteEtime?: any;
  etiquetteStime?: any;
  fName?: string;
  fontColor?: string;
  idx: any;
  iosBadge?: any;
  iosSound?: string;
  isAndroid?: string;
  isEtiquette?: string;
  isIos?: string;
  labelCode?: string;
  link?: string;
  ofbTime?: string;
  optAgree?: string;
  oMode?: string;
  renew?: string;
  sendDate?: string;
  sendspeed?: any;
  title?: string;
  tmpMessage?: string;
  uDate: string;
  userId?: string;
  wDate: string;
}

export type TblPushstscronOptionalAttributes =
  | "androidBadge"
  | "androidSound"
  | "andPriority"
  | "appId"
  | "bgColor"
  | "crontask"
  | "cronEndDate"
  | "cronRepeat"
  | "cronRepeatStr"
  | "cronSql"
  | "cronStartDate"
  | "cronTime"
  | "customKey1"
  | "customKey2"
  | "customKey3"
  | "customValue1"
  | "customValue2"
  | "customValue3"
  | "dbidx"
  | "etiquetteEtime"
  | "etiquetteStime"
  | "fName"
  | "fontColor"
  | "iosBadge"
  | "iosSound"
  | "isAndroid"
  | "isEtiquette"
  | "isIos"
  | "labelCode"
  | "link"
  | "ofbTime"
  | "optAgree"
  | "oMode"
  | "renew"
  | "sendDate"
  | "sendspeed"
  | "title"
  | "tmpMessage"
  | "userId";
export type TblPushstscronCreationAttributes = Optional<
  TblPushstscronAttributes,
  TblPushstscronOptionalAttributes
>;

export class TblPushstscron
  extends Model<TblPushstscronAttributes, TblPushstscronCreationAttributes>
  implements TblPushstscronAttributes
{
  androidBadge?: any;
  androidSound?: string;
  andPriority?: string;
  appId?: string;
  bgColor?: string;
  crontask?: string;
  cronEndDate?: string;
  cronRepeat?: string;
  cronRepeatStr?: string;
  cronSql?: any;
  cronStartDate?: string;
  cronTime?: string;
  customKey1?: string;
  customKey2?: string;
  customKey3?: string;
  customValue1?: string;
  customValue2?: string;
  customValue3?: string;
  dbidx?: any;
  etiquetteEtime?: any;
  etiquetteStime?: any;
  fName?: string;
  fontColor?: string;
  idx!: any;
  iosBadge?: any;
  iosSound?: string;
  isAndroid?: string;
  isEtiquette?: string;
  isIos?: string;
  labelCode?: string;
  link?: string;
  ofbTime?: string;
  optAgree?: string;
  oMode?: string;
  renew?: string;
  sendDate?: string;
  sendspeed?: any;
  title?: string;
  tmpMessage?: string;
  uDate!: string;
  userId?: string;
  wDate!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushstscron {
    return TblPushstscron.init(
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
        andPriority: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "AND_PRIORITY",
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
        crontask: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "CRONTASK",
        },
        cronEndDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "CRON_END_DATE",
        },
        cronRepeat: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "CRON_REPEAT",
        },
        cronRepeatStr: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "CRON_REPEAT_STR",
        },
        cronSql: {
          type: "CLOB",
          allowNull: true,
          field: "CRON_SQL",
        },
        cronStartDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "CRON_START_DATE",
        },
        cronTime: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "CRON_TIME",
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
        dbidx: {
          type: "NUMBER",
          allowNull: true,
          field: "DBIDX",
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
        idx: {
          type: "NUMBER",
          allowNull: false,
          field: "IDX",
        },
        iosBadge: {
          type: "NUMBER",
          allowNull: true,
          field: "IOS_BADGE",
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
        renew: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "RENEW",
        },
        sendDate: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "SENDDATE",
        },
        sendspeed: {
          type: "NUMBER",
          allowNull: true,
          field: "SENDSPEED",
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
        tableName: "TBL_PUSHSTSCRON",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "pk_tbl_pushstscron",
            unique: true,
            fields: [{ name: "IDX" }],
          },
        ],
      }
    );
  }
}
