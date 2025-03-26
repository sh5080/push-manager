import { IIdentifyService } from "../../interfaces/identify.interface";
import { GetIdentifiesDto } from "@push-manager/shared";
import { createMockService } from "../mock.test";

describe("Identify 통합 테스트", () => {
  let service: jest.Mocked<IIdentifyService>;

  beforeEach(() => {
    service = createMockService<IIdentifyService>();
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

      (service.getIdentifies as jest.Mock).mockResolvedValue(mockIdentifies);

      const result = await service.getIdentifies(dto);
      expect(result).toEqual(mockIdentifies);
      expect(result.length).toBe(3);

      expect(service.getIdentifies).toHaveBeenCalledWith(dto);
    });

    it("appId 1과 teamId 2: 테스트 환경 앱과 LG 팀의 식별자를 반환해야 함", async () => {
      const dto: GetIdentifiesDto = { appId: 1, teamId: 2 };

      const mockIdentifies = [
        { idx: 3, identify: "id-3", name: "Name 3", teamId: 2, appId: 1 },
        { idx: 6, identify: "id-6", name: "Name 6", teamId: 2, appId: 3 },
      ];

      (service.getIdentifies as jest.Mock).mockResolvedValue(mockIdentifies);

      const result = await service.getIdentifies(dto);
      expect(result).toEqual(mockIdentifies);
      expect(result.length).toBe(2);

      expect(service.getIdentifies).toHaveBeenCalledWith(dto);
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

      (service.getIdentifies as jest.Mock).mockResolvedValue(mockIdentifies);

      const result = await service.getIdentifies(dto);
      expect(result).toEqual(mockIdentifies);
      expect(result.length).toBe(6);

      expect(service.getIdentifies).toHaveBeenCalledWith(dto);
    });
  });
});
