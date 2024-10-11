"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import useDialogStore from "@/app/_utils/dialog/store";
import { useRouter } from "next/navigation";
import useAuth from "@/app/_utils/auth/store";

export default function AuthButton() {
  const router = useRouter();
  const { openAlert, openConfirm } = useDialogStore();
  const auth = useAuth();

  const textStyle =
    "w-[120px] underline underline-offset-[3px] mx-4 text-center hover:text-sub-1";

  const logOut = async () => {
    const result = await openConfirm({
      title: "로그아웃",
      description: "정말 로그아웃 하시겠습니까?",
    });
    if (result) {
      auth?.logout();
      await openAlert({
        title: "로그아웃 완료",
        description: "로그인 페이지로 이동합니다",
      });
      router.push("/sign-in");
    }
  };

  return auth?.isAuthenticated ? (
    <p className={`${textStyle} cursor-pointer`} onClick={logOut}>
      로그아웃
    </p>
  ) : (
    <Link href="/sign-in" className={textStyle}>
      로그인 / 회원가입
    </Link>
  );
}
