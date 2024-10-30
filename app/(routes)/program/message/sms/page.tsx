"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import SmsGroupSidebar from "./_components/group-sidebar";
import SmsTable from "./_components/sms-table";
import GroupDialog from "@/app/_components/Dialog/group/group";
import Link from "next/link";

export default function SmsPage() {
  const openCustom = useDialogStore((state) => state.openCustom);
  return (
    <div className="flex flex-col w-full max-w-screen-lg mx-auto my-10">
      <h1 className="text-3xl font-normal">문자 발송</h1>
      <div className="flex justify-end gap-4">
        <div
          className="px-4 py-3 border border-sub-2 text-sub-2 cursor-pointer"
          onClick={() => {}}
        >
          아침독서 신청하기
        </div>
        <Link
          href={"/program/group"}
          className="px-4 py-3 border border-sub-2 text-sub-2 cursor-pointer"
        >
          그룹 관리
        </Link>
      </div>
      <div className="flex gap-4 mt-6">
        <SmsGroupSidebar />
        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <SmsTable />
        </div>
      </div>
    </div>
  );
}
