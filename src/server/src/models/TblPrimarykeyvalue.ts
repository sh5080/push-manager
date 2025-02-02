import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblPrimarykeyvalueAttributes {
  keyname: string;
  keyvalue: any;
  wDate: string;
}

export type TblPrimarykeyvalueCreationAttributes = TblPrimarykeyvalueAttributes;

export class TblPrimarykeyvalue
  extends Model<
    TblPrimarykeyvalueAttributes,
    TblPrimarykeyvalueCreationAttributes
  >
  implements TblPrimarykeyvalueAttributes
{
  keyname!: string;
  keyvalue!: any;
  wDate!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblPrimarykeyvalue {
    return TblPrimarykeyvalue.init(
      {
        keyname: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "KEYNAME",
        },
        keyvalue: {
          type: "NUMBER",
          allowNull: false,
          field: "KEYVALUE",
        },
        wDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: "WDATE",
        },
      },
      {
        sequelize,
        tableName: "TBL_PRIMARYKEYVALUE",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "pk_tbl_primarykeyvalue",
            unique: true,
            fields: [
              { name: "KEYNAME" },
              { name: "KEYVALUE" },
              { name: "WDATE" },
            ],
          },
        ],
      }
    );
  }
}
