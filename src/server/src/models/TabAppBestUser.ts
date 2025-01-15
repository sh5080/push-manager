import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TabAppBestUserAttributes {
  attribute1?: string;
  attribute10?: string;
  attribute11?: string;
  attribute12?: string;
  attribute13?: string;
  attribute14?: string;
  attribute15?: string;
  attribute2?: string;
  attribute3?: string;
  attribute4?: string;
  attribute5?: string;
  attribute6?: string;
  attribute7?: string;
  attribute8?: string;
  attribute9?: string;
  currentEmployeeFlag?: string;
  dttm?: string;
  dutyCode?: string;
  dutyName?: string;
  effectiveEndDate: string;
  effectiveStartDate: string;
  emailAddress?: string;
  empNm?: string;
  empNo?: string;
  hrOrgCode?: string;
  inactiveFlag?: string;
  jikwiName?: string;
  mobilePhoneNo?: string;
  orgId: any;
  updttm?: string;
}

export type TabAppBestUserOptionalAttributes = "attribute1" | "attribute10" | "attribute11" | "attribute12" | "attribute13" | "attribute14" | "attribute15" | "attribute2" | "attribute3" | "attribute4" | "attribute5" | "attribute6" | "attribute7" | "attribute8" | "attribute9" | "currentEmployeeFlag" | "dttm" | "dutyCode" | "dutyName" | "emailAddress" | "empNm" | "empNo" | "hrOrgCode" | "inactiveFlag" | "jikwiName" | "mobilePhoneNo" | "updttm";
export type TabAppBestUserCreationAttributes = Optional<TabAppBestUserAttributes, TabAppBestUserOptionalAttributes>;

export class TabAppBestUser extends Model<TabAppBestUserAttributes, TabAppBestUserCreationAttributes> implements TabAppBestUserAttributes {
  attribute1?: string;
  attribute10?: string;
  attribute11?: string;
  attribute12?: string;
  attribute13?: string;
  attribute14?: string;
  attribute15?: string;
  attribute2?: string;
  attribute3?: string;
  attribute4?: string;
  attribute5?: string;
  attribute6?: string;
  attribute7?: string;
  attribute8?: string;
  attribute9?: string;
  currentEmployeeFlag?: string;
  dttm?: string;
  dutyCode?: string;
  dutyName?: string;
  effectiveEndDate!: string;
  effectiveStartDate!: string;
  emailAddress?: string;
  empNm?: string;
  empNo?: string;
  hrOrgCode?: string;
  inactiveFlag?: string;
  jikwiName?: string;
  mobilePhoneNo?: string;
  orgId!: any;
  updttm?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TabAppBestUser {
    return TabAppBestUser.init({
    attribute1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTRIBUTE1'
    },
    attribute10: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTRIBUTE10'
    },
    attribute11: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTRIBUTE11'
    },
    attribute12: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTRIBUTE12'
    },
    attribute13: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTRIBUTE13'
    },
    attribute14: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTRIBUTE14'
    },
    attribute15: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTRIBUTE15'
    },
    attribute2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTRIBUTE2'
    },
    attribute3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTRIBUTE3'
    },
    attribute4: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTRIBUTE4'
    },
    attribute5: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTRIBUTE5'
    },
    attribute6: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTRIBUTE6'
    },
    attribute7: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTRIBUTE7'
    },
    attribute8: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTRIBUTE8'
    },
    attribute9: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTRIBUTE9'
    },
    currentEmployeeFlag: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CURRENT_EMPLOYEE_FLAG'
    },
    dttm: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'DTTM'
    },
    dutyCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'DUTY_CODE'
    },
    dutyName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'DUTY_NAME'
    },
    effectiveEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'EFFECTIVE_END_DATE'
    },
    effectiveStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'EFFECTIVE_START_DATE'
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'EMAIL_ADDRESS'
    },
    empNm: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'EMP_NM'
    },
    empNo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'EMP_NO'
    },
    hrOrgCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'HR_ORG_CODE'
    },
    inactiveFlag: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'INACTIVE_FLAG'
    },
    jikwiName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'JIKWI_NAME'
    },
    mobilePhoneNo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MOBILE_PHONE_NO'
    },
    orgId: {
      type: "NUMBER",
      allowNull: false,
      field: 'ORG_ID'
    },
    updttm: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'UPDTTM'
    }
  }, {
    sequelize,
    tableName: 'TAB_APP_BEST_USER',
    schema: 'COKR_MBR_APP',
    timestamps: false
  });
  }
}
