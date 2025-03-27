import { PushService } from "@/src/services/push.service";
import { PushMasterRepository } from "@/src/repositories/pushMaster.repository";
import { PushStsMsgRepository } from "@/src/repositories/pushStsMsg.repository";
import { PushQueueRepository } from "@/src/repositories/pushQueue.repository";
import { AppIdEnum, CreatePushDto, StepEnum } from "@push-manager/shared";
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
        sendDateString: "2025-03-27 16:30",
        isReady: false,
        appId: AppIdEnum.PROD,
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
  });
});
