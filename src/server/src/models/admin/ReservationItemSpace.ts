import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { ReservationItem } from "./ReservationItem";

export enum RoomType {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export enum RoomGrade {
  NORMAL = "NORMAL",
  PREMIUM = "PREMIUM",
}

export interface ReservationItemSpaceAttributes {
  id: string;
  name: string;
  type: RoomType;
  grade: RoomGrade;
  totalSeats: number;
  numCompanions: number;
  images: string[];
  description?: string;
  reservationTimeUnit: number;
  reservationTimeInterval: number;
  reservationItemId: string;
  isActive: boolean;
  index: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ReservationItemSpaceOptionalAttributes =
  | "id"
  | "description"
  | "reservationTimeUnit"
  | "reservationTimeInterval"
  | "isActive"
  | "index"
  | "createdAt";

export type ReservationItemSpaceCreationAttributes = Optional<
  ReservationItemSpaceAttributes,
  ReservationItemSpaceOptionalAttributes
>;

export class ReservationItemSpace extends Model<
  ReservationItemSpaceAttributes,
  ReservationItemSpaceCreationAttributes
> {
  static initModel(
    sequelize: Sequelize.Sequelize
  ): typeof ReservationItemSpace {
    return ReservationItemSpace.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM(...Object.values(RoomType)),
          allowNull: false,
        },
        grade: {
          type: DataTypes.ENUM(...Object.values(RoomGrade)),
          allowNull: false,
        },
        totalSeats: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        numCompanions: {
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
        reservationTimeUnit: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        reservationTimeInterval: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
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
        tableName: "reservationItemSpace",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
