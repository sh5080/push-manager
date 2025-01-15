import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushstscronAttributes {
  androidBadge?: any;
  androidSound?: string;
  andPriority?: string;
  appid?: string;
  bgcolor?: string;
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
  fname?: string;
  fontcolor?: string;
  idx: any;
  iosBadge?: any;
  iosSound?: string;
  isandroid?: string;
  isetiquette?: string;
  isios?: string;
  labelCode?: string;
  link?: string;
  ofbTime?: string;
  optagree?: string;
  oMode?: string;
  renew?: string;
  senddate?: string;
  sendspeed?: any;
  title?: string;
  tmpMessage?: string;
  udate: string;
  userId?: string;
  wdate: string;
}

export type TblPushstscronOptionalAttributes = "androidBadge" | "androidSound" | "andPriority" | "appid" | "bgcolor" | "crontask" | "cronEndDate" | "cronRepeat" | "cronRepeatStr" | "cronSql" | "cronStartDate" | "cronTime" | "customKey1" | "customKey2" | "customKey3" | "customValue1" | "customValue2" | "customValue3" | "dbidx" | "etiquetteEtime" | "etiquetteStime" | "fname" | "fontcolor" | "iosBadge" | "iosSound" | "isandroid" | "isetiquette" | "isios" | "labelCode" | "link" | "ofbTime" | "optagree" | "oMode" | "renew" | "senddate" | "sendspeed" | "title" | "tmpMessage" | "userId";
export type TblPushstscronCreationAttributes = Optional<TblPushstscronAttributes, TblPushstscronOptionalAttributes>;

export class TblPushstscron extends Model<TblPushstscronAttributes, TblPushstscronCreationAttributes> implements TblPushstscronAttributes {
  androidBadge?: any;
  androidSound?: string;
  andPriority?: string;
  appid?: string;
  bgcolor?: string;
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
  fname?: string;
  fontcolor?: string;
  idx!: any;
  iosBadge?: any;
  iosSound?: string;
  isandroid?: string;
  isetiquette?: string;
  isios?: string;
  labelCode?: string;
  link?: string;
  ofbTime?: string;
  optagree?: string;
  oMode?: string;
  renew?: string;
  senddate?: string;
  sendspeed?: any;
  title?: string;
  tmpMessage?: string;
  udate!: string;
  userId?: string;
  wdate!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushstscron {
    return TblPushstscron.init({
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
    andPriority: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'AND_PRIORITY'
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
    crontask: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CRONTASK'
    },
    cronEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'CRON_END_DATE'
    },
    cronRepeat: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CRON_REPEAT'
    },
    cronRepeatStr: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CRON_REPEAT_STR'
    },
    cronSql: {
      type: "CLOB",
      allowNull: true,
      field: 'CRON_SQL'
    },
    cronStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'CRON_START_DATE'
    },
    cronTime: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CRON_TIME'
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
    dbidx: {
      type: "NUMBER",
      allowNull: true,
      field: 'DBIDX'
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
    renew: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'RENEW'
    },
    senddate: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'SENDDATE'
    },
    sendspeed: {
      type: "NUMBER",
      allowNull: true,
      field: 'SENDSPEED'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TITLE'
    },
    tmpMessage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TMP_MESSAGE'
    },
    udate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'UDATE'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_ID'
    },
    wdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'WDATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHSTSCRON',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_pushstscron",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
