import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblFpQueueAttributes {
  androidBadge: any;
  androidSound: string;
  andPriority?: string;
  appKey?: string;
  appSecret?: string;
  beschmode?: string;
  bgColor?: string;
  cmpncode?: any;
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
  failToChannel?: any;
  feedbackDate?: Date;
  fName?: string;
  fontColor?: string;
  identify?: string;
  iosBadge: any;
  iosSound: string;
  isEtiquette?: string;
  kKkoBtnInfo?: string;
  kKkoBtnType?: string;
  kKkoFailover?: any;
  kTemplateCode?: string;
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
  rno?: string;
  sendDate?: Date | string;
  sendStat: string;
  sno?: string;
  step: string;
  txtMsgContents?: string;
  txtMsgTitle?: string;
  uDate: Date | string;
  wDate: Date | string;
}

export type TblFpQueueOptionalAttributes =
  | "andPriority"
  | "appKey"
  | "appSecret"
  | "beschmode"
  | "bgColor"
  | "cmpncode"
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
  | "failToChannel"
  | "feedbackDate"
  | "fName"
  | "fontColor"
  | "identify"
  | "isEtiquette"
  | "kKkoBtnInfo"
  | "kKkoBtnType"
  | "kKkoFailover"
  | "kTemplateCode"
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
  | "rno"
  | "sendDate"
  | "sno"
  | "txtMsgContents"
  | "txtMsgTitle";
export type TblFpQueueCreationAttributes = Optional<
  TblFpQueueAttributes,
  TblFpQueueOptionalAttributes
>;

export class TblFpQueue
  extends Model<TblFpQueueAttributes, TblFpQueueCreationAttributes>
  implements TblFpQueueAttributes
{
  androidBadge!: any;
  androidSound!: string;
  andPriority?: string;
  appKey?: string;
  appSecret?: string;
  beschmode?: string;
  bgColor?: string;
  cmpncode?: any;
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
  failToChannel?: any;
  feedbackDate?: Date;
  fName?: string;
  fontColor?: string;
  identify?: string;
  iosBadge!: any;
  iosSound!: string;
  isEtiquette?: string;
  kKkoBtnInfo?: string;
  kKkoBtnType?: string;
  kKkoFailover?: any;
  kTemplateCode?: string;
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
  rno?: string;
  sendDate?: Date;
  sendStat!: string;
  sno?: string;
  step!: string;
  txtMsgContents?: string;
  txtMsgTitle?: string;
  uDate!: Date;
  wDate!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblFpQueue {
    return TblFpQueue.init(
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
        cmpncode: {
          type: "NUMBER",
          allowNull: true,
          field: "CMPNCODE",
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
        failToChannel: {
          type: "NUMBER",
          allowNull: true,
          field: "FAILTOCHANNEL",
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
        kKkoBtnInfo: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "K_KKO_BTN_INFO",
        },
        kKkoBtnType: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "K_KKO_BTN_TYPE",
        },
        kKkoFailover: {
          type: "NUMBER",
          allowNull: true,
          field: "K_KKO_FAILOVER",
        },
        kTemplateCode: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "K_TEMPLATE_CODE",
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
          type: DataTypes.CHAR,
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
          primaryKey: true,
        },
        resultDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "RESULTDATE",
        },
        rno: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "RNO",
        },
        sendDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "SENDDATE",
        },
        sendStat: {
          type: DataTypes.CHAR,
          allowNull: false,
          field: "SEND_STAT",
        },
        sno: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "SNO",
        },
        step: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "STEP",
        },
        txtMsgContents: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "TXT_MSGCONTENTS",
        },
        txtMsgTitle: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "TXT_MSGTITLE",
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
        tableName: "TBL_FP_QUEUE",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "tbl_fp_queue__q_u_e_u_e_i_d_x",
            unique: true,
            fields: [{ name: "QUEUEIDX" }],
          },
        ],
      }
    );
  }
}
