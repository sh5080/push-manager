import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TabAppTempCiAttributes {
  userCi: string;
}

export type TabAppTempCiCreationAttributes = TabAppTempCiAttributes;

export class TabAppTempCi extends Model<TabAppTempCiAttributes, TabAppTempCiCreationAttributes> implements TabAppTempCiAttributes {
  userCi!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TabAppTempCi {
    return TabAppTempCi.init({
    userCi: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'USER_CI'
    }
  }, {
    sequelize,
    tableName: 'TAB_APP_TEMP_CI',
    schema: 'COKR_MBR_APP',
    timestamps: false
  });
  }
}
