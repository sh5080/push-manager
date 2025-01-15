import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushsendAttributes {
  deviceType: string;
  idx: any;
  msgIdx: any;
  opendate?: string;
  opened: string;
  result: string;
  resultmsg?: string;
  senddate?: string;
  token?: string;
  tokenIdx?: any;
}

export type TblPushsendOptionalAttributes = "opendate" | "resultmsg" | "senddate" | "token" | "tokenIdx";
export type TblPushsendCreationAttributes = Optional<TblPushsendAttributes, TblPushsendOptionalAttributes>;

export class TblPushsend extends Model<TblPushsendAttributes, TblPushsendCreationAttributes> implements TblPushsendAttributes {
  deviceType!: string;
  idx!: any;
  msgIdx!: any;
  opendate?: string;
  opened!: string;
  result!: string;
  resultmsg?: string;
  senddate?: string;
  token?: string;
  tokenIdx?: any;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushsend {
    return TblPushsend.init({
    deviceType: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'DEVICE_TYPE'
    },
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    msgIdx: {
      type: "NUMBER",
      allowNull: false,
      field: 'MSG_IDX'
    },
    opendate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'OPENDATE'
    },
    opened: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'OPENED'
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'RESULT'
    },
    resultmsg: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'RESULTMSG'
    },
    senddate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'SENDDATE'
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TOKEN'
    },
    tokenIdx: {
      type: "NUMBER",
      allowNull: true,
      field: 'TOKEN_IDX'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHSEND',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_pushsend_mt",
        fields: [
          { name: "MSG_IDX" },
          { name: "TOKEN_IDX" },
        ]
      },
      {
        name: "idx_pushsend_s",
        fields: [
          { name: "SENDDATE" },
        ]
      },
      {
        name: "idx_pushsend_t",
        fields: [
          { name: "TOKEN_IDX" },
        ]
      },
      {
        name: "idx_tbl_pushsend_m",
        fields: [
          { name: "MSG_IDX" },
        ]
      },
      {
        name: "pk_tbl_pushsend",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
