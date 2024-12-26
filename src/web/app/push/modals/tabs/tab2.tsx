import { Switch } from "@headlessui/react";
import { AppIdEnum } from "@push-manager/shared/types/constants/common.const";
import { HiQuestionMarkCircle } from "react-icons/hi2";

interface PushConditionTabProps {
  appId: (typeof AppIdEnum)[keyof typeof AppIdEnum];
  sendDateString: string;
  fname: string;
  plink: string;
  onChange: (
    field: string,
    value: string | (typeof AppIdEnum)[keyof typeof AppIdEnum] | boolean
  ) => void;
  imageEnabled: boolean;
  linkEnabled: boolean;
}

export function PushConditionTab({
  appId,
  sendDateString,
  fname,
  plink,
  onChange,
  imageEnabled,
  linkEnabled,
}: PushConditionTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          앱 설정
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            {[
              { id: "freed", label: "프리디", value: AppIdEnum.FREED },
              { id: "test", label: "통테용", value: AppIdEnum.TEST },
              { id: "prod", label: "운영", value: AppIdEnum.PROD },
            ].map(({ id, label, value }) => (
              <div key={id} className="flex items-center">
                <input
                  type="radio"
                  id={id}
                  name="appId"
                  value={value}
                  checked={appId === value}
                  onChange={(e) => onChange("appId", e.target.value)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor={id} className="ml-2 text-sm text-gray-700">
                  {label}
                </label>
              </div>
            ))}
          </div>
          {appId === AppIdEnum.PROD && (
            <p className="text-sm text-yellow-600">
              ⚠️ 운영 환경으로 발송됩니다. 신중하게 확인해주세요.
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          발송 날짜 및 시각
        </label>
        <input
          type="datetime-local"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500"
          min={new Date().toISOString().slice(0, 16)}
          value={sendDateString}
          onChange={(e) => onChange("sendDateString", e.target.value)}
        />
        {/* TODO 발송 시간 설정 유효성검증 기능 추가 필요 */}
        <p className="mt-1 text-sm text-gray-500">
          안정적인 발송을 위해 현재 시간보다 최소한 100건 당 1분 뒤로
          설정해주세요.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          과거 시간으로 식별자가 삽입될 경우 발송에 실패할 수 있습니다.
        </p>
      </div>

      <div>
        <div className="flex items-center mb-1">
          <div className="flex items-center gap-2 min-w-[140px]">
            <label className="block text-sm font-medium text-gray-700">
              이미지 URL
            </label>
            <div className="group relative">
              <HiQuestionMarkCircle className="h-4 w-4 text-gray-400" />
              <div className="invisible group-hover:visible absolute left-0 top-6 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                푸시 알림에 표시될 이미지 URL을 입력하세요.
              </div>
            </div>
          </div>
          <Switch
            checked={imageEnabled}
            onChange={(checked) => onChange("imageEnabled", checked)}
            className={`${
              imageEnabled ? "bg-gray-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
          >
            <span className="sr-only">이미지 URL 사용</span>
            <span
              className={`${
                imageEnabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
        <input
          type="url"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500
            ${!imageEnabled && "bg-gray-100 cursor-not-allowed"}`}
          placeholder="https://"
          value={fname}
          onChange={(e) => onChange("fname", e.target.value)}
          disabled={!imageEnabled}
        />
      </div>

      <div>
        <div className="flex items-center mb-1">
          <div className="flex items-center gap-2 min-w-[140px]">
            <label className="block text-sm font-medium text-gray-700">
              외부 링크
            </label>
            <div className="group relative">
              <HiQuestionMarkCircle className="h-4 w-4 text-gray-400" />
              <div className="invisible group-hover:visible absolute left-0 top-6 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                푸시 알림 클릭 시 이동할 URL을 입력하세요.
              </div>
            </div>
          </div>
          <Switch
            checked={linkEnabled}
            onChange={(checked) => onChange("linkEnabled", checked)}
            className={`${
              linkEnabled ? "bg-gray-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
          >
            <span className="sr-only">외부 링크 사용</span>
            <span
              className={`${
                linkEnabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
        <input
          type="url"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500
            ${!linkEnabled && "bg-gray-100 cursor-not-allowed"}`}
          placeholder="https://"
          value={plink}
          onChange={(e) => onChange("plink", e.target.value)}
          disabled={!linkEnabled}
        />
      </div>
    </div>
  );
}
