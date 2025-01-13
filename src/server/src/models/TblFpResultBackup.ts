import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblFpResultBackupAttributes {
  androidBadge: any;
  androidSound: string;
  andPriority?: string;
  appkey?: string;
  appsecret?: string;
  beschmode?: string;
  bgcolor?: string;
  customKey1?: string;
  customKey2?: string;
  customKey3?: string;
  customValue1?: string;
  customValue2?: string;
  customValue3?: string;
  errorCode?: string;
  errorTxt?: string;
  etiquetteEtime?: any;
  etiquetteStime?: any;
  extra1?: any;
  extra2?: string;
  extra3?: string;
  feedbackdate?: Date;
  fname?: string;
  fontcolor?: string;
  identify?: string;
  iosBadge: any;
  iosSound: string;
  isetiquette?: string;
  labelCode?: string;
  lngtMessage1?: string;
  lngtMessage2?: string;
  lngtMessage3?: string;
  lngtMessage4?: string;
  msgcontents: string;
  msgidx?: any;
  msgtitle?: string;
  ofbTime?: string;
  optagree?: string;
  plink?: string;
  pmode: string;
  ptag?: string;
  queueidx: any;
  resultdate?: Date;
  retry?: any;
  senddate?: Date;
  sendStat: string;
  step: string;
  udate?: Date;
  wdate?: Date;
}

export type TblFpResultBackupOptionalAttributes = "andPriority" | "appkey" | "appsecret" | "beschmode" | "bgcolor" | "customKey1" | "customKey2" | "customKey3" | "customValue1" | "customValue2" | "customValue3" | "errorCode" | "errorTxt" | "etiquetteEtime" | "etiquetteStime" | "extra1" | "extra2" | "extra3" | "feedbackdate" | "fname" | "fontcolor" | "identify" | "isetiquette" | "labelCode" | "lngtMessage1" | "lngtMessage2" | "lngtMessage3" | "lngtMessage4" | "msgidx" | "msgtitle" | "ofbTime" | "optagree" | "plink" | "ptag" | "resultdate" | "retry" | "senddate" | "udate" | "wdate";
export type TblFpResultBackupCreationAttributes = Optional<TblFpResultBackupAttributes, TblFpResultBackupOptionalAttributes>;

export class TblFpResultBackup extends Model<TblFpResultBackupAttributes, TblFpResultBackupCreationAttributes> implements TblFpResultBackupAttributes {
  androidBadge!: any;
  androidSound!: string;
  andPriority?: string;
  appkey?: string;
  appsecret?: string;
  beschmode?: string;
  bgcolor?: string;
  customKey1?: string;
  customKey2?: string;
  customKey3?: string;
  customValue1?: string;
  customValue2?: string;
  customValue3?: string;
  errorCode?: string;
  errorTxt?: string;
  etiquetteEtime?: any;
  etiquetteStime?: any;
  extra1?: any;
  extra2?: string;
  extra3?: string;
  feedbackdate?: Date;
  fname?: string;
  fontcolor?: string;
  identify?: string;
  iosBadge!: any;
  iosSound!: string;
  isetiquette?: string;
  labelCode?: string;
  lngtMessage1?: string;
  lngtMessage2?: string;
  lngtMessage3?: string;
  lngtMessage4?: string;
  msgcontents!: string;
  msgidx?: any;
  msgtitle?: string;
  ofbTime?: string;
  optagree?: string;
  plink?: string;
  pmode!: string;
  ptag?: string;
  queueidx!: any;
  resultdate?: Date;
  retry?: any;
  senddate?: Date;
  sendStat!: string;
  step!: string;
  udate?: Date;
  wdate?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblFpResultBackup {
    return TblFpResultBackup.init({
    androidBadge: {
      type: "NUMBER",
      allowNull: false,
      field: 'ANDROID_BADGE'
    },
    androidSound: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ANDROID_SOUND'
    },
    andPriority: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'AND_PRIORITY'
    },
    appkey: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APPKEY'
    },
    appsecret: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APPSECRET'
    },
    beschmode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'BESCHMODE'
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
    errorCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ERROR_CODE'
    },
    errorTxt: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ERROR_TXT'
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
    extra1: {
      type: "NUMBER",
      allowNull: true,
      field: 'EXTRA1'
    },
    extra2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'EXTRA2'
    },
    extra3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'EXTRA3'
    },
    feedbackdate: {
      type: DataTypes.DATE(6),
      allowNull: true,
      field: 'FEEDBACKDATE'
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
    identify: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'IDENTIFY'
    },
    iosBadge: {
      type: "NUMBER",
      allowNull: false,
      field: 'IOS_BADGE'
    },
    iosSound: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'IOS_SOUND'
    },
    isetiquette: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'ISETIQUETTE'
    },
    labelCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'LABEL_CODE'
    },
    lngtMessage1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'LNGT_MESSAGE1'
    },
    lngtMessage2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'LNGT_MESSAGE2'
    },
    lngtMessage3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'LNGT_MESSAGE3'
    },
    lngtMessage4: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'LNGT_MESSAGE4'
    },
    msgcontents: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MSGCONTENTS'
    },
    msgidx: {
      type: "NUMBER",
      allowNull: true,
      field: 'MSGIDX'
    },
    msgtitle: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MSGTITLE'
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
    plink: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PLINK'
    },
    pmode: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'PMODE'
    },
    ptag: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PTAG'
    },
    queueidx: {
      type: "NUMBER",
      allowNull: false,
      field: 'QUEUEIDX'
    },
    resultdate: {
      type: DataTypes.DATE(6),
      allowNull: true,
      field: 'RESULTDATE'
    },
    retry: {
      type: "NUMBER",
      allowNull: true,
      field: 'RETRY'
    },
    senddate: {
      type: DataTypes.DATE(6),
      allowNull: true,
      field: 'SENDDATE'
    },
    sendStat: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'SEND_STAT'
    },
    step: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'STEP'
    },
    udate: {
      type: DataTypes.DATE(6),
      allowNull: true,
      field: 'UDATE'
    },
    wdate: {
      type: DataTypes.DATE(6),
      allowNull: true,
      field: 'WDATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_FP_RESULT_BACKUP',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_mi_1730389151693",
        fields: [
          { name: "MSGIDX" },
          { name: "IDENTIFY" },
        ]
      },
      {
        name: "tbl_fp_result_backup__q_u_e_u_e_i_d_x",
        unique: true,
        fields: [
          { name: "QUEUEIDX" },
        ]
      },
    ]
  });
  }
}
