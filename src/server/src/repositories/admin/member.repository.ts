import { BaseRepository } from "../base.repository";
import { Encrypted } from "../../decorators/encrypted.decorator";
import { Decrypted } from "../../decorators/decrypted.decorator";
import { Member } from "../../models/admin/init-models";
import { GetMemberDto } from "@push-manager/shared";

export class MemberRepository extends BaseRepository<Member> {
  constructor() {
    super(Member);
  }

  @Encrypted()
  @Decrypted()
  async findByDto(dto: GetMemberDto) {
    return await Member.findOne({
      where: {
        ...(dto.memNo && { memNo: dto.memNo }),
        ...(dto.ci && { ci: dto.ci }),
        ...(dto.phoneNumber && { phoneNumber: dto.phoneNumber }),
      },
      attributes: [
        "id",
        "memNo",
        "email",
        "name",
        "phoneNumber",
        "permissions",
        "unifyId",
        "ci",
      ],
      order: [["id", "asc"]],
      raw: true,
    });
  }
}
