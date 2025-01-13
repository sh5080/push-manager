import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblPushstssendStatsDayAttributes {
  appdel: any;
  appid: string;
  deviceType: string;
  failed: any;
  msgIdx: any;
  opened: any;
  resent: any;
  sendType: string;
  sent: any;
  sms: any;
  startd: string;
  udate: string;
  userId: string;
}

export type TblPushstssendStatsDayCreationAttributes =
  TblPushstssendStatsDayAttributes;

export class TblPushstssendStatsDay
  extends Model<
    TblPushstssendStatsDayAttributes,
    TblPushstssendStatsDayCreationAttributes
  >
  implements TblPushstssendStatsDayAttributes
{
  appdel!: any;
  appid!: string;
  deviceType!: string;
  failed!: any;
  msgIdx!: any;
  opened!: any;
  resent!: any;
  sendType!: string;
  sent!: any;
  sms!: any;
  startd!: string;
  udate!: string;
  userId!: string;

  static initModel(
    sequelize: Sequelize.Sequelize
  ): typeof TblPushstssendStatsDay {
    return TblPushstssendStatsDay.init(
      {
        appdel: {
          type: "NUMBER",
          allowNull: false,
          field: "APPDEL",
        },
        appid: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "APPID",
        },
        deviceType: {
          type: DataTypes.CHAR,
          allowNull: false,
          field: "DEVICE_TYPE",
        },
        failed: {
          type: "NUMBER",
          allowNull: false,
          field: "FAILED",
        },
        msgIdx: {
          type: DataTypes.BIGINT,
          allowNull: false,
          field: "MSG_IDX",
        },
        opened: {
          type: "NUMBER",
          allowNull: false,
          field: "OPENED",
        },
        resent: {
          type: "NUMBER",
          allowNull: false,
          field: "RESENT",
        },
        sendType: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "SEND_TYPE",
        },
        sent: {
          type: "NUMBER",
          allowNull: false,
          field: "SENT",
        },
        sms: {
          type: "NUMBER",
          allowNull: false,
          field: "SMS",
        },
        startd: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: "STARTD",
        },
        udate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: "UDATE",
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "USER_ID",
        },
      },
      {
        sequelize,
        tableName: "TBL_PUSHSTSSEND_STATS_DAY",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "idx_tbl_stssend_stats_day_as",
            fields: [{ name: "APPID" }, { name: "STARTD" }],
          },
          {
            name: "idx_tbl_stssend_stats_day_u",
            fields: [{ name: "USER_ID" }],
          },
          {
            name: "pk_tbl_pushstssend_stats_day",
            unique: true,
            fields: [
              { name: "MSG_IDX" },
              { name: "STARTD" },
              { name: "DEVICE_TYPE" },
            ],
          },
        ],
      }
    );
  }
}
