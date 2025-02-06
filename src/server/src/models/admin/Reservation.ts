import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { Member } from "./Member";
import { ReservationItemSpace } from "./ReservationItemSpace";
import { ReservationItemShow } from "./ReservationItemShow";
import { ReservationItemKind } from "./ReservationItem";

export enum ReservationStatus {
  RESERVATION_COMPLETE = "RESERVATION_COMPLETE",
  RESERVATION_CANCELLED = "RESERVATION_CANCELLED",
  SERVICE_COMPLETED = "SERVICE_COMPLETED",
  SERVICE_COMPLETED_NOSHOW = "SERVICE_COMPLETED_NOSHOW",
}

export interface ReservationAttributes {
  id: string;
  sn: string;
  status: ReservationStatus;
  kind: ReservationItemKind;
  guestName: string;
  guestEmail: string;
  guestPhoneNumber: string;
  numCompanions: number;
  startDate: Date;
  endDate: Date;
  note?: string;
  spaceId?: string;
  showId?: string;
  memberId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ReservationOptionalAttributes =
  | "id"
  | "numCompanions"
  | "note"
  | "spaceId"
  | "showId"
  | "createdAt";

export type ReservationCreationAttributes = Optional<
  ReservationAttributes,
  ReservationOptionalAttributes
>;

export class Reservation extends Model<
  ReservationAttributes,
  ReservationCreationAttributes
> {
  static initModel(sequelize: Sequelize.Sequelize): typeof Reservation {
    return Reservation.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          primaryKey: true,
        },
        sn: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        status: {
          type: DataTypes.ENUM(...Object.values(ReservationStatus)),
          allowNull: false,
        },
        kind: {
          type: DataTypes.ENUM(...Object.values(ReservationItemKind)),
          allowNull: false,
        },
        guestName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        guestEmail: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        guestPhoneNumber: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        numCompanions: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        note: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        spaceId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: ReservationItemSpace,
            key: "id",
          },
        },
        showId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: ReservationItemShow,
            key: "id",
          },
        },
        memberId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: Member,
            key: "id",
          },
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
        tableName: "reservation",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
