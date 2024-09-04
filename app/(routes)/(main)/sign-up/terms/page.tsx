"use client";

import { LinkButton } from "@/app/_components/Button";
import { CheckBox } from "@/app/_components/CheckBox";
import { useState } from "react";

export default function SignUpTermPage() {
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  return (
    <div className="flex flex-col w-[600px] xl:w-[1200px] m-auto items-center">
      <div className="flex flex-col mt-20 gap-8 xl:flex-row xl:gap-2">
        <div className="flex flex-col w-[596px] ">
          <h1 className="text-2xl">회원가입 약관</h1>
          <p className="my-4 max-h-[400px] overflow-y-scroll  p-2 border border-grayscale-11 whitespace-pre-line text-grayscale-3">
            {termsContent}
          </p>
          <CheckBox
            name="terms"
            label="약관을 읽었으며 동의합니다."
            onClick={setTermsChecked}
          />
        </div>

        <div className="flex flex-col w-[596px] ">
          <h1 className="text-2xl">개인정보 처리 방침 안내</h1>
          <p className="my-4 max-h-[400px] overflow-y-scroll  p-2 border border-grayscale-11 whitespace-pre-line text-grayscale-3">
            {privacyContent}
          </p>
          <CheckBox
            name="privacy"
            label="약관을 읽었으며 동의합니다."
            onClick={setPrivacyChecked}
          />
        </div>
      </div>
      <LinkButton
        href="/sign-up/form?terms=true&privacy=true"
        as="/sign-up/form"
        title="회원가입하기"
        disabled={!termsChecked || !privacyChecked}
        className="w-[400px] mt-10 shadow-md shadow-grayscale-9"
      />
    </div>
  );
}

const termsContent = `[제1 장 총 칙]

제1 조 (목적)
이 이용약관(이하 '약관')은 주식회사 에프피하우스 (이하 회사라 합니다)와 이용 고객(이하 '회원') 간에 회사가 제공하는 보케어 서비스(이하 서비스)의 가입 조건 및 이용에 관한 제반 사항과 기타 필요한 사항을 구체적으로 규정함을 목적으로 합니다.

제2 조 (이용 약관의 효력 및 변경)
(1) 이 약관은 보케어 웹사이트(www.bocare.co.kr 이하 '보케어 웹')에서 온라인으로 공시함으로써 효력을 발생하며, 합리적인 사유가 발생할 경우 관련 법령에 위배되지
않는 범위 안에서 개정될 수 있습니다. 개정된 약관은 온라인에서 공지함으로써 효력을 발휘하며, 이용자의 권리 또는 의무 등 중요한 규정의 개정은 사전에 공지합니다.
(2) 회사는 합리적인 사유가 발생될 경우에는 이 약관을 변경할 수 있으며, 약관을 변경할 경우에는 지체 없이 이를 사전에 공시합니다.
회사가 약관을 개정할 경우에는 적용일자 및 개정 사유를 명시하여 현행 약관과 함께 초기 화면상에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만 이용자에게 불리하게
약관 내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두어 공지합니다.
(3) 이 약관에 동의하는 것은 정기적으로 웹을 방문하여 약관의 변경사항을 확인하는 것에 동의함을 의미합니다. 변경된 약관에 대한 정보를 알지 못해 발생하는 이용자의 피해는
회사에서 책임지지 않습니다.
(4) 회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴(해지)를 요청할 수 있으며, 변경된 약관의 효력 발생일로부터 7일 이후에도 거부 의사를 표시하지 아니하고 서비스를 계속
사용할 경우 약관의 변경 사항에 동의한 것으로 간주됩니다.
(5) 이 약관은 회사와 회원 간에 성립되는 서비스 이용계약의 기본약정입니다. 회사는 필요한 경우 특정 서비스에 관하여 적용될 사항(이하 "개별약관"이라고 합니다)을 정하여 미리
공지할 수 있습니다. 회원이 이러한 개별약관에 동의하고 특정 서비스를 이용하는 경우에는 개별약관이 우선적으로 적용되고, 이 약관은 보충적인 효력을 갖습니다. 개별약관의 변경에
관해서는 위 2항을 준용합니다.

제3 조 (약관 외 준칙)
(1) 이 약관 또는 개별약관에서 정하지 않은 사항은 전기통신사업법, 전자거래기본법, 정보통신망 이용 촉진 및 정보보호 등에 관한 법률, 전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법령의
규정과 일반적인 상관례에 의합니다.

(2) 회사는 기간 통신 사업자가 전기통신 서비스를 중지하거나 정상적으로 제공하지 아니하여 손해가 발생한 경우 책임이 면제됩니다.
(3) 회사는 서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 발생한 손해에 대한 책임이 면제됩니다.
(4) 회사는 회원의 귀책사유로 인한 서비스 이용의 장애 또는 손해에 대하여 책임을 지지 않습니다.
`;

