"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Icon from "../Icon";
import cn from "@utils/cn";

interface PaginationProps {
  totalCount?: number;
  itemsPerPage?: number;
  currentPage?: number;
}
export default function Pagination({
  totalCount = 10,
  itemsPerPage = 10,
  currentPage = 1,
}: PaginationProps) {
  const pathname = usePathname();
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    const endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const createPageUrl = (page: number) => {
    return `${pathname}?page=${page}`;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  return (
    <div
      className="flex w-full justify-between items-center pt-4 gap-2"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          {totalCount}개 항목 중{" "}
          {totalCount !== 0 && (
            <>
              <span className="font-medium">{startItem}</span> -{" "}
            </>
          )}
          <span className="font-medium">{endItem}</span>개 항목 표시
        </p>
      </div>
      <div
        className={cn(
          "flex flex-1 justify-between sm:justify-end",
          totalCount === 0 && "hidden"
        )}
      >
        <Link
          href={createPageUrl(currentPage - 1)}
          className={cn(
            "rounded-full p-2 hover:bg-gray-100",
            currentPage <= 1
              ? "pointer-events-none text-gray-400"
              : "text-gray-700"
          )}
        >
          <Icon type="left" className="h-6 w-6" />
        </Link>
        <div className="hidden md:flex space-x-1">
          {getPageNumbers().map((number) => (
            <Link
              key={number}
              href={createPageUrl(number)}
              className={cn(
                "w-10 h-10 flex justify-center items-center text-sm font-medium rounded-full",
                number === currentPage
                  ? "bg-gray-500 text-white pointer-events-none"
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              {number}
            </Link>
          ))}
        </div>
        <Link
          href={createPageUrl(currentPage + 1)}
          className={cn(
            "rounded-full p-2 hover:bg-gray-100",
            currentPage >= totalPages
              ? "pointer-events-none text-gray-400"
              : "text-gray-700"
          )}
        >
          <Icon type="right" className="w-6 h-6 " />
        </Link>
      </div>
    </div>
  );
}
