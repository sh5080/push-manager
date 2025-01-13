import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblAppTempOkeAttributes {
  identify?: string;
}

export type TblAppTempOkeOptionalAttributes = "identify";
export type TblAppTempOkeCreationAttributes = Optional<TblAppTempOkeAttributes, TblAppTempOkeOptionalAttributes>;

export class TblAppTempOke extends Model<TblAppTempOkeAttributes, TblAppTempOkeCreationAttributes> implements TblAppTempOkeAttributes {
  identify?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblAppTempOke {
    return TblAppTempOke.init({
    identify: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'IDENTIFY'
    }
  }, {
    sequelize,
    tableName: 'TBL_APP_TEMP_OKE',
    schema: 'COKR_MBR_APP',
    timestamps: false
  });
  }
}
