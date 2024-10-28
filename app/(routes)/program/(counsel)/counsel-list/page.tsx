"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import CounselTable from "./table";
import { Select } from "@/app/_components/Select";
import { SearchField } from "@/app/_components/Text";
import ConsultationModel from "@/app/_models/consultation";
import { ConsultationDao } from "@/app/_utils/database/dao/consultationDao";
import ClientModel from "@/app/_models/client";
import { ClientDao } from "@/app/_utils/database/dao/clientDao";
import Pagination from "@/app/_components/Pagination";
import { useSearchParams } from "next/navigation";

export default function CounselListPage() {
  const searchParams = useSearchParams();
  
  const [totalConsultations, setTotalConsultations] = useState<ConsultationModel[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<ConsultationModel[]>([]);
  const [pagedConsultations, setPagedConsultations] = useState<ConsultationModel[]>([]);

  const isExecuted = useRef(false); 
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const pageNum: number = Number(searchParams.get("page") ?? "1");
  const [countPerPage, setCountPerPage] = useState<number>(10);

  const clientDao = new ClientDao();
  const consultationDao = new ConsultationDao();

  const currentYear = new Date().getFullYear();


  useEffect(() => {
    filterConsultations();
    if (!isExecuted.current) {
      isExecuted.current = true;
      setupDatabase().catch(console.error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalConsultations,searchTerm,sortOrder,countPerPage,pageNum]);

  const setupDatabase = async () => {
    const fetchedClients=await clientDao.getAllClients();
    let fetchedConsultations = await consultationDao.getAllConsultations();
    fetchedConsultations = fetchedConsultations.map((consultationData) => {
      const matchingClient = fetchedClients.find(client => client.id === consultationData.clientId);
      const consultation = ConsultationModel.fromJson(consultationData);
      consultation.client = matchingClient || undefined;
      return consultation;
    });
    setTotalConsultations(fetchedConsultations);
  };
  
  const filterConsultations = () => {
    //검색어 필터링
    const filteredConsultations = totalConsultations.filter(
      (consultation) =>
        consultation.title.includes(searchTerm) || // 상담 제목
        consultation.client?.name.includes(searchTerm) // 고객명
      );
    setFilteredConsultations(filteredConsultations);
    
    //정렬 - 상담 일자 기준
    const sortedConsultations = [...filteredConsultations].sort((a, b) => {
      if (a.consultationTime < b.consultationTime) return sortOrder === "asc" ? -1 : 1;
      if (a.consultationTime > b.consultationTime) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    // 페이지네이션
    const paginatedConsultations = sortedConsultations.slice(
      (Number(searchParams.get("page") || 1) - 1) * countPerPage,
      Number(searchParams.get("page") || 1) * countPerPage
    );
    setPagedConsultations(paginatedConsultations);
  }

  //월별 상담 횟수 카운트
  const monthlyConsultations = Array.from({ length: 12 }).map((_, i) => {
    const month = i + 1;
    const monthString = `${currentYear}-${String(month).padStart(2, "0")}`;
  
    const count = filteredConsultations.filter((consultation) =>
      consultation.consultationTime.startsWith(monthString)
    ).length;
  
    return { month, count };
  });

  return (
    <div className="flex flex-col w-full max-w-screen-xl mx-auto mt-10 gap-6">
      <div>
        <h1 className="text-2xl font-normal">상담 현황</h1>
        <p className="mt-1 text-grayscale-6">
          고객 상담 내역 조회를 하실 수 있습니다.
        </p>
      </div>
      <div className="flex-grow">
        <Suspense fallback={<></>}>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Select
                options={[{ value: "all", text: "전체" }]}
                className="w-32 h-10 py-1.5 px-3"
              />
              <SearchField
                placeholder="검색할 내용을 입력하세요"
                onSearch={setSearchTerm}
                className="w-80 h-10 py-1"
              />
            </div>
            <div className="flex items-center gap-2">
              필터 :
              <Select
                options={[
                  { value: "asc", text: "오름차순" },
                  { value: "desc", text: "내림차순" },
                ]}
                className="w-40 h-10 ml-2 py-1.5 px-3"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setSortOrder(e.target.value);
                }}
              />
              <Select
                options={[
                  { value: 10, text: "10개 보이기" },
                  { value: 20, text: "20개 보이기" },
                  { value: 50, text: "50개 보이기" },
                ]}
                className="w-40 h-10 ml-2 py-1.5 px-3"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setCountPerPage(Number(e.target.value));
                }}
              />
            </div>
          </div>
          <CounselTable consultations={pagedConsultations}/>
          <Pagination
            totalCount={filteredConsultations.length}
            itemsPerPage={countPerPage}
            currentPage={pageNum}
          />
        </Suspense>
      </div>
      <div className="flex flex-col mt-8 py-4 border-t border-grayscale-11">
        <h2 className="text-xl font-medium">상담 현황 테이블</h2>
        <p className="mt-2 text-lg font-normal">
          {currentYear}년도 &lt;월별 상담 횟수&gt;
        </p>

        <div className="w-full mt-4 grid grid-cols-12 border border-grayscale-11 divide-x divide-grayscale-11">
          {monthlyConsultations.map((data) => (
            <div key={data.month} className="divide-y divide-grayscale-11">
              <div className="flex h-12 items-center justify-center bg-grayscale-13 ">
                {data.month}월
              </div>
              <div className="flex h-12 items-center justify-center">
                {data.count}회
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
