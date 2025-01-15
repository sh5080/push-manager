import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblStatusClientAttributes {
  clientid: string;
  idx: any;
  processcount: any;
  regDate: string;
  updDate?: string;
}

export type TblStatusClientOptionalAttributes = "updDate";
export type TblStatusClientCreationAttributes = Optional<TblStatusClientAttributes, TblStatusClientOptionalAttributes>;

export class TblStatusClient extends Model<TblStatusClientAttributes, TblStatusClientCreationAttributes> implements TblStatusClientAttributes {
  clientid!: string;
  idx!: any;
  processcount!: any;
  regDate!: string;
  updDate?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblStatusClient {
    return TblStatusClient.init({
    clientid: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'CLIENTID'
    },
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    processcount: {
      type: "NUMBER",
      allowNull: false,
      field: 'PROCESSCOUNT'
    },
    regDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'REG_DATE'
    },
    updDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'UPD_DATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_STATUS_CLIENT',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_status_client",
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
