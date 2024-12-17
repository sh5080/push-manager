import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("TBL_DEVICE_TOKEN", { schema: "COKR_MBR_APP" })
export class DeviceToken {
  @PrimaryColumn({ type: "number" })
  IDX!: number;

  @Column({ type: "varchar2", length: 50 })
  APPID!: string;

  @Column({ type: "varchar2", length: 500 })
  TOKEN!: string;

  @Column({ type: "varchar2", length: 1 })
  DEVICE_TYPE!: string;

  @Column({ type: "varchar2", length: 1 })
  ACTIVITY!: string;

  @CreateDateColumn()
  WDATE!: Date;

  @UpdateDateColumn()
  UDATE!: Date;

  @Column({ type: "varchar2", length: 1, nullable: true })
  ACTIVITY_PROC?: string;

  @Column({ type: "varchar2", length: 4, nullable: true })
  OPTAGREE?: string;
}
