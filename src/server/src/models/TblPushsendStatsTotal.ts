import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushsendStatsTotalAttributes {
  appdel?: any;
  appid?: string;
  day?: any;
  failed?: any;
  month?: any;
  opened?: any;
  pushType?: string;
  sent?: any;
  userId?: string;
  wdate?: string;
  year?: any;
}

export type TblPushsendStatsTotalOptionalAttributes = "appdel" | "appid" | "day" | "failed" | "month" | "opened" | "pushType" | "sent" | "userId" | "wdate" | "year";
export type TblPushsendStatsTotalCreationAttributes = Optional<TblPushsendStatsTotalAttributes, TblPushsendStatsTotalOptionalAttributes>;

export class TblPushsendStatsTotal extends Model<TblPushsendStatsTotalAttributes, TblPushsendStatsTotalCreationAttributes> implements TblPushsendStatsTotalAttributes {
  appdel?: any;
  appid?: string;
  day?: any;
  failed?: any;
  month?: any;
  opened?: any;
  pushType?: string;
  sent?: any;
  userId?: string;
  wdate?: string;
  year?: any;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushsendStatsTotal {
    return TblPushsendStatsTotal.init({
    appdel: {
      type: "NUMBER",
      allowNull: true,
      field: 'APPDEL'
    },
    appid: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APPID'
    },
    day: {
      type: "NUMBER",
      allowNull: true,
      field: 'DAY'
    },
    failed: {
      type: "NUMBER",
      allowNull: true,
      field: 'FAILED'
    },
    month: {
      type: "NUMBER",
      allowNull: true,
      field: 'MONTH'
    },
    opened: {
      type: "NUMBER",
      allowNull: true,
      field: 'OPENED'
    },
    pushType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PUSH_TYPE'
    },
    sent: {
      type: "NUMBER",
      allowNull: true,
      field: 'SENT'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_ID'
    },
    wdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'WDATE'
    },
    year: {
      type: "NUMBER",
      allowNull: true,
      field: 'YEAR'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHSEND_STATS_TOTAL',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_pushsend_sts_al_ymdapu",
        fields: [
          { name: "YEAR" },
          { name: "MONTH" },
          { name: "DAY" },
          { name: "APPID" },
          { name: "PUSH_TYPE" },
          { name: "USER_ID" },
        ]
      },
    ]
  });
  }
}
