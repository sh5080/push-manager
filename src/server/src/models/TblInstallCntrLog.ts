import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblInstallCntrLogAttributes {
  appId?: string;
  country?: string;
  createDate: string;
  deviceType?: string;
  idx: any;
}

export type TblInstallCntrLogOptionalAttributes =
  | "appId"
  | "country"
  | "deviceType";
export type TblInstallCntrLogCreationAttributes = Optional<
  TblInstallCntrLogAttributes,
  TblInstallCntrLogOptionalAttributes
>;

export class TblInstallCntrLog
  extends Model<
    TblInstallCntrLogAttributes,
    TblInstallCntrLogCreationAttributes
  >
  implements TblInstallCntrLogAttributes
{
  appId?: string;
  country?: string;
  createDate!: string;
  deviceType?: string;
  idx!: any;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblInstallCntrLog {
    return TblInstallCntrLog.init(
      {
        appId: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "APPID",
        },
        country: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "COUNTRY",
        },
        createDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: "CREATE_DATE",
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
      },
      {
        sequelize,
        tableName: "TBL_INSTALL_CNTR_LOG",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "pk_tbl_install_cntr_log",
            unique: true,
            fields: [{ name: "IDX" }],
          },
        ],
      }
    );
  }
}
