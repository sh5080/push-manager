import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblMemberLoginAttributes {
  loginDate?: string;
  userId: string;
}

export type TblMemberLoginOptionalAttributes = "loginDate";
export type TblMemberLoginCreationAttributes = Optional<TblMemberLoginAttributes, TblMemberLoginOptionalAttributes>;

export class TblMemberLogin extends Model<TblMemberLoginAttributes, TblMemberLoginCreationAttributes> implements TblMemberLoginAttributes {
  loginDate?: string;
  userId!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblMemberLogin {
    return TblMemberLogin.init({
    loginDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'LOGIN_DATE'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'USER_ID'
    }
  }, {
    sequelize,
    tableName: 'TBL_MEMBER_LOGIN',
    schema: 'COKR_MBR_APP',
    timestamps: false
  });
  }
}
