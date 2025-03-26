"use client";

import { useState, useEffect } from "react";
import { identifyApi } from "app/apis/identify.api";
import { ITestIdentify } from "@push-manager/shared/types/entities/testIdentify.entity";
import { AddIdentifyModal } from "./modals/addIdentify.modal";
import { EditIdentifyModal } from "./modals/editIdentify.modal";
import { GetIdentifiesDto } from "@push-manager/shared";
import { Button } from "@commonComponents/inputs/button.component";
import {
  convertValueToAppId,
  convertValueToTeamId,
} from "app/utils/convertEnum.util";

const TABLE_HEADERS = [
  { key: "name", label: "이름", align: "left" },
  { key: "identify", label: "식별자", align: "left" },
  { key: "team", label: "팀", align: "left" },
  { key: "app", label: "앱", align: "left" },
  { key: "manage", label: "관리", align: "left" },
] as const;

const CELL_BASE_STYLE = "px-6 py-4 whitespace-nowrap text-sm";
const HEADER_BASE_STYLE =
  "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider";

export default function IdentifyManagementPage() {
  const [identifies, setIdentifies] = useState<ITestIdentify[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<number>(3);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedIdentify, setSelectedIdentify] =
    useState<ITestIdentify | null>(null);

  const loadIdentifies = async (teamId: number) => {
    try {
      const dto: GetIdentifiesDto = { teamId };
      const response = await identifyApi.getIdentifies(dto);
      setIdentifies(response);
      setSelectedTeam(teamId);
    } catch (error) {
      console.error("식별자 로드 실패:", error);
    }
  };

  useEffect(() => {
    loadIdentifies(3);
  }, []);

  const handleDelete = async (idx: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await identifyApi.deleteIdentify(idx);
        loadIdentifies(selectedTeam);
      } catch (error) {
        console.error("식별자 삭제 실패:", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">식별자 관리</h1>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant={selectedTeam === 3 ? "solid" : "line"}
            onClick={() => loadIdentifies(3)}
          >
            전체
          </Button>
          <Button
            variant={selectedTeam === 1 ? "green-point" : "line"}
            onClick={() => loadIdentifies(1)}
          >
            FREED
          </Button>
          <Button
            variant={selectedTeam === 2 ? "point" : "line"}
            onClick={() => loadIdentifies(2)}
          >
            LG
          </Button>
        </div>
        <Button variant="solid" onClick={() => setIsAddModalOpen(true)}>
          식별자 추가
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {TABLE_HEADERS.map(({ key, label, align }) => (
                <th key={key} className={`${HEADER_BASE_STYLE} text-${align}`}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {identifies.map((identify) => (
              <tr key={identify.idx} className="hover:bg-gray-50">
                <td className={`${CELL_BASE_STYLE} text-gray-900`}>
                  {identify.name}
                </td>
                <td className={`${CELL_BASE_STYLE} text-gray-500`}>
                  {identify.identify}
                </td>
                <td className={`${CELL_BASE_STYLE} text-gray-500`}>
                  {convertValueToTeamId(identify.teamId)}
                </td>
                <td className={`${CELL_BASE_STYLE} text-gray-500`}>
                  {convertValueToAppId(identify.appId)}
                </td>
                <td className={`${CELL_BASE_STYLE} text-right font-medium`}>
                  <Button
                    variant="point"
                    size="32"
                    onClick={() => {
                      setSelectedIdentify(identify);
                      setIsEditModalOpen(true);
                    }}
                    className="mr-2"
                  >
                    수정
                  </Button>
                  <Button
                    variant="red-point"
                    size="32"
                    onClick={() => handleDelete(identify.idx)}
                  >
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddIdentifyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={() => {
          loadIdentifies(selectedTeam);
          setIsAddModalOpen(false);
        }}
      />

      <EditIdentifyModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedIdentify(null);
        }}
        identify={selectedIdentify}
        onEdit={() => {
          loadIdentifies(selectedTeam);
          setIsEditModalOpen(false);
        }}
      />
    </div>
  );
}
