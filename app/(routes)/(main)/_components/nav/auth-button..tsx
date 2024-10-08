"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { signOut } from "@/app/_services/auth";
import { useEffect, useState } from "react";

export default function AuthButton() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("ccrm-token");
    setIsSignedIn(!!token);
  }, []);

  const textStyle =
    "w-[120px] underline underline-offset-[3px] mx-4 text-center hover:text-sub-1";

  const logOut = () => {
    signOut();
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };

  return isSignedIn ? (
    <p className={`${textStyle} cursor-pointer`} onClick={logOut}>
      로그아웃
    </p>
  ) : (
    <Link href="/sign-in" className={textStyle}>
      로그인 / 회원가입
    </Link>
  );
}
