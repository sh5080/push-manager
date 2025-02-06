import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { TermsAgreement } from "./TermsAgreement";

export interface TermsAgreementHistAttributes {
  id: number;
  isAgreed: boolean;
  termsAgreementId: string;
  createdAt: Date;
}

export type TermsAgreementHistOptionalAttributes = "id" | "createdAt";

export type TermsAgreementHistCreationAttributes = Optional<
  TermsAgreementHistAttributes,
  TermsAgreementHistOptionalAttributes
>;

export class TermsAgreementHist extends Model<
  TermsAgreementHistAttributes,
  TermsAgreementHistCreationAttributes
> {
  static initModel(sequelize: Sequelize.Sequelize): typeof TermsAgreementHist {
    return TermsAgreementHist.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        isAgreed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        termsAgreementId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: TermsAgreement,
            key: "id",
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "termsAgreementHist",
        schema: "public",
        timestamps: true,
        updatedAt: false,
      }
    );
  }
}
