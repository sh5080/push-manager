"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { identifyApi } from "app/apis/identify.api";
import { CreateIdentifyDto } from "@push-manager/shared";
import { toast } from "react-toastify";

interface AddIdentifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export function AddIdentifyModal({
  isOpen,
  onClose,
  onAdd,
}: AddIdentifyModalProps) {
  const [formData, setFormData] = useState<CreateIdentifyDto>({
    name: "",
    identify: "",
    appId: 1,
    teamId: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNaN(Number(formData.identify))) {
        throw new Error("식별자는 숫자만 입력해주세요.");
      }
      const dto: CreateIdentifyDto = {
        identify: formData.identify,
        appId: Number(formData.appId),
        teamId: Number(formData.teamId),
        name: formData.name,
      };

      await identifyApi.createIdentify(dto);
      onAdd();
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                식별자 추가
              </DialogTitle>

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
                    앱
                  </label>
                  <select
                    value={formData.appId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        appId: Number(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="1">테스트</option>
                    <option value="2">운영</option>
                    <option value="3">둘 다 동일</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    팀
                  </label>
                  <select
                    value={formData.teamId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teamId: Number(e.target.value),
                      })
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
                    추가
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
