import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushautosceduleAttributes {
  appidx?: any;
  idx: any;
  isupdate?: any;
  queryIdx?: any;
  schDay?: string;
  schHour?: string;
  schMin?: string;
  schMonth?: string;
  schTitle?: string;
  schYoil?: string;
  udate?: string;
  wdate?: string;
}

export type TblPushautosceduleOptionalAttributes = "appidx" | "isupdate" | "queryIdx" | "schDay" | "schHour" | "schMin" | "schMonth" | "schTitle" | "schYoil" | "udate" | "wdate";
export type TblPushautosceduleCreationAttributes = Optional<TblPushautosceduleAttributes, TblPushautosceduleOptionalAttributes>;

export class TblPushautoscedule extends Model<TblPushautosceduleAttributes, TblPushautosceduleCreationAttributes> implements TblPushautosceduleAttributes {
  appidx?: any;
  idx!: any;
  isupdate?: any;
  queryIdx?: any;
  schDay?: string;
  schHour?: string;
  schMin?: string;
  schMonth?: string;
  schTitle?: string;
  schYoil?: string;
  udate?: string;
  wdate?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushautoscedule {
    return TblPushautoscedule.init({
    appidx: {
      type: "NUMBER",
      allowNull: true,
      field: 'APPIDX'
    },
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    isupdate: {
      type: "NUMBER",
      allowNull: true,
      field: 'ISUPDATE'
    },
    queryIdx: {
      type: "NUMBER",
      allowNull: true,
      field: 'QUERY_IDX'
    },
    schDay: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'SCH_DAY'
    },
    schHour: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'SCH_HOUR'
    },
    schMin: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'SCH_MIN'
    },
    schMonth: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'SCH_MONTH'
    },
    schTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'SCH_TITLE'
    },
    schYoil: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'SCH_YOIL'
    },
    udate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'UDATE'
    },
    wdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'WDATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHAUTOSCEDULE',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_pushautoscedule_ia",
        fields: [
          { name: "ISUPDATE" },
          { name: "APPIDX" },
        ]
      },
      {
        name: "pk_tbl_pushautoscedule",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
