import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { Member } from "./Member";
import { Coupon } from "./Coupon";

export enum CouponPoolStatus {
  PENDING = "PENDING",
  ISSUED = "ISSUED",
  REDEEMED = "REDEEMED",
  CANCELLED = "CANCELLED",
}

export interface CouponPoolAttributes {
  id: string;
  sn: string;
  status: CouponPoolStatus;
  issuedAt?: Date;
  redeemedAt?: Date;
  startDate: Date;
  endDate: Date;
  couponId: string;
  memberId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CouponPoolOptionalAttributes =
  | "id"
  | "issuedAt"
  | "redeemedAt"
  | "memberId"
  | "createdAt";

export type CouponPoolCreationAttributes = Optional<
  CouponPoolAttributes,
  CouponPoolOptionalAttributes
>;

export class CouponPool
  extends Model<CouponPoolAttributes, CouponPoolCreationAttributes>
  implements CouponPoolAttributes
{
  id!: string;
  sn!: string;
  status!: CouponPoolStatus;
  issuedAt?: Date;
  redeemedAt?: Date;
  startDate!: Date;
  endDate!: Date;
  couponId!: string;
  memberId?: string;
  createdAt!: Date;
  updatedAt!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof CouponPool {
    return CouponPool.init(
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
          type: DataTypes.ENUM(...Object.values(CouponPoolStatus)),
          allowNull: false,
        },
        issuedAt: {
          type: DataTypes.DATE(3),
          allowNull: true,
        },
        redeemedAt: {
          type: DataTypes.DATE(3),
          allowNull: true,
        },
        startDate: {
          type: DataTypes.DATE(3),
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE(3),
          allowNull: false,
        },
        couponId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: Coupon,
            key: "id",
          },
        },
        memberId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: Member,
            key: "id",
          },
        },
        createdAt: {
          type: DataTypes.DATE(3),
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          type: DataTypes.DATE(3),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "couponPool",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            unique: true,
            fields: ["sn"],
          },
        ],
      }
    );
  }
}
