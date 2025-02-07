import { IMemberWithNewbestInfo } from "@push-manager/shared";
import { getYNChipStyle } from "app/utils/chip/common/style.util";
import { getYNChipText } from "app/utils/chip/common/text.util";

interface MemberInfoProps {
  member: IMemberWithNewbestInfo;
}

export function MemberInfo({ member }: MemberInfoProps) {
  const formatDate = (dateStr: string) => {
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(
      6,
      8
    )}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold mb-4">회원 정보</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500">회원번호</p>
          <p className="font-medium">{member.memNo}</p>
        </div>
        <div>
          <p className="text-gray-500">이름</p>
          <p className="font-medium">{member.name}</p>
        </div>
        <div>
          <p className="text-gray-500">생년월일</p>
          <p className="font-medium">
            {member.newbestInfo.BIRTHDAY_DATE
              ? formatDate(member.newbestInfo.BIRTHDAY_DATE)
              : "-"}
          </p>
        </div>
        <div>
          <p className="text-gray-500">성별</p>
          <p className="font-medium">
            {member.newbestInfo.SEX === "M" ? "남성" : "여성"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">휴대폰 번호</p>
          <p className="font-medium">{member.phoneNumber}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500">CI</p>
          <p className="font-medium">{member.ci}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500">주소</p>
          <p className="font-medium">
            {`(${member.newbestInfo.POST_CD}) ${member.newbestInfo.ADDR1} ${member.newbestInfo.ADDR2} ${member.newbestInfo.ADDR3}`}
          </p>
        </div>
        <div>
          <p className="text-gray-500">등급</p>
          <p className="font-medium">{member.newbestInfo.LGE_CUST_GRD_NM}</p>
        </div>
        <div>
          <p className="text-gray-500">포인트</p>
          <p className="font-medium">
            {member.newbestInfo.REMAIN_POINT
              ? member.newbestInfo.REMAIN_POINT.toLocaleString()
              : "확인되지 않음"}
            P
          </p>
        </div>
        <div>
          <p className="text-gray-500">등급 유효기간</p>
          <p className="font-medium">
            {`${formatDate(member.newbestInfo.CUST_GRD_ST_DATE)} ~ ${formatDate(
              member.newbestInfo.CUST_GRD_ED_DATE
            )}`}
          </p>
        </div>
        <div>
          <p className="text-gray-500">수신동의</p>
          <div className="flex gap-2">
            <span
              className={`text-sm px-2 py-0.5 rounded ${getYNChipStyle(
                member.newbestInfo.SMS_RCV_YN
              )}`}
            >
              SMS {getYNChipText(member.newbestInfo.SMS_RCV_YN)}
            </span>
            <span
              className={`text-sm px-2 py-0.5 rounded ${getYNChipStyle(
                member.newbestInfo.EMAIL_RCV_YN
              )}`}
            >
              이메일 {getYNChipText(member.newbestInfo.EMAIL_RCV_YN)}
            </span>
            <span
              className={`text-sm px-2 py-0.5 rounded ${getYNChipStyle(
                member.newbestInfo.DM_RCV_YN
              )}`}
            >
              DM {getYNChipText(member.newbestInfo.DM_RCV_YN)}
            </span>
            <span
              className={`text-sm px-2 py-0.5 rounded ${getYNChipStyle(
                member.newbestInfo.TM_RCV_YN
              )}`}
            >
              TM {getYNChipText(member.newbestInfo.TM_RCV_YN)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
