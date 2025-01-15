import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblPushqueueAttributes {
  androidSound?: string;
  appid?: string;
  customKey1?: string;
  customKey2?: string;
  customKey3?: string;
  customValue1?: string;
  customValue2?: string;
  customValue3?: string;
  deviceType?: string;
  errormessage?: string;
  idx: any;
  iosBadge?: any;
  iosSound?: string;
  message?: string;
  queuedate?: string;
  resultdate?: string;
  senddate?: string;
  step?: string;
  title?: string;
  token?: string;
}

export type TblPushqueueOptionalAttributes = "androidSound" | "appid" | "customKey1" | "customKey2" | "customKey3" | "customValue1" | "customValue2" | "customValue3" | "deviceType" | "errormessage" | "iosBadge" | "iosSound" | "message" | "queuedate" | "resultdate" | "senddate" | "step" | "title" | "token";
export type TblPushqueueCreationAttributes = Optional<TblPushqueueAttributes, TblPushqueueOptionalAttributes>;

export class TblPushqueue extends Model<TblPushqueueAttributes, TblPushqueueCreationAttributes> implements TblPushqueueAttributes {
  androidSound?: string;
  appid?: string;
  customKey1?: string;
  customKey2?: string;
  customKey3?: string;
  customValue1?: string;
  customValue2?: string;
  customValue3?: string;
  deviceType?: string;
  errormessage?: string;
  idx!: any;
  iosBadge?: any;
  iosSound?: string;
  message?: string;
  queuedate?: string;
  resultdate?: string;
  senddate?: string;
  step?: string;
  title?: string;
  token?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblPushqueue {
    return TblPushqueue.init({
    androidSound: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ANDROID_SOUND'
    },
    appid: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APPID'
    },
    customKey1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CUSTOM_KEY_1'
    },
    customKey2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CUSTOM_KEY_2'
    },
    customKey3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CUSTOM_KEY_3'
    },
    customValue1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CUSTOM_VALUE_1'
    },
    customValue2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CUSTOM_VALUE_2'
    },
    customValue3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CUSTOM_VALUE_3'
    },
    deviceType: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'DEVICE_TYPE'
    },
    errormessage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ERRORMESSAGE'
    },
    idx: {
      type: "NUMBER",
      allowNull: false,
      field: 'IDX'
    },
    iosBadge: {
      type: "NUMBER",
      allowNull: true,
      field: 'IOS_BADGE'
    },
    iosSound: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'IOS_SOUND'
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MESSAGE'
    },
    queuedate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'QUEUEDATE'
    },
    resultdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'RESULTDATE'
    },
    senddate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'SENDDATE'
    },
    step: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'STEP'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TITLE'
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TOKEN'
    }
  }, {
    sequelize,
    tableName: 'TBL_PUSHQUEUE',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_pushqueue_a",
        fields: [
          { name: "APPID" },
        ]
      },
      {
        name: "pk_tbl_pushqueue",
        unique: true,
        fields: [
          { name: "IDX" },
        ]
      },
      {
        name: "tbl_pushqueue_t",
        fields: [
          { name: "TOKEN" },
        ]
      },
    ]
  });
  }
}
