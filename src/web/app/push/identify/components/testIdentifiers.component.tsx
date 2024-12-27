import { useState } from "react";
import { IdentifyAPI } from "app/apis/identify.api";
import { ITestIdentify } from "@push-manager/shared/types/entities/testIdentify.entity";
import { AppIdEnum } from "@push-manager/shared/types/constants/common.const";

interface TestIdentifiersProps {
  onSelect: (identifiers: string[]) => void;
}

export function TestIdentifiers({ onSelect }: TestIdentifiersProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [identifiers, setIdentifiers] = useState<ITestIdentify[]>([]);
  const identifyApi = IdentifyAPI.getInstance();

  const handleLoadTestIds = async (appId?: number) => {
    setIsLoading(true);
    try {
      const response = await identifyApi.getIdentifies({ appId });
      setIdentifiers(response);
    } catch (error) {
      console.error("식별자 로드 실패:", error);
      // TODO: 에러 처리 (토스트 메시지 등)
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = () => {
    onSelect(identifiers.map((id) => id.identify));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">테스트 식별자</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => handleLoadTestIds(AppIdEnum.TEST)}
            disabled={isLoading}
            className={`px-4 py-2 text-sm rounded-md text-white ${
              isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            전체
          </button>
          <button
            onClick={() => handleLoadTestIds(AppIdEnum.TEST)}
            disabled={isLoading}
            className={`px-4 py-2 text-sm rounded-md text-white ${
              isLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            FREED
          </button>
          <button
            onClick={() => handleLoadTestIds(AppIdEnum.PROD)}
            disabled={isLoading}
            className={`px-4 py-2 text-sm rounded-md text-white ${
              isLoading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            운영
          </button>
        </div>
      </div>

      {identifiers.length > 0 && (
        <div className="space-y-2">
          <div className="max-h-[300px] overflow-y-auto border rounded-lg bg-gray-50 p-2">
            {identifiers.map((identifier) => (
              <div
                key={identifier.idx}
                className="px-3 py-2 bg-white rounded border mb-1 flex justify-between items-center"
              >
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-700">
                    {identifier.name}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    {identifier.identify}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {identifier.teamId}팀
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSelect}
              className="px-4 py-2 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              선택한 식별자 추가
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-4">
          <span className="text-gray-500">불러오는 중...</span>
        </div>
      )}
    </div>
  );
}
