import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblPushstssendAttributes {
  beresend?: string;
  deviceType?: string;
  idx: any;
  msgIdx: any;
  openDate?: string;
  opened?: string;
  result: string;
  resultMsg?: string;
  sendDate?: string;
  sendlistIdx?: any;
  token?: string;
  tokenIdx?: any;
}

export type TblPushstssendOptionalAttributes =
  | "beresend"
  | "deviceType"
  | "openDate"
  | "opened"
  | "resultMsg"
  | "sendDate"
  | "sendlistIdx"
  | "token"
  | "tokenIdx";
export type TblPushstssendCreationAttributes = Optional<
  TblPushstssendAttributes,
  TblPushstssendOptionalAttributes
>;

export class TblPushstssend
  extends Model<TblPushstssendAttributes, TblPushstssendCreationAttributes>
  implements TblPushstssendAttributes
{
  beresend?: string;
  deviceType?: string;
  idx!: any;
  msgIdx!: any;
  openDate?: string;
  opened?: string;
  result!: string;
  resultMsg?: string;
  sendDate?: string;
  sendlistIdx?: any;
  token?: string;
  tokenIdx?: any;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushstssend {
    return TblPushstssend.init(
      {
        beresend: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "BERESEND",
        },
        deviceType: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "DEVICE_TYPE",
        },
        idx: {
          type: "NUMBER",
          allowNull: false,
          field: "IDX",
        },
        msgIdx: {
          type: "NUMBER",
          allowNull: false,
          field: "MSG_IDX",
        },
        openDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "OPENDATE",
        },
        opened: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "OPENED",
        },
        result: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "RESULT",
        },
        resultMsg: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "RESULTMSG",
        },
        sendDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "SENDDATE",
        },
        sendlistIdx: {
          type: "NUMBER",
          allowNull: true,
          field: "SENDLIST_IDX",
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "TOKEN",
        },
        tokenIdx: {
          type: "NUMBER",
          allowNull: true,
          field: "TOKEN_IDX",
        },
      },
      {
        sequelize,
        tableName: "TBL_PUSHSTSSEND",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "idx_pushstssend_s",
            fields: [{ name: "SENDLIST_IDX" }],
          },
          {
            name: "idx_pushstssend_ss",
            fields: [{ name: "SENDDATE" }],
          },
          {
            name: "idx_tbl_pushstssend_d",
            fields: [{ name: "DEVICE_TYPE" }],
          },
          {
            name: "idx_tbl_pushstssend_m",
            fields: [{ name: "MSG_IDX" }, { name: "TOKEN_IDX" }],
          },
          {
            name: "idx_tbl_pusstssend_t",
            fields: [{ name: "TOKEN_IDX" }],
          },
          {
            name: "pk_tbl_pushstssend",
            unique: true,
            fields: [{ name: "IDX" }],
          },
        ],
      }
    );
  }
}
