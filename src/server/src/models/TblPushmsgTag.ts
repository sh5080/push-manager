import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushmsgTagAttributes {
  msgIdx: any;
  tag: string;
}

export type TblPushmsgTagCreationAttributes = TblPushmsgTagAttributes;

export class TblPushmsgTag extends Model<TblPushmsgTagAttributes, TblPushmsgTagCreationAttributes> implements TblPushmsgTagAttributes {
  msgIdx!: any;
  tag!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushmsgTag {
    return TblPushmsgTag.init({
    msgIdx: {
      type: "NUMBER",
      allowNull: false,
      field: 'MSG_IDX'
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'TAG'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHMSG_TAG',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_pushmsg_tag",
        unique: true,
        fields: [
          { name: "MSG_IDX" },
          { name: "TAG" },
        ]
      },
    ]
  });
  }
}
