"use client";

import { SearchField } from "@/app/_components/Text";
import ColorButton from "./_components/color-button";
import useDialogStore from "@/app/_utils/dialog/store";
import NewCustomerDialog from "@/app/_components/Dialog/customer/new";
import { useRouter } from "next/navigation";
import { downloadDatabase } from "@utils/database/getDatabase";
import { useEffect, useRef, useState } from "react";
import { ClientDao } from "@/app/_utils/database/dao/clientDao";
import CustomerTable from "./table";
import ClientModel from "@/app/_models/client";
import { Select } from "@/app/_components/Select";
import useAuthStore from "@/app/_utils/auth/store";

export default function CustomerRetrievePage() {
  const router = useRouter();
  const openCustom = useDialogStore((state) => state.openCustom);
  const [totalClients, setTotalClients] = useState<ClientModel[]>([]);
  const [clients, setClients] = useState<ClientModel[]>([]);
  const isExecuted = useRef(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const clientDao = new ClientDao();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    setFilterClients();
    if (!isExecuted.current) {
      isExecuted.current = true;
      setupDatabase().catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, totalClients, searchTerm, sortOrder]);

  const setupDatabase = async () => {
    let fetchedClients = await clientDao.getAllClients();
    fetchedClients = await Promise.all(
      fetchedClients.map(async (client) => {
        client.groupString = await client.getManagementGroupsString();
        return client;
      })
    );
    setTotalClients(fetchedClients);
    setClients(fetchedClients);
  };

  const setFilterClients = () => {
    //검색어 필터링
    const filteredClients = totalClients.filter(
      (client) =>
        client.name.includes(searchTerm) ||
        client.contactNumber.includes(searchTerm)
    );
    //정렬 - 이름기준
    const sortedClients = [...filteredClients].sort((a, b) => {
      if (a.name < b.name) return sortOrder === "asc" ? -1 : 1;
      if (a.name > b.name) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setClients(sortedClients);
  };

  const deleteCheckedClient = async () => {
    const checkedClients = clients
      .filter((client) => client.isDeleteChecked && client.id !== undefined)
      .map((client) => client.id as number);
    if (checkedClients && checkedClients.length >= 0) {
      await clientDao.deleteClientsTransaction(checkedClients);
      await setupDatabase();
    }
  };

  return (
    <div className="flex w-full max-w-screen-xl flex-col mx-auto mt-10">
      <div className="flex max-lg:flex-col justify-between">
        <div className="flex h-14 justify-center items-center gap-3 px-5 py-3 max-lg:mb-4 bg-grayscale-13 border border-grayscale-11 font-normal">
          <span className="text-sub-2 leading-none">
            전체고객 <strong>{totalClients.length}명</strong>
          </span>
          <div className="w-0.5 bg-grayscale-11 h-4"></div>
          <span className="leading-none">
            관리고객{" "}
            <strong>
              {
                totalClients.filter(
                  (client) => client.clientType === "관리 고객"
                ).length
              }
              명
            </strong>
          </span>
          <div className="w-0.5 bg-grayscale-11 h-4"></div>
          <span className="leading-none">
            가망고객{" "}
            <strong>
              {
                totalClients.filter(
                  (client) => client.clientType === "가망 고객"
                ).length
              }
              명
            </strong>
          </span>
        </div>
        <SearchField
          placeholder="검색할 내용을 입력하세요"
          className="lg:w-[400px]"
          onSearch={setSearchTerm}
        />
      </div>
      <div className="flex max-lg:flex-col justify-between mt-4 font-normal">
        <div className="flex gap-2 max-lg:mb-2">
          <div className="max-lg:flex-1">
            <ColorButton
              color="gray"
              icon="delete"
              title="고객 삭제"
              onClick={deleteCheckedClient}
            />
          </div>
          <div className="max-lg:flex-1">
            <ColorButton
              color="sub-2"
              icon="folderOutline"
              title="그룹 관리"
              onClick={() => router.push("/program/group")}
            />
          </div>
          <div className="max-lg:flex-1">
            <ColorButton
              color="sub-1"
              icon="plus"
              title="고객 등록"
              onClick={async () => {
                const data = await openCustom<string>(<NewCustomerDialog />);

                if (data === "self") {
                  router.push("/program/customer/new");
                }
              }}
            />
          </div>
        </div>
        <ColorButton
          onClick={downloadDatabase}
          color="sub-5"
          title="엑셀 다운로드"
        />
      </div>
      <div className="overflow-x-auto mt-4">
        <div className="flex justify-end items-center gap-4">
          <span>필터 :</span>

          <div className="w-48 max-lg:w-36">
            <Select
              className="h-8 px-3 py-1 text-sm"
              options={[
                {
                  text: "그룹 전체",
                  value: "all",
                },
              ]}
            />
          </div>
          <div className="w-48 max-lg:w-36">
            <Select
              className="h-8 px-3 py-1 text-sm"
              options={[
                {
                  text: "오름차순",
                  value: "asc",
                },
                {
                  text: "내림차순",
                  value: "desc",
                },
              ]}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSortOrder(e.target.value);
              }}
            />
          </div>
        </div>
        <CustomerTable clients={clients} setClients={setClients} />
      </div>
    </div>
  );
}
