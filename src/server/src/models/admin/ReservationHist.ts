import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { Reservation } from "./Reservation";

export interface ReservationHistAttributes {
  id: number;
  payload: Record<string, any>;
  modifier: Record<string, any>;
  reservationId: string;
  createdAt: Date;
}

export type ReservationHistOptionalAttributes = "id" | "createdAt";

export type ReservationHistCreationAttributes = Optional<
  ReservationHistAttributes,
  ReservationHistOptionalAttributes
>;

export class ReservationHist extends Model<
  ReservationHistAttributes,
  ReservationHistCreationAttributes
> {
  static initModel(sequelize: Sequelize.Sequelize): typeof ReservationHist {
    return ReservationHist.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        payload: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
        modifier: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
        reservationId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: Reservation,
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
        tableName: "reservationHist",
        schema: "public",
        timestamps: true,
        updatedAt: false,
      }
    );
  }
}
