import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblOnDeviceCntAttributes {
  appId: string;
  cnt?: any;
  deviceType: string;
  uDate?: string;
}

export type TblOnDeviceCntOptionalAttributes = "cnt" | "uDate";
export type TblOnDeviceCntCreationAttributes = Optional<
  TblOnDeviceCntAttributes,
  TblOnDeviceCntOptionalAttributes
>;

export class TblOnDeviceCnt
  extends Model<TblOnDeviceCntAttributes, TblOnDeviceCntCreationAttributes>
  implements TblOnDeviceCntAttributes
{
  appId!: string;
  cnt?: any;
  deviceType!: string;
  uDate?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblOnDeviceCnt {
    return TblOnDeviceCnt.init(
      {
        appId: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "APPID",
        },
        cnt: {
          type: "NUMBER",
          allowNull: true,
          field: "CNT",
        },
        deviceType: {
          type: DataTypes.CHAR,
          allowNull: false,
          field: "DEVICE_TYPE",
        },
        uDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "UDATE",
        },
      },
      {
        sequelize,
        tableName: "TBL_ON_DEVICE_CNT",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "pk_tbl_on_device_cnt",
            unique: true,
            fields: [{ name: "APPID" }, { name: "DEVICE_TYPE" }],
          },
        ],
      }
    );
  }
}
