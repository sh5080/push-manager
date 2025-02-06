import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { Terms } from "./Terms";
import { Member } from "./Member";

export interface TermsAgreementAttributes {
  id: string;
  isAgreed: boolean;
  termsId: string;
  memberId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TermsAgreementOptionalAttributes = "id" | "createdAt";

export type TermsAgreementCreationAttributes = Optional<
  TermsAgreementAttributes,
  TermsAgreementOptionalAttributes
>;

export class TermsAgreement extends Model<
  TermsAgreementAttributes,
  TermsAgreementCreationAttributes
> {
  static initModel(sequelize: Sequelize.Sequelize): typeof TermsAgreement {
    return TermsAgreement.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          primaryKey: true,
        },
        isAgreed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        termsId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: Terms,
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
        tableName: "termsAgreement",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            unique: true,
            fields: ["termsId", "memberId"],
          },
        ],
      }
    );
  }
}
