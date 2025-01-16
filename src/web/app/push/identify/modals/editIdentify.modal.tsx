"use client";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { identifyApi } from "app/apis/identify.api";
import { ITestIdentify } from "@push-manager/shared/types/entities/testIdentify.entity";
// import { UpdateIdentifyDto } from "@push-manager/shared";

interface EditIdentifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  identify: ITestIdentify | null;
}
export function EditIdentifyModal({
  isOpen,
  onClose,
  onEdit,
  identify,
}: EditIdentifyModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    identify: "",
    teamId: "1",
  });

  useEffect(() => {
    if (identify) {
      setFormData({
        name: identify.name,
        identify: identify.identify,
        teamId: identify.teamid.toString(),
      });
    }
  }, [identify]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identify) return;

    try {
      const dto: any = {
        idx: identify.idx,
        name: formData.name,
        identify: formData.identify,
        teamId: Number(formData.teamId),
      };
      await identifyApi.updateIdentify(dto);
      onEdit();
    } catch (error) {
      console.error("식별자 수정 실패:", error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                식별자 수정
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    이름
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    식별자
                  </label>
                  <input
                    type="text"
                    value={formData.identify}
                    onChange={(e) =>
                      setFormData({ ...formData, identify: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    팀
                  </label>
                  <select
                    value={formData.teamId}
                    onChange={(e) =>
                      setFormData({ ...formData, teamId: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="1">FREED</option>
                    <option value="2">LG</option>
                  </select>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    수정
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
