import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblOpeninfoAttributes {
  appid?: string;
  deviceType?: string;
  idx: any;
  msgIdx?: any;
  opendate: string;
  oMode?: string;
  token?: string;
  tokenIdx?: any;
}

export type TblOpeninfoOptionalAttributes = "appid" | "deviceType" | "msgIdx" | "oMode" | "token" | "tokenIdx";
export type TblOpeninfoCreationAttributes = Optional<TblOpeninfoAttributes, TblOpeninfoOptionalAttributes>;

export class TblOpeninfo extends Model<TblOpeninfoAttributes, TblOpeninfoCreationAttributes> implements TblOpeninfoAttributes {
  appid?: string;
  deviceType?: string;
  idx!: any;
  msgIdx?: any;
  opendate!: string;
  oMode?: string;
  token?: string;
  tokenIdx?: any;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblOpeninfo {
    return TblOpeninfo.init({
    appid: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APPID'
    },
    deviceType: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'DEVICE_TYPE'
    },
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    msgIdx: {
      type: "NUMBER",
      allowNull: true,
      field: 'MSG_IDX'
    },
    opendate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'OPENDATE'
    },
    oMode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'O_MODE'
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TOKEN'
    },
    tokenIdx: {
      type: "NUMBER",
      allowNull: true,
      field: 'TOKEN_IDX'
    }
  }, {
    sequelize,
    tableName: 'TBL_OPENINFO',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_openinfo_mtm",
        fields: [
          { name: "MSG_IDX" },
          { name: "TOKEN_IDX" },
          { name: "O_MODE" },
        ]
      },
      {
        name: "idx_tbl_openinfo_mdm",
        fields: [
          { name: "MSG_IDX" },
          { name: "DEVICE_TYPE" },
          { name: "O_MODE" },
        ]
      },
      {
        name: "idx_tbl_openinfo_o",
        fields: [
          { name: "OPENDATE" },
        ]
      },
      {
        name: "pk_tbl_openinfo",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
