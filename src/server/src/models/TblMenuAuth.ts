import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblMenuAuthAttributes {
  appid: string;
  ddx?: any;
  mcode: string;
  userId: string;
  wdate?: string;
}

export type TblMenuAuthPk = "appid" | "mcode" | "userId";
export type TblMenuAuthId = TblMenuAuth[TblMenuAuthPk];
export type TblMenuAuthOptionalAttributes = "ddx" | "wdate";
export type TblMenuAuthCreationAttributes = Optional<TblMenuAuthAttributes, TblMenuAuthOptionalAttributes>;

export class TblMenuAuth extends Model<TblMenuAuthAttributes, TblMenuAuthCreationAttributes> implements TblMenuAuthAttributes {
  appid!: string;
  ddx?: any;
  mcode!: string;
  userId!: string;
  wdate?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblMenuAuth {
    return TblMenuAuth.init({
    appid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'APPID'
    },
    ddx: {
      type: "NUMBER",
      allowNull: true,
      field: 'DDX'
    },
    mcode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'MCODE'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'USER_ID'
    },
    wdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'WDATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_MENU_AUTH',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_menu_auth",
        unique: true,
        fields: [
          { name: "USER_ID" },
          { name: "MCODE" },
          { name: "APPID" },
        ]
      },
    ]
  });
  }
}
