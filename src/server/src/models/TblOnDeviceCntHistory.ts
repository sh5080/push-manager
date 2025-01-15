import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblOnDeviceCntHistoryAttributes {
  android?: any;
  androidGap?: any;
  appid?: string;
  hdate?: string;
  idx: any;
  ios?: any;
  iosGap?: any;
  wdate?: string;
}

export type TblOnDeviceCntHistoryOptionalAttributes = "android" | "androidGap" | "appid" | "hdate" | "ios" | "iosGap" | "wdate";
export type TblOnDeviceCntHistoryCreationAttributes = Optional<TblOnDeviceCntHistoryAttributes, TblOnDeviceCntHistoryOptionalAttributes>;

export class TblOnDeviceCntHistory extends Model<TblOnDeviceCntHistoryAttributes, TblOnDeviceCntHistoryCreationAttributes> implements TblOnDeviceCntHistoryAttributes {
  android?: any;
  androidGap?: any;
  appid?: string;
  hdate?: string;
  idx!: any;
  ios?: any;
  iosGap?: any;
  wdate?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblOnDeviceCntHistory {
    return TblOnDeviceCntHistory.init({
    android: {
      type: "NUMBER",
      allowNull: true,
      field: 'ANDROID'
    },
    androidGap: {
      type: "NUMBER",
      allowNull: true,
      field: 'ANDROID_GAP'
    },
    appid: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APPID'
    },
    hdate: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'HDATE'
    },
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    ios: {
      type: "NUMBER",
      allowNull: true,
      field: 'IOS'
    },
    iosGap: {
      type: "NUMBER",
      allowNull: true,
      field: 'IOS_GAP'
    },
    wdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'WDATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_ON_DEVICE_CNT_HISTORY',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_on_device_cnt_history",
        fields: [
          { name: "APPID" },
          { name: "HDATE" },
        ]
      },
      {
        name: "pk_tbl_on_device_cnt_history",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
