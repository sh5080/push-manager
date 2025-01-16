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
import { IdentifyForm } from "../components/identifyForm.component";

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
  const handleSubmit = async (formData: {
    name: string;
    identify: string;
    teamId: string;
    appId: string;
  }) => {
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

              <IdentifyForm
                onSubmit={handleSubmit}
                submitText="추가"
                onCancel={onClose}
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
