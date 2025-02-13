import { TblPushstsmsg } from "./TblPushstsmsg";
import { TblPushstssendStatsDay } from "./TblPushstssendStatsDay";
import { TblPushstsmsgAlias } from "@push-manager/shared";
import { TblFpMaster } from "./TblFpMaster";
import { TblFpQueue } from "./TblFpQueue";
import { TblDeviceToken } from "./TblDeviceToken";
import { TblDeviceTokenOption } from "./TblDeviceTokenOption";
import { TblPushstssend } from "./TblPushstssend";
import { TblOpeninfo } from "./init-models";

export function initializeRelations() {
  TblPushstsmsg.hasMany(TblPushstssendStatsDay, {
    foreignKey: "msgIdx",
    sourceKey: "idx",
    as: TblPushstsmsgAlias.TblPushstssendStatsDay,
  });

  TblPushstssendStatsDay.belongsTo(TblPushstsmsg, {
    foreignKey: "msgIdx",
    targetKey: "idx",
  });

  TblFpMaster.belongsTo(TblPushstsmsg, {
    foreignKey: "msgIdx",
    targetKey: "idx",
  });

  TblFpMaster.belongsTo(TblFpQueue, {
    foreignKey: "cmpncode",
    targetKey: "cmpncode",
  });

  TblDeviceToken.hasOne(TblDeviceTokenOption, {
    foreignKey: "tokenIdx",
    as: "option",
  });

  TblDeviceTokenOption.belongsTo(TblDeviceToken, {
    foreignKey: "tokenIdx",
  });

  TblPushstssend.belongsTo(TblDeviceToken, {
    foreignKey: "tokenIdx",
    targetKey: "idx",
    as: "deviceToken",
  });

  TblPushstssend.belongsTo(TblDeviceTokenOption, {
    foreignKey: "tokenIdx",
    targetKey: "tokenIdx",
    as: "tokenOption",
  });

  TblPushstssend.belongsTo(TblOpeninfo, {
    foreignKey: "msgIdx",
    targetKey: "msgIdx",
    as: "openinfo",
  });
}
