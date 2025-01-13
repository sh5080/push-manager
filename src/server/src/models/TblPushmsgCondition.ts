import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushmsgConditionAttributes {
  msgIdx: any;
  resendmsgIdx: any;
  resendOpen: string;
}

export type TblPushmsgConditionCreationAttributes = TblPushmsgConditionAttributes;

export class TblPushmsgCondition extends Model<TblPushmsgConditionAttributes, TblPushmsgConditionCreationAttributes> implements TblPushmsgConditionAttributes {
  msgIdx!: any;
  resendmsgIdx!: any;
  resendOpen!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushmsgCondition {
    return TblPushmsgCondition.init({
    msgIdx: {
      type: "NUMBER",
      allowNull: false,
      field: 'MSG_IDX'
    },
    resendmsgIdx: {
      type: "NUMBER",
      allowNull: false,
      field: 'RESENDMSG_IDX'
    },
    resendOpen: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'RESEND_OPEN'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHMSG_CONDITION',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_pushmsg_condition",
        unique: true,
        fields: [
          { name: "MSG_IDX" },
        ]
      },
    ]
  });
  }
}
