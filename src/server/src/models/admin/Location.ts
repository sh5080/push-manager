import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface LocationAttributes {
  id: string;
  sn: string;
  name: string;
  address: string;
  coordinates: any; // geometry(Point, 4326)
  phoneNumber: string;
  hasParking: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type LocationOptionalAttributes = "id" | "createdAt";

export type LocationCreationAttributes = Optional<
  LocationAttributes,
  LocationOptionalAttributes
>;

export class Location extends Model<
  LocationAttributes,
  LocationCreationAttributes
> {
  static initModel(sequelize: Sequelize.Sequelize): typeof Location {
    return Location.init(
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
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        coordinates: {
          type: DataTypes.GEOMETRY("POINT", 4326),
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        hasParking: {
          type: DataTypes.BOOLEAN,
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
        tableName: "location",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            fields: ["name", "address"],
            using: "GIN",
            operator: "gin_trgm_ops",
          },
          {
            fields: ["coordinates"],
            using: "GIST",
          },
        ],
      }
    );
  }
}
