import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblPushqueueStatsDayAttributes {
  appId?: string;
  deviceType: string;
  failed?: any;
  opened?: any;
  sent?: any;
  startd: Date;
  uDate?: Date;
  userId?: string;
}

export type TblPushqueueStatsDayOptionalAttributes =
  | "appId"
  | "failed"
  | "opened"
  | "sent"
  | "uDate"
  | "userId";
export type TblPushqueueStatsDayCreationAttributes = Optional<
  TblPushqueueStatsDayAttributes,
  TblPushqueueStatsDayOptionalAttributes
>;

export class TblPushqueueStatsDay
  extends Model<
    TblPushqueueStatsDayAttributes,
    TblPushqueueStatsDayCreationAttributes
  >
  implements TblPushqueueStatsDayAttributes
{
  appId?: string;
  deviceType!: string;
  failed?: any;
  opened?: any;
  sent?: any;
  startd!: Date;
  uDate?: Date;
  userId?: string;

  static initModel(
    sequelize: Sequelize.Sequelize
  ): typeof TblPushqueueStatsDay {
    return TblPushqueueStatsDay.init(
      {
        appId: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "APPID",
        },
        deviceType: {
          type: DataTypes.CHAR,
          allowNull: false,
          field: "DEVICE_TYPE",
        },
        failed: {
          type: "NUMBER",
          allowNull: true,
          field: "FAILED",
        },
        opened: {
          type: "NUMBER",
          allowNull: true,
          field: "OPENED",
        },
        sent: {
          type: "NUMBER",
          allowNull: true,
          field: "SENT",
        },
        startd: {
          type: DataTypes.DATE(6),
          allowNull: false,
          field: "STARTD",
        },
        uDate: {
          type: DataTypes.DATE(6),
          allowNull: true,
          field: "UDATE",
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "USER_ID",
        },
      },
      {
        sequelize,
        tableName: "TBL_PUSHQUEUE_STATS_DAY",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "pk_tbl_pushqueue_stats_day",
            unique: true,
            fields: [{ name: "STARTD" }, { name: "DEVICE_TYPE" }],
          },
        ],
      }
    );
  }
}
