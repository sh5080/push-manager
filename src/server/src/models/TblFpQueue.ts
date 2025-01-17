import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblFpQueueAttributes {
  androidBadge: any;
  androidSound: string;
  andPriority?: string;
  appkey?: string;
  appsecret?: string;
  beschmode?: string;
  bgcolor?: string;
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
  failtochannel?: any;
  feedbackdate?: Date;
  fname?: string;
  fontcolor?: string;
  identify?: string;
  iosBadge: any;
  iosSound: string;
  isetiquette?: string;
  kKkoBtnInfo?: string;
  kKkoBtnType?: string;
  kKkoFailover?: any;
  kTemplateCode?: string;
  labelCode?: string;
  lngtMessage1?: string;
  lngtMessage2?: string;
  lngtMessage3?: string;
  lngtMessage4?: string;
  msgcontents: string;
  msgtitle?: string;
  ofbTime?: string;
  optagree?: string;
  plink?: string;
  pmode: string;
  ptag?: string;
  queueidx: any;
  resultdate?: Date;
  rno?: string;
  senddate?: Date;
  sendStat: string;
  sno?: string;
  step: string;
  txtMsgcontents?: string;
  txtMsgtitle?: string;
  udate: Date;
  wdate: Date;
}

export type TblFpQueueOptionalAttributes =
  | "andPriority"
  | "appkey"
  | "appsecret"
  | "beschmode"
  | "bgcolor"
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
  | "failtochannel"
  | "feedbackdate"
  | "fname"
  | "fontcolor"
  | "identify"
  | "isetiquette"
  | "kKkoBtnInfo"
  | "kKkoBtnType"
  | "kKkoFailover"
  | "kTemplateCode"
  | "labelCode"
  | "lngtMessage1"
  | "lngtMessage2"
  | "lngtMessage3"
  | "lngtMessage4"
  | "msgtitle"
  | "ofbTime"
  | "optagree"
  | "plink"
  | "ptag"
  | "resultdate"
  | "rno"
  | "senddate"
  | "sno"
  | "txtMsgcontents"
  | "txtMsgtitle";
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
  appkey?: string;
  appsecret?: string;
  beschmode?: string;
  bgcolor?: string;
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
  failtochannel?: any;
  feedbackdate?: Date;
  fname?: string;
  fontcolor?: string;
  identify?: string;
  iosBadge!: any;
  iosSound!: string;
  isetiquette?: string;
  kKkoBtnInfo?: string;
  kKkoBtnType?: string;
  kKkoFailover?: any;
  kTemplateCode?: string;
  labelCode?: string;
  lngtMessage1?: string;
  lngtMessage2?: string;
  lngtMessage3?: string;
  lngtMessage4?: string;
  msgcontents!: string;
  msgtitle?: string;
  ofbTime?: string;
  optagree?: string;
  plink?: string;
  pmode!: string;
  ptag?: string;
  queueidx!: any;
  resultdate?: Date;
  rno?: string;
  senddate?: Date;
  sendStat!: string;
  sno?: string;
  step!: string;
  txtMsgcontents?: string;
  txtMsgtitle?: string;
  udate!: Date;
  wdate!: Date;

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
        appkey: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "APPKEY",
        },
        appsecret: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "APPSECRET",
        },
        beschmode: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "BESCHMODE",
        },
        bgcolor: {
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
        failtochannel: {
          type: "NUMBER",
          allowNull: true,
          field: "FAILTOCHANNEL",
        },
        feedbackdate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "FEEDBACKDATE",
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
        isetiquette: {
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
        msgcontents: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "MSGCONTENTS",
        },
        msgtitle: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "MSGTITLE",
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
        plink: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "PLINK",
        },
        pmode: {
          type: DataTypes.CHAR,
          allowNull: false,
          field: "PMODE",
        },
        ptag: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "PTAG",
        },
        queueidx: {
          type: "NUMBER",
          allowNull: false,
          field: "QUEUEIDX",
          primaryKey: true,
        },
        resultdate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "RESULTDATE",
        },
        rno: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "RNO",
        },
        senddate: {
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
        txtMsgcontents: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "TXT_MSGCONTENTS",
        },
        txtMsgtitle: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "TXT_MSGTITLE",
        },
        udate: {
          type: DataTypes.DATE(6),
          allowNull: false,
          field: "UDATE",
        },
        wdate: {
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
