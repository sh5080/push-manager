import { useState } from "react";
import { Modal } from "@commonComponents/inputs/modal.component";
import { Button } from "@commonComponents/inputs/button.component";
import { DatePicker } from "@commonComponents/inputs/datePicker.component";
import { TextareaComponent } from "@commonComponents/inputs/textarea.component";
import { Switch } from "@commonComponents/inputs/switch.component";
import { IAppSetting, INoticeBar } from "@push-manager/shared";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { Dropdown } from "@commonComponents/inputs/dropdown.component";

interface NoticeBarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: INoticeBar) => void;
  initialData?: IAppSetting & { value: INoticeBar };
}

const PLATFORM_OPTIONS = [
  { value: 0, label: "ALL" },
  { value: 1, label: "ANDROID" },
  { value: 2, label: "IOS" },
];

export function NoticeBarModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: NoticeBarModalProps) {
  const [formData, setFormData] = useState<INoticeBar>({
    link: initialData?.value.link ?? "",
    content: initialData?.value.content ?? "",
    startAt: initialData?.value.startAt ?? new Date(),
    endAt: initialData?.value.endAt ?? new Date(),
    isActive: initialData?.value.isActive ?? false,
    platform: initialData?.value.platform ?? "ALL",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="노티스바 설정">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            링크
          </label>
          <input
            type="url"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            내용
          </label>
          <TextareaComponent
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            시작일
          </label>
          <DatePicker
            type="datetime-local"
            value={formatDate(formData.startAt, "+00:00")}
            onChange={(date) =>
              setFormData({ ...formData, startAt: new Date(date) })
            }
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            종료일
          </label>
          <DatePicker
            type="datetime-local"
            value={formatDate(formData.endAt, "+00:00")}
            onChange={(date) =>
              setFormData({ ...formData, endAt: new Date(date) })
            }
            className="mt-1"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">활성화</label>
          <Switch
            checked={formData.isActive}
            onChange={(checked) =>
              setFormData({ ...formData, isActive: checked })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            플랫폼
          </label>
          <Dropdown
            value={
              PLATFORM_OPTIONS.find((opt) => opt.label === formData.platform)
                ?.value ?? 0
            }
            onChange={(value) =>
              setFormData({
                ...formData,
                platform:
                  PLATFORM_OPTIONS.find((opt) => opt.value === value)?.label ||
                  "",
              })
            }
            options={PLATFORM_OPTIONS}
            buttonLabel={(value) =>
              PLATFORM_OPTIONS.find((opt) => opt.value === value)?.label || ""
            }
            itemLabel={(value) =>
              PLATFORM_OPTIONS.find((opt) => opt.value === value)?.label || ""
            }
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button onClick={onClose} variant="line">
            취소
          </Button>
          <Button type="submit" variant="solid">
            저장
          </Button>
        </div>
      </form>
    </Modal>
  );
}
