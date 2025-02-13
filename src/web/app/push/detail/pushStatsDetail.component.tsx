import { ReactNode, useState } from "react";
import {
  IPushStsMsgDetail,
  IPushStsMsgOpenInfo,
  IPushStsMsgResult,
} from "@push-manager/shared/types/entities/pushStsMsgDetail.entity";
import { Pagination } from "@commonComponents/dataDisplay/pagination.component";
import { getMessageStatusStyle } from "app/utils/chip/pushResult/style.util";
import { getMessageStatusText } from "app/utils/chip/pushResult/text.util";
import { InfoTooltip } from "@commonComponents/dataDisplay/infoTooltip.component";
import { formatDate } from "@push-manager/shared/utils/date.util";

const TABLE_HEADERS = [
  { key: "identify", label: "식별자" },
  { key: "deviceType", label: "디바이스" },
  { key: "result", label: "결과" },
  { key: "opened", label: "오픈 여부" },
  { key: "sendDate", label: "발송 시각" },
] as const;

const DEVICE_LABELS: Record<string, string> = {
  A: "Android",
  I: "iOS",
};

interface PushStatsDetailProps {
  detail: IPushStsMsgDetail[];
  result: IPushStsMsgResult[];
  openinfo: IPushStsMsgOpenInfo[];
}

export function PushStatsDetail({
  detail,
  result,
  openinfo,
}: PushStatsDetailProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginatedResults = result.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const renderCell = (
    result: IPushStsMsgResult,
    openinfo: IPushStsMsgOpenInfo[],
    key: string
  ) => {
    switch (key) {
      case "identify":
        return result.tokenOption.identify;
      case "deviceType":
        return DEVICE_LABELS[result.deviceType] || result.deviceType;
      case "sendDate":
        return formatDate(result.sendDate, "+09:00");
      case "result":
        return (
          <span
            className={`
                  mt-1 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                  ${getMessageStatusStyle(result.result)}
                `}
          >
            {getMessageStatusText(result.result)}
            {result.resultMsg && (
              <InfoTooltip
                content={result.resultMsg}
                width="w-1000"
                isMark={true}
                position="center"
              />
            )}
          </span>
        );
      case "opened":
        const matchingOpenInfo = openinfo?.find(
          (open) => open.tokenIdx.toString() === result.tokenIdx.toString()
        );
        return matchingOpenInfo
          ? formatDate(matchingOpenInfo.openDate, "+09:00")
          : "-";
      default:
        return result[key as keyof IPushStsMsgResult];
    }
  };

  return (
    <div className="space-y-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {TABLE_HEADERS.map(({ key, label }) => (
              <th
                key={key}
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedResults.map((result) => (
            <tr key={result.idx}>
              {TABLE_HEADERS.map(({ key }) => (
                <td
                  key={key}
                  className="py-4 whitespace-nowrap text-center text-sm text-gray-500"
                >
                  {renderCell(result, openinfo, key) as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        total={result.length}
        pageSize={pageSize}
        totalPages={Math.ceil(result.length / pageSize)}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
