import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushqueueStatsHourAttributes {
  appid?: string;
  deviceType: string;
  endh: Date;
  failed?: any;
  opened?: any;
  sent?: any;
  starth: Date;
  udate?: Date;
  userId?: string;
}

export type TblPushqueueStatsHourOptionalAttributes = "appid" | "failed" | "opened" | "sent" | "udate" | "userId";
export type TblPushqueueStatsHourCreationAttributes = Optional<TblPushqueueStatsHourAttributes, TblPushqueueStatsHourOptionalAttributes>;

export class TblPushqueueStatsHour extends Model<TblPushqueueStatsHourAttributes, TblPushqueueStatsHourCreationAttributes> implements TblPushqueueStatsHourAttributes {
  appid?: string;
  deviceType!: string;
  endh!: Date;
  failed?: any;
  opened?: any;
  sent?: any;
  starth!: Date;
  udate?: Date;
  userId?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushqueueStatsHour {
    return TblPushqueueStatsHour.init({
    appid: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APPID'
    },
    deviceType: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'DEVICE_TYPE'
    },
    endh: {
      type: DataTypes.DATE(6),
      allowNull: false,
      field: 'ENDH'
    },
    failed: {
      type: "NUMBER",
      allowNull: true,
      field: 'FAILED'
    },
    opened: {
      type: "NUMBER",
      allowNull: true,
      field: 'OPENED'
    },
    sent: {
      type: "NUMBER",
      allowNull: true,
      field: 'SENT'
    },
    starth: {
      type: DataTypes.DATE(6),
      allowNull: false,
      field: 'STARTH'
    },
    udate: {
      type: DataTypes.DATE(6),
      allowNull: true,
      field: 'UDATE'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_ID'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHQUEUE_STATS_HOUR',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_pushqueue_stats_hour",
        unique: true,
        fields: [
          { name: "STARTH" },
          { name: "ENDH" },
          { name: "DEVICE_TYPE" },
        ]
      },
    ]
  });
  }
}
