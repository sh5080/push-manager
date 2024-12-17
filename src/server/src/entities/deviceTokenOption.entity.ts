import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { DeviceToken } from "./deviceToken.entity";

@Entity("TBL_DEVICE_TOKEN_OPTION")
export class DeviceTokenOption {
  @PrimaryColumn({ type: "number" })
  TOKEN_IDX!: number;

  @Column({ type: "varchar2", length: 50 })
  IDENTIFY!: string;

  @CreateDateColumn()
  WDATE!: Date;

  @UpdateDateColumn()
  UDATE!: Date;

  @ManyToOne(() => DeviceToken)
  @JoinColumn({ name: "TOKEN_IDX" })
  deviceToken!: DeviceToken;
}
