import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface ApiKeyAttributes {
  id: string;
  apiKey: string;
  key: string;
  iv: string;
  isActive: boolean;
  createdAt: Date;
}

export type ApiKeyOptionalAttributes = "id" | "isActive" | "createdAt";

export type ApiKeyCreationAttributes = Optional<
  ApiKeyAttributes,
  ApiKeyOptionalAttributes
>;

export class ApiKey extends Model<ApiKeyAttributes, ApiKeyCreationAttributes> {
  static initModel(sequelize: Sequelize.Sequelize): typeof ApiKey {
    return ApiKey.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          primaryKey: true,
        },
        apiKey: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        key: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        iv: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "apiKey",
        schema: "public",
        timestamps: true,
        updatedAt: false,
      }
    );
  }
}
