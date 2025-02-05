import * as Sequelize from "sequelize";
import { DataTypes, literal, Model, Optional } from "sequelize";

export interface TblFpMasterAttributes {
  appKey?: string;
  appSecret?: string;
  cmpncode: any;
  feedbackEnddate?: Date;
  feedbackStartdate?: Date;
  feedbackStep?: string;
  fpStep?: string;
  isAndroid?: string;
  isIos?: string;
  msgIdx?: any;
  msgIdxRcvDate?: Date;
  pMode?: string;
  rEndDate: Date | string;
  rStartDate: Date | string;

  sendDate?: Date;
  step?: string;
  tEndDate?: Date;
  tStartDate?: Date;
  vMsgIdx?: string;
  wDate?: Date;
}

export type TblFpMasterOptionalAttributes =
  | "appKey"
  | "appSecret"
  | "feedbackEnddate"
  | "feedbackStartdate"
  | "feedbackStep"
  | "fpStep"
  | "isAndroid"
  | "isIos"
  | "msgIdx"
  | "msgIdxRcvDate"
  | "pMode"
  | "rEndDate"
  | "rStartDate"
  | "sendDate"
  | "step"
  | "tEndDate"
  | "tStartDate"
  | "vMsgIdx"
  | "wDate";
export type TblFpMasterCreationAttributes = Optional<
  TblFpMasterAttributes,
  TblFpMasterOptionalAttributes
>;

export class TblFpMaster
  extends Model<TblFpMasterAttributes, TblFpMasterCreationAttributes>
  implements TblFpMasterAttributes
{
  appKey?: string;
  appSecret?: string;
  cmpncode!: any;
  feedbackEnddate?: Date;
  feedbackStartdate?: Date;
  feedbackStep?: string;
  fpStep?: string;
  isAndroid?: string;
  isIos?: string;
  msgIdx?: any;
  msgIdxRcvDate?: Date;
  pMode?: string;
  rEndDate!: Date;
  rStartDate!: Date;
  sendDate?: Date;
  step?: string;
  tEndDate?: Date;
  tStartDate?: Date;
  vMsgIdx?: string;
  wDate?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblFpMaster {
    return TblFpMaster.init(
      {
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
        cmpncode: {
          type: "NUMBER",
          allowNull: false,
          field: "CMPNCODE",
          primaryKey: true,
        },
        feedbackEnddate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "FEEDBACK_ENDDATE",
        },
        feedbackStartdate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "FEEDBACK_STARTDATE",
        },
        feedbackStep: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "FEEDBACK_STEP",
        },
        fpStep: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "FPSTEP",
        },
        isAndroid: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "ISANDROID",
        },
        isIos: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "ISIOS",
        },
        msgIdx: {
          type: DataTypes.BIGINT,
          allowNull: true,
          field: "MSGIDX",
        },
        msgIdxRcvDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "MSGIDX_RCV_DATE",
        },
        pMode: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "PMODE",
        },
        rEndDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "REND_DATE",
        },
        rStartDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "RSTART_DATE",
        },
        sendDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "SENDDATE",
        },
        step: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "STEP",
        },
        tEndDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "TEND_DATE",
        },
        tStartDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "TSTART_DATE",
        },
        vMsgIdx: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "VMSGIDX",
        },
        wDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "WDATE",
        },
      },
      {
        sequelize,
        tableName: "TBL_FP_MASTER",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "idx_fp_mas",
            fields: [{ name: "CMPNCODE" }, { name: "STEP" }, { name: "PMODE" }],
          },
          {
            name: "tbl_fp_master__c_m_p_n_c_o_d_e",
            unique: true,
            fields: [{ name: "CMPNCODE" }],
          },
        ],
      }
    );
  }
}
