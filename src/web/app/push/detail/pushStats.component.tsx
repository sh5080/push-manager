import {
  IPushStsMsgDetail,
  IPushStsMsgResult,
} from "@push-manager/shared/types/entities/pushStsMsgDetail.entity";
import { StatKey } from "app/types/prop.type";
import { ContentViewer } from "app/common/components/detail/contentViewer.component";
import { PushStatsDetail } from "./pushStatsDetail.component";

interface StatProps {
  label: string;
  value: number;
}

export const StatItem = ({ label, value }: StatProps) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="mt-1">{value}명</p>
  </div>
);

const STAT_ITEMS = [
  { key: "sent" as StatKey, label: "발송" },
  { key: "failed" as StatKey, label: "실패" },
  { key: "opened" as StatKey, label: "오픈" },
  { key: "appdel" as StatKey, label: "앱 삭제" },
];

interface PushStatsProps {
  detail: IPushStsMsgDetail[];
  result: IPushStsMsgResult[];
}

export function PushStats({ detail, result }: PushStatsProps) {
  const totalStats = detail.reduce((acc, curr) => {
    STAT_ITEMS.forEach(({ key }) => {
      acc[key] = (acc[key] || 0) + (curr[key] || 0);
    });
    return acc;
  }, {} as Record<StatKey, number>);
  console.log(detail, result);
  return (
    <div>
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium text-gray-700">전체 발송 현황</h4>
          <ContentViewer
            buttonText="자세히"
            title="발송 상세 현황"
            content={<PushStatsDetail detail={detail} result={result} />}
            isComponent={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {STAT_ITEMS.map((item) => (
          <StatItem
            key={item.key}
            label={item.label}
            value={totalStats[item.key] || 0}
          />
        ))}
      </div>
    </div>
  );
}
