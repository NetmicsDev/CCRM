"use client";

import { Button } from "@/app/_components/Button";
import { TextArea, TextField } from "@/app/_components/Text";
import { FormEventHandler } from "react";

export default function MemberPage() {
  const onModify = (formData: FormData) => {
    // TODO: API Call

    alert(`${formData.get("phone")} 수정되었습니다`);
  };

  return (
    <>
      <div className="h-24 border-b border-b-grayscale-11">
        <h1 className="text-[28px]">회원 정보 확인/수정</h1>
      </div>
      <form action={onModify} className="flex flex-col px-20 pt-10 gap-4">
        <div className="flex flex-col gap-2">
          <h5 className="text-sm font-semibold text-grayscale-6">
            Email(회원 ID)
          </h5>
          <span>email@example.com</span>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-sm font-semibold text-grayscale-6">회원 이름</h5>
          <span>홍길동 </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <h5 className="text-sm font-semibold text-grayscale-6">
              프로필사진
            </h5>
            <span className="text-sub-1 text-sm">
              ※ 1:1 사이즈 권장드립니다.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button title="파일선택" className="h-9 text-sm" />
            <span className="text-sm text-grayscale-6">선택된 파일 없음</span>
          </div>
        </div>

        <TextField
          id="phone"
          type="tel"
          label="휴대전화 번호"
          caution="회원님의 연락처는 웹매거진의 주소가 되므로 정확하게 기입 부탁드립니다."
          defaultValue={"01012345678"}
          required
        />
        <TextField label="회사명" defaultValue={"넷믹스"} />
        <TextField label="지점" />
        <TextField label="직책" />
        <TextArea label="소개사항" />
        <Button type="submit" title="수정하기" className="mt-4" />
      </form>
    </>
  );
}
