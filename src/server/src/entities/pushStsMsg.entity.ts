import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("TBL_PUSHSTSMSG")
export class PushStsMsg {
  @PrimaryGeneratedColumn({ name: "IDX" })
  idx!: number;

  @Column({ name: "TITLE", length: 200 })
  title!: string;
}
