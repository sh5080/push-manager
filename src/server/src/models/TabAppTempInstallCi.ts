import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TabAppTempInstallCiAttributes {
  teamSeq?: string;
  tempCi?: string;
  tempDate?: string;
  tempIdx?: any;
}

export type TabAppTempInstallCiOptionalAttributes = "teamSeq" | "tempCi" | "tempDate" | "tempIdx";
export type TabAppTempInstallCiCreationAttributes = Optional<TabAppTempInstallCiAttributes, TabAppTempInstallCiOptionalAttributes>;

export class TabAppTempInstallCi extends Model<TabAppTempInstallCiAttributes, TabAppTempInstallCiCreationAttributes> implements TabAppTempInstallCiAttributes {
  teamSeq?: string;
  tempCi?: string;
  tempDate?: string;
  tempIdx?: any;


  static initModel(sequelize: Sequelize.Sequelize): typeof TabAppTempInstallCi {
    return TabAppTempInstallCi.init({
    teamSeq: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TEAM_SEQ'
    },
    tempCi: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TEMP_CI'
    },
    tempDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'TEMP_DATE'
    },
    tempIdx: {
      type: "NUMBER",
      allowNull: true,
      field: 'TEMP_IDX'
    }
  }, {
    sequelize,
    tableName: 'TAB_APP_TEMP_INSTALL_CI',
    schema: 'COKR_MBR_APP',
    timestamps: false
  });
  }
}
