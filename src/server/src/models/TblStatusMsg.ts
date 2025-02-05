import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface TblStatusMsgAttributes {
  clientid?: string;
  idx: any;
  msgIdx: any;
  oMode: string;
  status?: string;
  wDate?: string;
}

export type TblStatusMsgOptionalAttributes = "clientid" | "status" | "wDate";
export type TblStatusMsgCreationAttributes = Optional<
  TblStatusMsgAttributes,
  TblStatusMsgOptionalAttributes
>;

export class TblStatusMsg
  extends Model<TblStatusMsgAttributes, TblStatusMsgCreationAttributes>
  implements TblStatusMsgAttributes
{
  clientid?: string;
  idx!: any;
  msgIdx!: any;
  oMode!: string;
  status?: string;
  wDate?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof TblStatusMsg {
    return TblStatusMsg.init(
      {
        clientid: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "CLIENTID",
        },
        idx: {
          type: "NUMBER",
          allowNull: false,
          field: "IDX",
        },
        msgIdx: {
          type: "NUMBER",
          allowNull: false,
          field: "MSGIDX",
        },
        oMode: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "O_MODE",
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "STATUS",
        },
        wDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: "WDATE",
        },
      },
      {
        sequelize,
        tableName: "TBL_STATUS_MSG",
        schema: "COKR_MBR_APP",
        timestamps: false,
        indexes: [
          {
            name: "idx_tbl_status_msg_mm",
            fields: [{ name: "MSGIDX" }, { name: "O_MODE" }],
          },
          {
            name: "pk_tbl_status_msg",
            unique: true,
            fields: [{ name: "IDX" }],
          },
        ],
      }
    );
  }
}
