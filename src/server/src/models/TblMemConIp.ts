import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblMemConIpAttributes {
  idx: any;
  ipAddr?: string;
  regDate?: string;
  regId?: string;
  userId?: string;
}

export type TblMemConIpOptionalAttributes = "ipAddr" | "regDate" | "regId" | "userId";
export type TblMemConIpCreationAttributes = Optional<TblMemConIpAttributes, TblMemConIpOptionalAttributes>;

export class TblMemConIp extends Model<TblMemConIpAttributes, TblMemConIpCreationAttributes> implements TblMemConIpAttributes {
  idx!: any;
  ipAddr?: string;
  regDate?: string;
  regId?: string;
  userId?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblMemConIp {
    return TblMemConIp.init({
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    ipAddr: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'IP_ADDR'
    },
    regDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'REG_DATE'
    },
    regId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'REG_ID'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_ID'
    }
  }, {
    sequelize,
    tableName: 'TBL_MEM_CON_IP',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_mem_con_ip_ui",
        unique: true,
        fields: [
          { name: "USER_ID" },
          { name: "IP_ADDR" },
        ]
      },
      {
        name: "pk_tbl_mem_con_ip",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
    ]
  });
  }
}
