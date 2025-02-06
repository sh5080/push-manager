import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  showCloseButton?: boolean;
  closeButtonText?: string;
  actions?: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = false,
  closeButtonText = "닫기",
  actions,
}: ModalProps) {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-xl",
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className={`w-full ${sizeClasses[size]} bg-white rounded-lg p-6`}
        >
          <DialogTitle className="text-lg font-medium mb-4">
            {title}
          </DialogTitle>

          <div className="space-y-4">
            {children}

            <div className="flex justify-end space-x-2 pt-4">
              {actions}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
                >
                  {closeButtonText}
                </button>
              )}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
