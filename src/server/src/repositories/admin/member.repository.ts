import { BaseRepository } from "../base.repository";
import { Encrypted } from "../../decorators/encrypted.decorator";
import { Member } from "../../models/admin/init-models";
import { GetMemberByMemNoDto } from "@push-manager/shared";
// import { Decrypted } from "../../decorators/decrypted.decorator";

export class MemberRepository extends BaseRepository<Member> {
  constructor() {
    super(Member);
  }

  @Encrypted()
  // @Decrypted()
  async findByMemNo(dto: GetMemberByMemNoDto) {
    return await Member.findOne({
      where: { memNo: dto.memNo },
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
