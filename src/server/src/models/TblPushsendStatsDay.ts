import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushsendStatsDayAttributes {
  appdel: any;
  appid: string;
  deviceType: string;
  failed: any;
  msgIdx: any;
  opened: any;
  sendType: string;
  sent: any;
  sms: any;
  startd: string;
  udate: string;
  userId: string;
}

export type TblPushsendStatsDayCreationAttributes = TblPushsendStatsDayAttributes;

export class TblPushsendStatsDay extends Model<TblPushsendStatsDayAttributes, TblPushsendStatsDayCreationAttributes> implements TblPushsendStatsDayAttributes {
  appdel!: any;
  appid!: string;
  deviceType!: string;
  failed!: any;
  msgIdx!: any;
  opened!: any;
  sendType!: string;
  sent!: any;
  sms!: any;
  startd!: string;
  udate!: string;
  userId!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushsendStatsDay {
    return TblPushsendStatsDay.init({
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
    startd: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'STARTD'
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
    tableName: 'TBL_PUSHSEND_STATS_DAY',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_pushsend_stats_day_as",
        fields: [
          { name: "APPID" },
          { name: "STARTD" },
        ]
      },
      {
        name: "idx_tbl_pushsend_stats_day_u",
        fields: [
          { name: "USER_ID" },
        ]
      },
      {
        name: "pk_tbl_pushsend_stats_day",
        unique: true,
        fields: [
          { name: "MSG_IDX" },
          { name: "STARTD" },
          { name: "DEVICE_TYPE" },
        ]
      },
    ]
  });
  }
}
