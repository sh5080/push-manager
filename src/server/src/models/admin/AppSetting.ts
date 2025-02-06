import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export enum AppSettingKey {
  NOTICE_BAR = "NOTICE_BAR",
  FOOTER = "FOOTER",
}

export interface AppSettingAttributes {
  id: string;
  key: AppSettingKey;
  value: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export type AppSettingOptionalAttributes = "id" | "createdAt";

export type AppSettingCreationAttributes = Optional<
  AppSettingAttributes,
  AppSettingOptionalAttributes
>;

export class AppSetting extends Model<
  AppSettingAttributes,
  AppSettingCreationAttributes
> {
  static initModel(sequelize: Sequelize.Sequelize): typeof AppSetting {
    return AppSetting.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          primaryKey: true,
        },
        key: {
          type: DataTypes.ENUM(...Object.values(AppSettingKey)),
          allowNull: false,
          unique: true,
        },
        value: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "appSetting",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
