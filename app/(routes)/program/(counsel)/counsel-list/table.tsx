"use client";

import Pagination from "@/app/_components/Pagination";
import ClientModel from "@/app/_models/client";
import ConsultationModel from "@/app/_models/consultation";
import Link from "next/link";

export default function CounselTable({
  consultations,
}: {
  consultations: ConsultationModel[];
}) {

  return (
    <div className="flex flex-col">
      <table className="w-full mt-4">
        <colgroup>
          <col className="w-0" />
          <col className="w-32" />
          <col className="w-40" />
          <col className="" />
          <col className="w-32" />
          <col className="w-40" />
        </colgroup>
        <thead>
          <tr className="bg-grayscale-12 border-b border-grayscale-11">
            <td className="px-4 py-2">
              <input type="checkbox" />
            </td>
            <td className="font-medium">고객명</td>
            <td>상담 일자</td>
            <td className="px-2">상담 제목</td>
            <td>상담 진행</td>
            <td>내용</td>
          </tr>
        </thead>
        <tbody>
          {(consultations||[]).map((consultation:ConsultationModel) => (
            <tr key={consultation.id} className="border-b border-grayscale-11">
              <td className="px-4">
                <input type="checkbox" />
              </td>
              <td className="font-medium">{consultation.client?.name||"-"}</td>
              <td>{consultation.consultationTime}</td>
              <td className="px-2">
                <p className="overflow-hidden line-clamp-1">
                  {consultation.title}
                </p>
              </td>
              <td className="py-3">
                {consultation.isPastConsultation() ? (// 상담 완료 여부 판단
                  <div className="inline-flex px-2 py-1 rounded bg-grayscale-12 text-grayscale-6 text-sm font-medium">
                    상담 완료
                  </div>
                ) : (
                  <div className="inline-flex px-2 py-1 rounded bg-sub-4 bg-opacity-10 text-sub-4 text-sm font-medium">
                    상담 예정
                  </div>
                )}
              </td>
              <td>
                <Link
                  href={`/program/counsel/edit/${consultation.id}`}
                  className="hover:underline"
                >
                  상담 내용 보기
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
