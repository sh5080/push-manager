import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblMsgLabelStatsMonthAttributes {
  appid: string;
  day: any;
  labelCode: string;
  month: any;
  opened?: any;
  sent?: any;
  year: any;
}

export type TblMsgLabelStatsMonthOptionalAttributes = "opened" | "sent";
export type TblMsgLabelStatsMonthCreationAttributes = Optional<TblMsgLabelStatsMonthAttributes, TblMsgLabelStatsMonthOptionalAttributes>;

export class TblMsgLabelStatsMonth extends Model<TblMsgLabelStatsMonthAttributes, TblMsgLabelStatsMonthCreationAttributes> implements TblMsgLabelStatsMonthAttributes {
  appid!: string;
  day!: any;
  labelCode!: string;
  month!: any;
  opened?: any;
  sent?: any;
  year!: any;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblMsgLabelStatsMonth {
    return TblMsgLabelStatsMonth.init({
    appid: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'APPID'
    },
    day: {
      type: "NUMBER",
      allowNull: false,
      field: 'DAY'
    },
    labelCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'LABEL_CODE'
    },
    month: {
      type: "NUMBER",
      allowNull: false,
      field: 'MONTH'
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
    year: {
      type: "NUMBER",
      allowNull: false,
      field: 'YEAR'
    }
  }, {
    sequelize,
    tableName: 'TBL_MSG_LABEL_STATS_MONTH',
    schema: 'COKR_MBR_APP',
    timestamps: false
  });
  }
}
