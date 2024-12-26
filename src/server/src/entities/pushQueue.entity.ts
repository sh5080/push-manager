import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IPushQueue } from "@push-manager/shared/types/entities/pushQueue.entity";
import {
  StepEnum,
  PModeEnum,
  SendStatEnum,
  AndPriorityEnum,
  IsEtiquetteEnum,
  OfbTimeEnum,
  OptAgreeEnum,
  BeschModeEnum,
} from "@push-manager/shared/types/constants/pushQueue.const";

@Entity("TBL_FP_QUEUE")
export class PushQueue implements IPushQueue {
  /**
   * 큐 인덱스
   */
  @PrimaryGeneratedColumn()
  QUEUEIDX!: number;

  /**
   * 핑거푸시에서 제공되는 앱 키 (필수 입력)
   */
  @Column()
  APPKEY!: string;

  /**
   * 핑거푸시에서 제공되는 앱 시크릿 키 (필수 입력)
   */
  @Column()
  APPSECRET!: string;

  /**
   * 메시지 제목 (필수 입력)
   */
  @Column()
  MSGTITLE!: string;

  /**
   * 메시지 발송일시(예약일시) (필수 입력)
   * @default 1분
   */
  @Column("timestamp")
  SENDDATE!: () => string;

  /**
   * 발송완료일시
   */
  @Column("timestamp", { nullable: true })
  RESULTDATE?: string;

  /**
   * 핑거푸시로부터 피드백 일시
   */
  @Column("timestamp", { nullable: true })
  FEEDBACKDATE?: string;

  /**
   * 메시지 내용 (필수 입력)
   */
  @Column()
  MSGCONTENTS!: string;

  /**
   * 식별자(사용자 아이디) (필수 입력)
   */
  @Column()
  IDENTIFY!: string;

  /**
   * 메시지 발송 단계
   * @default 'R'
   */
  @Column({ type: "varchar", default: StepEnum.PENDING })
  STEP!: (typeof StepEnum)[keyof typeof StepEnum];

  /**
   * 발송 모드를 설정합니다.
   * @default 'STOS'
   * @description
   * - 'STOS': 타겟 발송 (기본값)
   * - 'STOE': 타겟 발송 (우선 발송)
   * - 'DEFT': 대량 발송
   */
  @Column({ type: "varchar", default: PModeEnum.TARGET })
  PMODE!: (typeof PModeEnum)[keyof typeof PModeEnum];

  /**
   * 첨부 이미지 경로 (url 형식으로 입력)
   */
  @Column({ nullable: true })
  FNAME?: string;

  /**
   * 발송 상태를 설정합니다.
   * @default '0001'
   * @description
   * - '0001': 바로 발송 (기본값)
   * - '0002': 예약 발송
   */
  @Column({ type: "varchar", default: SendStatEnum.SEND_NOW })
  SEND_STAT!: (typeof SendStatEnum)[keyof typeof SendStatEnum];
  /**
   * 안드로이드 사운드
   * @default 'default'
   */
  @Column({ default: "default" })
  ANDROID_SOUND?: "default";

  /**
   * 안드로이드 배지 수
   * @default 0
   */
  @Column({ default: 0 })
  ANDROID_BADGE?: number;

  /**
   * iOS 사운드
   * @default 'default'
   */
  @Column({ default: "default" })
  IOS_SOUND?: "default";

  /**
   * iOS 배지 수
   * @default 0
   */
  @Column({ default: 0 })
  IOS_BADGE?: number;

  /**
   * 외부 링크
   */
  @Column({ nullable: true })
  PLINK?: string;

  /**
   * 추가적인 변수키1
   * @default 'linktype'
   */
  @Column({ nullable: true })
  CUSTOM_KEY_1?: string;

  /**
   * 추가적인 변수값1
   * @default 'pushbox'
   */
  @Column({ nullable: true })
  CUSTOM_VALUE_1?: string;

