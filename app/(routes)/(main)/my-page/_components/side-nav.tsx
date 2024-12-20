"use client";

import Icon from "@/app/_components/Icon";
import useAuthStore from "@/app/_utils/auth/store";
import cn from "@utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  return (
    <nav className="flex flex-col col-span-1 max-lg:px-8">
      <div className="flex items-center h-24 border-b border-grayscale-11 px-4 pb-4 mb-2">
        <Icon type="account" className="w-20 h-20 fill-main-1" />
        <h2 className="text-xl font-normal ml-4">{user?.name || "-"} 님</h2>
      </div>
      <div className="grid grid-cols-1 max-lg:grid-cols-2 gap-x-2 mb-4">
        {myPageRoutes.map((route) => {
          const isCurrentPath =
            route.href &&
            (pathname == route.href || pathname.startsWith(`${route.href}/`));
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center p-2 h-[46px]",
                isCurrentPath
                  ? "text-main-2 font-semibold bg-[#F2F3F8]"
                  : "text-grayscale-6"
              )}
            >
              {route.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

const myPageRoutes = [
  {
    href: "/my-page/member",
    name: "회원 정보 확인/수정",
  },
  {
    href: "/my-page/password",
    name: "비밀번호 변경",
  },
  {
    href: "/my-page/point",
    name: "포인트",
  },
  {
    href: "/my-page/shop",
    name: "제품구매",
  },
  {
    href: "/my-page/purchase",
    name: "구매내역",
  },
];
