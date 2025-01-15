import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblMemberAttributes {
  bemail?: string;
  besms?: string;
  birthday?: string;
  classOption?: string;
  company?: string;
  createDate?: string;
  customerKey?: string;
  email?: string;
  gender?: string;
  loginFail?: any;
  loginFailDate?: string;
  passwd?: string;
  passwdchDate?: string;
  phone?: string;
  point?: any;
  procDisposer?: string;
  siteCode?: string;
  uiSendMobile?: string;
  updateDate?: string;
  userClass?: string;
  userId: string;
  userImg?: string;
  userName: string;
  userState?: string;
}

export type TblMemberOptionalAttributes = "bemail" | "besms" | "birthday" | "classOption" | "company" | "createDate" | "customerKey" | "email" | "gender" | "loginFail" | "loginFailDate" | "passwd" | "passwdchDate" | "phone" | "point" | "procDisposer" | "siteCode" | "uiSendMobile" | "updateDate" | "userClass" | "userImg" | "userState";
export type TblMemberCreationAttributes = Optional<TblMemberAttributes, TblMemberOptionalAttributes>;

export class TblMember extends Model<TblMemberAttributes, TblMemberCreationAttributes> implements TblMemberAttributes {
  bemail?: string;
  besms?: string;
  birthday?: string;
  classOption?: string;
  company?: string;
  createDate?: string;
  customerKey?: string;
  email?: string;
  gender?: string;
  loginFail?: any;
  loginFailDate?: string;
  passwd?: string;
  passwdchDate?: string;
  phone?: string;
  point?: any;
  procDisposer?: string;
  siteCode?: string;
  uiSendMobile?: string;
  updateDate?: string;
  userClass?: string;
  userId!: string;
  userImg?: string;
  userName!: string;
  userState?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblMember {
    return TblMember.init({
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
    loginFail: {
      type: "NUMBER",
      allowNull: true,
      field: 'LOGIN_FAIL'
    },
    loginFailDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'LOGIN_FAIL_DATE'
    },
    passwd: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PASSWD'
    },
    passwdchDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'PASSWDCH_DATE'
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
    uiSendMobile: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'UI_SEND_MOBILE'
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
      allowNull: false,
      field: 'USER_ID'
    },
    userImg: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_IMG'
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'USER_NAME'
    },
    userState: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_STATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_MEMBER',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_member",
        unique: true,
        fields: [
          { name: "USER_ID" },
        ]
      },
    ]
  });
  }
}
