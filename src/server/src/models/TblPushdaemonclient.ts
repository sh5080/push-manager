import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushdaemonclientAttributes {
  clientid: string;
  lbid: string;
  sending: string;
}

export type TblPushdaemonclientCreationAttributes = TblPushdaemonclientAttributes;

export class TblPushdaemonclient extends Model<TblPushdaemonclientAttributes, TblPushdaemonclientCreationAttributes> implements TblPushdaemonclientAttributes {
  clientid!: string;
  lbid!: string;
  sending!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushdaemonclient {
    return TblPushdaemonclient.init({
    clientid: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'CLIENTID'
    },
    lbid: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'LBID'
    },
    sending: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'SENDING'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHDAEMONCLIENT',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_pushdaemonclient",
        unique: true,
        fields: [
          { name: "LBID" },
          { name: "CLIENTID" },
        ]
      },
    ]
  });
  }
}
