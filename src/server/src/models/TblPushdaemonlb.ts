import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushdaemonlbAttributes {
  aliasA02?: string;
  aliasA03?: string;
  aliasA04?: string;
  aliasA05?: string;
  aliasA06?: string;
  aliasDefault?: string;
  lbactivate?: string;
  lbid: string;
  lbname?: string;
}

export type TblPushdaemonlbPk = "lbid";
export type TblPushdaemonlbId = TblPushdaemonlb[TblPushdaemonlbPk];
export type TblPushdaemonlbOptionalAttributes = "aliasA02" | "aliasA03" | "aliasA04" | "aliasA05" | "aliasA06" | "aliasDefault" | "lbactivate" | "lbname";
export type TblPushdaemonlbCreationAttributes = Optional<TblPushdaemonlbAttributes, TblPushdaemonlbOptionalAttributes>;

export class TblPushdaemonlb extends Model<TblPushdaemonlbAttributes, TblPushdaemonlbCreationAttributes> implements TblPushdaemonlbAttributes {
  aliasA02?: string;
  aliasA03?: string;
  aliasA04?: string;
  aliasA05?: string;
  aliasA06?: string;
  aliasDefault?: string;
  lbactivate?: string;
  lbid!: string;
  lbname?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushdaemonlb {
    return TblPushdaemonlb.init({
    aliasA02: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'ALIAS_A02'
    },
    aliasA03: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'ALIAS_A03'
    },
    aliasA04: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'ALIAS_A04'
    },
    aliasA05: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'ALIAS_A05'
    },
    aliasA06: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'ALIAS_A06'
    },
    aliasDefault: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'ALIAS_DEFAULT'
    },
    lbactivate: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'LBACTIVATE'
    },
    lbid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'LBID'
    },
    lbname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'LBNAME'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHDAEMONLB',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_pushdaemonlb",
        unique: true,
        fields: [
          { name: "LBID" },
        ]
      },
    ]
  });
  }
}
