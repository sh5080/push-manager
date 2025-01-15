import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblMenuAttributes {
  ddx?: any;
  mcode: string;
  mname?: string;
  ord?: any;
}

export type TblMenuOptionalAttributes = "ddx" | "mname" | "ord";
export type TblMenuCreationAttributes = Optional<TblMenuAttributes, TblMenuOptionalAttributes>;

export class TblMenu extends Model<TblMenuAttributes, TblMenuCreationAttributes> implements TblMenuAttributes {
  ddx?: any;
  mcode!: string;
  mname?: string;
  ord?: any;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblMenu {
    return TblMenu.init({
    ddx: {
      type: "NUMBER",
      allowNull: true,
      field: 'DDX'
    },
    mcode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MCODE'
    },
    mname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MNAME'
    },
    ord: {
      type: "NUMBER",
      allowNull: true,
      field: 'ORD'
    }
  }, {
    sequelize,
    tableName: 'TBL_MENU',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_menu",
        unique: true,
        fields: [
          { name: "MCODE" },
        ]
      },
    ]
  });
  }
}
