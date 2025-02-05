import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblDeviceTokenOptionAttributes {
  appIntVersion?: any;
  appVersion?: string;
  country?: string;
  identify: string;
  osVersion?: string;
  sdkVersion?: any;
  timezone?: any;
  tokenIdx: any;
  uDate: string;
  wDate: string;
}

export type TblDeviceTokenOptionOptionalAttributes =
  | "appIntVersion"
  | "appVersion"
  | "country"
  | "osVersion"
  | "sdkVersion"
  | "timezone";
export type TblDeviceTokenOptionCreationAttributes = Optional<
  TblDeviceTokenOptionAttributes,
  TblDeviceTokenOptionOptionalAttributes
>;

export class TblDeviceTokenOption
  extends Model<
    TblDeviceTokenOptionAttributes,
    TblDeviceTokenOptionCreationAttributes
  >
  implements TblDeviceTokenOptionAttributes
{
  appIntVersion?: any;
  appVersion?: string;
  country?: string;
  identify!: string;
  osVersion?: string;
  sdkVersion?: any;
  timezone?: any;
  tokenIdx!: any;
  uDate!: string;
  wDate!: string;

  static initModel(
    sequelize: Sequelize.Sequelize
  ): typeof TblDeviceTokenOption {
    return TblDeviceTokenOption.init(
      {
        appIntVersion: {
          type: "NUMBER",
          allowNull: true,
          field: "APPINTVERSION",
        },
        appVersion: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "APPVERSION",
        },
        country: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "COUNTRY",
        },
        identify: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "IDENTIFY",
        },
        osVersion: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "OSVERSION",
        },
        sdkVersion: {
          type: "NUMBER",
          allowNull: true,
          field: "SDKVERSION",
        },
        timezone: {
          type: "NUMBER",
          allowNull: true,
          field: "TIMEZONE",
        },
        tokenIdx: {
          type: "NUMBER",
          allowNull: false,
          field: "TOKEN_IDX",
        },
        uDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: "UDATE",
        },
        wDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: "WDATE",
        },
      },
      {
        sequelize,
        tableName: "TBL_DEVICE_TOKEN_OPTION",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "idx_tbl_device_token_option_i",
            fields: [{ name: "IDENTIFY" }],
          },
          {
            name: "idx_tbl_device_token_opt_aiv",
            fields: [{ name: "APPINTVERSION" }],
          },
          {
            name: "pk_tbl_device_token_option",
            unique: true,
            fields: [{ name: "TOKEN_IDX" }],
          },
        ],
      }
    );
  }
}
