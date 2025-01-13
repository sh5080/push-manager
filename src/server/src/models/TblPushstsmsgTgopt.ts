import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushstsmsgTgoptAttributes {
  arrCtgLst?: any;
  arrMdLst?: any;
  msgIdx: any;
  pcsAmtMax?: any;
  pcsAmtMin?: any;
  pcsCntMax?: any;
  pcsCntMin?: any;
  pcsPvMax?: any;
  pcsPvMin?: any;
  pcsQnttMax?: any;
  pcsQnttMin?: any;
  schEDate?: string;
  schSDate?: string;
}

export type TblPushstsmsgTgoptOptionalAttributes = "arrCtgLst" | "arrMdLst" | "pcsAmtMax" | "pcsAmtMin" | "pcsCntMax" | "pcsCntMin" | "pcsPvMax" | "pcsPvMin" | "pcsQnttMax" | "pcsQnttMin" | "schEDate" | "schSDate";
export type TblPushstsmsgTgoptCreationAttributes = Optional<TblPushstsmsgTgoptAttributes, TblPushstsmsgTgoptOptionalAttributes>;

export class TblPushstsmsgTgopt extends Model<TblPushstsmsgTgoptAttributes, TblPushstsmsgTgoptCreationAttributes> implements TblPushstsmsgTgoptAttributes {
  arrCtgLst?: any;
  arrMdLst?: any;
  msgIdx!: any;
  pcsAmtMax?: any;
  pcsAmtMin?: any;
  pcsCntMax?: any;
  pcsCntMin?: any;
  pcsPvMax?: any;
  pcsPvMin?: any;
  pcsQnttMax?: any;
  pcsQnttMin?: any;
  schEDate?: string;
  schSDate?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushstsmsgTgopt {
    return TblPushstsmsgTgopt.init({
    arrCtgLst: {
      type: "CLOB",
      allowNull: true,
      field: 'ARR_CTG_LST'
    },
    arrMdLst: {
      type: "CLOB",
      allowNull: true,
      field: 'ARR_MD_LST'
    },
    msgIdx: {
      type: "NUMBER",
      allowNull: false,
      field: 'MSG_IDX'
    },
    pcsAmtMax: {
      type: "NUMBER",
      allowNull: true,
      field: 'PCS_AMT_MAX'
    },
    pcsAmtMin: {
      type: "NUMBER",
      allowNull: true,
      field: 'PCS_AMT_MIN'
    },
    pcsCntMax: {
      type: "NUMBER",
      allowNull: true,
      field: 'PCS_CNT_MAX'
    },
    pcsCntMin: {
      type: "NUMBER",
      allowNull: true,
      field: 'PCS_CNT_MIN'
    },
    pcsPvMax: {
      type: "NUMBER",
      allowNull: true,
      field: 'PCS_PV_MAX'
    },
    pcsPvMin: {
      type: "NUMBER",
      allowNull: true,
      field: 'PCS_PV_MIN'
    },
    pcsQnttMax: {
      type: "NUMBER",
      allowNull: true,
      field: 'PCS_QNTT_MAX'
    },
    pcsQnttMin: {
      type: "NUMBER",
      allowNull: true,
      field: 'PCS_QNTT_MIN'
    },
    schEDate: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'SCH_E_DATE'
    },
    schSDate: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'SCH_S_DATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHSTSMSG_TGOPT',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_pushstsmsg_tgopt",
        unique: true,
        fields: [
          { name: "MSG_IDX" },
        ]
      },
    ]
  });
  }
}
