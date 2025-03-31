import { formatDate } from "@push-manager/shared/utils/date.util";

export const DateInfo = ({
  label,
  date,
}: {
  label: string;
  date: Date | undefined;
}) => (
  <div className="flex justify-between text-sm py-1">
    <span className="text-gray-500">{label}</span>
    <span>{date ? formatDate(date, "+00:00") : "-"}</span>
  </div>
);
export const TextInfo = ({ label, text }: { label: string; text: string }) => (
  <div className="flex justify-between text-sm py-1">
    <span className="text-gray-500">{label}</span>
    <span>{text}</span>
  </div>
);
