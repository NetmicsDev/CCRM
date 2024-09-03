import { Button } from "@/app/_components/Button";
import Icon from "@/app/_components/Icon";
import { Input } from "@/app/_components/Text";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="flex flex-col w-[400px] mt-20 m-auto items-center">
      <Icon type="logo" className="w-52 fill-main-1" />
      <Input
        type="email"
        placeholder="이메일 아이디"
        className="w-full mt-16"
        required
      />
      <Input
        type="password"
        placeholder="비밀번호"
        className="w-full mt-2"
        required
      />
      <Button
        className="w-full mt-4 shadow-grayscale-10 shadow-md"
        color="primary"
      >
        로그인
      </Button>
      <div className="self-start">
        <div className="flex flex-row items-center mt-4">
          <div className="relative w-4 h-[18px] mr-2">
            <input
              id="i"
              name="i"
              type="checkbox"
              className={clsx(
                "appearance-none h-4 w-4 border-2 border-main-1 rounded-[4px]",
                " transition-colors duration-300 bg-grayscale-14 checked:bg-main-1"
              )}
            />
            <label htmlFor="i">
              <Icon
                type="checkbox"
                className="w-[10px] h-[7px] stroke-grayscale-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </label>
          </div>
          <span>아이디 저장</span>
        </div>
        <div className="flex flex-row items-center mt-2">
          <div className="relative w-4 h-[18px] mr-2">
            <input
              id="p"
              name="p"
              type="checkbox"
              className="appearance-none h-4 w-4 border-2 border-main-1 rounded-[4px] checked:bg-main-1 checked:border-main-1"
            />

            <label htmlFor="p">
              <Icon
                type="checkbox"
                className="w-[10px] h-[7px] stroke-grayscale-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </label>
          </div>
          <span>비밀번호 저장</span>
        </div>
      </div>
      <div className="w-full h-14 mt-8 flex justify-center items-center shadow-inner-1 shadow-grayscale-10 rounded-sm">
        <Image
          src="/images/google.png"
          alt="sign-in-with-google"
          width={20}
          height={20}
        />
        <span className="ml-2 font-semibold">구글로 로그인</span>
      </div>
      <Link
        href="/find-password"
        className="mt-8 text-grayscale-6 underline underline-offset-2"
      >
        아이디 • 비밀번호 찾기
      </Link>
      <Link
        href="/sign-up"
        className="mt-4 text-grayscale-6 underline underline-offset-2"
      >
        회원가입
      </Link>
    </main>
  );
}
