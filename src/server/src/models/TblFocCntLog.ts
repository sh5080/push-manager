import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblFocCntLogAttributes {
  createDate?: string;
  focCnt?: any;
  idx: any;
  userId?: string;
}

export type TblFocCntLogPk = "idx";
export type TblFocCntLogId = TblFocCntLog[TblFocCntLogPk];
export type TblFocCntLogOptionalAttributes = "createDate" | "focCnt" | "userId";
export type TblFocCntLogCreationAttributes = Optional<TblFocCntLogAttributes, TblFocCntLogOptionalAttributes>;

export class TblFocCntLog extends Model<TblFocCntLogAttributes, TblFocCntLogCreationAttributes> implements TblFocCntLogAttributes {
  createDate?: string;
  focCnt?: any;
  idx!: any;
  userId?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblFocCntLog {
    return TblFocCntLog.init({
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
      primaryKey: true,
      field: 'IDX'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_ID'
    }
  }, {
    sequelize,
    tableName: 'TBL_FOC_CNT_LOG',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_foc_cnt_log",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
