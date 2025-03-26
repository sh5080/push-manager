import { useState, useEffect } from "react";
import { identifyApi } from "app/apis/identify.api";
import { ITestIdentify } from "@push-manager/shared/types/entities/testIdentify.entity";
import { Button } from "@commonComponents/inputs/button.component";
import {
  convertValueToAppId,
  convertValueToTeamId,
} from "app/utils/convertEnum.util";

interface TestIdentifiesProps {
  onIdentifiersLoad: (identifies: ITestIdentify[]) => void;
  onSelectionChange?: (identifies: ITestIdentify[]) => void;
  initialSelectedIds?: Set<number>;
}

export function TestIdentifies({
  onIdentifiersLoad,
  onSelectionChange,
  initialSelectedIds,
}: TestIdentifiesProps) {
  const [identifies, setIdentifies] = useState<ITestIdentify[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(
    initialSelectedIds || new Set()
  );
  const [selectedTeam, setSelectedTeam] = useState<number>(3);

  const handleLoadTestIds = async (teamId?: number) => {
    try {
      const response = await identifyApi.getIdentifies({ teamId });
      setIdentifies(response);

      const filteredSelection = new Set(
        [...selectedItems].filter((idx) =>
          response.some((item) => item.idx === idx)
        )
      );
      setSelectedItems(filteredSelection);
      const selectedIdentifiers = response.filter((item) =>
        filteredSelection.has(item.idx)
      );
      onIdentifiersLoad(selectedIdentifiers);
      setSelectedTeam(teamId || 3);
    } catch (error) {
      console.error("식별자 로드 실패:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await handleLoadTestIds(3);
      if (initialSelectedIds && initialSelectedIds.size > 0) {
        setSelectedItems(initialSelectedIds);
      }
    };
    loadData();
  }, []);

  const toggleSelection = (idx: number) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(idx)) {
      newSelection.delete(idx);
    } else {
      newSelection.add(idx);
    }
    setSelectedItems(newSelection);

    const selectedIdentifiers = identifies.filter((item) =>
      newSelection.has(item.idx)
    );
    onSelectionChange?.(selectedIdentifiers);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">테스트 식별자</h3>
        <div className="flex space-x-2">
          <Button
            variant={selectedTeam === 3 ? "square-solid" : "square-line"}
            size="32"
            onClick={() => handleLoadTestIds(3)}
          >
            전체
          </Button>
          <Button
            variant={selectedTeam === 1 ? "square-green" : "square-line"}
            size="32"
            onClick={() => handleLoadTestIds(1)}
          >
            FREED
          </Button>
          <Button
            variant={selectedTeam === 2 ? "square-point" : "square-line"}
            size="32"
            onClick={() => handleLoadTestIds(2)}
          >
            LG
          </Button>
        </div>
      </div>

      {identifies.length > 0 && (
        <div className="space-y-2">
          <div className="max-h-[300px] overflow-y-auto border rounded-lg bg-gray-50 p-2">
            {identifies.map((identify) => (
              <div
                key={identify.idx}
                className={`px-3 py-2 bg-white rounded border mb-1 cursor-pointer hover:bg-gray-50 
                  ${
                    selectedItems.has(identify.idx)
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                onClick={() => toggleSelection(identify.idx)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {identify.name}
                  </span>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-700 mr-4">
                      {convertValueToTeamId(identify.teamId)}
                    </span>
                    <span className="text-sm text-gray-500 w-28 text-right">
                      {convertValueToAppId(identify.appId)}
                    </span>
                    <span className="text-sm text-gray-500 w-28 text-right">
                      {identify.identify}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-500 text-right">
            선택된 항목: {selectedItems.size}개
          </div>
        </div>
      )}
    </div>
  );
}
