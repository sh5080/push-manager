import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface MaintenanceAttributes {
  id: number;
  description: string;
  startAt: Date;
  endAt: Date;
  noticeAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type MaintenanceOptionalAttributes =
  | "id"
  | "noticeAt"
  | "isActive"
  | "createdAt";

export type MaintenanceCreationAttributes = Optional<
  MaintenanceAttributes,
  MaintenanceOptionalAttributes
>;

export class Maintenance extends Model<
  MaintenanceAttributes,
  MaintenanceCreationAttributes
> {
  static initModel(sequelize: Sequelize.Sequelize): typeof Maintenance {
    return Maintenance.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        startAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        noticeAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
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
        tableName: "maintenance",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
