import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblOnDeviceCntAttributes {
  appid: string;
  cnt?: any;
  deviceType: string;
  udate?: string;
}

export type TblOnDeviceCntOptionalAttributes = "cnt" | "udate";
export type TblOnDeviceCntCreationAttributes = Optional<TblOnDeviceCntAttributes, TblOnDeviceCntOptionalAttributes>;

export class TblOnDeviceCnt extends Model<TblOnDeviceCntAttributes, TblOnDeviceCntCreationAttributes> implements TblOnDeviceCntAttributes {
  appid!: string;
  cnt?: any;
  deviceType!: string;
  udate?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblOnDeviceCnt {
    return TblOnDeviceCnt.init({
    appid: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'APPID'
    },
    cnt: {
      type: "NUMBER",
      allowNull: true,
      field: 'CNT'
    },
    deviceType: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'DEVICE_TYPE'
    },
    udate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'UDATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_ON_DEVICE_CNT',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_on_device_cnt",
        unique: true,
        fields: [
          { name: "APPID" },
          { name: "DEVICE_TYPE" },
        ]
      },
    ]
  });
  }
}
