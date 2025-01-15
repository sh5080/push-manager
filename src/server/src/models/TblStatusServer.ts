import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblStatusServerAttributes {
  clientid?: string;
  connected: string;
  idx: any;
  ip: string;
  regDate: string;
}

export type TblStatusServerPk = "idx";
export type TblStatusServerId = TblStatusServer[TblStatusServerPk];
export type TblStatusServerOptionalAttributes = "clientid";
export type TblStatusServerCreationAttributes = Optional<TblStatusServerAttributes, TblStatusServerOptionalAttributes>;

export class TblStatusServer extends Model<TblStatusServerAttributes, TblStatusServerCreationAttributes> implements TblStatusServerAttributes {
  clientid?: string;
  connected!: string;
  idx!: any;
  ip!: string;
  regDate!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblStatusServer {
    return TblStatusServer.init({
    clientid: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CLIENTID'
    },
    connected: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'CONNECTED'
    },
    idx: {
      type: "NUMBER",
      allowNull: false,
      primaryKey: true,
      field: 'IDX'
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'IP'
    },
    regDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'REG_DATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_STATUS_SERVER',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_status_server",
        unique: true,
        fields: [
          { name: "IDX" },
          { name: "REG_DATE" },
        ]
      },
    ]
  });
  }
}
