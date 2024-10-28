"use client";

import Link from "next/link";
import MemoSidebar from "./_components/sidebar";
import MemoTable from "./_components/table";
import Dropdown from "@/app/_components/Dropdown";
import { useRouter } from "next/navigation";

export default function MemoPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full max-w-screen-lg mx-auto my-10">
      <h1 className="text-3xl font-normal">업무 일지</h1>
      <div className="flex my-6">
        <Dropdown
          options={[
            {
              icon: "folderOutline",
              label: "폴더",
            },
            {
              icon: "document",
              label: "파일",
              onClick: () => router.push("/program/memo/new"),
            },
          ]}
        >
          <div className="flex px-5 py-2.5 justify-center items-center font-medium rounded bg-main-2 hover:bg-main-3 text-grayscale-14">
            신규
          </div>
        </Dropdown>
      </div>
      <div className="flex gap-4 ">
        {/* <MemoSidebar /> */}
        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <MemoTable />
        </div>
      </div>
    </div>
  );
}
