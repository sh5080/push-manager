import { useState, useMemo, ReactNode } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export type SortDirection = "asc" | "desc" | null;
export type SortConfig<T> = {
  key: keyof T | null;
  direction: SortDirection;
};

export function useSort<T>(
  items: T[],
  config: SortConfig<T> = { key: null, direction: null }
) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(config);

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig.key && sortConfig.direction) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        // 날짜 처리
        if (aValue instanceof Date && bValue instanceof Date) {
          return sortConfig.direction === "asc"
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        }

        // 문자열 처리
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        // 숫자 처리
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        // 기타 타입 처리
        const valA = String(aValue);
        const valB = String(bValue);
        return sortConfig.direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: SortDirection = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig({ key: direction ? key : null, direction });
  };

  const renderSortIcon = (key: keyof T): ReactNode => {
    if (sortConfig.key !== key)
      return <FaSort className="ml-1 text-gray-400" />;
    if (sortConfig.direction === "asc")
      return <FaSortUp className="ml-1 text-blue-500" />;
    return <FaSortDown className="ml-1 text-blue-500" />;
  };

  const renderSortButton = (key: keyof T, label: string): ReactNode => {
    return (
      <button
        className="flex items-center focus:outline-none"
        onClick={() => requestSort(key)}
      >
        {label}
        {renderSortIcon(key)}
      </button>
    );
  };

  return { items: sortedItems, renderSortButton };
}
