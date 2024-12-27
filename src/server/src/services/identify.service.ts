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
    return queryRunnerCreation(
      (queryRunner) => this.identifyRepository.findAll(queryRunner, dto),
      false
    );
  }

  async createIdentify(dto: CreateIdentifyDto) {
    return queryRunnerCreation(async (queryRunner) => {
      const data = await this.identifyRepository.create(queryRunner, dto);
      return data.IDX;
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
