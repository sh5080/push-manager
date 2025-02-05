import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblMsgTemplateAttributes {
  appId: string;
  bedel?: string;
  code: string;
  createDate?: string;
  idx: any;
  oMode?: string;
  startDate?: string;
  templatelink?: string;
  templatemsg?: any;
  updateDate?: string;
}

export type TblMsgTemplateOptionalAttributes =
  | "bedel"
  | "createDate"
  | "oMode"
  | "startDate"
  | "templatelink"
  | "templatemsg"
  | "updateDate";
export type TblMsgTemplateCreationAttributes = Optional<
  TblMsgTemplateAttributes,
  TblMsgTemplateOptionalAttributes
>;

export class TblMsgTemplate
  extends Model<TblMsgTemplateAttributes, TblMsgTemplateCreationAttributes>
  implements TblMsgTemplateAttributes
{
  appId!: string;
  bedel?: string;
  code!: string;
  createDate?: string;
  idx!: any;
  oMode?: string;
  startDate?: string;
  templatelink?: string;
  templatemsg?: any;
  updateDate?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblMsgTemplate {
    return TblMsgTemplate.init(
      {
        appId: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "APPID",
        },
        bedel: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "BEDEL",
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "CODE",
        },
        createDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "CREATE_DATE",
        },
        idx: {
          type: "NUMBER",
          allowNull: false,
          field: "IDX",
        },
        oMode: {
          type: DataTypes.CHAR,
          allowNull: true,
          field: "O_MODE",
        },
        startDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "START_DATE",
        },
        templatelink: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "TEMPLATELINK",
        },
        templatemsg: {
          type: "CLOB",
          allowNull: true,
          field: "TEMPLATEMSG",
        },
        updateDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "UPDATE_DATE",
        },
      },
      {
        sequelize,
        tableName: "TBL_MSG_TEMPLATE",
        schema: "COKR_MBR_APP",
        timestamps: false,
      }
    );
  }
}
