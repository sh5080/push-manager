import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblDeviceTokenOptionAttributes {
  appintversion?: any;
  appversion?: string;
  country?: string;
  identify: string;
  osversion?: string;
  sdkversion?: any;
  timezone?: any;
  tokenIdx: any;
  udate: string;
  wdate: string;
}

export type TblDeviceTokenOptionOptionalAttributes = "appintversion" | "appversion" | "country" | "osversion" | "sdkversion" | "timezone";
export type TblDeviceTokenOptionCreationAttributes = Optional<TblDeviceTokenOptionAttributes, TblDeviceTokenOptionOptionalAttributes>;

export class TblDeviceTokenOption extends Model<TblDeviceTokenOptionAttributes, TblDeviceTokenOptionCreationAttributes> implements TblDeviceTokenOptionAttributes {
  appintversion?: any;
  appversion?: string;
  country?: string;
  identify!: string;
  osversion?: string;
  sdkversion?: any;
  timezone?: any;
  tokenIdx!: any;
  udate!: string;
  wdate!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblDeviceTokenOption {
    return TblDeviceTokenOption.init({
    appintversion: {
      type: "NUMBER",
      allowNull: true,
      field: 'APPINTVERSION'
    },
    appversion: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APPVERSION'
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'COUNTRY'
    },
    identify: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'IDENTIFY'
    },
    osversion: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OSVERSION'
    },
    sdkversion: {
      type: "NUMBER",
      allowNull: true,
      field: 'SDKVERSION'
    },
    timezone: {
      type: "NUMBER",
      allowNull: true,
      field: 'TIMEZONE'
    },
    tokenIdx: {
      type: "NUMBER",
      allowNull: false,
      field: 'TOKEN_IDX'
    },
    udate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'UDATE'
    },
    wdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'WDATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_DEVICE_TOKEN_OPTION',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_device_token_option_i",
        fields: [
          { name: "IDENTIFY" },
        ]
      },
      {
        name: "idx_tbl_device_token_opt_aiv",
        fields: [
          { name: "APPINTVERSION" },
        ]
      },
      {
        name: "pk_tbl_device_token_option",
        unique: true,
        fields: [
          { name: "TOKEN_IDX" },
        ]
      },
    ]
  });
  }
}
