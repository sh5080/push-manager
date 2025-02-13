import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblDeviceTokenAttributes {
  activity: string;
  activityProc?: string;
  appId: string;
  deviceType: string;
  idx: any;
  optAgree?: string;
  token: string;
  uDate: string;
  wDate: string;
}

export type TblDeviceTokenOptionalAttributes = "activityProc" | "optAgree";
export type TblDeviceTokenCreationAttributes = Optional<
  TblDeviceTokenAttributes,
  TblDeviceTokenOptionalAttributes
>;

export class TblDeviceToken
  extends Model<TblDeviceTokenAttributes, TblDeviceTokenCreationAttributes>
  implements TblDeviceTokenAttributes
{
  activity!: string;
  activityProc?: string;
  appId!: string;
  deviceType!: string;
  idx!: any;
  optAgree?: string;
  token!: string;
  uDate!: string;
  wDate!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblDeviceToken {
    return TblDeviceToken.init(
      {
        activity: {
          type: DataTypes.CHAR,
          allowNull: false,
          field: "ACTIVITY",
        },
        activityProc: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "ACTIVITY_PROC",
        },
        appId: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "APPID",
        },
        deviceType: {
          type: DataTypes.CHAR,
          allowNull: false,
          field: "DEVICE_TYPE",
        },
        idx: {
          type: DataTypes.BIGINT,
          allowNull: false,
          field: "IDX",
        },
        optAgree: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "OPTAGREE",
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "TOKEN",
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
        tableName: "TBL_DEVICE_TOKEN",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "idx_tbl_device_token_aadi",
            fields: [
              { name: "APPID" },
              { name: "ACTIVITY" },
              { name: "DEVICE_TYPE" },
              { name: "IDX" },
            ],
          },
          {
            name: "idx_tbl_device_token_aadoi",
            fields: [
              { name: "APPID" },
              { name: "ACTIVITY" },
              { name: "DEVICE_TYPE" },
              { name: "OPTAGREE" },
              { name: "IDX" },
            ],
          },
          {
            name: "idx_tbl_device_token_appId",
            fields: [{ name: "APPID" }],
          },
          {
            name: "idx_tbl_device_token_atd",
            fields: [
              { name: "APPID" },
              { name: "TOKEN" },
              { name: "DEVICE_TYPE" },
            ],
          },
          {
            name: "idx_tbl_device_token_token",
            fields: [{ name: "TOKEN" }],
          },
          {
            name: "pk_tbl_device_token",
            unique: true,
            fields: [{ name: "IDX" }],
          },
        ],
      }
    );
  }
}
