interface EmptyStateProps {
  colSpan: number;
  message?: string;
}

export function EmptyState({
  colSpan,
  message = "조회된 내역이 없습니다.",
}: EmptyStateProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center py-12">
        <p className="text-gray-500 text-sm">{message}</p>
      </td>
    </tr>
  );
}
