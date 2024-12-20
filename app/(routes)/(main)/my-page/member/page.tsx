"use client";

import { Button } from "@/app/_components/Button";
import { TextField } from "@/app/_components/Text";
import PageTitle from "../_components/page-title";
import TextLabel from "@/app/_components/Text/label";
import { useEffect, useState } from "react";
import useDialogStore from "@/app/_utils/dialog/store";
import { useRouter } from "next/navigation";
import UserModel from "@/app/_models/user";
import ProfileUpload from "./profile-upload";
import useAuthStore from "@/app/_utils/auth/store";

export default function MemberPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserModel>();
  const { openAlert, openConfirm } = useDialogStore();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!(router && openAlert)) {
      return;
    }
    if (!user) {
      openAlert({
        title: "로그인 정보 없음",
        description: "로그인 페이지로 이동합니다",
      }).then(() => router.replace("/sign-in"));
      return;
    }

    setUserData(UserModel.fromJson(user));
  }, [user, router, openAlert]);

  const onModify = (formData: FormData) => {
    // TODO: API Call

    openAlert({
      title: "회원정보 변경 완료",
      description: "회원 정보가 성공적으로 변경되었습니다",
    });
  };

  return (
    <>
      <PageTitle> 회원 정보 확인/수정</PageTitle>

      <form action={onModify} className="flex flex-col lg:px-20 py-10 gap-4">
        <div className="flex flex-col gap-2">
          <TextLabel title="Email(회원 ID)" />
          <span>{userData?.email ?? "-"}</span>
        </div>
        <div className="flex flex-col gap-2">
          <TextLabel title="회원 이름" />
          <span>{userData?.name ?? "-"}</span>
        </div>

        <div className="flex flex-col gap-2">
          <TextLabel title="프로필사진" caution="※ 1:1 사이즈 권장드립니다." />
          <ProfileUpload
            defaultImage={
              userData?.googleMetadata?.picture ?? "이미지를 업로드하세요"
            }
          />
        </div>

        <TextField
          id="phone"
          type="tel"
          title="휴대전화 번호"
          caution="※ 회원님의 연락처는 웹매거진의 주소가 되므로 정확하게 기입 부탁드립니다."
          defaultValue={userData?.phoneNumber ?? ""}
          required
        />
        <TextField title="지사명" />
        <TextField title="회사명" />
        <TextField title="지점" />
        <TextField title="직책" />
        <Button type="submit" title="수정하기" className="mt-4" />
      </form>
    </>
  );
}
