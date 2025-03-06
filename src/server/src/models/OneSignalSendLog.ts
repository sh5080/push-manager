import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface OneSignalSendLogAttributes {
  id?: number;
  totalCount: number;
  completedCount: number;
  status: "P" | "C" | "F";
  pushId?: string;
  lastProcessedId?: string;
  errorMessage?: string;
  startedAt: Date;
  completedAt?: Date;
  updatedAt: Date;
  createdAt: Date;
}

export type OneSignalSendLogOptionalAttributes =
  | "lastProcessedId"
  | "errorMessage"
  | "pushId";
export type OneSignalSendLogCreationAttributes = Sequelize.Optional<
  OneSignalSendLogAttributes,
  OneSignalSendLogOptionalAttributes
>;

export class OneSignalSendLog
  extends Model<OneSignalSendLogAttributes, OneSignalSendLogCreationAttributes>
  implements OneSignalSendLogAttributes
{
  public id!: number;
  public totalCount!: number;
  public completedCount!: number;
  public status!: "P" | "C" | "F";
  public pushId?: string;
  public lastProcessedId?: string;
  public errorMessage?: string;
  public startedAt!: Date;
  public completedAt?: Date;
  public updatedAt!: Date;
  public createdAt!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof OneSignalSendLog {
    OneSignalSendLog.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: "ID",
        },
        totalCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "TOTAL_COUNT",
        },
        completedCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "COMPLETED_COUNT",
        },
        status: {
          type: DataTypes.STRING(20),
          allowNull: false,
          field: "STATUS",
        },
        pushId: {
          type: DataTypes.STRING(100),
          allowNull: true,
          field: "PUSH_ID",
        },
        lastProcessedId: {
          type: DataTypes.STRING(100),
          allowNull: true,
          field: "LAST_PROCESSED_ID",
        },
        errorMessage: {
          type: DataTypes.TEXT,
          allowNull: true,
          field: "ERROR_MESSAGE",
        },
        startedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "STARTED_AT",
        },
        completedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "COMPLETED_AT",
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "UPDATED_AT",
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          field: "CREATED_AT",
        },
      },
      {
        sequelize,
        tableName: "ONE_SIGNAL_SEND_LOG",
        timestamps: true,
        underscored: true,
      }
    );

    return OneSignalSendLog;
  }
}
