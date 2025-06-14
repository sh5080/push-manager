import {
  BadRequestException,
  GetMemberDto,
  GetMemberListDto,
  IMemberWithNewbestInfo,
} from "@push-manager/shared";
import { IMemberService } from "../../interfaces/admin/member.interface";
import { MemberRepository } from "../../repositories/admin/member.repository";
import { AdminRepository } from "../../repositories/admin/admin.repository";
import { NewbestApi } from "../external/newbest.api";
import { AccountApi } from "../external/account.api";
import { Member } from "@/src/models/admin/init-models";
export class MemberService implements IMemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly adminRepository: AdminRepository,
    private readonly newbestApi: NewbestApi,
    private readonly accountApi: AccountApi
  ) {}

  async getMember(dto: GetMemberDto) {
    const member = await this.memberRepository.findByDto(dto);

    if (!member) {
      throw new BadRequestException("Member not found");
    }
    // 뉴베스트
    const newbestInfo = await this.newbestApi.getMemberInfo(member.ci);
    // 한영본
    // const accountInfo = await this.accountApi.getMemberInfo(member.ci);
    return {
      ...member,
      newbestInfo: newbestInfo[0],
    } as unknown as IMemberWithNewbestInfo;
  }

  async getMemberList(dto: GetMemberListDto) {
    return await this.memberRepository.getMemberList(dto);
  }
  async getMemberListByActivity() {
    return await this.memberRepository.getMemberListByActivity();
  }

  async getAdminByEmail(email: string) {
    return await this.adminRepository.findByEmail(email);
  }
  async getMembersAccountInfo(memNoList: string[]): Promise<
    {
      memNo?: string;
      bestshopNm?: string;
      address1?: string;
      address2?: string;
    }[]
  > {
    const ciList = await Promise.all(
      memNoList.map(async (memNo) => {
        const member = await this.memberRepository.findByDto({ memNo });
        return { ci: member?.ci, memNo: member?.memNo };
      })
    );
    const accountInfo = await Promise.all(
      ciList.map(async ({ ci, memNo }) => {
        try {
          const res = await this.accountApi.getMemberInfo(ci as string);
          return {
            memNo,
            bestshopNm: res.bestshopNm,
            address1: res.address1,
            address2: res.address2,
          };
        } catch (error) {
          console.error(
            `Error fetching account info for memNo ${memNo}:`,
            error
          );
        }
      })
    );

    return accountInfo.map((item) =>
      item
        ? item
        : {
            memNo: undefined,
            bestshopNm: undefined,
            address1: undefined,
            address2: undefined,
          }
    );
  }
  async getMemberAccountInfo(memNo: string, ci: string) {
    let member: Member | null = null;
    if (memNo) {
      member = await this.memberRepository.findByDto({ memNo });
    } else if (ci) {
      member = await this.memberRepository.findByDto({ ci });
    }
    if (!member) {
      throw new BadRequestException("Member not found");
    }
    const accountInfo = await this.accountApi.getMemberInfo(
      member?.ci as string
    );
    return {
      memNo: member?.memNo,
      bestshopNm: accountInfo.bestshopNm,
      address1: accountInfo.address1,
      address2: accountInfo.address2,
    };
  }
}
