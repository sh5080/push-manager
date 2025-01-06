"use client";

import { usePathname } from "next/navigation";
import { menuItems, SidebarItem } from "./sidebarItem.component";

export default function Sidebar() {
  const pathname = usePathname();

  const isActiveRoute = (path: string) => {
    if (path === "/" && pathname === "/") {
      return true;
    }
    if (path !== "/") {
      if (path === pathname) {
        return true;
      }
      if (pathname.startsWith(path + "/")) {
        return false;
      }
    }
    return false;
  };

  return (
    <div className="w-[200px] min-h-screen bg-[#FAFBFC] fixed left-0 top-0 flex flex-col font-pretendard border-r border-gray-200">
      <nav className="mt-8 flex flex-col px-3">
        <div className="flex flex-col space-y-1.5">
          {menuItems.map((item) => (
            <div key={item.path}>
              <SidebarItem item={item} isActive={isActiveRoute(item.path)} />
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
