import { aes } from "../../utils/crypto.util";
import { utf8ToBytes, bytesToUtf8 } from "@noble/ciphers/utils";
import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { bytesToBase64, base64ToBytes } from "../../utils/crypto.util";

export interface MemberAttributes {
  id: string;
  email?: string;
  name?: string;
  phoneNumber: string;
  permissions: {
    role: string;
    custom: Record<string, any>;
  };
  unifyId: string;
  ci: string;
  memNo: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  mbti?: string;
  mbtiCreatedAt?: Date;
  mbtiUpdatedAt?: Date;
}

export type MemberOptionalAttributes =
  | "id"
  | "email"
  | "name"
  | "isActive"
  | "createdAt"
  | "mbti"
  | "mbtiCreatedAt"
  | "mbtiUpdatedAt";

export type MemberCreationAttributes = Optional<
  MemberAttributes,
  MemberOptionalAttributes
>;

export class Member
  extends Model<MemberAttributes, MemberCreationAttributes>
  implements MemberAttributes
{
  id!: string;
  email?: string;
  name?: string;
  phoneNumber!: string;
  permissions!: { role: string; custom: Record<string, any> };
  unifyId!: string;
  ci!: string;
  memNo!: string;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  mbti?: string;
  mbtiCreatedAt?: Date;
  mbtiUpdatedAt?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Member {
    return Member.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        phoneNumber: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        permissions: {
          type: DataTypes.JSONB,
          allowNull: false,
          defaultValue: { role: "MEMBER", custom: {} },
        },
        unifyId: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        ci: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        memNo: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
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
        mbti: {
          type: DataTypes.STRING(4),
          allowNull: true,
        },
        mbtiCreatedAt: {
          type: DataTypes.DATE(3),
          allowNull: true,
        },
        mbtiUpdatedAt: {
          type: DataTypes.DATE(3),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "member",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            unique: true,
            fields: ["ci"],
          },
          {
            unique: true,
            fields: ["memNo"],
          },
          {
            unique: true,
            fields: ["unifyId"],
          },
        ],
      }
    );
  }
}
