import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblPushautosceduleAttributes {
  appIdx?: any;
  idx: any;
  isupdate?: any;
  queryIdx?: any;
  schDay?: string;
  schHour?: string;
  schMin?: string;
  schMonth?: string;
  schTitle?: string;
  schYoil?: string;
  uDate?: string;
  wDate?: string;
}

export type TblPushautosceduleOptionalAttributes =
  | "appIdx"
  | "isupdate"
  | "queryIdx"
  | "schDay"
  | "schHour"
  | "schMin"
  | "schMonth"
  | "schTitle"
  | "schYoil"
  | "uDate"
  | "wDate";
export type TblPushautosceduleCreationAttributes = Optional<
  TblPushautosceduleAttributes,
  TblPushautosceduleOptionalAttributes
>;

export class TblPushautoscedule
  extends Model<
    TblPushautosceduleAttributes,
    TblPushautosceduleCreationAttributes
  >
  implements TblPushautosceduleAttributes
{
  appIdx?: any;
  idx!: any;
  isupdate?: any;
  queryIdx?: any;
  schDay?: string;
  schHour?: string;
  schMin?: string;
  schMonth?: string;
  schTitle?: string;
  schYoil?: string;
  uDate?: string;
  wDate?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushautoscedule {
    return TblPushautoscedule.init(
      {
        appIdx: {
          type: "NUMBER",
          allowNull: true,
          field: "APPIDX",
        },
        idx: {
          type: "NUMBER",
          allowNull: false,
          field: "IDX",
        },
        isupdate: {
          type: "NUMBER",
          allowNull: true,
          field: "ISUPDATE",
        },
        queryIdx: {
          type: "NUMBER",
          allowNull: true,
          field: "QUERY_IDX",
        },
        schDay: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "SCH_DAY",
        },
        schHour: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "SCH_HOUR",
        },
        schMin: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "SCH_MIN",
        },
        schMonth: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "SCH_MONTH",
        },
        schTitle: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "SCH_TITLE",
        },
        schYoil: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "SCH_YOIL",
        },
        uDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "UDATE",
        },
        wDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "WDATE",
        },
      },
      {
        sequelize,
        tableName: "TBL_PUSHAUTOSCEDULE",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "idx_tbl_pushautoscedule_ia",
            fields: [{ name: "ISUPDATE" }, { name: "APPIDX" }],
          },
          {
            name: "pk_tbl_pushautoscedule",
            unique: true,
            fields: [{ name: "IDX" }],
          },
        ],
      }
    );
  }
}
