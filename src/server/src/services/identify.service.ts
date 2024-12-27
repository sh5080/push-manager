import { AppDataSource } from "../configs/db.config";
import { IIdentifyService } from "../interfaces/identify.interface";
import { IdentifyRepository } from "../repositories/identify.repository";
import {
  CreateIdentifyDto,
  GetIdentifiesDto,
  UpdateIdentifyDto,
} from "@push-manager/shared/dtos/identify.dto";

export class IdentifyService implements IIdentifyService {
  constructor(private readonly identifyRepository: IdentifyRepository) {}

  async getIdentifies(dto: GetIdentifiesDto) {
    const queryRunner = AppDataSource.createQueryRunner();
    return await this.identifyRepository.findAll(queryRunner, dto);
  }

  async createIdentify(dto: CreateIdentifyDto) {
    const queryRunner = AppDataSource.createQueryRunner();
    const data = await this.identifyRepository.create(queryRunner, dto);
    return data.IDX;
  }

  async updateIdentify(dto: UpdateIdentifyDto) {
    const queryRunner = AppDataSource.createQueryRunner();
    return await this.identifyRepository.update(queryRunner, dto);
  }

  async deleteIdentify(idx: number) {
    const queryRunner = AppDataSource.createQueryRunner();
    await this.identifyRepository.delete(queryRunner, idx);
  }
}
