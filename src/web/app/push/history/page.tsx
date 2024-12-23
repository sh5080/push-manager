"use client";

import { useEffect, useState } from "react";
import { PushList } from "../components/pushList.component";
import { PushDetail } from "../components/pushDetail.component";
import {
  PageHeader,
  ExportButton,
  CreateButton,
} from "../../common/components/pageHeader.component";
import { IPushStsMsg } from "@push-manager/shared/types/entities/pushStsMsg.entity";
import LoadingSpinner from "app/common/components/spinner.component";

export default function PushHistoryPage() {
  const [pushes, setPushes] = useState<IPushStsMsg[]>([]);
  const [selectedPush, setSelectedPush] = useState<IPushStsMsg | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPushes();
  }, []);

  const fetchPushes = async () => {
    try {
      const response = await fetch("/api/push");
      const data = await response.json();
      setPushes(data);
    } catch (error) {
      console.error("Failed to fetch pushes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <PageHeader
          title="푸시 알림 관리"
          description={
            <span className="whitespace-pre-line">
              타겟 푸시 알림을 생성하고 발송 현황을 관리할 수 있습니다.{"\n"}
              전체푸시는 기존 핑거푸시 콘솔을 사용해주세요.
            </span>
          }
          actions={
            <>
              <ExportButton
                onClick={() => {
                  /* 내보내기 핸들러 */
                }}
              />
              <CreateButton
                text="타겟 푸시 발송"
                onClick={() => {
                  /* 새 푸시 생성 핸들러 */
                }}
              />
            </>
          }
        />

        <div className="mb-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="제목 또는 발송자로 검색"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>모든 상태</option>
                <option>완료</option>
                <option>실패</option>
                <option>대기</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>최근 7일</option>
                <option>최근 30일</option>
                <option>최근 90일</option>
                <option>직접 설정</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                검색
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <StatCard
            title="전체 발송"
            value="1,234"
            trend="+12.5%"
            trendUp={true}
          />
          <StatCard
            title="발송 완료"
            value="1,180"
            trend="+15.2%"
            trendUp={true}
            color="green"
          />
          <StatCard
            title="발송 실패"
            value="54"
            trend="-2.3%"
            trendUp={false}
            color="red"
          />
          <StatCard
            title="평균 발송 시간"
            value="1.2초"
            trend="-0.1초"
            trendUp={false}
            color="blue"
          />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <PushList pushes={pushes} onPushSelect={setSelectedPush} />
        )}
      </div>

      {selectedPush && (
        <PushDetail push={selectedPush} onClose={() => setSelectedPush(null)} />
      )}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  color?: "blue" | "green" | "red";
}

function StatCard({
  title,
  value,
  trend,
  trendUp,
  color = "blue",
}: StatCardProps) {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span
          className={`text-sm flex items-center ${
            trendUp ? "text-green-600" : "text-red-600"
          }`}
        >
          {trendUp ? (
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
              />
            </svg>
          )}
          {trend}
        </span>
      </div>
    </div>
  );
}
