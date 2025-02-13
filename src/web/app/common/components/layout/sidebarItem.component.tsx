import Link from "next/link";
import {
  HiOutlineHome,
  HiOutlineBell,
  HiOutlineClipboardList,
  HiOutlineCalendar,
  HiOutlineIdentification,
  HiOutlineShieldCheck,
  HiChevronDown,
  HiChevronUp,
  HiOutlineUser,
  HiOutlineCog,
} from "react-icons/hi";

export interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

interface SidebarItemProps {
  item: MenuItem;
  isActive: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  depth?: number;
}

export function SidebarItem({
  item,
  isActive,
  isOpen = false,
  onToggle,
  depth = 0,
}: SidebarItemProps) {
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={onToggle}
          className={`
            w-full px-4 py-2.5 rounded-md
            flex items-center justify-between
            transition-colors duration-150
            ${
              isActive
                ? "bg-gray-100 text-blue-600"
                : "text-gray-700 hover:bg-green-50"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-5 h-5 text-[18px]">
              {item.icon}
            </span>
            <span className="text-[14px] font-medium">{item.name}</span>
          </div>
          {isOpen ? (
            <HiChevronUp className="w-4 h-4" />
          ) : (
            <HiChevronDown className="w-4 h-4" />
          )}
        </button>

        {isOpen && (
          <div className="mt-1 space-y-1">
            {item.children &&
              item.children.map((child) => (
                <SidebarItem
                  key={child.path}
                  item={child}
                  isActive={isActive}
                  depth={depth + 1}
                />
              ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.path}
      className={`
        no-underline w-full
        px-4 py-2.5 rounded-md
        flex items-center gap-3
        transition-colors duration-150
        ${depth > 0 ? "pl-6" : ""}
        ${
          isActive
            ? "bg-gray-100 text-[#00CD3C]"
            : "text-gray-700 hover:bg-green-50"
        }
      `}
    >
      <span className="inline-flex items-center justify-center w-5 h-5 text-[18px]">
        {item.icon}
      </span>

      {item.name.length > 9 ? (
        <span className="text-[13px] font-medium">{item.name}</span>
      ) : (
        <span className="text-[14px] font-medium">{item.name}</span>
      )}
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
    name: "타겟 푸시",
    path: "/push/main",
    icon: <HiOutlineBell />,
    children: [
      {
        name: "푸시 예약",
        path: "/push",
        icon: <HiOutlineBell />,
      },
      {
        name: "푸시 발송",
        path: "/push/scheduled",
        icon: <HiOutlineCalendar />,
      },
      {
        name: "발송 내역 조회",
        path: "/push/history",
        icon: <HiOutlineClipboardList />,
      },
      {
        name: "식별자 관리",
        path: "/push/identify",
        icon: <HiOutlineIdentification />,
      },
    ],
  },

  {
    name: "어드민",
    path: "/admin",
    icon: <HiOutlineShieldCheck />,
    children: [
      {
        name: "회원 조회",
        path: "/admin/member",
        icon: <HiOutlineUser />,
      },
      {
        name: "앱 쿠폰 내역 조회",
        path: "/admin/coupon",
        icon: <HiOutlineClipboardList />,
      },
      {
        name: "구독쿠폰 내역 조회",
        path: "/admin/subscriptionRewardRequest",
        icon: <HiOutlineClipboardList />,
      },
      {
        name: "앱 설정",
        path: "/admin/appSetting",
        icon: <HiOutlineCog />,
      },
    ],
  },
  // {
  //   name: "설정",
  //   path: "/setting",
  //   icon: <HiOutlineCog />,
  // },
];
