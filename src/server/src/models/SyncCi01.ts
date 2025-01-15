import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SyncCi01Attributes {
  userCi?: string;
}

export type SyncCi01OptionalAttributes = "userCi";
export type SyncCi01CreationAttributes = Optional<SyncCi01Attributes, SyncCi01OptionalAttributes>;

export class SyncCi01 extends Model<SyncCi01Attributes, SyncCi01CreationAttributes> implements SyncCi01Attributes {
  userCi?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof SyncCi01 {
    return SyncCi01.init({
    userCi: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_CI'
    }
  }, {
    sequelize,
    tableName: 'SYNC_CI_01',
    schema: 'COKR_MBR_APP',
    timestamps: false
  });
  }
}
