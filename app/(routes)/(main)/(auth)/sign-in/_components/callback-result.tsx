"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

export default function CallbackResult() {
  const router = useRouter();
  const params = useSearchParams();

  const result = params.get("result");
  if (result === "success") {
    Cookies.set("ccrm-token", params.get("token")!, {
      expires: 30,
    });
    router.replace("/program");
  }

  if (result === "new") {
    Cookies.set("ccrm-temp-token", params.get("token")!);
    // TODO: 팝업으로 대체
    alert("가입 내역이 없습니다. 회원가입 화면으로 이동합니다.");
    router.replace("/sign-up/terms");
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