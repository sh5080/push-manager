import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblOffDeviceCntHistoryAttributes {
  android?: any;
  appid: string;
  hdate: string;
  ios?: any;
}

export type TblOffDeviceCntHistoryOptionalAttributes = "android" | "ios";
export type TblOffDeviceCntHistoryCreationAttributes = Optional<TblOffDeviceCntHistoryAttributes, TblOffDeviceCntHistoryOptionalAttributes>;

export class TblOffDeviceCntHistory extends Model<TblOffDeviceCntHistoryAttributes, TblOffDeviceCntHistoryCreationAttributes> implements TblOffDeviceCntHistoryAttributes {
  android?: any;
  appid!: string;
  hdate!: string;
  ios?: any;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblOffDeviceCntHistory {
    return TblOffDeviceCntHistory.init({
    android: {
      type: "NUMBER",
      allowNull: true,
      field: 'ANDROID'
    },
    appid: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'APPID'
    },
    hdate: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'HDATE'
    },
    ios: {
      type: "NUMBER",
      allowNull: true,
      field: 'IOS'
    }
  }, {
    sequelize,
    tableName: 'TBL_OFF_DEVICE_CNT_HISTORY',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_deact_device_history",
        unique: true,
        fields: [
          { name: "APPID" },
          { name: "HDATE" },
        ]
      },
    ]
  });
  }
}
