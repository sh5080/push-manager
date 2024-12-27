import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("TEST_IDENTIFY", { schema: "COKR_MBR_APP" })
export class TestIdentify {
  @PrimaryColumn({ type: "number" })
  IDX!: number;

  @Column({ type: "varchar2", length: 100 })
  IDENTIFY!: string;

  @Column({ type: "varchar2", length: 100 })
  NAME!: string;

  @Column({ type: "number" })
  APPID!: number;

  @Column({ type: "number" })
  TEAMID!: number;
}
