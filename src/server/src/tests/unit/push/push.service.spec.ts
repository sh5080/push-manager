import { CreatePushDto, AppIdEnum } from "@push-manager/shared";
import { createMockService } from "@/src/tests/test.util";
import { IPushService } from "@/src/interfaces/push.interface";
import { PushMasterRepository } from "@/src/repositories/pushMaster.repository";
import { PushQueueRepository } from "@/src/repositories/pushQueue.repository";
import { PushStsMsgRepository } from "@/src/repositories/pushStsMsg.repository";
import { TblFpMaster } from "@/src/models/TblFpMaster";
import { PushService } from "@/src/services/push.service";

describe("Push 단위 테스트", () => {
  let service: IPushService;
  let pushMasterRepository: jest.Mocked<PushMasterRepository>;
  let pushQueueRepository: jest.Mocked<PushQueueRepository>;
  let pushStsMsgRepository: jest.Mocked<PushStsMsgRepository>;

  beforeEach(() => {
    // 먼저 모킹된 리포지토리 생성
    pushMasterRepository = createMockService<PushMasterRepository>();
    pushStsMsgRepository = createMockService<PushStsMsgRepository>();
    pushQueueRepository = createMockService<PushQueueRepository>();

    // 그 다음 서비스 초기화
    service = new PushService(
      pushMasterRepository,
      pushStsMsgRepository,
      pushQueueRepository
    );

    // 모킹된 메서드 스파이 설정
    jest.spyOn(service as any, "createPushBatch").mockResolvedValue([]);
    jest.spyOn(service as any, "updateMasterStatus").mockResolvedValue([]);

    jest.clearAllMocks();
  });

  describe("createPushes", () => {
    const isReadyCase = async (isReady: boolean) => {
      const lastCampaignCode = 1000;
      const nextCampaignCode = 1001;
      const nextQueueIdx = 500;

      const dto: CreatePushDto = {
        title: "테스트 푸시 제목",
        content: "테스트 푸시 메시지",
        identifyArray: ["test-id-1", "test-id-2"],
        sendDateString: "9999-12-31 23:59",
        isReady: isReady,
        appId: AppIdEnum.PROD,
        fName: "https://example.com/image.jpg",
        pLink: "https://example.com/landing",
      };
      pushMasterRepository.getLastCampaignCode.mockResolvedValue([
        { cmpncode: lastCampaignCode } as TblFpMaster,
      ]);

      pushQueueRepository.getNextQueueIdx.mockResolvedValue(nextQueueIdx);

      // 서비스 메서드 호출
      const campaignCode = await service.createPushes(dto);

      expect(campaignCode).toBe(nextCampaignCode);
      // 리포지토리 메서드 호출 검증
      expect(pushMasterRepository.getLastCampaignCode).toHaveBeenCalled();
      expect(pushMasterRepository.createMasterRecord).toHaveBeenCalled();
      expect(pushQueueRepository.getNextQueueIdx).toHaveBeenCalled();
      expect(pushQueueRepository.insertPushBatch).toHaveBeenCalled();

      // isReady 값에 따른 updateMasterStatus 호출 여부 검증
      if (isReady) {
        expect((service as any).updateMasterStatus).toHaveBeenCalled();
      } else {
        expect((service as any).updateMasterStatus).not.toHaveBeenCalled();
      }

      return campaignCode;
    };

    const invalidDateCase = async (
      sendDateString: string,
      expectedErrorMessage: string
    ) => {
      const dto: CreatePushDto = {
        title: "테스트 푸시 제목",
        content: "테스트 푸시 메시지",
        identifyArray: ["test-id-1", "test-id-2"],
        sendDateString: sendDateString,
        isReady: false,
        appId: AppIdEnum.PROD,
        fName: "https://example.com/image.jpg",
        pLink: "https://example.com/landing",
      };

      // 서비스 메서드 호출 시 예외 발생 예상
      await expect(service.createPushes(dto)).rejects.toThrow(
        expectedErrorMessage
      );

      // 리포지토리 메서드가 호출되지 않았는지 검증
      expect(pushMasterRepository.getLastCampaignCode).not.toHaveBeenCalled();
      expect(pushMasterRepository.createMasterRecord).not.toHaveBeenCalled();
      expect(pushQueueRepository.getNextQueueIdx).not.toHaveBeenCalled();
      expect(pushQueueRepository.insertPushBatch).not.toHaveBeenCalled();
    };

    it("푸시 알림 예약 생성 - isReady가 false인 경우", async () => {
      await isReadyCase(false);
    });

    it("푸시 알림 예약 생성 - isReady가 true인 경우", async () => {
      await isReadyCase(true);
    });

    it("날짜 형식이 올바르지 않은 경우", async () => {
      await invalidDateCase(
        "2025-03-26T15:00",
        "유효하지 않은 날짜 형식입니다. 'YYYY-MM-DD HH:MM' 형식이어야 합니다: 2025-03-26T15:00"
      );
    });

    it("현재보다 이전 날짜 입력", async () => {
      await invalidDateCase(
        "2025-03-26 15:00",
        "발송 시간은 현재 시간보다 이후여야 합니다."
      );
    });

    it("중복된 식별자를 필터링해야 함", async () => {
      const dto: CreatePushDto = {
        title: "테스트 푸시 제목",
        content: "테스트 푸시 메시지",
        identifyArray: [
          "test-id-1",
          "test-id-1",
          "test-id-2",
          "test-id-2",
          "test-id-3",
        ],
        sendDateString: "9999-12-31 23:59",
        isReady: false,
        appId: AppIdEnum.PROD,
        fName: "https://example.com/image.jpg",
        pLink: "https://example.com/landing",
      };

      const lastCampaignCode = 1000;
      const nextCampaignCode = 1001;
      const nextQueueIdx = 500;

      pushMasterRepository.getLastCampaignCode.mockResolvedValue([
        { cmpncode: lastCampaignCode } as TblFpMaster,
      ]);

      pushQueueRepository.getNextQueueIdx.mockResolvedValue(nextQueueIdx);

      // 콘솔 로그 스파이 설정
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();
      // 서비스 메서드 호출
      await service.createPushes(dto);

      // createPushBatch 호출 시 중복 제거된 식별자 배열이 전달되었는지 확인
      expect((service as any).createPushBatch).toHaveBeenCalledWith(
        expect.arrayContaining(["test-id-1", "test-id-2", "test-id-3"]),
        expect.any(Number),
        expect.anything()
      );

      // 중복 식별자에 대한 로그 메시지 확인
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("중복된 식별자 2건이 발견되었습니다.")
      );

      consoleSpy.mockRestore();
    });
  });
});
