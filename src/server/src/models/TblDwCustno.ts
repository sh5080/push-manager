import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblDwCustnoAttributes {
  custNo: any;
  idx: any;
  yyyymmdd: string;
}

export type TblDwCustnoCreationAttributes = TblDwCustnoAttributes;

export class TblDwCustno extends Model<TblDwCustnoAttributes, TblDwCustnoCreationAttributes> implements TblDwCustnoAttributes {
  custNo!: any;
  idx!: any;
  yyyymmdd!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblDwCustno {
    return TblDwCustno.init({
    custNo: {
      type: "NUMBER",
      allowNull: false,
      field: 'CUST_NO'
    },
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    yyyymmdd: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'YYYYMMDD'
    }
  }, {
    sequelize,
    tableName: 'TBL_DW_CUSTNO',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_dw_custno_yc",
        fields: [
          { name: "YYYYMMDD" },
          { name: "CUST_NO" },
        ]
      },
      {
        name: "pk_tbl_dw_custno",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
