"use client";

import Image from "next/image";

export default function GoogleSignUp() {
  const onGoogleSignIn = () => {
    alert("구글 회원가입");
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
      <span className="ml-2 font-medium">구글로 회원가입</span>
    </div>
  );
}
