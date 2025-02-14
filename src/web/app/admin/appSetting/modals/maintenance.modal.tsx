import { useState } from "react";
import { Modal } from "@commonComponents/inputs/modal.component";
import { Button } from "@commonComponents/inputs/button.component";
import { DatePicker } from "@commonComponents/inputs/datePicker.component";
import { TextareaComponent } from "@commonComponents/inputs/textarea.component";
import { MaintenanceFormData } from "app/types/prop.type";

interface MaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MaintenanceFormData) => void;
}

export function MaintenanceModal({
  isOpen,
  onClose,
  onSubmit,
}: MaintenanceModalProps) {
  const [formData, setFormData] = useState<MaintenanceFormData>({
    description: "",
    noticeAt: "",
    startAt: "",
    endAt: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="점검 일정 추가">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            설명
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

        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} variant="line">
            취소
          </Button>
          <Button type="submit" variant="solid">
            추가
          </Button>
        </div>
      </form>
    </Modal>
  );
}
