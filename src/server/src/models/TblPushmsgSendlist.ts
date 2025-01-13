import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushmsgSendlistAttributes {
  msgIdx: any;
  tokenIdx: any;
}

export type TblPushmsgSendlistCreationAttributes = TblPushmsgSendlistAttributes;

export class TblPushmsgSendlist extends Model<TblPushmsgSendlistAttributes, TblPushmsgSendlistCreationAttributes> implements TblPushmsgSendlistAttributes {
  msgIdx!: any;
  tokenIdx!: any;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushmsgSendlist {
    return TblPushmsgSendlist.init({
    msgIdx: {
      type: "NUMBER",
      allowNull: false,
      field: 'MSG_IDX'
    },
    tokenIdx: {
      type: "NUMBER",
      allowNull: false,
      field: 'TOKEN_IDX'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHMSG_SENDLIST',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_pushmsg_sendlist",
        unique: true,
        fields: [
          { name: "MSG_IDX" },
          { name: "TOKEN_IDX" },
        ]
      },
    ]
  });
  }
}
