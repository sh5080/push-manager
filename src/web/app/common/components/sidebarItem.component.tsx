import Link from "next/link";
import {
  HiOutlineHome,
  HiOutlineBell,
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineCalendar,
  HiOutlineIdentification,
} from "react-icons/hi";

export interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarItemProps {
  item: MenuItem;
  isActive: boolean;
}

export function SidebarItem({ item, isActive }: SidebarItemProps) {
  return (
    <Link
      href={item.path}
      className={`
        no-underline w-full
        px-4 py-2.5 rounded-md
        flex items-center gap-3
        transition-colors duration-150
        ${
          isActive
            ? "bg-gray-100 text-blue-600"
            : "text-gray-700 hover:bg-green-50"
        }
      `}
    >
      <span className="inline-flex items-center justify-center w-5 h-5 text-[18px]">
        {item.icon}
      </span>
      <span className="text-[14px] font-medium">{item.name}</span>
    </Link>
  );
}

export const menuItems: MenuItem[] = [
  {
    name: "메인",
    path: "/",
    icon: <HiOutlineHome />,
  },
  {
    name: "푸시 발송",
    path: "/push",
    icon: <HiOutlineBell />,
  },
  {
    name: "푸시 예약",
    path: "/push/scheduled",
    icon: <HiOutlineCalendar />,
  },
  {
    name: "푸시 내역",
    path: "/push/history",
    icon: <HiOutlineClipboardList />,
  },
  {
    name: "식별자 관리",
    path: "/push/identifies",
    icon: <HiOutlineIdentification />,
  },
  {
    name: "설정",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
];
