import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { Admin } from "./Admin";

export interface AdminPasswordHistAttributes {
  id: number;
  password: string;
  salt: string;
  adminId: string;
  createdAt: Date;
}

export type AdminPasswordHistOptionalAttributes = "id" | "createdAt";

export type AdminPasswordHistCreationAttributes = Optional<
  AdminPasswordHistAttributes,
  AdminPasswordHistOptionalAttributes
>;

export class AdminPasswordHist extends Model<
  AdminPasswordHistAttributes,
  AdminPasswordHistCreationAttributes
> {
  static initModel(sequelize: Sequelize.Sequelize): typeof AdminPasswordHist {
    return AdminPasswordHist.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        salt: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        adminId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: Admin,
            key: "id",
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "adminPasswordHist",
        schema: "public",
        timestamps: true,
        updatedAt: false,
      }
    );
  }
}
