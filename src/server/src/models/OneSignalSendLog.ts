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
        },
        totalCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        completedCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        pushId: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        lastProcessedId: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        errorMessage: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        startedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        completedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sequelize,
        tableName: "ONE_SIGNAL_SEND_LOG",
        timestamps: true,
      }
    );

    return OneSignalSendLog;
  }
}
