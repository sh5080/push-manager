import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("TEST_IDENTIFY", { schema: "COKR_MBR_APP" })
export class TestIdentify {
  @PrimaryColumn({ name: "IDX", type: "number" })
  idx!: number;

  @Column({ name: "IDENTIFY", type: "varchar2", length: 100 })
  identify!: string;

  @Column({ name: "NAME", type: "varchar2", length: 100 })
  name!: string;

  @Column({ name: "APPID", type: "number" })
  appId!: number;

  @Column({ name: "TEAMID", type: "number" })
  teamId!: number;
}
