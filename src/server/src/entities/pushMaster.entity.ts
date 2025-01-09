import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { StepEnum } from "@push-manager/shared";
import { PushStsMsg } from "./pushStsMsg.entity";

@Entity("TBL_FP_MASTER")
export class PushMaster {
  @PrimaryColumn({ name: "CMPNCODE", type: "number" })
  cmpncode!: number;

  @Column({ name: "PMODE", type: "varchar" })
  pMode!: string;

  @Column({ name: "MSGIDX", type: "number" })
  msgIdx!: number;

  @Column({ name: "STEP", type: "varchar" })
  step!: (typeof StepEnum)[keyof typeof StepEnum];

  @Column({ name: "RSTART_DATE", type: "timestamp", nullable: true })
  rStartDate!: Date;

  @Column({ name: "REND_DATE", type: "timestamp", nullable: true })
  rEndDate?: Date;

  @ManyToOne(() => PushStsMsg)
  @JoinColumn({ name: "MSGIDX", referencedColumnName: "idx" })
  pushStsMsg!: PushStsMsg;
}
