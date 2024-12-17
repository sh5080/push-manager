import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("TAB_APP_PUSH_USER", { schema: "COKR_MGR" })
export class AppPushUser {
  @PrimaryColumn({ type: "number" })
  USER_SEQ!: number;

  @Column({ type: "varchar2", length: 128 })
  USER_CI!: string;
}
