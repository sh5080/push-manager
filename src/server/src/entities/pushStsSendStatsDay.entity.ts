import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("TBL_PUSHSTSSEND_STATS_DAY")
export class PushStsSendStatsDay {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "MSG_IDX" })
  msgIdx!: number;

  @Column({ name: "DEVICE_TYPE", length: 50 })
  deviceType!: string;

  @Column({ name: "SENT", default: 0 })
  sent!: number;

  @Column({ name: "FAILED", default: 0 })
  failed!: number;
}
