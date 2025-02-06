import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { Member } from "./Member";

export interface VehicleRegistrationAttributes {
  id: string;
  no: string;
  memberId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type VehicleRegistrationOptionalAttributes = "id" | "createdAt";

export type VehicleRegistrationCreationAttributes = Optional<
  VehicleRegistrationAttributes,
  VehicleRegistrationOptionalAttributes
>;

export class VehicleRegistration extends Model<
  VehicleRegistrationAttributes,
  VehicleRegistrationCreationAttributes
> {
  static initModel(sequelize: Sequelize.Sequelize): typeof VehicleRegistration {
    return VehicleRegistration.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          primaryKey: true,
        },
        no: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true,
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
        tableName: "vehicleRegistration",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
