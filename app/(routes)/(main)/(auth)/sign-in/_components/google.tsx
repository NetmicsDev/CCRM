"use client";

import { apiRequest } from "@/app/_utils/axios/client";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function GoogleSignIn() {
  const router = useRouter();
  const onGoogleSignIn = async () => {
    const { data } = await apiRequest("/auth/google", { method: "GET" });

    Cookies.set("ccrm-token", "ccrm-token", {
      expires: 30,
    });

    window.location.href = "/";
  };

  return (
    <div
      className="w-full h-14 flex justify-center items-center shadow-inner-1 shadow-grayscale-10 rounded-sm bg-grayscale-14 hover:bg-grayscale-13"
      onClick={onGoogleSignIn}
    >
      <Image
        src="/images/google.png"
        alt="sign-in-with-google"
        width={20}
        height={20}
      />
      <span className="ml-2 font-medium">구글로 로그인</span>
    </div>
  );
}
