import { TblPushstsmsg } from "./TblPushstsmsg";
import { TblPushstssendStatsDay } from "./TblPushstssendStatsDay";
import { TblPushstsmsgAlias } from "@push-manager/shared";
import { TblFpMaster } from "./TblFpMaster";
import { TblFpQueue } from "./TblFpQueue";

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
}
