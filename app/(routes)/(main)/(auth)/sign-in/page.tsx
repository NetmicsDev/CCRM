import Icon from "@/app/_components/Icon";
import Link from "next/link";
import LoginForm from "./_components/form";
import GoogleSignIn from "./_components/google";

export default function SignInPage() {
  return (
    <main className="flex flex-col w-[400px] mt-20 m-auto items-center">
      <Icon
        type="logo"
        className="w-48 fill-main-1"
      />
      <LoginForm />
      <div className="w-full mt-4">
        <GoogleSignIn />
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
