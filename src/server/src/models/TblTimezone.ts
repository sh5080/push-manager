import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblTimezoneAttributes {
  abbr: string;
  idx: any;
  name: string;
  offset: string;
}

export type TblTimezoneCreationAttributes = TblTimezoneAttributes;

export class TblTimezone extends Model<TblTimezoneAttributes, TblTimezoneCreationAttributes> implements TblTimezoneAttributes {
  abbr!: string;
  idx!: any;
  name!: string;
  offset!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblTimezone {
    return TblTimezone.init({
    abbr: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ABBR'
    },
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'NAME'
    },
    offset: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OFFSET'
    }
  }, {
    sequelize,
    tableName: 'TBL_TIMEZONE',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_timezone",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
