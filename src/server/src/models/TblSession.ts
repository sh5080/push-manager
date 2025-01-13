import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TblSessionAttributes {
  childUserId?: string;
  masterUserId?: string;
  sessionId: string;
  sessRegtime?: string;
  userId?: string;
}

export type TblSessionOptionalAttributes = "childUserId" | "masterUserId" | "sessRegtime" | "userId";
export type TblSessionCreationAttributes = Optional<TblSessionAttributes, TblSessionOptionalAttributes>;

export class TblSession extends Model<TblSessionAttributes, TblSessionCreationAttributes> implements TblSessionAttributes {
  childUserId?: string;
  masterUserId?: string;
  sessionId!: string;
  sessRegtime?: string;
  userId?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof TblSession {
    return TblSession.init({
    childUserId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CHILD_USER_ID'
    },
    masterUserId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MASTER_USER_ID'
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'SESSION_ID'
    },
    sessRegtime: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'SESS_REGTIME'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'USER_ID'
    }
  }, {
    sequelize,
    tableName: 'TBL_SESSION',
    schema: 'COKR_MBR_APP',
    timestamps: false,
    indexes: [
      {
        name: "pk_tbl_session",
        unique: true,
        fields: [
          { name: "SESSION_ID" },
        ]
      },
    ]
  });
  }
}
