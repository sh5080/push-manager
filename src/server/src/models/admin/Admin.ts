import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface AdminAttributes {
  id: string;
  email: string;
  password: string;
  salt: string;
  name: string;
  phoneNumber: string;
  twoFas: Record<string, any>;
  permissions: {
    role: string;
    custom: Record<string, any>;
  };
  requiresPasswordChange: boolean;
  lastLoginAt: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type AdminOptionalAttributes =
  | "id"
  | "twoFas"
  | "permissions"
  | "requiresPasswordChange"
  | "lastLoginAt"
  | "isActive"
  | "createdAt";

export type AdminCreationAttributes = Optional<
  AdminAttributes,
  AdminOptionalAttributes
>;

export class Admin extends Model<AdminAttributes, AdminCreationAttributes> {
  static initModel(sequelize: Sequelize.Sequelize): typeof Admin {
    return Admin.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        salt: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        twoFas: {
          type: DataTypes.JSONB,
          defaultValue: {},
          allowNull: false,
        },
        permissions: {
          type: DataTypes.JSONB,
          defaultValue: { role: "ADMIN", custom: {} },
          allowNull: false,
        },
        requiresPasswordChange: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
        lastLoginAt: {
          type: DataTypes.DATE,
          allowNull: true,
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
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "admin",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