  /**
   * 추가적인 변수키2
   */
  @Column({ nullable: true })
  CUSTOM_KEY_2?: string;

  /**
   * 추가적인 변수값2
   */
  @Column({ nullable: true })
  CUSTOM_VALUE_2?: string;

  /**
   * 추가적인 변수키3
   */
  @Column({ nullable: true })
  CUSTOM_KEY_3?: string;

  /**
   * 추가적인 변수값3
   */
  @Column({ nullable: true })
  CUSTOM_VALUE_3?: string;

  /**
   * 라벨코드(콘솔 > 앱관리 > 메시지라벨)
   */
  @Column({ nullable: true })
  LABEL_CODE?: string;

  /**
   * 배경 색상 (#080000)
   */
  @Column({ nullable: true })
  BGCOLOR?: string;

  /**
   * 폰트 색상 (#FBF3F3)
   */
  @Column({ nullable: true })
  FONTCOLOR?: string;

  /**
   * 안드로이드 우선 순위 (H: 높음 / M: 중간)
   * @default 'M'
   */
  @Column({ type: "varchar", nullable: true })
  AND_PRIORITY?: (typeof AndPriorityEnum)[keyof typeof AndPriorityEnum];

  /**
   * 에티켓 적용 여부 (기본값: 'N')
   */
  @Column({ type: "varchar", nullable: true })
  ISETIQUETTE?: (typeof IsEtiquetteEnum)[keyof typeof IsEtiquetteEnum];

  /**
   * 발송 에티켓 적용시간 (오늘)
   */
  @Column({ nullable: true })
  ETIQUETTE_STIME?: number;

  /**
   * 발송 에티켓 적용시간 (내일)
   */
  @Column({ nullable: true })
  ETIQUETTE_ETIME?: number;

  /**
   * 오픈 처리 제한시간 (2h, 4h, 1d, 3d, 5d, 1w)
   */
  @Column({ type: "varchar", nullable: true })
  OFB_TIME?: (typeof OfbTimeEnum)[keyof typeof OfbTimeEnum];

  /**
   * 광고 동의 (1000 동의, 0000 부동의)
   * @default '1000'
   */
  @Column({ type: "varchar", default: OptAgreeEnum.AGREE })
  OPTAGREE!: (typeof OptAgreeEnum)[keyof typeof OptAgreeEnum];

  /**
   * 태그
   */
  @Column({ nullable: true })
  PTAG?: string;

  /**
   * 태그 조건 (0001: or, 0002: and)
   */
  @Column({ type: "varchar", nullable: true })
  BESCHMODE?: (typeof BeschModeEnum)[keyof typeof BeschModeEnum];

  /**
   * 분할 롱텍스트1
   */
  @Column({ nullable: true })
  LNGT_MESSAGE1?: string;

  /**
   * 분할 롱텍스트2
   */
  @Column({ nullable: true })
  LNGT_MESSAGE2?: string;

  /**
   * 분할 롱텍스트3
   */
  @Column({ nullable: true })
  LNGT_MESSAGE3?: string;

  /**
   * 분할 롱텍스트4
   */
  @Column({ nullable: true })
  LNGT_MESSAGE4?: string;

  /**
   * 사용자 컬럼1, 숫자형
   */
  @Column({ nullable: true })
  EXTRA1?: number;

  /**
   * 사용자 컬럼2, 문자형
   */
  @Column({ nullable: true })
  EXTRA2?: string;

  /**
   * 사용자 컬럼3, 문자형
   */
  @Column({ nullable: true })
  EXTRA3?: string;

  /**
   * 작성일자 (기본값: 현재 시간)
   */
  @Column({ type: "timestamp", nullable: true })
  WDATE!: () => string;

  /**
   * 수정일자 (기본값: 현재 시간)
   */
  @Column({ type: "timestamp", nullable: true })
  UDATE!: () => string;

  /**
   * 캠페인 코드
   */
  @Column({ nullable: true })
  CMPNCODE?: number;
}
