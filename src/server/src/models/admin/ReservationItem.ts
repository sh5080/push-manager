import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export enum ReservationItemKind {
  ART_CENTER_SHOW = "ART_CENTER_SHOW",
  PREMIUM_LOUNGE = "PREMIUM_LOUNGE",
  POPUP_STORE = "POPUP_STORE",
}

export enum ReservationItemOperationType {
  REGULAR = "REGULAR",
  SPOT = "SPOT",
}

export interface ReservationItemAttributes {
  id: string;
  kind: ReservationItemKind;
  name: string;
  branch?: string;
  address: Record<string, any>;
  phoneNumber?: string;
  description?: string;
  notice?: string;
  guide?: string;
  cautions?: string;
  images: string[];
  thumbnail?: string;
  operationType: ReservationItemOperationType;
  startDate?: Date;
  endDate?: Date;
  openHours: any[];
  holidays: any[];
  duration: number;
  daysBeforeReservationStart: number;
  daysBeforeReservationEnd: number;
  daysBeforeCancellation: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ReservationItemOptionalAttributes =
  | "id"
  | "branch"
  | "phoneNumber"
  | "description"
  | "notice"
  | "guide"
  | "cautions"
  | "thumbnail"
  | "startDate"
  | "endDate"
  | "openHours"
  | "holidays"
  | "duration"
  | "daysBeforeReservationStart"
  | "daysBeforeReservationEnd"
  | "daysBeforeCancellation"
  | "isActive"
  | "createdAt";

export type ReservationItemCreationAttributes = Optional<
  ReservationItemAttributes,
  ReservationItemOptionalAttributes
>;

export class ReservationItem extends Model<
  ReservationItemAttributes,
  ReservationItemCreationAttributes
> {
  static initModel(sequelize: Sequelize.Sequelize): typeof ReservationItem {
    return ReservationItem.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          primaryKey: true,
        },
        kind: {
          type: DataTypes.ENUM(...Object.values(ReservationItemKind)),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        branch: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        address: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        notice: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        guide: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        cautions: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.STRING(2048)),
          allowNull: false,
        },
        thumbnail: {
          type: DataTypes.STRING(2048),
          allowNull: true,
        },
        operationType: {
          type: DataTypes.ENUM(...Object.values(ReservationItemOperationType)),
          allowNull: false,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        openHours: {
          type: DataTypes.JSONB,
          defaultValue: [],
          allowNull: false,
        },
        holidays: {
          type: DataTypes.JSONB,
          defaultValue: [],
          allowNull: false,
        },
        duration: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        daysBeforeReservationStart: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        daysBeforeReservationEnd: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        daysBeforeCancellation: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
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
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "reservationItem",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
