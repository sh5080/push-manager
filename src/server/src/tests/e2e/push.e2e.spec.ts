import { PushService } from "@/src/services/push.service";
import { PushMasterRepository } from "@/src/repositories/pushMaster.repository";
import { PushStsMsgRepository } from "@/src/repositories/pushStsMsg.repository";
import { PushQueueRepository } from "@/src/repositories/pushQueue.repository";
import { CreatePushDto, PModeEnum, StepEnum } from "@push-manager/shared";
import { sequelize } from "@/src/configs/db.config";
import { initModels } from "@/src/models/init-models";
import { initializeRelations } from "@/src/models/relations";

describe("Push E2E 테스트", () => {
  let service: PushService;
  let pushMasterRepository: PushMasterRepository;
  let pushQueueRepository: PushQueueRepository;
  let pushStsMsgRepository: PushStsMsgRepository;
  beforeAll(async () => {
    await sequelize
      .authenticate()
      .then(() => {
        console.log("Sequelize Database connected");
        initModels(sequelize);
        initializeRelations();
        console.log("Sequelize Models and Relations initialized");
      })
      .catch(console.error);
    console.log("sequelize authenticate successfully");

    pushMasterRepository = new PushMasterRepository();
    pushQueueRepository = new PushQueueRepository();
    pushStsMsgRepository = new PushStsMsgRepository();
    service = new PushService(
      pushMasterRepository,
      pushStsMsgRepository,
      pushQueueRepository
    );
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("createPushes", () => {
    it("푸시 알림을 성공적으로 생성해야 함", async () => {
      const dto: CreatePushDto = {
        title: "발송 테스트",
        content: "발송 테스트 메시지",
        identifyArray: ["1009624565"],
        sendDateString: new Date().toISOString(),
        isReady: false,
        appId: 0,
        fName:
          "https://harmony-static-dev.travelflan.com/lg/events/push-alert/2025/03/2025-03-17_xboom-mission-guide.webp",
        pLink:
          "https://lg-custom-pages.travelflan.com/xboom-activity-detail?fd_open_type=webview",
      };

      const campaignCode = await service.createPushes(dto);

      expect(campaignCode).toBeGreaterThan(0);

      const masterRecord = await pushMasterRepository.getLastCampaignCode();
      expect(masterRecord).not.toBeNull();
      expect(masterRecord[0].cmpncode).toBe(campaignCode);
      expect(masterRecord[0].pMode).toBe(PModeEnum.CAMP);
      expect(masterRecord[0].step).toBe(StepEnum.PENDING); // isReady가 false이므로 PENDING 상태

      // 큐 레코드 검증
      const queueRecords = await pushQueueRepository.getAllPushQueues(
        campaignCode
      );
      expect(queueRecords.length).toBe(dto.identifyArray.length);
      expect(queueRecords[0].cmpncode).toBe(campaignCode);
      expect(queueRecords[0].msgTitle).toBe(dto.title);
      expect(queueRecords[0].msgContents).toBe(dto.content);
      expect(dto.identifyArray).toContain(queueRecords[0].identify);
      expect(queueRecords[0].fName).toBe(dto.fName);
      expect(queueRecords[0].pLink).toBe(dto.pLink);

      // 테스트 완료 후 실제 발송처리
      await pushMasterRepository.updateMasterRecord({
        campaignCode,
        step: StepEnum.TRANSACTION,
        endDate: "SYSDATE",
      });
    });

    it("중복된 식별자를 제거하고 푸시 알림을 생성해야 함", async () => {
      const dto: CreatePushDto = {
        title: "중복 테스트",
        content: "중복 식별자 테스트",
        identifyArray: [
          "test-id-1",
          "test-id-1",
          "test-id-2",
          "test-id-2",
          "test-id-3",
        ],
        sendDateString: new Date().toISOString(),
        isReady: false,
        appId: 0,
        fName: "https://example.com/image.jpg",
        pLink: "https://example.com/landing",
      };

      const campaignCode = await service.createPushes(dto);

      expect(campaignCode).toBeGreaterThan(0);

      const queueRecords = await pushQueueRepository.getAllPushQueues(
        campaignCode
      );
      expect(queueRecords.length).toBe(3);
      const uniqueIdentifies = [
        ...new Set(queueRecords.map((r) => r.identify)),
      ];
      expect(uniqueIdentifies.length).toBe(3);
      expect(uniqueIdentifies).toContain("test-id-1");
      expect(uniqueIdentifies).toContain("test-id-2");
      expect(uniqueIdentifies).toContain("test-id-3");

      // 테스트 완료 후 실제 발송처리
      await pushMasterRepository.updateMasterRecord({
        campaignCode,
        step: StepEnum.TRANSACTION,
        endDate: "SYSDATE",
      });
    });

    it("isReady가 true일 때 상태가 TRANSACTION으로 업데이트되어야 함(즉시 발송)", async () => {
      const dto: CreatePushDto = {
        title: "즉시 발송 테스트",
        content: "즉시 발송 테스트 메시지",
        identifyArray: ["1009624565"],
        sendDateString: new Date().toISOString(),
        isReady: true,
        appId: 0,
        fName:
          "https://harmony-static-dev.travelflan.com/lg/events/push-alert/2025/03/2025-03-17_xboom-mission-guide.webp",
        pLink:
          "https://lg-custom-pages.travelflan.com/xboom-activity-detail?fd_open_type=webview",
      };

      const campaignCode = await service.createPushes(dto);

      expect(campaignCode).toBeGreaterThan(0);

      // 마스터 레코드 검증 (상태가 TRANSACTION이어야 함)
      const masterRecord = await pushMasterRepository.getOnePushMaster(
        campaignCode
      );
      expect(masterRecord).not.toBeNull();
      expect(masterRecord?.step).toBe(StepEnum.TRANSACTION); // isReady가 true이므로 TRANSACTION 상태
    });

    it("대량의 식별자를 배치 처리해야 함", async () => {
      // 배치 처리를 테스트하기 위한 대량의 식별자 생성
      const largeIdentifyArray = Array.from(
        { length: 2500 },
        (_, i) => `batch-test-id-${i}`
      );

      const dto: CreatePushDto = {
        title: "배치 처리 테스트",
        content: "배치 처리 테스트 메시지",
        identifyArray: largeIdentifyArray,
        sendDateString: new Date().toISOString(),
        isReady: true,
        appId: 0,
        fName:
          "https://harmony-static-dev.travelflan.com/lg/events/push-alert/2025/03/2025-03-17_xboom-mission-guide.webp",
        pLink:
          "https://lg-custom-pages.travelflan.com/xboom-activity-detail?fd_open_type=webview",
      };

      const campaignCode = await service.createPushes(dto, 1000);

      expect(campaignCode).toBeGreaterThan(0);

      const queueCount = await pushQueueRepository.getQueueCount(campaignCode);
      expect(queueCount).toBe(largeIdentifyArray.length);
    });
  });
});
