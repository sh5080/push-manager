import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblDwBuyerAttributes {
  buyerId?: any;
  idx: any;
  yyyymmdd?: string;
}

export type TblDwBuyerOptionalAttributes = "buyerId" | "yyyymmdd";
export type TblDwBuyerCreationAttributes = Optional<TblDwBuyerAttributes, TblDwBuyerOptionalAttributes>;

export class TblDwBuyer extends Model<TblDwBuyerAttributes, TblDwBuyerCreationAttributes> implements TblDwBuyerAttributes {
  buyerId?: any;
  idx!: any;
  yyyymmdd?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblDwBuyer {
    return TblDwBuyer.init({
    buyerId: {
      type: "NUMBER",
      allowNull: true,
      field: 'BUYER_ID'
    },
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    yyyymmdd: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'YYYYMMDD'
    }
  }, {
    sequelize,
    tableName: 'TBL_DW_BUYER',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_dw_buyer_yb",
        fields: [
          { name: "YYYYMMDD" },
          { name: "BUYER_ID" },
        ]
      },
      {
        name: "pk_tbl_dw_buyer",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
