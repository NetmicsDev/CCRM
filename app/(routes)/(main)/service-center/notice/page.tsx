"use client";
import Icon from "@/app/_components/Icon";
import TextField, { SearchField } from "@/app/_components/TextField";
import clsx from "clsx";
import React, { useState } from "react";

export default function NoticePage() {
  const onSearch = (value: string) => alert(value);
  return (
    <div className="flex flex-col px-[100px] w-full">
      <div className="flex flex-row flex-1 mt-10 justify-between items-center">
        <h2 className="text-[24px]">공지사항</h2>
        <div className="w-[400px]">
          <SearchField
            placeholder="검색할 내용을 입력하세요"
            onSearch={onSearch}
          />
        </div>
      </div>
      <div className="mt-10">
        <table className="w-full">
          <thead>
            <tr className="bg-main-2 text-grayscale-14 h-12 divide-x divide-grayscale-11">
              <th className="w-[100px]">카테고리</th>

              <th className="pl-4 text-start">제목</th>
              <th className="w-[100px]">작성일</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-grayscale-11">
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="h-12">
                <td>
                  <CategoryBadge color={index % 2 === 0 ? "main" : "sub"}>
                    {index % 2 === 0 ? "업데이트" : "공지사항"}
                  </CategoryBadge>
                </td>
                <td className="pl-4">제목 {index + 1}</td>
                <td className="text-center text-sm text-grayscale-6">
                  2024-00-00
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination total={100} pageSize={10} onChange={(page) => {}} />
      </div>
    </div>
  );
}

const CategoryBadge = ({
  color,
  children,
}: {
  color: "main" | "sub";
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        "flex w-[66px] px-2 py-1 m-auto border rounded-full text-center text-sm font-semibold",
        { "border-main-3 text-main-3": color === "main" },
        { "border-sub-1 text-sub-1": color === "sub" }
      )}
    >
      {children}
    </div>
  );
};

const Pagination = ({
  total,
  pageSize,
  onChange,
}: {
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}) => {
  const totalPages = Math.ceil(total / pageSize);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onChange(page);
  };

  const handlePrevPage = () => {
    setCurrentPage(Math.max(1, currentPage - 1));
    onChange(Math.max(1, currentPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(totalPages, currentPage + 1));
    onChange(Math.min(totalPages, currentPage + 1));
  };

  return (
    <div className="flex justify-center mt-4">
      <div
        className={clsx(
          "flex w-10 h-10 rounded-sm bg-grayscale-13 justify-center items-center mr-5",
          {
            "pointer-events-none": currentPage === 1,
            "cursor-pointer hover:bg-grayscale-12": currentPage !== 1,
          }
        )}
        onClick={handlePrevPage}
      >
        <Icon type="left" className="w-6 h-6 stroke-grayscale-8" />
      </div>
      {pages.map((page) => (
        <button
          key={page}
          className={clsx("w-10 h-10 mx-1 rounded-sm text-center", {
            "hover:bg-grayscale-13 text-grayscale-8": page !== currentPage,
            "bg-grayscale-12 text-grayscale-1": page === currentPage,
          })}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <div
        className={clsx(
          "flex w-10 h-10 rounded-sm bg-grayscale-13 justify-center items-center ml-5",
          {
            "pointer-events-none": currentPage === totalPages,
            "cursor-pointer hover:bg-grayscale-12": currentPage !== totalPages,
          }
        )}
        onClick={handleNextPage}
      >
        <Icon type="right" className="w-6 h-6 stroke-grayscale-8" />
      </div>
    </div>
  );
};
