import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblAppsFcmOptionAttributes {
  appid?: string;
  bearertoken?: string;
  ctime: any;
  fcmId: string;
}

export type TblAppsFcmOptionOptionalAttributes = "appid" | "bearertoken";
export type TblAppsFcmOptionCreationAttributes = Optional<TblAppsFcmOptionAttributes, TblAppsFcmOptionOptionalAttributes>;

export class TblAppsFcmOption extends Model<TblAppsFcmOptionAttributes, TblAppsFcmOptionCreationAttributes> implements TblAppsFcmOptionAttributes {
  appid?: string;
  bearertoken?: string;
  ctime!: any;
  fcmId!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblAppsFcmOption {
    return TblAppsFcmOption.init({
    appid: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APPID'
    },
    bearertoken: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'BEARERTOKEN'
    },
    ctime: {
      type: "NUMBER",
      allowNull: false,
      field: 'CTIME'
    },
    fcmId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'FCM_ID'
    }
  }, {
    sequelize,
    tableName: 'TBL_APPS_FCM_OPTION',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "fcm_option_appid",
        fields: [
          { name: "APPID" },
        ]
      },
      {
        name: "pk_tbl_apps_fcm_option",
        unique: true,
        fields: [
          { name: "FCM_ID" },
        ]
      },
    ]
  });
  }
}
