import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushsendStatsHourAttributes {
  appdel: any;
  appid: string;
  deviceType: string;
  endh: string;
  failed: any;
  msgIdx: any;
  opened: any;
  sendType: string;
  sent: any;
  sms: any;
  starth: string;
  udate: string;
  userId: string;
}

export type TblPushsendStatsHourCreationAttributes = TblPushsendStatsHourAttributes;

export class TblPushsendStatsHour extends Model<TblPushsendStatsHourAttributes, TblPushsendStatsHourCreationAttributes> implements TblPushsendStatsHourAttributes {
  appdel!: any;
  appid!: string;
  deviceType!: string;
  endh!: string;
  failed!: any;
  msgIdx!: any;
  opened!: any;
  sendType!: string;
  sent!: any;
  sms!: any;
  starth!: string;
  udate!: string;
  userId!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushsendStatsHour {
    return TblPushsendStatsHour.init({
    appdel: {
      type: "NUMBER",
      allowNull: false,
      field: 'APPDEL'
    },
    appid: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'APPID'
    },
    deviceType: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'DEVICE_TYPE'
    },
    endh: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'ENDH'
    },
    failed: {
      type: "NUMBER",
      allowNull: false,
      field: 'FAILED'
    },
    msgIdx: {
      type: "NUMBER",
      allowNull: false,
      field: 'MSG_IDX'
    },
    opened: {
      type: "NUMBER",
      allowNull: false,
      field: 'OPENED'
    },
    sendType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'SEND_TYPE'
    },
    sent: {
      type: "NUMBER",
      allowNull: false,
      field: 'SENT'
    },
    sms: {
      type: "NUMBER",
      allowNull: false,
      field: 'SMS'
    },
    starth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'STARTH'
    },
    udate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'UDATE'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'USER_ID'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHSEND_STATS_HOUR',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_pushsend_stats_hour",
        fields: [
          { name: "MSG_IDX" },
          { name: "STARTH" },
          { name: "DEVICE_TYPE" },
        ]
      },
      {
        name: "pk_tbl_pushsend_stats_hour",
        unique: true,
        fields: [
          { name: "MSG_IDX" },
          { name: "STARTH" },
          { name: "ENDH" },
          { name: "DEVICE_TYPE" },
        ]
      },
    ]
  });
  }
}
