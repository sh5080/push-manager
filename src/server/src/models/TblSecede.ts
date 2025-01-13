import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblSecedeAttributes {
  bemail?: string;
  besms?: string;
  birthday?: string;
  businessLicense?: string;
  classOption?: string;
  company?: string;
  companyName?: string;
  createDate?: string;
  customerKey?: string;
  email?: string;
  focCnt?: any;
  focCreateDate?: string;
  gender?: string;
  passwd?: string;
  phone?: string;
  point?: any;
  procDisposer?: string;
  pushType?: string;
  regDate?: string;
  secedeDate?: string;
  tpicEmail?: string;
  tpicHp?: string;
  tpicName?: string;
  tpicUpdDate?: Date;
  updateDate?: string;
  userClass?: string;
  userId?: string;
  userImg?: string;
  userName?: string;
  userState?: string;
}

export type TblSecedeOptionalAttributes = "bemail" | "besms" | "birthday" | "businessLicense" | "classOption" | "company" | "companyName" | "createDate" | "customerKey" | "email" | "focCnt" | "focCreateDate" | "gender" | "passwd" | "phone" | "point" | "procDisposer" | "pushType" | "regDate" | "secedeDate" | "tpicEmail" | "tpicHp" | "tpicName" | "tpicUpdDate" | "updateDate" | "userClass" | "userId" | "userImg" | "userName" | "userState";
export type TblSecedeCreationAttributes = Optional<TblSecedeAttributes, TblSecedeOptionalAttributes>;

export class TblSecede extends Model<TblSecedeAttributes, TblSecedeCreationAttributes> implements TblSecedeAttributes {
  bemail?: string;
  besms?: string;
  birthday?: string;
  businessLicense?: string;
  classOption?: string;
  company?: string;
  companyName?: string;
  createDate?: string;
  customerKey?: string;
  email?: string;
  focCnt?: any;
  focCreateDate?: string;
  gender?: string;
  passwd?: string;
  phone?: string;
  point?: any;
  procDisposer?: string;
  pushType?: string;
  regDate?: string;
  secedeDate?: string;
  tpicEmail?: string;
  tpicHp?: string;
  tpicName?: string;
  tpicUpdDate?: Date;
  updateDate?: string;
  userClass?: string;
  userId?: string;
  userImg?: string;
  userName?: string;
  userState?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblSecede {
    return TblSecede.init({
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
    businessLicense: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'BUSINESS_LICENSE'
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
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'COMPANY_NAME'
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
    focCnt: {
      type: "NUMBER",
      allowNull: true,
      field: 'FOC_CNT'
    },
    focCreateDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'FOC_CREATE_DATE'
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
    pushType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PUSH_TYPE'
    },
    regDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'REG_DATE'
    },
    secedeDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'SECEDE_DATE'
    },
    tpicEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TPIC_EMAIL'
    },
    tpicHp: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TPIC_HP'
    },
    tpicName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TPIC_NAME'
    },
    tpicUpdDate: {
      type: DataTypes.DATE(6),
      allowNull: true,
      field: 'TPIC_UPD_DATE'
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
    tableName: 'TBL_SECEDE',
    schema: 'COKR_MBR_APP',
    timestamps: false
  });
  }
}
