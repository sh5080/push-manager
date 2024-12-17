import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { DeviceToken } from "./deviceToken.entity";

@Entity("TBL_PUSHSEND")
export class PushSend {
  @PrimaryColumn({ type: "number" })
  IDX!: number;

  @PrimaryColumn({ type: "date" })
  SENDDATE!: Date;

  @Column({ type: "number" })
  MSG_IDX!: number;

  @Column({ type: "varchar2", length: 2, nullable: true })
  RESULT?: string;

  @Column({ type: "varchar2", length: 200, nullable: true })
  RESULTMSG?: string;

  @Column({ type: "varchar2", length: 1, nullable: true })
  OPENED?: string;

  @Column({ type: "date", nullable: true })
  OPENDATE?: Date;

  @Column({ type: "varchar2", length: 1 })
  DEVICE_TYPE!: string;

  @Column({ type: "number" })
  TOKEN_IDX!: number;

  @ManyToOne(() => DeviceToken)
  @JoinColumn({ name: "TOKEN_IDX" })
  deviceToken!: DeviceToken;
}
