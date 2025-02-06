import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export enum TermsKind {
  A_P_V_KR = "A_P_V_KR",
  A_P3_V_KR = "A_P3_V_KR",
}

export interface TermsAttributes {
  id: string;
  kind: TermsKind;
  rev: number;
  link: string;
  isMandatory: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TermsOptionalAttributes = "id" | "isMandatory" | "createdAt";

export type TermsCreationAttributes = Optional<
  TermsAttributes,
  TermsOptionalAttributes
>;

export class Terms extends Model<TermsAttributes, TermsCreationAttributes> {
  static initModel(sequelize: Sequelize.Sequelize): typeof Terms {
    return Terms.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          primaryKey: true,
        },
        kind: {
          type: DataTypes.ENUM(...Object.values(TermsKind)),
          allowNull: false,
        },
        rev: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        link: {
          type: DataTypes.STRING(2048),
          allowNull: false,
        },
        isMandatory: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
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
        tableName: "terms",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            unique: true,
            fields: ["kind", "rev"],
          },
        ],
      }
    );
  }
}
