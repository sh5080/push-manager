import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblDwPvAttributes {
  idx: any;
  pvCnt?: any;
  yyyymmdd?: string;
}

export type TblDwPvOptionalAttributes = "pvCnt" | "yyyymmdd";
export type TblDwPvCreationAttributes = Optional<TblDwPvAttributes, TblDwPvOptionalAttributes>;

export class TblDwPv extends Model<TblDwPvAttributes, TblDwPvCreationAttributes> implements TblDwPvAttributes {
  idx!: any;
  pvCnt?: any;
  yyyymmdd?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblDwPv {
    return TblDwPv.init({
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    pvCnt: {
      type: "NUMBER",
      allowNull: true,
      field: 'PV_CNT'
    },
    yyyymmdd: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'YYYYMMDD'
    }
  }, {
    sequelize,
    tableName: 'TBL_DW_PV',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_dw_pv_yp",
        fields: [
          { name: "YYYYMMDD" },
          { name: "PV_CNT" },
        ]
      },
      {
        name: "pk_tbl_dw_pv",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
