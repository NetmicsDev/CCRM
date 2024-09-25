"use client";

import { SearchField } from "@/app/_components/Text";
import Image from "next/image";

export default function ProgramSearchBar() {
  return (
    <SearchField
      onSearch={() => {}}
      className="bg-transparent border-y border-y-grayscale-9 border-x-0 rounded-none placeholder-grayscale-9 focus:border-grayscale-14 focus-visible:border-grayscale-14"
      placeholder="통합검색어 입력"
      iconClassName="fill-grayscale-14 group-focus-within:fill-grayscale-14"
    />
  );
}

export function ProgramMainSearchBar() {
  return (
    <SearchField
      onSearch={() => {}}
      className="border border-gray-300 rectangle-lg p-4"
      placeholder="검색"
      iconClassName="fill-grayscale-10 group-focus-within:fill-grayscale-10"
    />
  );
}
