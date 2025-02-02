import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TabTempFpQueueAttributes {
  androidBadge: any;
  androidSound: string;
  andPriority?: string;
  appKey?: string;
  appSecret?: string;
  beschmode?: string;
  bgColor?: string;
  customKey1?: string;
  customKey2?: string;
  customKey3?: string;
  customValue1?: string;
  customValue2?: string;
  customValue3?: string;
  etiquetteEtime?: any;
  etiquetteStime?: any;
  extra1?: any;
  extra2?: string;
  extra3?: string;
  feedbackDate?: Date;
  fName?: string;
  fontColor?: string;
  identify?: string;
  iosBadge: any;
  iosSound: string;
  isEtiquette?: string;
  labelCode?: string;
  lngtMessage1?: string;
  lngtMessage2?: string;
  lngtMessage3?: string;
  lngtMessage4?: string;
  msgContents: string;
  msgTitle?: string;
  ofbTime?: string;
  optAgree?: string;
  pLink?: string;
  pMode: string;
  pTag?: string;
  queueIdx: any;
  resultDate?: Date;
  sendDate?: Date;
  sendStat: string;
  step: string;
  uDate: Date;
  wDate: Date;
}

export type TabTempFpQueueOptionalAttributes =
  | "andPriority"
  | "appKey"
  | "appSecret"
  | "beschmode"
  | "bgColor"
  | "customKey1"
  | "customKey2"
  | "customKey3"
  | "customValue1"
  | "customValue2"
  | "customValue3"
  | "etiquetteEtime"
  | "etiquetteStime"
  | "extra1"
  | "extra2"
  | "extra3"
  | "feedbackDate"
  | "fName"
  | "fontColor"
  | "identify"
  | "isEtiquette"
  | "labelCode"
  | "lngtMessage1"
  | "lngtMessage2"
  | "lngtMessage3"
  | "lngtMessage4"
  | "msgTitle"
  | "ofbTime"
  | "optAgree"
  | "pLink"
  | "pTag"
  | "resultDate"
  | "sendDate";
export type TabTempFpQueueCreationAttributes = Optional<
  TabTempFpQueueAttributes,
  TabTempFpQueueOptionalAttributes
>;

export class TabTempFpQueue
  extends Model<TabTempFpQueueAttributes, TabTempFpQueueCreationAttributes>
  implements TabTempFpQueueAttributes
{
  androidBadge!: any;
  androidSound!: string;
  andPriority?: string;
  appKey?: string;
  appSecret?: string;
  beschmode?: string;
  bgColor?: string;
  customKey1?: string;
  customKey2?: string;
  customKey3?: string;
  customValue1?: string;
  customValue2?: string;
  customValue3?: string;
  etiquetteEtime?: any;
  etiquetteStime?: any;
  extra1?: any;
  extra2?: string;
  extra3?: string;
  feedbackDate?: Date;
  fName?: string;
  fontColor?: string;
  identify?: string;
  iosBadge!: any;
  iosSound!: string;
  isEtiquette?: string;
  labelCode?: string;
  lngtMessage1?: string;
  lngtMessage2?: string;
  lngtMessage3?: string;
  lngtMessage4?: string;
  msgContents!: string;
  msgTitle?: string;
  ofbTime?: string;
  optAgree?: string;
  pLink?: string;
  pMode!: string;
  pTag?: string;
  queueIdx!: any;
  resultDate?: Date;
  sendDate?: Date;
  sendStat!: string;
  step!: string;
  uDate!: Date;
  wDate!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof TabTempFpQueue {
    return TabTempFpQueue.init(
      {
        androidBadge: {
          type: "NUMBER",
          allowNull: false,
          field: "ANDROID_BADGE",
        },
        androidSound: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "ANDROID_SOUND",
        },
        andPriority: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "AND_PRIORITY",
        },
        appKey: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "APPKEY",
        },
        appSecret: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "APPSECRET",
        },
        beschmode: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "BESCHMODE",
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
        extra1: {
          type: "NUMBER",
          allowNull: true,
          field: "EXTRA1",
        },
        extra2: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "EXTRA2",
        },
        extra3: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "EXTRA3",
        },
        feedbackDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "FEEDBACKDATE",
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
        identify: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "IDENTIFY",
        },
        iosBadge: {
          type: "NUMBER",
          allowNull: false,
          field: "IOS_BADGE",
        },
        iosSound: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "IOS_SOUND",
        },
        isEtiquette: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "ISETIQUETTE",
        },
        labelCode: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "LABEL_CODE",
        },
        lngtMessage1: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "LNGT_MESSAGE1",
        },
        lngtMessage2: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "LNGT_MESSAGE2",
        },
        lngtMessage3: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "LNGT_MESSAGE3",
        },
        lngtMessage4: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "LNGT_MESSAGE4",
        },
        msgContents: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "MSGCONTENTS",
        },
        msgTitle: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "MSGTITLE",
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
        pLink: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "PLINK",
        },
        pMode: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "PMODE",
        },
        pTag: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "PTAG",
        },
        queueIdx: {
          type: "NUMBER",
          allowNull: false,
          field: "QUEUEIDX",
        },
        resultDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "RESULTDATE",
        },
        sendDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "SENDDATE",
        },
        sendStat: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "SEND_STAT",
        },
        step: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "STEP",
        },
        uDate: {
          type: DataTypes.DATE(6),
          allowNull: false,
          field: "UDATE",
        },
        wDate: {
          type: DataTypes.DATE(6),
          allowNull: false,
          field: "WDATE",
        },
      },
      {
        sequelize,
        tableName: "TAB_TEMP_FP_QUEUE",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "idx_tab_temp_fp_queue",
            unique: true,
            fields: [{ name: "QUEUEIDX" }],
          },
        ],
      }
    );
  }
}
