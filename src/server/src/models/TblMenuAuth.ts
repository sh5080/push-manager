import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblMenuAuthAttributes {
  appId: string;
  ddx?: any;
  mcode: string;
  userId: string;
  wDate?: string;
}

export type TblMenuAuthPk = "appId" | "mcode" | "userId";
export type TblMenuAuthId = TblMenuAuth[TblMenuAuthPk];
export type TblMenuAuthOptionalAttributes = "ddx" | "wDate";
export type TblMenuAuthCreationAttributes = Optional<
  TblMenuAuthAttributes,
  TblMenuAuthOptionalAttributes
>;

export class TblMenuAuth
  extends Model<TblMenuAuthAttributes, TblMenuAuthCreationAttributes>
  implements TblMenuAuthAttributes
{
  appId!: string;
  ddx?: any;
  mcode!: string;
  userId!: string;
  wDate?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblMenuAuth {
    return TblMenuAuth.init(
      {
        appId: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
          field: "APPID",
        },
        ddx: {
          type: "NUMBER",
          allowNull: true,
          field: "DDX",
        },
        mcode: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
          field: "MCODE",
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
          field: "USER_ID",
        },
        wDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "WDATE",
        },
      },
      {
        sequelize,
        tableName: "TBL_MENU_AUTH",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "pk_tbl_menu_auth",
            unique: true,
            fields: [{ name: "USER_ID" }, { name: "MCODE" }, { name: "APPID" }],
          },
        ],
      }
    );
  }
}
