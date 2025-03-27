import { CreatePushDto, StepEnum } from "@push-manager/shared";
import { createMockService } from "@/src/tests/test.util";
import { IPushService } from "@/src/interfaces/push.interface";
import { PushMasterRepository } from "@/src/repositories/pushMaster.repository";
import { PushQueueRepository } from "@/src/repositories/pushQueue.repository";
import { PushStsMsgRepository } from "@/src/repositories/pushStsMsg.repository";

describe("Push 단위 테스트", () => {
  let service: jest.Mocked<IPushService>;
  let pushMasterRepository: jest.Mocked<PushMasterRepository>;
  let pushQueueRepository: jest.Mocked<PushQueueRepository>;
  let pushStsMsgRepository: jest.Mocked<PushStsMsgRepository>;

  beforeEach(() => {
    pushMasterRepository = createMockService<PushMasterRepository>();
    pushQueueRepository = createMockService<PushQueueRepository>();
    pushStsMsgRepository = createMockService<PushStsMsgRepository>();
    service = createMockService<IPushService>();
  });

  describe("createPushes", () => {
    it("푸시 알림 예약 생성", async () => {
      const dto: CreatePushDto = {
        title: "테스트 푸시 제목",
        content: "테스트 푸시 메시지",
        identifyArray: ["test-id-1", "test-id-2"],
        sendDateString: new Date().toISOString(),
        isReady: false,
        appId: 1,
        fName: "https://example.com/image.jpg",
        pLink: "https://example.com/landing",
      };

      (service.createPushes as jest.Mock).mockResolvedValue(1001);
      const campaignCode = await service.createPushes(dto);

      expect(campaignCode).toBe(1001);
      expect(service.createPushes).toHaveBeenCalledWith(dto);
    });

    //     it("중복된 식별자를 제거하고 푸시 알림을 생성해야 함", async () => {
    //       const dto: CreatePushDto = {
    //         title: "중복 테스트",
    //         content: "중복 식별자 테스트",
    //         identifyArray: [
    //           "test-id-1",
    //           "test-id-1",
    //           "test-id-2",
    //           "test-id-2",
    //           "test-id-3",
    //         ],
    //         sendDateString: new Date().toISOString(),
    //         isReady: false,
    //         appId: 1,
    //         fName: "https://example.com/image.jpg",
    //         pLink: "https://example.com/landing",
    //       };

    //       service.createPushes.mockResolvedValue(1001);

    //       // 중복 제거된 식별자 배열을 캡처하기 위한 구현
    //       service.createPushes.mockImplementation(async (dto) => {
    //         const uniqueIdentifies = [...new Set(dto.identifyArray)];

    //         expect(uniqueIdentifies.length).toBe(3);

    //         expect(uniqueIdentifies).toContain("test-id-1");
    //         expect(uniqueIdentifies).toContain("test-id-2");
    //         expect(uniqueIdentifies).toContain("test-id-3");
    //         return 1001;
    //       });
    //       const campaignCode = await service.createPushes(dto);

    //       expect(campaignCode).toBe(1001);
    //       expect(service.createPushes).toHaveBeenCalledWith(dto);
    //     });

    //     it("isReady가 true일 때 상태가 TRANSACTION으로 업데이트되어야 함", async () => {
    //       const dto: CreatePushDto = {
    //         title: "상태 업데이트 테스트",
    //         content: "상태 업데이트 테스트 메시지",
    //         identifyArray: ["test-id-1", "test-id-2"],
    //         sendDateString: new Date().toISOString(),
    //         isReady: true, // 상태 업데이트 활성화
    //         appId: 1,
    //         fName: "https://example.com/image.jpg",
    //         pLink: "https://example.com/landing",
    //       };

    //       service.createPushes.mockResolvedValue(1001);

    //       // isReady가 true일 때 상태 업데이트 로직 확인
    //       service.createPushes.mockImplementation(async (dto) => {
    //         // isReady가 true인지 확인
    //         expect(dto.isReady).toBe(true);

    //         // 실제 구현에서는 여기서 상태를 TRANSACTION으로 업데이트
    //         return 1001;
    //       });

    //       const campaignCode = await service.createPushes(dto);

    //       expect(campaignCode).toBe(1001);
    //       expect(service.createPushes).toHaveBeenCalledWith(dto);
    //     });

    //     it("대량의 식별자를 배치 처리해야 함", async () => {
    //       // 배치 처리를 테스트하기 위한 대량의 식별자 생성
    //       const largeIdentifyArray = Array.from(
    //         { length: 25 },
    //         (_, i) => `batch-test-id-${i}`
    //       );

    //       const dto: CreatePushDto = {
    //         title: "배치 처리 테스트",
    //         content: "배치 처리 테스트 메시지",
    //         identifyArray: largeIdentifyArray,
    //         sendDateString: new Date().toISOString(),
    //         isReady: false,
    //         appId: 1,
    //         fName: "https://example.com/image.jpg",
    //         pLink: "https://example.com/landing",
    //       };

    //       // getNextQueueIdx 모킹 수정 (배치마다 다른 값 반환)
    //       let queueIdxCounter = 1;
    //       pushQueueRepository.getNextQueueIdx = jest.fn().mockImplementation(() => {
    //         return Promise.resolve(queueIdxCounter++);
    //       });

    //       // 배치 크기를 10으로 설정하여 createPushes 메서드 호출
    //       const campaignCode = await service.createPushes(dto);

    //       // 결과 검증
    //       expect(campaignCode).toBe(1001);

    //       // getNextQueueIdx 호출 횟수 확인 (25개 식별자를 10개씩 처리하면 3번 호출)
    //       expect(pushQueueRepository.getNextQueueIdx).toHaveBeenCalledTimes(3);

    //       // insertPushBatch 호출 횟수 확인
    //       expect(pushQueueRepository.insertPushBatch).toHaveBeenCalledTimes(3);
    //     });

    //     it("트랜잭션 오류 발생 시 예외를 던져야 함", async () => {
    //       // 오류를 발생시키기 위해 getLastCampaignCode 모킹 수정
    //       pushMasterRepository.getLastCampaignCode = jest
    //         .fn()
    //         .mockRejectedValue(new Error("데이터베이스 오류"));

    //       const dto: CreatePushDto = {
    //         title: "오류 테스트",
    //         content: "오류 테스트 메시지",
    //         identifyArray: ["test-id-1"],
    //         sendDateString: new Date().toISOString(),
    //         isReady: false,
    //         appId: 1,
    //         fName: "https://example.com/image.jpg",
    //         pLink: "https://example.com/landing",
    //       };

    //       // createPushes 메서드 호출 시 오류 발생 예상
    //       await expect(service.createPushes(dto)).rejects.toThrow(
    //         "데이터베이스 오류"
    //       );
    //     });
    //   });

    //   describe("createPushBatch", () => {
    //     it("식별자 배열을 푸시 배치 데이터로 변환해야 함", async () => {
    //       // 테스트용 매개변수 설정
    //       const identifies = ["test-id-1", "test-id-2"];
    //       const queueIdx = 1;
    //       const baseData = {
    //         campaignCode: 1001,
    //         title: "테스트 제목",
    //         message: "테스트 메시지",
    //         imageUrl: "https://example.com/image.jpg",
    //         landingUrl: "https://example.com/landing",
    //         sendDate: "TO_DATE('2023-01-01', 'YYYY-MM-DD')",
    //         now: "SYSDATE",
    //       };

    //       // createPushBatch 메서드 호출 (private 메서드이므로 any 타입으로 캐스팅)
    //       const result = await (service as any).createPushBatch(
    //         identifies,
    //         queueIdx,
    //         baseData
    //       );

    //       // 결과 검증
    //       expect(result.length).toBe(2);
    //       expect(result[0]).toEqual(
    //         expect.objectContaining({
    //           cmpncode: 1001,
    //           queueidx: 1,
    //           identify: "test-id-1",
    //           title: "테스트 제목",
    //           message: "테스트 메시지",
    //           imageurl: "https://example.com/image.jpg",
    //           landingurl: "https://example.com/landing",
    //         })
    //       );
    //       expect(result[1]).toEqual(
    //         expect.objectContaining({
    //           cmpncode: 1001,
    //           queueidx: 1,
    //           identify: "test-id-2",
    //           title: "테스트 제목",
    //           message: "테스트 메시지",
    //           imageurl: "https://example.com/image.jpg",
    //           landingurl: "https://example.com/landing",
    //         })
    //       );
    //     });
    //   });

    //   describe("updateMasterStatus", () => {
    //     it("마스터 레코드의 상태를 업데이트해야 함", async () => {
    //       // updateMasterStatus 메서드 호출 (private 메서드이므로 any 타입으로 캐스팅)
    //       await (service as any).updateMasterStatus(
    //         mockTransaction,
    //         1001,
    //         StepEnum.TRANSACTION
    //       );

    //       // 리포지토리 메서드 호출 검증
    //       expect(pushMasterRepository.updateMasterRecord).toHaveBeenCalledWith(
    //         mockTransaction,
    //         1001,
    //         StepEnum.TRANSACTION
    //       );
    //     });
  });
});
