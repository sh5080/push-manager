import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface SubscriptionRewardRequestAttributes {
  id: number;
  memNo: string;
  grade: string;
  itemName: string;
  createdAt: Date;
  contractSn: string;
  gradeStDate: Date;
  itemCode: string;
}

export type SubscriptionRewardRequestOptionalAttributes =
  | "createdAt"
  | "gradeStDate";
export type SubscriptionRewardRequestCreationAttributes = Optional<
  SubscriptionRewardRequestAttributes,
  SubscriptionRewardRequestOptionalAttributes
>;

export class SubscriptionRewardRequest
  extends Model<
    SubscriptionRewardRequestAttributes,
    SubscriptionRewardRequestCreationAttributes
  >
  implements SubscriptionRewardRequestAttributes
{
  id!: number;
  memNo!: string;
  grade!: string;
  itemName!: string;
  createdAt!: Date;
  contractSn!: string;
  gradeStDate!: Date;
  itemCode!: string;

  static initModel(
    sequelize: Sequelize.Sequelize
  ): typeof SubscriptionRewardRequest {
    return SubscriptionRewardRequest.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: "id",
          defaultValue: Sequelize.literal(
            "nextval('\"subscriptionRewardRequest_id_seq\"'::regclass)"
          ),
        },
        memNo: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: "memNo",
        },
        grade: {
          type: DataTypes.STRING(4),
          allowNull: false,
          field: "grade",
        },
        itemName: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: "itemName",
        },
        createdAt: {
          type: DataTypes.DATE(3),
          allowNull: false,
          field: "createdAt",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        contractSn: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: "contractSn",
        },
        gradeStDate: {
          type: DataTypes.DATE(3),
          allowNull: false,
          field: "gradeStDate",
        },
        itemCode: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: "itemCode",
        },
      },
      {
        sequelize,
        tableName: "subscriptionRewardRequest",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "subscriptionRewardRequest_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
