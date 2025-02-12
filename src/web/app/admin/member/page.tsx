"use client";

import { useState } from "react";
import { PageHeader } from "@commonComponents/layout/pageHeader.component";
import { memberApi } from "app/apis/admin/member.api";
import { Toast } from "app/utils/toast.util";
import { IMemberWithNewbestInfo } from "@push-manager/shared/types/entities/admin/member.entity";
import { Search } from "@commonComponents/inputs/search.component";
import { MemberInfo } from "./components/memberInfo.component";
import { GetMemberDto } from "@push-manager/shared/dtos/admin/member.dto";
import { MemberSearchType } from "app/types/prop.type";

export default function MemberPage() {
  const [member, setMember] = useState<IMemberWithNewbestInfo | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState<MemberSearchType>("memNo");

  const searchOptions = [
    { value: "memNo", label: "회원번호", placeholder: "회원번호를 입력하세요" },
    { value: "ci", label: "CI", placeholder: "CI를 입력하세요" },
    {
      value: "phoneNumber",
      label: "전화번호",
      placeholder: "전화번호를 입력하세요",
    },
  ];

  const handleSearch = async () => {
    if (!searchValue) {
      Toast.error("검색어를 입력해주세요.");
      return;
    }

    try {
      const dto = { [selectedType]: searchValue } as GetMemberDto;
      const memberData = await memberApi.getMember(dto);
      setMember(memberData);
    } catch (error: any) {
      Toast.error(error.message);
      setMember(null);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <PageHeader
          title="회원 조회"
          description="회원번호로 회원 정보를 조회할 수 있습니다."
        />

        <div className="mb-6">
          <Search
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            searchOptions={searchOptions}
            onTypeChange={(type) => setSelectedType(type as MemberSearchType)}
            defaultPlaceholder="회원번호를 입력하세요"
          />
        </div>

        {member && <MemberInfo member={member} />}
      </div>
    </div>
  );
}
