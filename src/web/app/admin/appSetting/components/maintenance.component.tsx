import { IMaintenance, UpdateMaintenanceDto } from "@push-manager/shared";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { getYNChipStyle } from "app/utils/chip/common/style.util";
import { getYNChipText } from "app/utils/chip/common/text.util";
import { usePagination } from "app/common/hooks/usePagination.hook";
import { useSort } from "app/common/hooks/useTableSort.hook";
import { Pagination } from "@commonComponents/dataDisplay/pagination.component";
import { useState } from "react";
import { Button } from "@commonComponents/inputs/button.component";
import { MaintenanceModal } from "../modals/maintenance.modal";
import { CreateMaintenanceDto } from "@push-manager/shared/dtos/admin/appSetting.dto";
import { appSettingApi } from "app/apis/admin/appSetting.api";
import { Toast } from "app/utils/toast.util";
import {
  MaintenanceFormData,
  MaintenanceModeType,
  TableHeader,
} from "app/types/prop.type";

interface MaintenanceProps {
  maintenances: IMaintenance[];
}

const TABLE_HEADERS: TableHeader[] = [
  { key: "id", label: "ID", sortable: true },
  { key: "description", label: "내용" },
  { key: "noticeAt", label: "공지일" },
  { key: "startAt", label: "점검 시작일", sortable: true },
  { key: "endAt", label: "점검 종료일", sortable: true },
  { key: "isActive", label: "상태" },
];

export function Maintenance({
  maintenances: initialMaintenances,
}: MaintenanceProps) {
  const [maintenances, setMaintenances] = useState(initialMaintenances);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState<
    IMaintenance | undefined
  >();
  const [mode, setMode] = useState<MaintenanceModeType>("create");

  const { items: sortedMaintenances, renderSortButton } =
    useSort<IMaintenance>(initialMaintenances);

  const {
    currentPage,
    pageSize,
    totalPages,
    paginatedItems: paginatedMaintenances,
    handlePageChange,
    handlePageSizeChange,
    totalItems,
  } = usePagination<IMaintenance>(sortedMaintenances);

  const renderCell = (maintenance: IMaintenance, key: TableHeader["key"]) => {
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
        return String(maintenance[key as keyof IMaintenance]);
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

      const dto: CreateMaintenanceDto = {
        description: data.description,
        noticeAt: new Date(formatDate(data.noticeAt, "+00:00")),
        startAt: new Date(formatDate(data.startAt, "+00:00")),
        endAt: new Date(formatDate(data.endAt, "+00:00")),
      };

      const result = await appSettingApi.createMaintenance(dto);
      if (result) {
        setMaintenances((prev) => [result, ...prev]);
        Toast.success("점검 일정이 추가되었습니다.");
      } else {
        throw new Error("점검 일정 추가에 실패했습니다.");
      }
    } catch (error: any) {
      Toast.error(error.message);
    }
  };

  const handleEditMaintenance = async (data: MaintenanceFormData) => {
    try {
      if (!selectedMaintenance) return;
      const dto: UpdateMaintenanceDto = {
        id: selectedMaintenance.id,
        description: data.description,
        noticeAt: new Date(formatDate(data.noticeAt, "+00:00")),
        startAt: new Date(formatDate(data.startAt, "+00:00")),
        endAt: new Date(formatDate(data.endAt, "+00:00")),
        isActive: data.isActive,
      };
      await appSettingApi.updateMaintenance(dto);

      setMaintenances((prev) =>
        prev.map((item) =>
          item.id === selectedMaintenance.id ? { ...item, ...dto } : item
        )
      );

      Toast.success("점검 일정이 수정되었습니다.");
    } catch (error) {
      Toast.error("점검 일정 수정에 실패했습니다.");
    }
  };

  const handleModalSubmit = (data: MaintenanceFormData) => {
    if (mode === "create") {
      handleAddMaintenance(data);
    } else {
      handleEditMaintenance(data);
    }
  };

  const openCreateModal = () => {
    setMode("create");
    setSelectedMaintenance(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (maintenance: IMaintenance) => {
    setMode("edit");
    setSelectedMaintenance(maintenance);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">점검 일정</h2>
        <Button onClick={openCreateModal} variant="solid" size="32">
          추가
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {TABLE_HEADERS.map(({ key, label, sortable }) => (
                <th
                  key={key}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {sortable
                    ? renderSortButton(key as keyof IMaintenance, label)
                    : label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedMaintenances.map((maintenance) => (
              <tr
                key={maintenance.id}
                onClick={() => openEditModal(maintenance)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
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
        onSubmit={handleModalSubmit}
        initialData={selectedMaintenance}
        mode={mode}
      />
    </div>
  );
}
