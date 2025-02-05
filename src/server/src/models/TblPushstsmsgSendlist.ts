import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblPushstsmsgSendlistAttributes {
  fName?: string;
  hp?: string;
  identify: string;
  idx: any;
  link?: string;
  message: string;
  msgIdx: any;
  title?: string;
  wDate: string;
}

export type TblPushstsmsgSendlistOptionalAttributes =
  | "fName"
  | "hp"
  | "link"
  | "title";
export type TblPushstsmsgSendlistCreationAttributes = Optional<
  TblPushstsmsgSendlistAttributes,
  TblPushstsmsgSendlistOptionalAttributes
>;

export class TblPushstsmsgSendlist
  extends Model<
    TblPushstsmsgSendlistAttributes,
    TblPushstsmsgSendlistCreationAttributes
  >
  implements TblPushstsmsgSendlistAttributes
{
  fName?: string;
  hp?: string;
  identify!: string;
  idx!: any;
  link?: string;
  message!: string;
  msgIdx!: any;
  title?: string;
  wDate!: string;

  static initModel(
    sequelize: Sequelize.Sequelize
  ): typeof TblPushstsmsgSendlist {
    return TblPushstsmsgSendlist.init(
      {
        fName: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "FNAME",
        },
        hp: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "HP",
        },
        identify: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "IDENTIFY",
        },
        idx: {
          type: "NUMBER",
          allowNull: false,
          field: "IDX",
        },
        link: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "LINK",
        },
        message: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "MESSAGE",
        },
        msgIdx: {
          type: "NUMBER",
          allowNull: false,
          field: "MSG_IDX",
        },
        title: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "TITLE",
        },
        wDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: "WDATE",
        },
      },
      {
        sequelize,
        tableName: "TBL_PUSHSTSMSG_SENDLIST",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "idx_tbl_pushstsmsg_sendlist_i",
            fields: [{ name: "IDENTIFY" }],
          },
          {
            name: "idx_tbl_pushstsmsg_sendlst_mii",
            fields: [
              { name: "MSG_IDX" },
              { name: "IDENTIFY" },
              { name: "IDX" },
            ],
          },
          {
            name: "pk_tbl_pushstsmsg_sendlist",
            unique: true,
            fields: [{ name: "IDX" }],
          },
        ],
      }
    );
  }
}
