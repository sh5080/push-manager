import { useState, useEffect } from "react";
import { Modal } from "@commonComponents/inputs/modal.component";
import { Button } from "@commonComponents/inputs/button.component";
import { DatePicker } from "@commonComponents/inputs/datePicker.component";
import { TextareaComponent } from "@commonComponents/inputs/textarea.component";
import { MaintenanceFormData, MaintenanceModeType } from "app/types/prop.type";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { IMaintenance } from "@push-manager/shared";
import { Switch } from "@commonComponents/inputs/switch.component";

interface MaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MaintenanceFormData) => void;
  initialData?: IMaintenance;
  mode: MaintenanceModeType;
}

export function MaintenanceModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = "create",
}: MaintenanceModalProps) {
  const [formData, setFormData] = useState<MaintenanceFormData>(() => {
    if (initialData) {
      return {
        description: initialData.description,
        noticeAt: formatDate(initialData.noticeAt, "+00:00"),
        startAt: formatDate(initialData.startAt!, "+00:00"),
        endAt: formatDate(initialData.endAt!, "+00:00"),
        isActive: initialData.isActive,
      };
    }
    return {
      description: "",
      noticeAt: "",
      startAt: "",
      endAt: "",
      isActive: false,
    };
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        description: initialData.description,
        noticeAt: formatDate(initialData.noticeAt, "+00:00"),
        startAt: formatDate(initialData.startAt!, "+00:00"),
        endAt: formatDate(initialData.endAt!, "+00:00"),
        isActive: initialData.isActive,
      });
    } else {
      setFormData({
        description: "",
        noticeAt: "",
        startAt: "",
        endAt: "",
        isActive: false,
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`점검 일정 ${mode === "create" ? "추가" : "수정"}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            내용
          </label>
          <TextareaComponent
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            공지일
          </label>
          <DatePicker
            type="datetime-local"
            value={formData.noticeAt}
            onChange={(date) => setFormData({ ...formData, noticeAt: date })}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            점검 시작일
          </label>
          <DatePicker
            type="datetime-local"
            value={formData.startAt}
            onChange={(date) => setFormData({ ...formData, startAt: date })}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            점검 종료일
          </label>
          <DatePicker
            type="datetime-local"
            value={formData.endAt}
            onChange={(date) => setFormData({ ...formData, endAt: date })}
            className="mt-1"
          />
        </div>
        {mode === "edit" && (
          <div className="flex items-center ">
            <span className="text-sm font-medium text-gray-700">
              활성화 상태
            </span>
            <Switch
              checked={formData.isActive}
              onChange={(checked) =>
                setFormData((prev) => ({ ...prev, isActive: checked }))
              }
              className="ml-4"
            ></Switch>
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} variant="line">
            취소
          </Button>
          <Button type="submit" variant="solid">
            {mode === "create" ? "추가" : "수정"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
