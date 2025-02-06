import { HiQuestionMarkCircle } from "react-icons/hi2";
import { ReactNode } from "react";
import { PositionType } from "app/types/prop.type";

interface InfoTooltipProps {
  content: ReactNode;
  width?: string;
  position?: PositionType;
  isMark?: boolean;
}

export function InfoTooltip({
  content,
  width = "w-80",
  position = "top",
  isMark = true,
}: InfoTooltipProps) {
  const positionStyles = {
    top: "left-0 bottom-full mb-2",
    right: "left-full top-0 ml-2",
    bottom: "left-0 top-full mt-2",
    left: "right-full top-0 mr-2",
    center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div className="group relative inline-block">
      {isMark && (
        <HiQuestionMarkCircle className="h-4 w-4 text-gray-400 cursor-help" />
      )}
      <div
        className={`invisible group-hover:visible absolute z-[9999] ${positionStyles[position]} ${width} p-3 bg-gray-800 text-white text-xs rounded shadow-lg`}
      >
        {content}
      </div>
    </div>
  );
}
