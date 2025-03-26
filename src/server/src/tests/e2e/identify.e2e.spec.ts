import { IdentifyService } from "../../services/identify.service";
import { IdentifyRepository } from "../../repositories/identify.repository";
import { CreateIdentifyDto, GetIdentifiesDto } from "@push-manager/shared";
import { TestIdentify } from "../../models/TestIdentify";
import { sequelize } from "../../configs/db.config";
import { initModels } from "../../models/init-models";
import { initializeRelations } from "../../models/relations";

describe("Identify E2E 테스트", () => {
  let service: IdentifyService;
  let repository: IdentifyRepository;
  let env = process.env.NODE_ENV === "test";
  const mockData = [
    { identify: "test-id-1", name: "Test", teamId: 1, appId: 1 },
    { identify: "test-id-2", name: "Test", teamId: 1, appId: 2 },
    { identify: "test-id-3", name: "Test", teamId: 2, appId: 1 },
    { identify: "test-id-4", name: "Test", teamId: 2, appId: 2 },
    { identify: "test-id-5", name: "Test", teamId: 1, appId: 3 },
    { identify: "test-id-6", name: "Test", teamId: 2, appId: 3 },
  ];
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

    repository = new IdentifyRepository();
    service = new IdentifyService(repository);

    mockData.forEach(async (item: CreateIdentifyDto) => {
      await service.createIdentify(item);
    });
  });

  afterAll(async () => {
    await TestIdentify.destroy({ where: { name: "Test" } });
    await sequelize.close();
  });

  describe("getIdentifies", () => {
    it("appId 3: 모든 앱의 식별자를 반환해야 함", async () => {
      const dto: GetIdentifiesDto = { appId: 3 };
      const result = await service.getIdentifies(dto);

      env ? expect(result.length).toBe(16) : expect(result.length).toBe(6);

      const appIds = result.map((item) => item.appId);
      expect(appIds).toContain(1);
      expect(appIds).toContain(2);
      expect(appIds).toContain(3);
    });

    it("appId 1과 teamId 2: 테스트 환경 앱과 LG 팀의 식별자를 반환해야 함", async () => {
      const dto: GetIdentifiesDto = { appId: 1, teamId: 2 };
      const result = await service.getIdentifies(dto);

      env ? expect(result.length).toBe(3) : expect(result.length).toBe(2);

      // 모든 결과가 teamId 2를 가지고 있는지 확인
      result.forEach((item) => {
        expect(item.teamid).toBe(2);
      });

      // 모든 결과가 appId 1 또는 3을 가지고 있는지 확인
      result.forEach((item) => {
        expect([1, 3].includes(item.appId)).toBe(true);
      });

      const identifies = result.map((item) => item.identify);

      env
        ? expect(identifies).toContain("10748015")
        : expect(identifies).toContain("test-id-3");
      env
        ? expect(identifies).toContain("1010290213")
        : expect(identifies).toContain("test-id-6");
    });
  });
});
