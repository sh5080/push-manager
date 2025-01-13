import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblDwCtgAttributes {
  idx: any;
  stdLCtgId?: any;
  stdMCtgId: any;
  stdSCtgId?: any;
  yyyymmdd?: string;
}

export type TblDwCtgOptionalAttributes = "stdLCtgId" | "stdSCtgId" | "yyyymmdd";
export type TblDwCtgCreationAttributes = Optional<TblDwCtgAttributes, TblDwCtgOptionalAttributes>;

export class TblDwCtg extends Model<TblDwCtgAttributes, TblDwCtgCreationAttributes> implements TblDwCtgAttributes {
  idx!: any;
  stdLCtgId?: any;
  stdMCtgId!: any;
  stdSCtgId?: any;
  yyyymmdd?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblDwCtg {
    return TblDwCtg.init({
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    stdLCtgId: {
      type: "NUMBER",
      allowNull: true,
      field: 'STD_L_CTG_ID'
    },
    stdMCtgId: {
      type: "NUMBER",
      allowNull: false,
      field: 'STD_M_CTG_ID'
    },
    stdSCtgId: {
      type: "NUMBER",
      allowNull: true,
      field: 'STD_S_CTG_ID'
    },
    yyyymmdd: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'YYYYMMDD'
    }
  }, {
    sequelize,
    tableName: 'TBL_DW_CTG',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_dw_ctg_ys",
        fields: [
          { name: "YYYYMMDD" },
          { name: "STD_M_CTG_ID" },
        ]
      },
      {
        name: "pk_tbl_dw_ctg",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
