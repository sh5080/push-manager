import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushstsstepHistoryAttributes {
  idx: any;
  msgIdx?: any;
  step?: string;
  updateDate?: string;
  userId?: string;
}

export type TblPushstsstepHistoryOptionalAttributes = "msgIdx" | "step" | "updateDate" | "userId";
export type TblPushstsstepHistoryCreationAttributes = Optional<TblPushstsstepHistoryAttributes, TblPushstsstepHistoryOptionalAttributes>;

export class TblPushstsstepHistory extends Model<TblPushstsstepHistoryAttributes, TblPushstsstepHistoryCreationAttributes> implements TblPushstsstepHistoryAttributes {
  idx!: any;
  msgIdx?: any;
  step?: string;
  updateDate?: string;
  userId?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushstsstepHistory {
    return TblPushstsstepHistory.init({
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    msgIdx: {
      type: "NUMBER",
      allowNull: true,
      field: 'MSG_IDX'
    },
    step: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'STEP'
    },
    updateDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'UPDATE_DATE'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_ID'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHSTSSTEP_HISTORY',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_pushstsstep_history",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
