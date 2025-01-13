import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TabAppTempCareCiAttributes {
  transferDt?: string;
  userCi: string;
}

export type TabAppTempCareCiOptionalAttributes = "transferDt";
export type TabAppTempCareCiCreationAttributes = Optional<TabAppTempCareCiAttributes, TabAppTempCareCiOptionalAttributes>;

export class TabAppTempCareCi extends Model<TabAppTempCareCiAttributes, TabAppTempCareCiCreationAttributes> implements TabAppTempCareCiAttributes {
  transferDt?: string;
  userCi!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TabAppTempCareCi {
    return TabAppTempCareCi.init({
    transferDt: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'TRANSFER_DT'
    },
    userCi: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'USER_CI'
    }
  }, {
    sequelize,
    tableName: 'TAB_APP_TEMP_CARE_CI',
    schema: 'COKR_MBR_APP',
    timestamps: false
  });
  }
}
