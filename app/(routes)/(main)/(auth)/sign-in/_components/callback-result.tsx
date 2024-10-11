"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useDialogStore from "@/app/_utils/dialog/store";
import { useAuthStore } from "@/app/_utils/auth/store";

export default function CallbackResult() {
  const router = useRouter();
  const params = useSearchParams();
  const { openAlert } = useDialogStore();
  const { saveToken, saveTempToken } = useAuthStore();

  const result = params.get("result");
  if (result === "success") {
    saveToken(params.get("token")!);
    router.replace("/program");
  }

  if (result === "new") {
    saveTempToken(params.get("token")!);
    openAlert({
      title: "비회원 계정 안내",
      description: "가입 내역이 없습니다. 회원가입 화면으로 이동합니다.",
    }).then(() => router.replace("/sign-up/terms"));
  }

  const error = params.get("error");
  if (error) {
    return (
      <div className="w-full h-12 flex justify-center items-center rounded bg-opacity-10 text-sub-4 bg-sub-4">
        인증에 실패했습니다
      </div>
    );
  }

  return <></>;
}
