import { TblPushstsmsg } from "./TblPushstsmsg";
import { TblPushstssendStatsDay } from "./TblPushstssendStatsDay";

export function initializeRelations() {
  TblPushstsmsg.hasMany(TblPushstssendStatsDay, {
    foreignKey: "msgIdx",
    sourceKey: "idx",
    as: "detail",
  });

  TblPushstssendStatsDay.belongsTo(TblPushstsmsg, {
    foreignKey: "msgIdx",
    targetKey: "idx",
  });
}
