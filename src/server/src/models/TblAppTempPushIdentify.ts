import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblAppTempPushIdentifyAttributes {
  identify?: string;
}

export type TblAppTempPushIdentifyOptionalAttributes = "identify";
export type TblAppTempPushIdentifyCreationAttributes = Optional<TblAppTempPushIdentifyAttributes, TblAppTempPushIdentifyOptionalAttributes>;

export class TblAppTempPushIdentify extends Model<TblAppTempPushIdentifyAttributes, TblAppTempPushIdentifyCreationAttributes> implements TblAppTempPushIdentifyAttributes {
  identify?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblAppTempPushIdentify {
    return TblAppTempPushIdentify.init({
    identify: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'IDENTIFY'
    }
  }, {
    sequelize,
    tableName: 'TBL_APP_TEMP_PUSH_IDENTIFY',
    schema: 'COKR_MBR_APP',
    timestamps: false
  });
  }
}
