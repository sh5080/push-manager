import { IdentifyService } from "../../services/identify.service";
import { IIdentifyService } from "../../interfaces/identify.interface";
import { IdentifyRepository } from "../../repositories/identify.repository";
import { GetIdentifiesDto } from "@push-manager/shared";
import { createMockService } from "../test.util";

describe("Identify 통합 테스트", () => {
  let service: IIdentifyService;
  let repository: jest.Mocked<IdentifyRepository>;

  beforeEach(() => {
    repository = createMockService<IdentifyRepository>();
    service = new IdentifyService(repository);
    jest.clearAllMocks();
  });

  describe("getIdentifies", () => {
    it("appId 3: 모든 앱의 식별자를 반환해야 함", async () => {
      const dto: GetIdentifiesDto = { appId: 3 };

      const mockIdentifies = [
        { idx: 1, identify: "id-1", name: "Name 1", teamId: 1, appId: 1 },
        { idx: 2, identify: "id-2", name: "Name 2", teamId: 1, appId: 2 },
        { idx: 3, identify: "id-3", name: "Name 3", teamId: 2, appId: 3 },
      ];

      (repository.findAll as jest.Mock).mockResolvedValue(mockIdentifies);

      const result = await service.getIdentifies(dto);
      expect(result).toEqual(mockIdentifies);
      expect(result.length).toBe(3);

      expect(repository.findAll).toHaveBeenCalledWith([], [1, 2, 3]);
    });

    it("appId 1과 teamId 2: 테스트 환경 앱과 LG 팀의 식별자를 반환해야 함", async () => {
      const dto: GetIdentifiesDto = { appId: 1, teamId: 2 };

      const mockIdentifies = [
        { idx: 3, identify: "id-3", name: "Name 3", teamId: 2, appId: 1 },
        { idx: 6, identify: "id-6", name: "Name 6", teamId: 2, appId: 3 },
      ];

      (repository.findAll as jest.Mock).mockResolvedValue(mockIdentifies);

      const result = await service.getIdentifies(dto);
      expect(result).toEqual(mockIdentifies);
      expect(result.length).toBe(2);

      expect(repository.findAll).toHaveBeenCalledWith([2], [1, 3]);
    });

    it("필터링 조건이 없을 때 모든 식별자를 반환해야 함", async () => {
      const dto: GetIdentifiesDto = {};

      const mockIdentifies = [
        { idx: 1, identify: "id-1", name: "Name 1", teamId: 1, appId: 1 },
        { idx: 2, identify: "id-2", name: "Name 2", teamId: 1, appId: 2 },
        { idx: 3, identify: "id-3", name: "Name 3", teamId: 2, appId: 1 },
        { idx: 4, identify: "id-4", name: "Name 4", teamId: 2, appId: 2 },
        { idx: 5, identify: "id-5", name: "Name 5", teamId: 1, appId: 3 },
        { idx: 6, identify: "id-6", name: "Name 6", teamId: 2, appId: 3 },
      ];

      (repository.findAll as jest.Mock).mockResolvedValue(mockIdentifies);

      const result = await service.getIdentifies(dto);
      expect(result).toEqual(mockIdentifies);
      expect(result.length).toBe(6);

      expect(repository.findAll).toHaveBeenCalledWith([], []);
    });
  });
});
