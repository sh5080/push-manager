import { QueryRunner } from "typeorm";
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

  async findAll(
    queryRunner: QueryRunner,
    teamIds?: number[],
    appIds?: number[]
  ) {
    const query = queryRunner.manager
      .getRepository(TestIdentify)
      .createQueryBuilder("identify");

    if (teamIds && teamIds.length > 0) {
      query.andWhere("identify.TEAMID IN (:...teamIds)", { teamIds });
    }

    if (appIds && appIds.length > 0) {
      query.andWhere("identify.APPID IN (:...appIds)", { appIds });
    }

    return query.orderBy("identify.IDX", "ASC").getMany();
  }

  async create(queryRunner: QueryRunner, dto: CreateIdentifyDto) {
    const identify = new TestIdentify();
    identify.appId = dto.appId;
    return queryRunner.manager.save(identify);
  }

  async update(queryRunner: QueryRunner, dto: UpdateIdentifyDto) {
    const identify = await queryRunner.manager.findOne(TestIdentify, {
      where: { idx: dto.idx },
    });
    if (!identify) {
      throw new Error("Identify not found");
    }
    identify.identify = dto.identify;
    return queryRunner.manager.save(identify);
  }

  async delete(queryRunner: QueryRunner, idx: number) {
    return queryRunner.manager.delete(TestIdentify, { idx });
  }
}
