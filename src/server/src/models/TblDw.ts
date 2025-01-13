import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblDwAttributes {
  buyerId?: any;
  custNo: any;
  etlDate?: any;
  idx: any;
  ordAmt?: any;
  ordCnt?: any;
  ordQty?: any;
  pvCnt?: any;
  stdLCtgId?: any;
  stdMCtgId?: any;
  stdSCtgId?: any;
  yyyymmdd?: string;
}

export type TblDwOptionalAttributes = "buyerId" | "etlDate" | "ordAmt" | "ordCnt" | "ordQty" | "pvCnt" | "stdLCtgId" | "stdMCtgId" | "stdSCtgId" | "yyyymmdd";
export type TblDwCreationAttributes = Optional<TblDwAttributes, TblDwOptionalAttributes>;

export class TblDw extends Model<TblDwAttributes, TblDwCreationAttributes> implements TblDwAttributes {
  buyerId?: any;
  custNo!: any;
  etlDate?: any;
  idx!: any;
  ordAmt?: any;
  ordCnt?: any;
  ordQty?: any;
  pvCnt?: any;
  stdLCtgId?: any;
  stdMCtgId?: any;
  stdSCtgId?: any;
  yyyymmdd?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblDw {
    return TblDw.init({
    buyerId: {
      type: "NUMBER",
      allowNull: true,
      field: 'BUYER_ID'
    },
    custNo: {
      type: "NUMBER",
      allowNull: false,
      field: 'CUST_NO'
    },
    etlDate: {
      type: "NUMBER",
      allowNull: true,
      field: 'ETL_DATE'
    },
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
    pvCnt: {
      type: "NUMBER",
      allowNull: true,
      field: 'PV_CNT'
    },
    stdLCtgId: {
      type: "NUMBER",
      allowNull: true,
      field: 'STD_L_CTG_ID'
    },
    stdMCtgId: {
      type: "NUMBER",
      allowNull: true,
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
    tableName: 'TBL_DW',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_dw_yo",
        fields: [
          { name: "YYYYMMDD" },
          { name: "ORD_AMT" },
        ]
      },
      {
        name: "pk_tbl_dw",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
