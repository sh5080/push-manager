import { Entity, Column, PrimaryColumn } from "typeorm";
import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";

@Entity("TBL_FP_MASTER")
export class PushMaster {
  @PrimaryColumn({ name: "CMPNCODE", type: "number" })
  cmpncode!: number;

  @Column({ name: "PMODE", type: "varchar" })
  pmode!: string;

  @Column({ name: "STEP", type: "varchar" })
  step!: (typeof StepEnum)[keyof typeof StepEnum];

  @Column({ name: "RSTART_DATE", type: "timestamp", nullable: true })
  rstart_date!: Date;

  @Column({ name: "REND_DATE", type: "timestamp", nullable: true })
  rend_date?: Date;
}
