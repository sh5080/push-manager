import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblDwOrdAttributes {
  idx: any;
  ordAmt?: any;
  ordCnt?: any;
  ordQty?: any;
  yyyymmdd?: string;
}

export type TblDwOrdOptionalAttributes = "ordAmt" | "ordCnt" | "ordQty" | "yyyymmdd";
export type TblDwOrdCreationAttributes = Optional<TblDwOrdAttributes, TblDwOrdOptionalAttributes>;

export class TblDwOrd extends Model<TblDwOrdAttributes, TblDwOrdCreationAttributes> implements TblDwOrdAttributes {
  idx!: any;
  ordAmt?: any;
  ordCnt?: any;
  ordQty?: any;
  yyyymmdd?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblDwOrd {
    return TblDwOrd.init({
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    ordAmt: {
      type: "NUMBER",
      allowNull: true,
      field: 'ORD_AMT'
    },
    ordCnt: {
      type: "NUMBER",
      allowNull: true,
      field: 'ORD_CNT'
    },
    ordQty: {
      type: "NUMBER",
      allowNull: true,
      field: 'ORD_QTY'
    },
    yyyymmdd: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'YYYYMMDD'
    }
  }, {
    sequelize,
    tableName: 'TBL_DW_ORD',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_dw_ord_yo",
        fields: [
          { name: "YYYYMMDD" },
          { name: "ORD_QTY" },
        ]
      },
      {
        name: "idx_tbl_dw_ord_yoo",
        fields: [
          { name: "YYYYMMDD" },
          { name: "ORD_CNT" },
          { name: "ORD_QTY" },
        ]
      },
      {
        name: "idx_tbl_dw_ord_yooo",
        fields: [
          { name: "YYYYMMDD" },
          { name: "ORD_AMT" },
          { name: "ORD_CNT" },
          { name: "ORD_QTY" },
        ]
      },
      {
        name: "pk_tbl_dw_ord",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
