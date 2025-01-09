import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { PushStsMsg } from "./pushStsMsg.entity";

@Entity("TBL_PUSHSTSSEND_STATS_DAY")
export class PushStsSendStatsDay {
  @PrimaryGeneratedColumn({ name: "MSG_IDX" })
  msgIdx!: number;

  @Column({ name: "DEVICE_TYPE", length: 50 })
  deviceType!: string;

  @Column({ name: "SENT", default: 0 })
  sent!: number;

  @Column({ name: "FAILED", default: 0 })
  failed!: number;

  @ManyToOne(() => PushStsMsg, (pushStsMsg) => pushStsMsg.sendStat)
  @JoinColumn({ name: "MSG_IDX" })
  pushStsMsg!: PushStsMsg;
}
