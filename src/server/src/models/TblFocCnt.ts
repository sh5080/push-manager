import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblFocCntAttributes {
  createDate?: string;
  focCnt?: any;
  idx: any;
  userId: string;
}

export type TblFocCntOptionalAttributes = "createDate" | "focCnt";
export type TblFocCntCreationAttributes = Optional<TblFocCntAttributes, TblFocCntOptionalAttributes>;

export class TblFocCnt extends Model<TblFocCntAttributes, TblFocCntCreationAttributes> implements TblFocCntAttributes {
  createDate?: string;
  focCnt?: any;
  idx!: any;
  userId!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblFocCnt {
    return TblFocCnt.init({
    createDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'CREATE_DATE'
    },
    focCnt: {
      type: "NUMBER",
      allowNull: true,
      field: 'FOC_CNT'
    },
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'USER_ID'
    }
  }, {
    sequelize,
    tableName: 'TBL_FOC_CNT',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_foc_cnt",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
