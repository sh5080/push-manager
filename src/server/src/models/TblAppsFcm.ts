import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblAppsFcmAttributes {
  appid: string;
  credential: string;
  packageName: string;
  projectId: string;
  type: string;
}

export type TblAppsFcmCreationAttributes = TblAppsFcmAttributes;

export class TblAppsFcm extends Model<TblAppsFcmAttributes, TblAppsFcmCreationAttributes> implements TblAppsFcmAttributes {
  appid!: string;
  credential!: string;
  packageName!: string;
  projectId!: string;
  type!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblAppsFcm {
    return TblAppsFcm.init({
    appid: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'APPID'
    },
    credential: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'CREDENTIAL'
    },
    packageName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'PACKAGE_NAME'
    },
    projectId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'PROJECT_ID'
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'TYPE'
    }
  }, {
    sequelize,
    tableName: 'TBL_APPS_FCM',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_apps_fcm",
        unique: true,
        fields: [
          { name: "APPID" },
        ]
      },
    ]
  });
  }
}
