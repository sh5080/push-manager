import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblStatusMsgAttributes {
  clientid?: string;
  idx: any;
  msgidx: any;
  oMode: string;
  status?: string;
  wdate?: string;
}

export type TblStatusMsgOptionalAttributes = "clientid" | "status" | "wdate";
export type TblStatusMsgCreationAttributes = Optional<TblStatusMsgAttributes, TblStatusMsgOptionalAttributes>;

export class TblStatusMsg extends Model<TblStatusMsgAttributes, TblStatusMsgCreationAttributes> implements TblStatusMsgAttributes {
  clientid?: string;
  idx!: any;
  msgidx!: any;
  oMode!: string;
  status?: string;
  wdate?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblStatusMsg {
    return TblStatusMsg.init({
    clientid: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CLIENTID'
    },
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    msgidx: {
      type: "NUMBER",
      allowNull: false,
      field: 'MSGIDX'
    },
    oMode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'O_MODE'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'STATUS'
    },
    wdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'WDATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_STATUS_MSG',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_status_msg_mm",
        fields: [
          { name: "MSGIDX" },
          { name: "O_MODE" },
        ]
      },
      {
        name: "pk_tbl_status_msg",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
