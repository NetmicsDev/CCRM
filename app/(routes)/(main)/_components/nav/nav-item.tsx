"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainNavItem({
  href,
  width = 100,
  plain = false,
  underline = false,
  children,
}: Readonly<{
  href: string;
  width?: number;
  plain?: boolean;
  underline?: boolean;
  children?: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isCurrentPath =
    href && (pathname == href || pathname.startsWith(`${href}/`));

  return (
    <div
      className={clsx(
        `flex w-[${width}px] h-full justify-center items-center`,
        {
          "border-b-2 border-sub-1": !plain && isCurrentPath,
          "border-b-2 border-grayscale-11":
            underline && !plain && !isCurrentPath,
        }
      )}
    >
      <Link href={href}>
        <p
          className={clsx("text-main-1 text-base hover:text-sub-1", {
            "text-sub-1": !plain && isCurrentPath,
            "pt-0.5": !underline && isCurrentPath,
          })}
        >
          {children}
        </p>
      </Link>
    </div>
  );
}
