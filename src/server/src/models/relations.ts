import { TblPushstsmsg } from "./TblPushstsmsg";
import { TblPushstssendStatsDay } from "./TblPushstssendStatsDay";
import { TblPushstsmsgAlias } from "@push-manager/shared";

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
}
