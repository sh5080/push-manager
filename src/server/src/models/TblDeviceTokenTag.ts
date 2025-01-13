import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblDeviceTokenTagAttributes {
  appid: string;
  tag: string;
  tokenIdx: any;
  wdate: string;
}

export type TblDeviceTokenTagCreationAttributes = TblDeviceTokenTagAttributes;

export class TblDeviceTokenTag extends Model<TblDeviceTokenTagAttributes, TblDeviceTokenTagCreationAttributes> implements TblDeviceTokenTagAttributes {
  appid!: string;
  tag!: string;
  tokenIdx!: any;
  wdate!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblDeviceTokenTag {
    return TblDeviceTokenTag.init({
    appid: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'APPID'
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'TAG'
    },
    tokenIdx: {
      type: "NUMBER",
      allowNull: false,
      field: 'TOKEN_IDX'
    },
    wdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'WDATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_DEVICE_TOKEN_TAG',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_device_token_tag_ag",
        fields: [
          { name: "APPID" },
          { name: "TAG" },
        ]
      },
      {
        name: "pk_tbl_device_token_tag",
        unique: true,
        fields: [
          { name: "TOKEN_IDX" },
          { name: "TAG" },
          { name: "APPID" },
        ]
      },
    ]
  });
  }
}
