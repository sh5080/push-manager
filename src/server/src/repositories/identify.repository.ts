import { TestIdentify } from "../models/TestIdentify";
import { CreateIdentifyDto, UpdateIdentifyDto } from "@push-manager/shared";
import { BaseRepository } from "./base.repository";
import { Op } from "sequelize";

export class IdentifyRepository extends BaseRepository<TestIdentify> {
  constructor() {
    super(TestIdentify);
  }
  async findOne(idx: number) {
    return await this.findOneWithRownum<TestIdentify>({
      where: { idx },
      attributes: ["idx", "identify", "name", "teamId", "appId"],
    });
  }
  async findOneByIdentify(identify: string) {
    return await this.findOneWithRownum<TestIdentify>({
      where: { identify },
      attributes: ["idx", "identify", "name", "teamId", "appId"],
    });
  }
  async findAll(teamIds?: number[], appIds?: number[]) {
    const whereConditions = [];

    if (teamIds && teamIds.length > 0) {
      whereConditions.push({
        TEAMID: {
          [Op.in]: teamIds,
        },
      });
    }

    if (appIds && appIds.length > 0) {
      whereConditions.push({
        APPID: {
          [Op.in]: appIds,
        },
      });
    }

    return await TestIdentify.findAll({
      where:
        whereConditions.length > 0 ? { [Op.and]: whereConditions } : undefined,
      order: [["idx", "ASC"]],
      attributes: ["idx", "identify", "name", "teamId", "appId"],
      raw: true,
    });
  }
  async create(dto: CreateIdentifyDto) {
    return await this.createWithSeq<TestIdentify>({
      values: {
        identify: dto.identify,
        name: dto.name,
        teamId: dto.teamId,
        appId: dto.appId,
      },
      fields: ["idx", "identify", "name", "teamId", "appId"],
    });
  }

  async update(idx: number, dto: UpdateIdentifyDto) {
    const { identify, name, teamId, appId } = dto;
    await TestIdentify.update(
      { identify, name, teamId, appId },
      { where: { idx } }
    );
    return;
  }

  async delete(idx: number) {
    await TestIdentify.destroy({ where: { idx } });
    return;
  }
}
