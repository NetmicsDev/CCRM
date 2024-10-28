"use client";

import { Select, SelectField } from "@/app/_components/Select";
import {
  Input,
  SearchField,
  TextArea,
  TextField,
} from "@/app/_components/Text";
import TextLabel from "@/app/_components/Text/label";
import ColorButton from "../../customer/_components/color-button";
import PrimaryButton from "@/app/_components/Button/button";
import { useRouter } from "next/navigation";
import useDialogStore from "@/app/_utils/dialog/store";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";
import { useState } from "react";

export default function CounselPage() {
  const router = useRouter();
  const openPostcodePopup = useDaumPostcodePopup();
  const openAlert = useDialogStore((state) => state.openAlert);

  const [mainAddress, setMainAddress] = useState<string>("");

  const addCounsel = async () => {
    await openAlert({
      title: "상담 등록 완료",
      description: "상담 현황 페이지로 이동합니다",
    });
    router.push("/program/counsel-list");
  };

  const handlePostcodeComplete = (data: Address) => {
    let fullAddress = data.address; // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setMainAddress(fullAddress);
  };

  return (
    <div className="w-full p-6 space-y-8">
      <h1 className="text-3xl text-normal">상담 등록</h1>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 w-1/2">
          <h2 className="text-2xl font-normal">고객정보 / 상담내용</h2>
          <div className="flex flex-col gap-4 px-6 py-4 bg-grayscale-13">
            <div>
              <TextLabel title="고객명" />
              <SearchField
                placeholder="회원명을 입력하시면 자동으로 검색이 됩니다"
                onSearch={() => {}}
                className="mt-2"
              />
            </div>
            <div>
              <TextLabel title="연락처" />
              <div className="flex gap-2 justify-between items-center mt-2">
                <div>
                  <Input
                    type="text"
                    inputMode="numeric"
                    name="mb_phone1"
                    placeholder="010"
                    maxLength={4}
                    className="w-44"
                    required
                  />
                </div>
                <span>-</span>
                <div>
                  <Input
                    type="text"
                    inputMode="numeric"
                    name="mb_phone2"
                    placeholder=""
                    maxLength={4}
                    className="w-44"
                    required
                  />
                </div>
                <span>-</span>
                <div>
                  <Input
                    type="text"
                    inputMode="numeric"
                    name="mb_phone3"
                    placeholder=""
                    maxLength={4}
                    className="w-44"
                    required
                  />
                </div>
              </div>
            </div>
            <SelectField
              title="상담 내용"
              placeholder="선택해주세요"
              options={[
                { value: 0, text: "아이디 저장" },
                { value: 1, text: "정보 수집" },
                { value: 2, text: "상품 제안" },
                { value: 3, text: "계약 체결" },
                { value: 4, text: "증권 전달" },
                { value: 5, text: "기타" },
              ]}
            />
            <TextArea
              label="자세한 상담내용"
              placeholder="자세한 상담내용 입력"
              className="h-32"
            />
            <div className="flex gap-4">
              <ColorButton
                color="sub-2"
                icon="aiVerbal"
                title="대화 음성녹음"
              />
              <ColorButton color="sub-2" icon="aiFile" title="텍스트 변환" />
              <ColorButton color="sub-2" icon="ai" title="AI 요약" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-1/2">
          <h2 className="text-2xl font-normal">상세 상담 정보</h2>
          <div className="flex flex-col gap-4 px-6 py-4 bg-grayscale-13">
            <div>
              <TextField title="상담 일" type="date" />
            </div>
            <div>
              <TextLabel title="상담 시간" />
              <div className="flex gap-2 mt-2">
                <div className="flex-1">
                  <Select
                    options={[
                      { value: "am", text: "오전" },
                      { value: "pm", text: "오후" },
                    ]}
                    className="h-12 py-2"
                  />
                </div>
                <div className="flex-1">
                  <Select
                    options={Array.from({ length: 12 }, (_, i) => ({
                      value: i + 1,
                      text: `${i + 1}시`,
                    }))}
                    className="h-12 py-2"
                  />
                </div>
                <div className="flex-1">
                  <Select
                    options={Array.from({ length: 60 }, (_, i) => ({
                      value: i,
                      text: `${i}분`,
                    }))}
                    className="h-12 py-2"
                  />
                </div>
              </div>
            </div>

            <div>
              <TextField
                title="상담 장소"
                name="mb_addr1"
                placeholder="주소 검색"
                value={mainAddress}
                readOnly
                onClick={() =>
                  openPostcodePopup({ onComplete: handlePostcodeComplete })
                }
              />
              <Input
                type="text"
                name="mb_addr2"
                placeholder="나머지 주소 입력"
                required
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <PrimaryButton
          color="gray"
          title="뒤로"
          className="w-40"
          onClick={() => router.back()}
        />
        <PrimaryButton
          color="secondary"
          title="저장"
          className="w-40"
          onClick={addCounsel}
        />
      </div>
    </div>
  );
}
