import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblFpMasterAttributes {
  appkey?: string;
  appsecret?: string;
  cmpncode: any;
  feedbackEnddate?: Date;
  feedbackStartdate?: Date;
  feedbackStep?: string;
  fpstep?: string;
  isandroid?: string;
  isios?: string;
  msgidx?: any;
  msgidxRcvDate?: Date;
  pmode?: string;
  rendDate?: Date;
  rstartDate?: Date;
  senddate?: Date;
  step?: string;
  tendDate?: Date;
  tstartDate?: Date;
  vmsgidx?: string;
  wdate?: Date;
}

export type TblFpMasterOptionalAttributes =
  | "appkey"
  | "appsecret"
  | "feedbackEnddate"
  | "feedbackStartdate"
  | "feedbackStep"
  | "fpstep"
  | "isandroid"
  | "isios"
  | "msgidx"
  | "msgidxRcvDate"
  | "pmode"
  | "rendDate"
  | "rstartDate"
  | "senddate"
  | "step"
  | "tendDate"
  | "tstartDate"
  | "vmsgidx"
  | "wdate";
export type TblFpMasterCreationAttributes = Optional<
  TblFpMasterAttributes,
  TblFpMasterOptionalAttributes
>;

export class TblFpMaster
  extends Model<TblFpMasterAttributes, TblFpMasterCreationAttributes>
  implements TblFpMasterAttributes
{
  appkey?: string;
  appsecret?: string;
  cmpncode!: any;
  feedbackEnddate?: Date;
  feedbackStartdate?: Date;
  feedbackStep?: string;
  fpstep?: string;
  isandroid?: string;
  isios?: string;
  msgidx?: any;
  msgidxRcvDate?: Date;
  pmode?: string;
  rendDate?: Date;
  rstartDate?: Date;
  senddate?: Date;
  step?: string;
  tendDate?: Date;
  tstartDate?: Date;
  vmsgidx?: string;
  wdate?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblFpMaster {
    return TblFpMaster.init(
      {
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
        cmpncode: {
          type: "NUMBER",
          allowNull: false,
          field: "CMPNCODE",
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
        fpstep: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "FPSTEP",
        },
        isandroid: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "ISANDROID",
        },
        isios: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "ISIOS",
        },
        msgidx: {
          type: DataTypes.BIGINT,
          allowNull: true,
          field: "MSGIDX",
        },
        msgidxRcvDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "MSGIDX_RCV_DATE",
        },
        pmode: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "PMODE",
        },
        rendDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "REND_DATE",
        },
        rstartDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "RSTART_DATE",
        },
        senddate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "SENDDATE",
        },
        step: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "STEP",
        },
        tendDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "TEND_DATE",
        },
        tstartDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "TSTART_DATE",
        },
        vmsgidx: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "VMSGIDX",
        },
        wdate: {
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
