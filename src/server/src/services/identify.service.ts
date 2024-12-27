import { IIdentifyService } from "../interfaces/identify.interface";
import { IdentifyRepository } from "../repositories/identify.repository";
import {
  CreateIdentifyDto,
  GetIdentifiesDto,
  UpdateIdentifyDto,
} from "@push-manager/shared/dtos/identify.dto";
import { queryRunnerCreation } from "../utils/transaction.util";

export class IdentifyService implements IIdentifyService {
  constructor(private readonly identifyRepository: IdentifyRepository) {}

  async getIdentifies(dto: GetIdentifiesDto) {
    // AppId 처리
    let appIds: number[] = [];
    if (dto.appId) {
      if (dto.appId === 3) {
        // 전체
        appIds = [1, 2, 3];
      } else if (dto.appId === 1) {
        // 테스트 환경
        appIds = [1, 3];
      } else if (dto.appId === 2) {
        // 운영 환경
        appIds = [2, 3];
      }
    }

    // TeamId 처리
    let teamIds: number[] = [];
    if (dto.teamId) {
      if (dto.teamId === 3) {
        // 전체
        teamIds = [1, 2];
      } else if (dto.teamId === 1) {
        // FREED
        teamIds = [1];
      } else if (dto.teamId === 2) {
        // LG
        teamIds = [2];
      }
    }

    return queryRunnerCreation(
      (queryRunner) =>
        this.identifyRepository.findAll(queryRunner, teamIds, appIds),
      false
    );
  }

  async createIdentify(dto: CreateIdentifyDto) {
    return queryRunnerCreation(async (queryRunner) => {
      const data = await this.identifyRepository.create(queryRunner, dto);
      return data.idx;
    });
  }

  async updateIdentify(dto: UpdateIdentifyDto) {
    return queryRunnerCreation((queryRunner) =>
      this.identifyRepository.update(queryRunner, dto)
    );
  }

  async deleteIdentify(idx: number) {
    queryRunnerCreation((queryRunner) =>
      this.identifyRepository.delete(queryRunner, idx)
    );
  }
}