const privacyContent = `[제1 장 총 칙]

제1 조 (목적)
이 이용약관(이하 '약관')은 주식회사 에프피하우스 (이하 회사라 합니다)와 이용 고객(이하 '회원') 간에 회사가 제공하는 보케어 서비스(이하 서비스)의 가입 조건 및 이용에 관한 제반 사항과 기타 필요한 사항을 구체적으로 규정함을 목적으로 합니다.

제2 조 (이용 약관의 효력 및 변경)
(1) 이 약관은 보케어 웹사이트(www.bocare.co.kr 이하 '보케어 웹')에서 온라인으로 공시함으로써 효력을 발생하며, 합리적인 사유가 발생할 경우 관련 법령에 위배되지
않는 범위 안에서 개정될 수 있습니다. 개정된 약관은 온라인에서 공지함으로써 효력을 발휘하며, 이용자의 권리 또는 의무 등 중요한 규정의 개정은 사전에 공지합니다.
(2) 회사는 합리적인 사유가 발생될 경우에는 이 약관을 변경할 수 있으며, 약관을 변경할 경우에는 지체 없이 이를 사전에 공시합니다.
회사가 약관을 개정할 경우에는 적용일자 및 개정 사유를 명시하여 현행 약관과 함께 초기 화면상에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만 이용자에게 불리하게
약관 내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두어 공지합니다.
(3) 이 약관에 동의하는 것은 정기적으로 웹을 방문하여 약관의 변경사항을 확인하는 것에 동의함을 의미합니다. 변경된 약관에 대한 정보를 알지 못해 발생하는 이용자의 피해는
회사에서 책임지지 않습니다.
(4) 회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴(해지)를 요청할 수 있으며, 변경된 약관의 효력 발생일로부터 7일 이후에도 거부 의사를 표시하지 아니하고 서비스를 계속
사용할 경우 약관의 변경 사항에 동의한 것으로 간주됩니다.
(5) 이 약관은 회사와 회원 간에 성립되는 서비스 이용계약의 기본약정입니다. 회사는 필요한 경우 특정 서비스에 관하여 적용될 사항(이하 "개별약관"이라고 합니다)을 정하여 미리
공지할 수 있습니다. 회원이 이러한 개별약관에 동의하고 특정 서비스를 이용하는 경우에는 개별약관이 우선적으로 적용되고, 이 약관은 보충적인 효력을 갖습니다. 개별약관의 변경에
관해서는 위 2항을 준용합니다.

제3 조 (약관 외 준칙)
(1) 이 약관 또는 개별약관에서 정하지 않은 사항은 전기통신사업법, 전자거래기본법, 정보통신망 이용 촉진 및 정보보호 등에 관한 법률, 전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법령의
규정과 일반적인 상관례에 의합니다.

(2) 회사는 기간 통신 사업자가 전기통신 서비스를 중지하거나 정상적으로 제공하지 아니하여 손해가 발생한 경우 책임이 면제됩니다.
(3) 회사는 서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 발생한 손해에 대한 책임이 면제됩니다.
(4) 회사는 회원의 귀책사유로 인한 서비스 이용의 장애 또는 손해에 대하여 책임을 지지 않습니다.
`;
