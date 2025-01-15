import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushstssendStatsMonthAttributes {
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
  startm: any;
  starty: any;
  udate: string;
  userId: string;
}

export type TblPushstssendStatsMonthCreationAttributes = TblPushstssendStatsMonthAttributes;

export class TblPushstssendStatsMonth extends Model<TblPushstssendStatsMonthAttributes, TblPushstssendStatsMonthCreationAttributes> implements TblPushstssendStatsMonthAttributes {
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
  startm!: any;
  starty!: any;
  udate!: string;
  userId!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushstssendStatsMonth {
    return TblPushstssendStatsMonth.init({
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
    resent: {
      type: "NUMBER",
      allowNull: false,
      field: 'RESENT'
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
    startm: {
      type: "NUMBER",
      allowNull: false,
      field: 'STARTM'
    },
    starty: {
      type: "NUMBER",
      allowNull: false,
      field: 'STARTY'
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
    tableName: 'TBL_PUSHSTSSEND_STATS_MONTH',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_pushstssend_stats_month",
        unique: true,
        fields: [
          { name: "MSG_IDX" },
          { name: "STARTY" },
          { name: "STARTM" },
          { name: "DEVICE_TYPE" },
        ]
      },
    ]
  });
  }
}
