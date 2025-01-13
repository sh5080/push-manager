import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface IfAppInstallTemp09Attributes {
  appEmpNo?: string;
  appInstallDt?: string;
  appInstallYn: string;
  appOrgCd?: string;
  attr1?: string;
  attr10?: string;
  attr2?: string;
  attr3?: string;
  attr4?: string;
  attr5?: string;
  attr6?: string;
  attr7?: string;
  attr8?: string;
  attr9?: string;
  phoneModel?: string;
  ssnCi: string;
  transferDt?: string;
  transferFg: string;
  workDate: string;
}

export type IfAppInstallTemp09OptionalAttributes = "appEmpNo" | "appInstallDt" | "appOrgCd" | "attr1" | "attr10" | "attr2" | "attr3" | "attr4" | "attr5" | "attr6" | "attr7" | "attr8" | "attr9" | "phoneModel" | "transferDt";
export type IfAppInstallTemp09CreationAttributes = Optional<IfAppInstallTemp09Attributes, IfAppInstallTemp09OptionalAttributes>;

export class IfAppInstallTemp09 extends Model<IfAppInstallTemp09Attributes, IfAppInstallTemp09CreationAttributes> implements IfAppInstallTemp09Attributes {
  appEmpNo?: string;
  appInstallDt?: string;
  appInstallYn!: string;
  appOrgCd?: string;
  attr1?: string;
  attr10?: string;
  attr2?: string;
  attr3?: string;
  attr4?: string;
  attr5?: string;
  attr6?: string;
  attr7?: string;
  attr8?: string;
  attr9?: string;
  phoneModel?: string;
  ssnCi!: string;
  transferDt?: string;
  transferFg!: string;
  workDate!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof IfAppInstallTemp09 {
    return IfAppInstallTemp09.init({
    appEmpNo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APP_EMP_NO'
    },
    appInstallDt: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APP_INSTALL_DT'
    },
    appInstallYn: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'APP_INSTALL_YN'
    },
    appOrgCd: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APP_ORG_CD'
    },
    attr1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTR1'
    },
    attr10: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTR10'
    },
    attr2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTR2'
    },
    attr3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTR3'
    },
    attr4: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTR4'
    },
    attr5: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTR5'
    },
    attr6: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTR6'
    },
    attr7: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTR7'
    },
    attr8: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTR8'
    },
    attr9: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ATTR9'
    },
    phoneModel: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PHONE_MODEL'
    },
    ssnCi: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'SSN_CI'
    },
    transferDt: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'TRANSFER_DT'
    },
    transferFg: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'TRANSFER_FG'
    },
    workDate: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'WORK_DATE'
    }
  }, {
    sequelize,
    tableName: 'IF_APP_INSTALL_TEMP_09',
    schema: 'COKR_MBR_APP',
    timestamps: false
  });
  }
}
