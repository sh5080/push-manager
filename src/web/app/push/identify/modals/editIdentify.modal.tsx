"use client";

import { Fragment, useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { identifyApi } from "app/apis/identify.api";
import { ITestIdentify } from "@push-manager/shared/types/entities/testIdentify.entity";
import { UpdateIdentifyDto } from "@push-manager/shared";
import { IdentifyForm } from "../components/identifyForm.component";
import { toast } from "react-toastify";

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
  const handleSubmit = async (formData: {
    name: string;
    identify: string;
    teamId: string;
    appId: string;
  }) => {
    if (!identify) return;

    try {
      const dto: UpdateIdentifyDto = {
        idx: identify.idx,
        name: formData.name,
        identify: formData.identify,
        teamId: Number(formData.teamId),
        appId: Number(formData.appId),
      };
      await identifyApi.updateIdentify(dto);
      onEdit();
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
                식별자 수정
              </DialogTitle>

              <IdentifyForm
                onSubmit={handleSubmit}
                initialData={
                  identify
                    ? {
                        name: identify.name,
                        identify: identify.identify,
                        teamId: identify.teamid.toString(),
                        appId: identify.appid.toString(),
                      }
                    : undefined
                }
                submitText="수정"
                onCancel={onClose}
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
