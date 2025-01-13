import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblDatabaseAttributes {
  dbname?: string;
  dbId?: string;
  driver?: string;
  idx: any;
  passwd?: string;
  url?: string;
  username?: string;
}

export type TblDatabasePk = "idx";
export type TblDatabaseId = TblDatabase[TblDatabasePk];
export type TblDatabaseOptionalAttributes = "dbname" | "dbId" | "driver" | "passwd" | "url" | "username";
export type TblDatabaseCreationAttributes = Optional<TblDatabaseAttributes, TblDatabaseOptionalAttributes>;

export class TblDatabase extends Model<TblDatabaseAttributes, TblDatabaseCreationAttributes> implements TblDatabaseAttributes {
  dbname?: string;
  dbId?: string;
  driver?: string;
  idx!: any;
  passwd?: string;
  url?: string;
  username?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblDatabase {
    return TblDatabase.init({
    dbname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'DBNAME'
    },
    dbId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'DB_ID'
    },
    driver: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'DRIVER'
    },
    idx: {
      type: "NUMBER",
      allowNull: false,
      primaryKey: true,
      field: 'IDX'
    },
    passwd: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PASSWD'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'URL'
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USERNAME'
    }
  }, {
    sequelize,
    tableName: 'TBL_DATABASES',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "tbl_databases_pk",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
      {
        name: "tbl_databases_un",
        unique: true,
        fields: [
          { name: "DB_ID" },
        ]
      },
    ]
  });
  }
}
