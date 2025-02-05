import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";

interface ContentViewerProps {
  buttonText: string;
  title: string;
  content: string | React.ReactNode;
  maxLength?: number;
  isComponent?: boolean;
}

export function ContentViewer({
  buttonText,
  title,
  content,
  maxLength = 200,
  isComponent = false,
}: ContentViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 컴포넌트인 경우 truncate 로직 스킵
  const shouldTruncate =
    !isComponent && typeof content === "string" && content.length > maxLength;
  const truncatedContent = shouldTruncate
    ? `${(content as string).slice(0, maxLength)}...`
    : content;

  return (
    <>
      {isComponent ? (
        <button
          onClick={() => setIsOpen(true)}
          className="text-green-600 hover:text-green-700 hover:underline text-sm"
        >
          {buttonText}
        </button>
      ) : (
        <div className="mt-1">
          <p className="whitespace-pre-wrap">
            {truncatedContent}
            {shouldTruncate && (
              <button
                onClick={() => setIsOpen(true)}
                className="ml-2 text-green-600 hover:text-green-700 hover:underline"
              >
                {buttonText}
              </button>
            )}
          </p>
        </div>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      {title}
                    </DialogTitle>
                  </div>
                  <div className="mt-2">
                    {isComponent ? (
                      content
                    ) : (
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {content}
                      </p>
                    )}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
