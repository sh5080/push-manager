import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { ReservationItem } from "./ReservationItem";

export interface ReservationItemShowAttributes {
  id: string;
  startDate: Date;
  totalSeats: number;
  images: string[];
  description?: string;
  reservationItemId: string;
  isActive: boolean;
  index: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ReservationItemShowOptionalAttributes =
  | "id"
  | "description"
  | "isActive"
  | "index"
  | "createdAt";

export type ReservationItemShowCreationAttributes = Optional<
  ReservationItemShowAttributes,
  ReservationItemShowOptionalAttributes
>;

export class ReservationItemShow extends Model<
  ReservationItemShowAttributes,
  ReservationItemShowCreationAttributes
> {
  static initModel(sequelize: Sequelize.Sequelize): typeof ReservationItemShow {
    return ReservationItemShow.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          primaryKey: true,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        totalSeats: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.STRING(2048)),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        reservationItemId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: ReservationItem,
            key: "id",
          },
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
        index: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
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
        tableName: "reservationItemShow",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
