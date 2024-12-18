import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";
import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";

@Entity("TBL_FP_MASTER")
export class PushMaster {
  @PrimaryColumn()
  CMPNCODE!: number;

  @Column()
  PMODE!: string;

  @Column({ type: "varchar" })
  STEP!: (typeof StepEnum)[keyof typeof StepEnum];

  @CreateDateColumn()
  RSTART_DATE!: Date;

  @Column({ type: "timestamp", nullable: true })
  REND_DATE?: Date;
}
