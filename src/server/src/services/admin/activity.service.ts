import { IActivityService } from "../../interfaces/admin/activity.interface";
import { AccountApi } from "../external/account.api";
import { MemberRepository } from "../../repositories/admin/member.repository";
import { GetActivityDto, IActivityWithBestshopNm } from "@push-manager/shared";
import { ActivityRepository } from "../../repositories/admin/activity.repository";

export class ActivityService implements IActivityService {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly memberRepository: MemberRepository,
    private readonly accountApi: AccountApi
  ) {}

  async getActivity(dto: GetActivityDto) {
    try {
      // 1. 기본 활동 데이터 조회
      const activities = await this.activityRepository.getActivity(dto);

      // 2. 활동 데이터 가공
      const processedActivities = this.processActivityData(activities.data);

      // 3. 중복 제거된 memNo 목록 추출
      const uniqueMemNos = [
        ...new Set(
          (await processedActivities)
            .map((item) => item.value.memNo)
            .filter((memNo): memNo is string => memNo !== undefined)
        ),
      ];

      // 4. memNo -> ci 매핑 정보 한 번에 조회
      const memberInfoMap = new Map();
      const members = await this.memberRepository.findByMemNos(uniqueMemNos);

      members.forEach((member) => {
        if (member.memNo && member.ci) {
          memberInfoMap.set(member.memNo, member.ci);
        }
      });

      // 5. ci -> bestshopNm 매핑 정보 조회 (Promise.all 사용)
      const memNoToBestshopNmMap = new Map();
      const uniqueCIs = [
        ...new Set(members.map((member) => member.ci).filter(Boolean)),
      ];

      // 첫 번째 시도
      await Promise.all(
        uniqueCIs.map(async (ci) => {
          try {
            const info = await this.accountApi.getMemberInfo(ci);
            const relatedMembers = members.filter((m) => m.ci === ci);
            relatedMembers.forEach((member) => {
              if (member.memNo) {
                memNoToBestshopNmMap.set(member.memNo, info.bestshopNm);
              }
            });
          } catch (error) {
            const relatedMemNos = members
              .filter((m) => m.ci === ci)
              .map((m) => m.memNo)
              .filter(Boolean);

            // 실패한 경우 bestshopNm에 "err" 기재
            relatedMemNos.forEach((memNo) => {
              memNoToBestshopNmMap.set(memNo, "err");
            });

            console.error(
              `Failed to fetch info - CI: ${ci}, Related memNos: ${relatedMemNos.join(
                ", "
              )}`,
              error
            );
          }
        })
      );

      // 6. 최종 결과 매핑
      const enhancedData: IActivityWithBestshopNm[] = (
        await processedActivities
      ).map((item) => {
        const memNo = item.value.memNo;
        const bestshopNm = memNo ? memNoToBestshopNmMap.get(memNo) : undefined;
        const ci = memNo ? memberInfoMap.get(memNo) : undefined;

        return {
          ...item,
          bestshopNm: bestshopNm || null, // undefined 대신 null 반환
          ci: ci || null,
        };
      });

      return {
        data: enhancedData,
        total: activities.total,
        page: activities.page,
        pageSize: activities.pageSize,
        totalPages: activities.totalPages,
      };
    } catch (error) {
      console.error("Error in getActivity:", error);
      throw error;
    }
  }

  async processActivityData(activities: IActivityWithBestshopNm[]) {
    const groupedActivities = new Map<string, IActivityWithBestshopNm[]>();

    activities.forEach((item) => {
      const key = item.value.memNo || "";
      if (!groupedActivities.has(key)) {
        groupedActivities.set(key, []);
      }
      groupedActivities.get(key)?.push(item);
    });

    return Array.from(groupedActivities.entries()).map(([_, items]) => {
      const latestItem = items[0];

      // submissions 데이터 병합
      const submissions: Record<string, string> = {};
      items.forEach((item) => {
        const itemSubmissions = item.value.eventData?.submissions || {};
        Object.entries(itemSubmissions).forEach(([key, value]) => {
          if (!submissions[key]) {
            submissions[key] = value;
          }
        });
      });

      // eventData 내부에 submissions 유지
      return {
        ...latestItem,
        value: {
          ...latestItem.value,
          eventData: {
            ...latestItem.value.eventData,
            submissions,
          },
        },
      };
    });
  }

  async updateActivityExcel(dto: IActivityWithBestshopNm[]) {
    let updatedCount = 0;
    const updatedData = await Promise.all(
      dto.map(async (excel) => {
        if (excel.ci && excel.bestshopNm === "err") {
          const member = await this.accountApi.getMemberInfo(excel.ci);
          if (member) {
            excel.bestshopNm = member.bestshopNm;
            updatedCount++;
          }
        }
        return excel; // 업데이트된 엑셀 데이터 반환
      })
    );
    return { updatedCount, updatedData }; // 업데이트된 데이터 반환
  }
}
