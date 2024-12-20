"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PrimaryButton from "@/app/_components/Button/button";
import InfoForm from "../_components/info-form";
import FamilyForm from "./_components/family-form";
import AccountForm from "./_components/account-form";
import CustomerFileForm from "./_components/customer-file-form";
import MemoForm from "./_components/memo-form";
import CarForm from "./_components/car-form";
import FireForm from "./_components/fire-form";
import WaiverForm from "./_components/waiver-form";

import { ClientDao } from "@utils/database/dao/clientDao";
import ClientModel, { ClientDTO } from "@/app/_models/client";
import useDialogStore from "@/app/_utils/dialog/store";
import ColorButton from "../_components/color-button";
import HospitalHistory from "./_components/hospital-history";
import InsuranceHistory from "./_components/insurance-history";

export default function CustomerEditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientIdParam = searchParams.get("id");
  const clientId = clientIdParam ? parseInt(clientIdParam) : -1;

  const openAlert = useDialogStore((state) => state.openAlert);

  const [formData, setFormData] = useState<Partial<ClientDTO> | null>(null);

  useEffect(() => {
    if (!formData) {
      const clientDao = new ClientDao();

      //데이터가 이상하면 404
      if (!clientId || isNaN(clientId)) {
        router.replace("/program/customer");
        return;
      }

      const fetchData = async () => {
        try {
          const clientData = await clientDao.getClient(clientId);
          if (!clientData) {
            router.replace("/program/customer");
          } else {
            console.log(clientData);
            console.log(clientData.toDTO());
            setFormData(clientData.toDTO());
          }
        } catch (error) {
          console.error(error);
          router.replace("/program/customer");
        }
      };

      fetchData();
    }
  }, [searchParams, router, formData, clientId]);

  const handleSave = async () => {
    if (clientId >= 0 && formData) {
      const clientDao = new ClientDao();
      await clientDao.updateClient(clientId, ClientModel.fromDTO(formData));
      await openAlert({
        title: "고객 정보 추가 완료",
        description: "고객 정보 관리 화면으로 이동합니다",
      });

      router.replace("/program/customer");
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full lg:p-6">
      <div className="flex justify-end gap-4 font-normal">
        <ColorButton color="sub-5" title="엑셀 다운로드" />
        <PrimaryButton
          color="secondary"
          title="저장"
          className="w-32 text-base"
          onClick={handleSave}
        />
      </div>
      <div className="flex max-lg:flex-col gap-4 max-lg:mt-4">
        <div className="flex flex-col gap-6 lg:w-1/2">
          <h2 className="text-2xl font-medium">고객 기본 정보</h2>
          <InfoForm
            onSubmit={null}
            formData={formData}
            setFormData={setFormData}
          />
          <FamilyForm formData={formData} setFormData={setFormData} />
        </div>
        <div className="flex flex-col gap-6 lg:w-1/2 max-lg:text-sm">
          <h2 className="text-2xl font-medium">보험 및 기타정보</h2>
          <AccountForm formData={formData} setFormData={setFormData} />
          <CustomerFileForm formData={formData} setFormData={setFormData} />

          <HospitalHistory formData={formData} setFormData={setFormData} />
          <InsuranceHistory formData={formData} setFormData={setFormData} />
          <CarForm formData={formData} setFormData={setFormData} />
          <FireForm formData={formData} setFormData={setFormData} />
          <WaiverForm formData={formData} setFormData={setFormData} />
          <MemoForm formData={formData} setFormData={setFormData} />

          <div className="flex justify-end gap-4 font-normal">
            <PrimaryButton
              color="secondary"
              title="저장"
              className="w-32 text-base"
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
