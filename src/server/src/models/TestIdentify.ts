import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TestIdentifyAttributes {
  appId?: any;
  identify: string;
  idx: any;
  name: string;
  teamId: any;
}

export type TestIdentifyOptionalAttributes = "appId";
export type TestIdentifyCreationAttributes = Optional<
  TestIdentifyAttributes,
  TestIdentifyOptionalAttributes
>;

export class TestIdentify
  extends Model<TestIdentifyAttributes, TestIdentifyCreationAttributes>
  implements TestIdentifyAttributes
{
  appId?: any;
  identify!: string;
  idx!: any;
  name!: string;
  teamId!: any;

  static initModel(sequelize: Sequelize.Sequelize): typeof TestIdentify {
    return TestIdentify.init(
      {
        appId: {
          type: "NUMBER",
          allowNull: true,
          field: "APPID",
        },
        identify: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "IDENTIFY",
        },
        idx: {
          type: "NUMBER",
          allowNull: false,
          field: "IDX",
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "NAME",
        },
        teamId: {
          type: "NUMBER",
          allowNull: false,
          field: "TEAMID",
        },
      },
      {
        sequelize,
        tableName: "TEST_IDENTIFY",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "test_identify_pk",
            unique: true,
            fields: [{ name: "IDX" }],
          },
        ],
      }
    );
  }
}
