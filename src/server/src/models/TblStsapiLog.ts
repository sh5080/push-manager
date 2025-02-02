import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblStsapiLogAttributes {
  api?: string;
  appId?: string;
  appSecret?: string;
  customerkey?: string;
  idx: any;
  message?: string;
  msgIdx?: string;
  referer?: string;
  regDate: string;
  resultCode?: string;
}

export type TblStsapiLogOptionalAttributes =
  | "api"
  | "appId"
  | "appSecret"
  | "customerkey"
  | "message"
  | "msgIdx"
  | "referer"
  | "resultCode";
export type TblStsapiLogCreationAttributes = Optional<
  TblStsapiLogAttributes,
  TblStsapiLogOptionalAttributes
>;

export class TblStsapiLog
  extends Model<TblStsapiLogAttributes, TblStsapiLogCreationAttributes>
  implements TblStsapiLogAttributes
{
  api?: string;
  appId?: string;
  appSecret?: string;
  customerkey?: string;
  idx!: any;
  message?: string;
  msgIdx?: string;
  referer?: string;
  regDate!: string;
  resultCode?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblStsapiLog {
    return TblStsapiLog.init(
      {
        api: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "API",
        },
        appId: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "APPID",
        },
        appSecret: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "APPSECRET",
        },
        customerkey: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "CUSTOMERKEY",
        },
        idx: {
          type: "NUMBER",
          allowNull: false,
          field: "IDX",
        },
        message: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "MESSAGE",
        },
        msgIdx: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "MSGIDX",
        },
        referer: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "REFERER",
        },
        regDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: "REG_DATE",
        },
        resultCode: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "RESULT_CODE",
        },
      },
      {
        sequelize,
        tableName: "TBL_STSAPI_LOG",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "idx_tbl_stsapi_log_a",
            fields: [{ name: "APPID" }],
          },
          {
            name: "pk_tbl_stsapi_log",
            unique: true,
            fields: [{ name: "IDX" }],
          },
        ],
      }
    );
  }
}
