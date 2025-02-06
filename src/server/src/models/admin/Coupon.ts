import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export enum CouponKind {
  LG_TWINS_TICKET_DISCOUNT = "LG_TWINS_TICKET_DISCOUNT",
  SUBSCRIPTION_REWARD = "SUBSCRIPTION_REWARD",
}

export enum CouponIssuanceType {
  INSTANT = "INSTANT",
  POOL = "POOL",
}

export enum CouponDiscountType {
  AMOUNT = "AMOUNT",
  RATIO = "RATIO",
  PASS = "PASS",
}

export interface CouponAttributes {
  id: string;
  kind: CouponKind;
  name: string;
  description: string;
  instructions: string;
  issuanceType: CouponIssuanceType;
  discountType: CouponDiscountType;
  discountValue: number;
  maxDiscount: number;
  policy: Record<string, any>;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type CouponOptionalAttributes =
  | "id"
  | "discountValue"
  | "maxDiscount"
  | "policy"
  | "createdAt";

export type CouponCreationAttributes = Optional<
  CouponAttributes,
  CouponOptionalAttributes
>;

export class Coupon extends Model<CouponAttributes, CouponCreationAttributes> {
  static initModel(sequelize: Sequelize.Sequelize): typeof Coupon {
    return Coupon.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          primaryKey: true,
        },
        kind: {
          type: DataTypes.ENUM(...Object.values(CouponKind)),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        instructions: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        issuanceType: {
          type: DataTypes.ENUM(...Object.values(CouponIssuanceType)),
          allowNull: false,
        },
        discountType: {
          type: DataTypes.ENUM(...Object.values(CouponDiscountType)),
          allowNull: false,
        },
        discountValue: {
          type: DataTypes.DECIMAL(19, 4),
          defaultValue: 0,
          allowNull: false,
        },
        maxDiscount: {
          type: DataTypes.DECIMAL(19, 4),
          defaultValue: 0,
          allowNull: false,
        },
        policy: {
          type: DataTypes.JSONB,
          defaultValue: {},
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
        tableName: "coupon",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
