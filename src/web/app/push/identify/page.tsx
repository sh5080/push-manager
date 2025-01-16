"use client";

import { useState, useEffect } from "react";
import { identifyApi } from "app/apis/identify.api";
import { ITestIdentify } from "@push-manager/shared/types/entities/testIdentify.entity";
import { AddIdentifyModal } from "./modals/addIdentify.modal";
import { EditIdentifyModal } from "./modals/editIdentify.modal";
import { GetIdentifiesDto } from "@push-manager/shared";

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
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          식별자 추가
        </button>
      </div>

      <div className="mb-6 flex space-x-2">
        <button
          onClick={() => loadIdentifies(3)}
          className={`px-4 py-2 rounded-md ${
            selectedTeam === 3 ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          전체
        </button>
        <button
          onClick={() => loadIdentifies(1)}
          className={`px-4 py-2 rounded-md ${
            selectedTeam === 1 ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          FREED
        </button>
        <button
          onClick={() => loadIdentifies(2)}
          className={`px-4 py-2 rounded-md ${
            selectedTeam === 2 ? "bg-purple-600 text-white" : "bg-gray-200"
          }`}
        >
          LG
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                이름
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                식별자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                팀
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {identifies.map((identify) => (
              <tr key={identify.idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {identify.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {identify.identify}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {identify.teamid === 1
                    ? "FREED"
                    : identify.teamid === 2
                    ? "LG"
                    : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedIdentify(identify);
                      setIsEditModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(identify.idx)}
                    className="text-red-600 hover:text-red-900"
                  >
                    삭제
                  </button>
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
