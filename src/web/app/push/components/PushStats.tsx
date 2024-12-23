"use client";

import { useEffect, useState } from "react";
import { PushAPI } from "app/apis/push.api";

export function PushStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const pushAPI = PushAPI.getInstance();
        const data = await pushAPI.getPushStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch push stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-500">오늘 발송</div>
        <div className="text-2xl font-bold">{stats?.today || 0}</div>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-500">이번 달 발송</div>
        <div className="text-2xl font-bold">{stats?.thisMonth || 0}</div>
      </div>
    </div>
  );
}
