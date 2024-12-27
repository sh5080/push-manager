import { QueryRunner, Repository } from "typeorm";
import { TestIdentify } from "../entities/testIdentify.entity";
import {
  CreateIdentifyDto,
  GetIdentifiesDto,
  UpdateIdentifyDto,
} from "@push-manager/shared/dtos/identify.dto";
import { BaseRepository } from "./base.repository";
import { AppDataSource } from "../configs/db.config";

export class IdentifyRepository extends BaseRepository<TestIdentify> {
  constructor() {
    super(AppDataSource, TestIdentify);
  }

  async findAll(queryRunner: QueryRunner, dto: GetIdentifiesDto) {
    const query = queryRunner.manager
      .getRepository(TestIdentify)
      .createQueryBuilder("identify");

    if (dto.teamId) {
      query.andWhere("identify.teamId = :teamId", { teamId: dto.teamId });
    }

    if (dto.appId) {
      query.andWhere("identify.appId = :appId", { appId: dto.appId });
    }

    return query.orderBy("identify.IDX", "DESC").getMany();
  }

  async create(queryRunner: QueryRunner, dto: CreateIdentifyDto) {
    const identify = new TestIdentify();
    identify.APPID = dto.appId;
    return queryRunner.manager.save(identify);
  }

  async update(queryRunner: QueryRunner, dto: UpdateIdentifyDto) {
    const identify = await queryRunner.manager.findOne(TestIdentify, {
      where: { IDX: dto.idx },
    });
    if (!identify) {
      throw new Error("Identify not found");
    }
    identify.IDENTIFY = dto.identify;
    return queryRunner.manager.save(identify);
  }

  async delete(queryRunner: QueryRunner, idx: number) {
    return queryRunner.manager.delete(TestIdentify, { idx });
  }
}
