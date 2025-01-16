import { IIdentifyService } from "../interfaces/identify.interface";
import { IdentifyRepository } from "../repositories/identify.repository";
import {
  BadRequestException,
  CreateIdentifyDto,
  GetIdentifiesDto,
  NotFoundException,
  UpdateIdentifyDto,
} from "@push-manager/shared";

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
    return this.identifyRepository.findAll(teamIds, appIds);
  }

  async getIdentify(idx: number) {
    return this.identifyRepository.findOne(idx);
  }

  async createIdentify(dto: CreateIdentifyDto) {
    const identify = await this.identifyRepository.findOneByIdentify(
      dto.identify
    );
    if (identify) {
      throw new BadRequestException("이미 존재하는 식별자입니다.");
    }
    const data = await this.identifyRepository.create(dto);
    if (!data) {
      throw new BadRequestException("식별자 생성에 실패했습니다.");
    }
    return data;
  }

  async updateIdentify(dto: UpdateIdentifyDto) {
    const identify = await this.identifyRepository.findOne(dto.idx);
    if (!identify) {
      throw new NotFoundException("존재하지 않는 식별자입니다.");
    }
    return await this.identifyRepository.update(dto);
  }

  async deleteIdentify(idx: number) {
    const identify = await this.identifyRepository.findOne(idx);
    if (!identify) {
      throw new NotFoundException("존재하지 않는 식별자입니다.");
    }
    return await this.identifyRepository.delete(idx);
  }
}
