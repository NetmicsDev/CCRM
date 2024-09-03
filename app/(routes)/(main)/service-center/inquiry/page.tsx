"use client";

import { Button } from "@/app/_components/Button";
import { TextField, TextArea } from "@/app/_components/Text";
import Link from "next/link";

export default function InquiryPage() {
  const onSubmit = (formData: FormData) => {
    alert(
      '문의를 등록하였습니다.\n1:1문의에 대한 답변은 "마이페이지 > 1:1 문의내역"에서 확인하실 수 있습니다.'
    );
  };

  return (
    <>
      <h1 className="text-2xl py-2">1:1문의 화면</h1>
      <p className="text-grayscale-6 mt-10">
        1:1문의에 의한 답변은&nbsp;
        <Link href="/my-page/inquiry" className="underline underline-offset-2">
          &quot;마이페이지 &gt; 1:1 문의내역&quot;
        </Link>
        &nbsp;에서 확인하실 수 있습니다.
      </p>
      <div className={"mt-5 px-[100px] py-10"}>
        <form className="flex flex-col gap-4" method="post" action={onSubmit}>
          <TextField
            name="category"
            label="문의 유형 선택하기"
            placeholder="문의 유형을 선택하세요"
            required
          />
          <TextField
            id="title"
            label="제목"
            placeholder="제목을 입력하세요"
            required
          />
          <TextArea
            name="contents"
            label="내용 입력"
            placeholder="내용을 입력하세요"
            className="h-40"
            required
          />
          <div className="h-10" />
          <Button type="submit" color="primary">
            문의하기
          </Button>
        </form>
      </div>
    </>
  );
}
