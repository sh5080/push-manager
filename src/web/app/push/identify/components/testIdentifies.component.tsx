import { useState, useEffect } from "react";
import { IdentifyAPI } from "app/apis/identify.api";
import { ITestIdentify } from "@push-manager/shared/types/entities/testIdentify.entity";

interface TestIdentifiesProps {
  onIdentifiersLoad: (identifies: ITestIdentify[]) => void;
}

export function TestIdentifies({ onIdentifiersLoad }: TestIdentifiesProps) {
  const [identifies, setIdentifies] = useState<ITestIdentify[]>([]);
  const identifyApi = IdentifyAPI.getInstance();

  useEffect(() => {
    handleLoadTestIds(3);
  }, []);

  const handleLoadTestIds = async (teamId?: number) => {
    try {
      const response = await identifyApi.getIdentifies({ teamId });
      setIdentifies(response);
      onIdentifiersLoad(response);
    } catch (error) {
      console.error("식별자 로드 실패:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">테스트 식별자</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => handleLoadTestIds(3)}
            className={`px-4 py-2 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700`}
          >
            전체
          </button>
          <button
            onClick={() => handleLoadTestIds(1)}
            className={`px-4 py-2 text-sm rounded-md text-white bg-green-600 hover:bg-green-700`}
          >
            FREED
          </button>
          <button
            onClick={() => handleLoadTestIds(2)}
            className={`px-4 py-2 text-sm rounded-md text-white bg-purple-600 hover:bg-purple-700`}
          >
            LG
          </button>
        </div>
      </div>

      {identifies.length > 0 && (
        <div className="space-y-2">
          <div className="max-h-[300px] overflow-y-auto border rounded-lg bg-gray-50 p-2">
            {identifies.map((identify) => (
              <div
                key={identify.idx}
                className="px-3 py-2 bg-white rounded border mb-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {identify.name}
                  </span>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-700 mr-4">
                      {identify.teamId === 1
                        ? "FREED"
                        : identify.teamId === 2
                        ? "LG"
                        : "-"}
                    </span>
                    <span className="text-sm text-gray-500 w-28 text-right">
                      {identify.identify}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
