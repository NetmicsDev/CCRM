"use client";

import Icon from "@/app/_components/Icon";
import { SearchField } from "@/app/_components/Text";
import cn from "@utils/cn";
import React, { useState } from "react";
import Link from "next/link";
import { CategoryBadge } from "@/app/_components/Badge";
import Pagination from "@/app/_components/Pagination";

export default function NoticePage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const onSearch = (value: string) => alert(value);
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <>
      <div className="flex flex-row flex-1 justify-between items-center">
        <h2 className="text-2xl">공지사항</h2>
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
                <td className="text-center">
                  <CategoryBadge color={index % 2 === 0 ? "main" : "sub"}>
                    {index % 2 === 0 ? "업데이트" : "공지사항"}
                  </CategoryBadge>
                </td>
                <td className="pl-4">
                  <Link
                    href={`/service-center/notice/${
                      (page - 1) * 10 + index + 1
                    }`}
                    className="flex"
                  >
                    제목 {(page - 1) * 10 + index + 1}
                  </Link>
                </td>
                <td className="text-center text-sm text-grayscale-6">
                  2024-00-00
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination total={80} />
      </div>
    </>
  );
}
