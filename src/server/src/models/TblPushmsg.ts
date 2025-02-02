import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblPushmsgAttributes {
  abDeviceCnt?: any;
  abGidx?: any;
  abSendtype?: string;
  androidBadge?: any;
  androidSound?: string;
  androidTitle?: string;
  andErrorMessage?: string;
  andPriority?: string;
  andSendCount?: any;
  appId?: string;
  bgColor?: string;
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
  lngtMessage?: any;
  message?: string;
  ofbTime?: string;
  optAgree?: string;
  oMode?: string;
  resultDate?: string;
  retry: any;
  sendDate?: string;
  sendspeed?: any;
  sendStat?: string;
  step?: string;
  title?: string;
  uDate?: string;
  userId?: string;
  wDate?: string;
}

export type TblPushmsgOptionalAttributes =
  | "abDeviceCnt"
  | "abGidx"
  | "abSendtype"
  | "androidBadge"
  | "androidSound"
  | "androidTitle"
  | "andErrorMessage"
  | "andPriority"
  | "andSendCount"
  | "appId"
  | "bgColor"
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
  | "lngtMessage"
  | "message"
  | "ofbTime"
  | "optAgree"
  | "oMode"
  | "resultDate"
  | "sendDate"
  | "sendspeed"
  | "sendStat"
  | "step"
  | "title"
  | "uDate"
  | "userId"
  | "wDate";
export type TblPushmsgCreationAttributes = Optional<
  TblPushmsgAttributes,
  TblPushmsgOptionalAttributes
>;

export class TblPushmsg
  extends Model<TblPushmsgAttributes, TblPushmsgCreationAttributes>
  implements TblPushmsgAttributes
{
  abDeviceCnt?: any;
  abGidx?: any;
  abSendtype?: string;
  androidBadge?: any;
  androidSound?: string;
  androidTitle?: string;
  andErrorMessage?: string;
  andPriority?: string;
  andSendCount?: any;
  appId?: string;
  bgColor?: string;
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
  lngtMessage?: any;
  message?: string;
  ofbTime?: string;
  optAgree?: string;
  oMode?: string;
  resultDate?: string;
  retry!: any;
  sendDate?: string;
  sendspeed?: any;
  sendStat?: string;
  step?: string;
  title?: string;
  uDate?: string;
  userId?: string;
  wDate?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushmsg {
    return TblPushmsg.init(
      {
        abDeviceCnt: {
          type: "NUMBER",
          allowNull: true,
          field: "AB_DEVICE_CNT",
        },
        abGidx: {
          type: "NUMBER",
          allowNull: true,
          field: "AB_GIDX",
        },
        abSendtype: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "AB_SENDTYPE",
        },
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
        androidTitle: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "ANDROID_TITLE",
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
        lngtMessage: {
          type: "CLOB",
          allowNull: true,
          field: "LNGT_MESSAGE",
        },
        message: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "MESSAGE",
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
          allowNull: false,
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
        title: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "TITLE",
        },
        uDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "UDATE",
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "USER_ID",
        },
        wDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "WDATE",
        },
      },
      {
        sequelize,
        tableName: "TBL_PUSHMSG",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "idx_tbl_pushmsg_a",
            fields: [{ name: "APPID" }],
          },
          {
            name: "idx_tbl_pushmsg_u",
            fields: [{ name: "USER_ID" }],
          },
          {
            name: "idx_tbl_pushmsg_uas",
            fields: [
              { name: "USER_ID" },
              { name: "APPID" },
              { name: "SENDDATE" },
            ],
          },
          {
            name: "pk_tbl_pushmsg",
            unique: true,
            fields: [{ name: "IDX" }],
          },
        ],
      }
    );
  }
}
