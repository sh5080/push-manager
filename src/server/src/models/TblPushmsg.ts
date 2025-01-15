import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushmsgAttributes {
  abDeviceCnt?: any;
  abGidx?: any;
  abSendtype?: string;
  androidBadge?: any;
  androidSound?: string;
  androidTitle?: string;
  andErrormessage?: string;
  andPriority?: string;
  andSendCount?: any;
  appid?: string;
  bgcolor?: string;
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
  lngtMessage?: any;
  message?: string;
  ofbTime?: string;
  optagree?: string;
  oMode?: string;
  resultdate?: string;
  retry: any;
  senddate?: string;
  sendspeed?: any;
  sendStat?: string;
  step?: string;
  title?: string;
  udate?: string;
  userId?: string;
  wdate?: string;
}

export type TblPushmsgOptionalAttributes = "abDeviceCnt" | "abGidx" | "abSendtype" | "androidBadge" | "androidSound" | "androidTitle" | "andErrormessage" | "andPriority" | "andSendCount" | "appid" | "bgcolor" | "customKey1" | "customKey2" | "customKey3" | "customValue1" | "customValue2" | "customValue3" | "errormessage" | "etiquetteEtime" | "etiquetteStime" | "fname" | "fontcolor" | "iosBadge" | "iosErrormessage" | "iosSendCount" | "iosSound" | "isandroid" | "isbulk" | "isetiquette" | "isios" | "labelCode" | "link" | "lngtMessage" | "message" | "ofbTime" | "optagree" | "oMode" | "resultdate" | "senddate" | "sendspeed" | "sendStat" | "step" | "title" | "udate" | "userId" | "wdate";
export type TblPushmsgCreationAttributes = Optional<TblPushmsgAttributes, TblPushmsgOptionalAttributes>;

export class TblPushmsg extends Model<TblPushmsgAttributes, TblPushmsgCreationAttributes> implements TblPushmsgAttributes {
  abDeviceCnt?: any;
  abGidx?: any;
  abSendtype?: string;
  androidBadge?: any;
  androidSound?: string;
  androidTitle?: string;
  andErrormessage?: string;
  andPriority?: string;
  andSendCount?: any;
  appid?: string;
  bgcolor?: string;
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
  lngtMessage?: any;
  message?: string;
  ofbTime?: string;
  optagree?: string;
  oMode?: string;
  resultdate?: string;
  retry!: any;
  senddate?: string;
  sendspeed?: any;
  sendStat?: string;
  step?: string;
  title?: string;
  udate?: string;
  userId?: string;
  wdate?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushmsg {
    return TblPushmsg.init({
    abDeviceCnt: {
      type: "NUMBER",
      allowNull: true,
      field: 'AB_DEVICE_CNT'
    },
    abGidx: {
      type: "NUMBER",
      allowNull: true,
      field: 'AB_GIDX'
    },
    abSendtype: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'AB_SENDTYPE'
    },
    androidBadge: {
      type: "NUMBER",
      allowNull: true,
      field: 'ANDROID_BADGE'
    },
    androidSound: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ANDROID_SOUND'
    },
    androidTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ANDROID_TITLE'
    },
    andErrormessage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'AND_ERRORMESSAGE'
    },
    andPriority: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'AND_PRIORITY'
    },
    andSendCount: {
      type: "NUMBER",
      allowNull: true,
      field: 'AND_SEND_COUNT'
    },
    appid: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APPID'
    },
    bgcolor: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'BGCOLOR'
    },
    customKey1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CUSTOM_KEY_1'
    },
    customKey2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CUSTOM_KEY_2'
    },
    customKey3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CUSTOM_KEY_3'
    },
    customValue1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CUSTOM_VALUE_1'
    },
    customValue2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CUSTOM_VALUE_2'
    },
    customValue3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CUSTOM_VALUE_3'
    },
    errormessage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ERRORMESSAGE'
    },
    etiquetteEtime: {
      type: "NUMBER",
      allowNull: true,
      field: 'ETIQUETTE_ETIME'
    },
    etiquetteStime: {
      type: "NUMBER",
      allowNull: true,
      field: 'ETIQUETTE_STIME'
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'FNAME'
    },
    fontcolor: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'FONTCOLOR'
    },
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    iosBadge: {
      type: "NUMBER",
      allowNull: true,
      field: 'IOS_BADGE'
    },
    iosErrormessage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'IOS_ERRORMESSAGE'
    },
    iosSendCount: {
      type: "NUMBER",
      allowNull: true,
      field: 'IOS_SEND_COUNT'
    },
    iosSound: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'IOS_SOUND'
    },
    isandroid: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'ISANDROID'
    },
    isbulk: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'ISBULK'
    },
    isetiquette: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'ISETIQUETTE'
    },
    isios: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'ISIOS'
    },
    labelCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'LABEL_CODE'
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'LINK'
    },
    lngtMessage: {
      type: "CLOB",
      allowNull: true,
      field: 'LNGT_MESSAGE'
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MESSAGE'
    },
    ofbTime: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OFB_TIME'
    },
    optagree: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OPTAGREE'
    },
    oMode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'O_MODE'
    },
    resultdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'RESULTDATE'
    },
    retry: {
      type: "NUMBER",
      allowNull: false,
      field: 'RETRY'
    },
    senddate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'SENDDATE'
    },
    sendspeed: {
      type: "NUMBER",
      allowNull: true,
      field: 'SENDSPEED'
    },
    sendStat: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'SEND_STAT'
    },
    step: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'STEP'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TITLE'
    },
    udate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'UDATE'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_ID'
    },
    wdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'WDATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHMSG',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_pushmsg_a",
        fields: [
          { name: "APPID" },
        ]
      },
      {
        name: "idx_tbl_pushmsg_u",
        fields: [
          { name: "USER_ID" },
        ]
      },
      {
        name: "idx_tbl_pushmsg_uas",
        fields: [
          { name: "USER_ID" },
          { name: "APPID" },
          { name: "SENDDATE" },
        ]
      },
      {
        name: "pk_tbl_pushmsg",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
