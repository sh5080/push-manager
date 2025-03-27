import { CreateIdentifyDto, UpdateIdentifyDto } from "@push-manager/shared";
import { TestIdentify } from "../../models/TestIdentify";
import { sequelize } from "../../configs/db.config";
import { initModels } from "../../models/init-models";
import { initializeRelations } from "../../models/relations";
import { IdentifyService } from "../../services/identify.service";
import { IdentifyRepository } from "../../repositories/identify.repository";
import { apiRequest } from "../test.util";

describe("Identify E2E 테스트", () => {
  let env = process.env.NODE_ENV === "test";
  let service: IdentifyService;
  let repository: IdentifyRepository;
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

    repository = new IdentifyRepository();
    service = new IdentifyService(repository);

    for (const item of mockData) {
      await service.createIdentify(item);
    }
  });

  afterAll(async () => {
    await TestIdentify.destroy({ where: { name: "Test" } });
    await sequelize.close();
  });

  describe("GET /identify", () => {
    it("appId 3: 모든 앱의 식별자를 반환해야 함", async () => {
      const response = await apiRequest.get("/identify", { appId: 3 });
      const result = response.data;
      env ? expect(result.length).toBe(22) : expect(result.length).toBe(6);

      const appIds = result.map((item: any) => item.appId);
      expect(appIds).toContain(1);
      expect(appIds).toContain(2);
      expect(appIds).toContain(3);
    });

    it("appId 1과 teamId 2: 테스트 환경 앱과 LG 팀의 식별자를 반환해야 함", async () => {
      const response = await apiRequest.get("/identify", {
        appId: 1,
        teamId: 2,
      });
      const result = response.data;
      env ? expect(result.length).toBe(4) : expect(result.length).toBe(2);

      // 모든 결과가 teamId 2를 가지고 있는지 확인
      result.forEach((item: any) => {
        expect(item.teamId).toBe(2);
      });

      // 모든 결과가 appId 1 또는 3을 가지고 있는지 확인
      result.forEach((item: any) => {
        expect([1, 3].includes(item.appId)).toBe(true);
      });

      const identifies = result.map((item: any) => item.identify);

      env
        ? expect(identifies).toContain("10748015")
        : expect(identifies).toContain("test-id-3");
      env
        ? expect(identifies).toContain("1010290213")
        : expect(identifies).toContain("test-id-6");
    });
  });

  describe("POST /identify", () => {
    it("새로운 식별자를 생성할 수 있어야 함", async () => {
      const newIdentify: CreateIdentifyDto = {
        identify: "test-new-id",
        name: "Test New",
        teamId: 1,
        appId: 2,
      };

      const response = await apiRequest.post("/identify", newIdentify);
      const result = response.data;

      expect(result.idx).toBeDefined();
      expect(result.identify).toBe(newIdentify.identify);
      expect(result.name).toBe(newIdentify.name);
      expect(result.teamId).toBe(newIdentify.teamId);
      expect(result.appId).toBe(newIdentify.appId);
    });

    it("중복된 식별자 생성 시 적절한 에러를 반환해야 함", async () => {
      const duplicateIdentify: CreateIdentifyDto = {
        identify: "test-new-id",
        name: "Test Duplicate",
        teamId: 1,
        appId: 1,
      };

      await apiRequest.post("/identify", duplicateIdentify, 400);
      await TestIdentify.destroy({ where: { identify: "test-new-id" } });
    });
  });

  describe("PATCH /identify/:idx", () => {
    it("기존 식별자를 업데이트할 수 있어야 함", async () => {
      const listResponse = await apiRequest.get("/identify");
      const list = listResponse.data;
      const targetIdentify = list.find(
        (item: any) => item.identify === "test-id-1"
      );

      if (!targetIdentify) {
        throw new Error("테스트 데이터를 찾을 수 없습니다");
      }

      const updateData: UpdateIdentifyDto = {
        identify: "updated-id-1",
        name: targetIdentify.name,
        teamId: targetIdentify.teamId,
        appId: targetIdentify.appId,
      };

      await apiRequest.patch("/identify", targetIdentify.idx, updateData);
      const updatedResponse = await apiRequest.get("/identify");
      const updatedList = updatedResponse.data;
      const result = updatedList.find(
        (item: any) => item.identify === "updated-id-1"
      );

      expect(result.idx).toBe(targetIdentify.idx);
      expect(result.identify).toBe(updateData.identify);
      expect(result.name).toBe(updateData.name);
      expect(result.teamId).toBe(updateData.teamId);
      expect(result.appId).toBe(updateData.appId);
    });
  });

  describe("DELETE /identify/:idx", () => {
    it("식별자를 삭제할 수 있어야 함", async () => {
      const deleteTestData: CreateIdentifyDto = {
        identify: "test-delete-id",
        name: "Test Delete",
        teamId: 1,
        appId: 1,
      };

      const createResponse = await apiRequest.post("/identify", deleteTestData);

      const createdIdentify = createResponse.data;

      await apiRequest.delete("/identify", createdIdentify.idx);
      const listResponse = await apiRequest.get("/identify");
      const list = listResponse.data;

      const result = list.find(
        (item: any) => item.identify === deleteTestData.identify
      );

      expect(result).toBeUndefined();
    });
  });
});
