import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblMsgLabelAttributes {
  appid?: string;
  beused?: string;
  code: string;
  createDate?: string;
  labelName?: string;
  updateDate?: string;
}

export type TblMsgLabelOptionalAttributes = "appid" | "beused" | "createDate" | "labelName" | "updateDate";
export type TblMsgLabelCreationAttributes = Optional<TblMsgLabelAttributes, TblMsgLabelOptionalAttributes>;

export class TblMsgLabel extends Model<TblMsgLabelAttributes, TblMsgLabelCreationAttributes> implements TblMsgLabelAttributes {
  appid?: string;
  beused?: string;
  code!: string;
  createDate?: string;
  labelName?: string;
  updateDate?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblMsgLabel {
    return TblMsgLabel.init({
    appid: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APPID'
    },
    beused: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'BEUSED'
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'CODE'
    },
    createDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'CREATE_DATE'
    },
    labelName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'LABEL_NAME'
    },
    updateDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'UPDATE_DATE'
    }
  }, {
    sequelize,
    tableName: 'TBL_MSG_LABEL',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "idx_tbl_msg_label_ab",
        fields: [
          { name: "APPID" },
          { name: "BEUSED" },
        ]
      },
      {
        name: "pk_tbl_msg_label",
        unique: true,
        fields: [
          { name: "CODE" },
        ]
      },
    ]
  });
  }
}
