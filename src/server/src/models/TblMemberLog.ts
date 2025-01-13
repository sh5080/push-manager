import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblMemberLogAttributes {
  bemail?: string;
  besms?: string;
  birthday?: string;
  classOption?: string;
  company?: string;
  createDate?: string;
  customerKey?: string;
  email?: string;
  gender?: string;
  passwd?: string;
  phone?: string;
  point?: any;
  procDisposer?: string;
  siteCode?: string;
  updateDate?: string;
  userClass?: string;
  userId?: string;
  userImg?: string;
  userName?: string;
  userState?: string;
}

export type TblMemberLogOptionalAttributes = "bemail" | "besms" | "birthday" | "classOption" | "company" | "createDate" | "customerKey" | "email" | "gender" | "passwd" | "phone" | "point" | "procDisposer" | "siteCode" | "updateDate" | "userClass" | "userId" | "userImg" | "userName" | "userState";
export type TblMemberLogCreationAttributes = Optional<TblMemberLogAttributes, TblMemberLogOptionalAttributes>;

export class TblMemberLog extends Model<TblMemberLogAttributes, TblMemberLogCreationAttributes> implements TblMemberLogAttributes {
  bemail?: string;
  besms?: string;
  birthday?: string;
  classOption?: string;
  company?: string;
  createDate?: string;
  customerKey?: string;
  email?: string;
  gender?: string;
  passwd?: string;
  phone?: string;
  point?: any;
  procDisposer?: string;
  siteCode?: string;
  updateDate?: string;
  userClass?: string;
  userId?: string;
  userImg?: string;
  userName?: string;
  userState?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblMemberLog {
    return TblMemberLog.init({
    bemail: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'BEMAIL'
    },
    besms: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'BESMS'
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'BIRTHDAY'
    },
    classOption: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CLASS_OPTION'
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'COMPANY'
    },
    createDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'CREATE_DATE'
    },
    customerKey: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CUSTOMER_KEY'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'EMAIL'
    },
    gender: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'GENDER'
    },
    passwd: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PASSWD'
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PHONE'
    },
    point: {
      type: "NUMBER",
      allowNull: true,
      field: 'POINT'
    },
    procDisposer: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'PROC_DISPOSER'
    },
    siteCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'SITE_CODE'
    },
    updateDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'UPDATE_DATE'
    },
    userClass: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_CLASS'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_ID'
    },
    userImg: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_IMG'
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_NAME'
    },
    userState: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_STATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_MEMBER_LOG',
    schema: 'COKR_MBR_APP',
    timestamps: false
  });
  }
}
