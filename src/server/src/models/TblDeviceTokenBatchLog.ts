import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblDeviceTokenBatchLogAttributes {
  crtDate?: string;
  endDate?: string;
  logMsg?: string;
  prcName?: string;
  result?: string;
}

export type TblDeviceTokenBatchLogOptionalAttributes = "crtDate" | "endDate" | "logMsg" | "prcName" | "result";
export type TblDeviceTokenBatchLogCreationAttributes = Optional<TblDeviceTokenBatchLogAttributes, TblDeviceTokenBatchLogOptionalAttributes>;

export class TblDeviceTokenBatchLog extends Model<TblDeviceTokenBatchLogAttributes, TblDeviceTokenBatchLogCreationAttributes> implements TblDeviceTokenBatchLogAttributes {
  crtDate?: string;
  endDate?: string;
  logMsg?: string;
  prcName?: string;
  result?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblDeviceTokenBatchLog {
    return TblDeviceTokenBatchLog.init({
    crtDate: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'CRT_DATE'
    },
    endDate: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'END_DATE'
    },
    logMsg: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'LOG_MSG'
    },
    prcName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PRC_NAME'
    },
    result: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'RESULT'
    }
  }, {
    sequelize,
    tableName: 'TBL_DEVICE_TOKEN_BATCH_LOGS',
    schema: 'COKR_MBR_APP',
    timestamps: false
  });
  }
}
