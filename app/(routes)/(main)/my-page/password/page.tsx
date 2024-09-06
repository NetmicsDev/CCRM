"use client";

import { Input, TextField } from "@/app/_components/Text";
import PageTitle from "../_components/page-title";
import TextLabel from "@/app/_components/Text/label";
import { Button } from "@/app/_components/Button";
import { useEffect, useRef, useState } from "react";

export default function ChangePasswordPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [error, setError] = useState("");

  const onChangePassword = (formData: FormData) => {
    if (newPasswordConfirm && newPassword !== newPasswordConfirm) {
      setError("비밀번호가 일치하지 않습니다");
      return;
    }

    // TODO: API Call
    alert("변경되었습니다!");
    if (formRef.current) formRef.current.reset();
  };

  return (
    <>
      <PageTitle>비밀번호 변경</PageTitle>
      <form
        ref={formRef}
        action={onChangePassword}
        className="flex flex-col items-stretch px-20 py-10 gap-4"
      >
        <Input type="password" placeholder="현재 비밀번호 입력" required />
        <TextField
          type="password"
          label="새로운 비밀번호 설정"
          placeholder="새 비밀번호"
          onInput={(e) => {
            setNewPassword(e.currentTarget.value);
            if (error) setError("");
          }}
          required
        />
        <Input
          type="password"
          placeholder="새 비밀번호 확인"
          onInput={(e) => {
            setNewPasswordConfirm(e.currentTarget.value);
            if (error) setError("");
          }}
          error={error}
          required
        />
        <div>
          <TextLabel title="아래 이미지를 보이는대로 입력하십시오." />
          <Input placeholder="자동입력 방지 문자" required />
        </div>
        <Button type="submit" title="수정하기" />
      </form>
    </>
  );
}
