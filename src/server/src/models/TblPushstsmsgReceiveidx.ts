import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushstsmsgReceiveidxAttributes {
  msgidx: any;
  senddate?: string;
}

export type TblPushstsmsgReceiveidxOptionalAttributes = "senddate";
export type TblPushstsmsgReceiveidxCreationAttributes = Optional<TblPushstsmsgReceiveidxAttributes, TblPushstsmsgReceiveidxOptionalAttributes>;

export class TblPushstsmsgReceiveidx extends Model<TblPushstsmsgReceiveidxAttributes, TblPushstsmsgReceiveidxCreationAttributes> implements TblPushstsmsgReceiveidxAttributes {
  msgidx!: any;
  senddate?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushstsmsgReceiveidx {
    return TblPushstsmsgReceiveidx.init({
    msgidx: {
      type: "NUMBER",
      allowNull: false,
      field: 'MSGIDX'
    },
    senddate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'SENDDATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHSTSMSG_RECEIVEIDX',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_pushstsmsg_receiveidx",
        unique: true,
        fields: [
          { name: "MSGIDX" },
        ]
      },
    ]
  });
  }
}
