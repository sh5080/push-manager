import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TestIdentifyAttributes {
  appid?: any;
  identify: string;
  idx: any;
  name: string;
  teamid: any;
}

export type TestIdentifyOptionalAttributes = "appid";
export type TestIdentifyCreationAttributes = Optional<TestIdentifyAttributes, TestIdentifyOptionalAttributes>;

export class TestIdentify extends Model<TestIdentifyAttributes, TestIdentifyCreationAttributes> implements TestIdentifyAttributes {
  appid?: any;
  identify!: string;
  idx!: any;
  name!: string;
  teamid!: any;


  static initModel(sequelize: Sequelize.Sequelize): typeof TestIdentify {
    return TestIdentify.init({
    appid: {
      type: "NUMBER",
      allowNull: true,
      field: 'APPID'
    },
    identify: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'IDENTIFY'
    },
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'NAME'
    },
    teamid: {
      type: "NUMBER",
      allowNull: false,
      field: 'TEAMID'
    }
  }, {
    sequelize,
    tableName: 'TEST_IDENTIFY',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "test_identify_pk",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
