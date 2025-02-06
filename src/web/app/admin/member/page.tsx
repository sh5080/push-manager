"use client";

import { useState } from "react";
import { PageHeader } from "@commonComponents/layout/pageHeader.component";
import { memberApi } from "app/apis/admin/member.api";
import { Toast } from "app/utils/toast.util";
import { IMemberWithNewbestInfo } from "@push-manager/shared/types/entities/admin/member.entity";
import { Search } from "@commonComponents/inputs/search.component";
import { MemberInfo } from "./components/memberInfo.component";

export default function MemberPage() {
  const [member, setMember] = useState<IMemberWithNewbestInfo | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async () => {
    if (!searchValue) {
      Toast.error("회원번호를 입력해주세요.");
      return;
    }

    try {
      const memberData = await memberApi.getMemberByMemNo(searchValue);
      setMember(memberData);
    } catch (error: any) {
      Toast.error(error.message);
      setMember(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
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
            onKeyDown={handleKeyDown}
            placeholder="회원번호를 입력하세요"
          />
        </div>

        {member && <MemberInfo member={member} />}
      </div>
    </div>
  );
}
