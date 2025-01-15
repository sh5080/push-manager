import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushsendStatAttributes {
  appid: string;
  deviceType: string;
  endh: string;
  failed: any;
  msgIdx: any;
  opened: any;
  sent: any;
  starth: string;
  udate: string;
}

export type TblPushsendStatCreationAttributes = TblPushsendStatAttributes;

export class TblPushsendStat extends Model<TblPushsendStatAttributes, TblPushsendStatCreationAttributes> implements TblPushsendStatAttributes {
  appid!: string;
  deviceType!: string;
  endh!: string;
  failed!: any;
  msgIdx!: any;
  opened!: any;
  sent!: any;
  starth!: string;
  udate!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushsendStat {
    return TblPushsendStat.init({
    appid: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'APPID'
    },
    deviceType: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'DEVICE_TYPE'
    },
    endh: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'ENDH'
    },
    failed: {
      type: "NUMBER",
      allowNull: false,
      field: 'FAILED'
    },
    msgIdx: {
      type: "NUMBER",
      allowNull: false,
      field: 'MSG_IDX'
    },
    opened: {
      type: "NUMBER",
      allowNull: false,
      field: 'OPENED'
    },
    sent: {
      type: "NUMBER",
      allowNull: false,
      field: 'SENT'
    },
    starth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'STARTH'
    },
    udate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'UDATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHSEND_STATS',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_pushsend_stats",
        unique: true,
        fields: [
          { name: "MSG_IDX" },
          { name: "STARTH" },
          { name: "ENDH" },
          { name: "DEVICE_TYPE" },
        ]
      },
    ]
  });
  }
}
