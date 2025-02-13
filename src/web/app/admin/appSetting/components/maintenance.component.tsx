import { IMaintenance } from "@push-manager/shared";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { getYNChipStyle } from "app/utils/chip/common/style.util";
import { getYNChipText } from "app/utils/chip/common/text.util";

interface MaintenanceProps {
  maintenances: IMaintenance[];
}

const TABLE_HEADERS = [
  { key: "id", label: "" },
  { key: "description", label: "설명" },
  { key: "noticeAt", label: "공지일" },
  { key: "startAt", label: "점검 시작일" },
  { key: "endAt", label: "점검 종료일" },
  { key: "isActive", label: "상태" },
] as const;

export function Maintenance({ maintenances }: MaintenanceProps) {
  const renderCell = (
    maintenance: IMaintenance,
    key: (typeof TABLE_HEADERS)[number]["key"]
  ) => {
    switch (key) {
      case "isActive":
        return (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getYNChipStyle(
              maintenance.isActive ? "Y" : "N"
            )}`}
          >
            {getYNChipText(maintenance.isActive ? "Y" : "N", "활성", "비활성")}
          </span>
        );
      case "startAt":
        return formatDate(maintenance.startAt!, "+00:00");
      case "endAt":
        return formatDate(maintenance.endAt!, "+00:00");
      case "noticeAt":
        return formatDate(maintenance.noticeAt, "+00:00") || "미설정";
      case "description":
        return <div className="whitespace-normal">{maintenance[key]}</div>;
      default:
        return maintenance[key];
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-medium mb-4">점검 일정</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {TABLE_HEADERS.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {maintenances.map((maintenance) => (
              <tr key={maintenance.id}>
                {TABLE_HEADERS.map(({ key }) => (
                  <td key={key} className="px-6 py-4 text-xs whitespace-nowrap">
                    {renderCell(maintenance, key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
