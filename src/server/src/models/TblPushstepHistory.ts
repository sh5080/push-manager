import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushstepHistoryAttributes {
  idx: any;
  msgIdx?: any;
  step?: string;
  updateDate?: string;
  userId?: string;
}

export type TblPushstepHistoryOptionalAttributes = "msgIdx" | "step" | "updateDate" | "userId";
export type TblPushstepHistoryCreationAttributes = Optional<TblPushstepHistoryAttributes, TblPushstepHistoryOptionalAttributes>;

export class TblPushstepHistory extends Model<TblPushstepHistoryAttributes, TblPushstepHistoryCreationAttributes> implements TblPushstepHistoryAttributes {
  idx!: any;
  msgIdx?: any;
  step?: string;
  updateDate?: string;
  userId?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushstepHistory {
    return TblPushstepHistory.init({
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
    tableName: 'TBL_PUSHSTEP_HISTORY',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_pushstep_history_seq",
        fields: [
          { name: "MSG_IDX" },
        ]
      },
      {
        name: "pk_tbl_pushstep_history",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
