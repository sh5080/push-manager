import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblTestIdentityAttributes {
  appid: string;
  createDate?: string;
  identify: string;
}

export type TblTestIdentityOptionalAttributes = "createDate";
export type TblTestIdentityCreationAttributes = Optional<TblTestIdentityAttributes, TblTestIdentityOptionalAttributes>;

export class TblTestIdentity extends Model<TblTestIdentityAttributes, TblTestIdentityCreationAttributes> implements TblTestIdentityAttributes {
  appid!: string;
  createDate?: string;
  identify!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblTestIdentity {
    return TblTestIdentity.init({
    appid: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'APPID'
    },
    createDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'CREATE_DATE'
    },
    identify: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'IDENTIFY'
    }
  }, {
    sequelize,
    tableName: 'TBL_TEST_IDENTITY',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_test_identity",
        unique: true,
        fields: [
          { name: "IDENTIFY" },
          { name: "APPID" },
        ]
      },
    ]
  });
  }
}
