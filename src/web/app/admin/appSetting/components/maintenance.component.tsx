import { IMaintenance } from "@push-manager/shared";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { getYNChipStyle } from "app/utils/chip/common/style.util";
import { getYNChipText } from "app/utils/chip/common/text.util";
import { usePagination } from "app/common/hooks/usePagination.hook";
import { Pagination } from "@commonComponents/dataDisplay/pagination.component";
import { useState } from "react";
import { Button } from "@commonComponents/inputs/button.component";
import { MaintenanceModal } from "../modals/maintenance.modal";
import { CreateMaintenanceDto } from "@push-manager/shared/dtos/admin/appSetting.dto";
import { appSettingApi } from "app/apis/admin/appSetting.api";
import { Toast } from "app/utils/toast.util";
import { MaintenanceFormData } from "app/types/prop.type";

interface MaintenanceProps {
  maintenances: IMaintenance[];
}

const TABLE_HEADERS = [
  { key: "id", label: "" },
  { key: "description", label: "내용" },
  { key: "noticeAt", label: "공지일" },
  { key: "startAt", label: "점검 시작일" },
  { key: "endAt", label: "점검 종료일" },
  { key: "isActive", label: "상태" },
] as const;

export function Maintenance({ maintenances }: MaintenanceProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    currentPage,
    pageSize,
    totalPages,
    paginatedItems: paginatedMaintenances,
    handlePageChange,
    handlePageSizeChange,
    totalItems,
  } = usePagination<IMaintenance>(maintenances);

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

  const handleAddMaintenance = async (data: MaintenanceFormData) => {
    try {
      if (
        !data.description ||
        data.noticeAt.length === 0 ||
        data.startAt.length === 0 ||
        data.endAt.length === 0
      ) {
        throw new Error("모든 필드를 입력해야 합니다.");
      }
      console.log("data: ", data);
      const dto: CreateMaintenanceDto = {
        description: data.description,
        noticeAt: new Date(formatDate(data.noticeAt, "+00:00")),
        startAt: new Date(formatDate(data.startAt, "+00:00")),
        endAt: new Date(formatDate(data.endAt, "+00:00")),
      };
      console.log("dto: ", dto);
      const result = await appSettingApi.createMaintenance(dto);
      console.log("result: ", result);
      if (result) {
        Toast.success("점검 일정이 추가되었습니다.");
      } else {
        throw new Error("점검 일정 추가에 실패했습니다.");
      }
    } catch (error: any) {
      Toast.error(error.message);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">점검 일정</h2>
        <Button onClick={() => setIsModalOpen(true)} variant="solid" size="32">
          추가
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {TABLE_HEADERS.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedMaintenances.map((maintenance) => (
              <tr key={maintenance.id}>
                {TABLE_HEADERS.map(({ key }) => (
                  <td key={key} className="px-4 py-4 text-xs whitespace-nowrap">
                    {renderCell(maintenance, key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          total={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
      <MaintenanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMaintenance}
      />
    </div>
  );
}
