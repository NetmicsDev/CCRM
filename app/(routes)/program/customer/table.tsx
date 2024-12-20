"use client";

import Link from "next/link";
import ClientModel, { getHalfBirthday } from "@/app/_models/client";

export default function CustomerTable({
  clients,
  setClients,
}: {
  clients: ClientModel[];
  setClients: React.Dispatch<React.SetStateAction<ClientModel[]>>;
}) {
  return (
    <div className="w-full overflow-x-auto mt-4">
      <table className="w-full">
        <colgroup>
          <col width="60px" />
          <col width="*" />
          <col width="140px" />
          <col width="140px" />
          <col width="140px" />
          <col width="140px" />
          <col width="*" />
          <col width="*" />
        </colgroup>

        <thead>
          <tr className="bg-grayscale-13 border-y border-grayscale-11">
            <th className="p-2"></th>
            <th className="py-2 text-left whitespace-nowrap px-2 font-normal">
              고객명
            </th>
            <th className="text-left whitespace-nowrap px-2 font-normal">
              구분
            </th>
            <th className="text-left whitespace-nowrap px-2 font-normal">
              연락처
            </th>
            <th className="text-left whitespace-nowrap px-2 font-normal">
              상령일
            </th>
            <th className="text-left whitespace-nowrap px-2 font-normal">
              생년월일
            </th>
            <th className="text-left whitespace-nowrap px-2 font-normal">
              그룹관리
            </th>
            <th className="text-left whitespace-nowrap px-2 font-normal">
              정보
            </th>
          </tr>
        </thead>
        <tbody>
          {(clients || []).map((client: ClientModel) => (
            <tr key={client.id} className="border-b border-grayscale-11">
              <td className="px-2 py-4">
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    name="p_check"
                    id={`p_check${client.id}`}
                    checked={client.isDeleteChecked || false}
                    onChange={(e) =>
                      setClients((prevClients) =>
                        prevClients.map((c) =>
                          c.id === client.id
                            ? Object.assign(
                                Object.create(Object.getPrototypeOf(c)),
                                c,
                                { isDeleteChecked: e.target.checked }
                              )
                            : c
                        )
                      )
                    }
                  />
                </div>
              </td>
              <td className="px-2 whitespace-nowrap font-semibold">
                {client.name}
              </td>
              <td className="px-2 whitespace-nowrap text-sub-3">
                {client.clientType}
              </td>
              <td className="px-2 whitespace-nowrap ">
                {client.contactNumber}
              </td>
              <td className="px-2 whitespace-nowrap ">
                {getHalfBirthday(
                  client.toDTO().residentRegistrationNumber
                )?.toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="px-2 whitespace-nowrap ">
                {client.birthDate
                  ? client.birthDate.toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "-"}
              </td>
              <td className="px-2 text-sub-2 truncate">{client.groupString}</td>
              <td className="px-2 whitespace-nowrap">
                <Link
                  href={`/program/customer/edit?id=${client.id}`}
                  className="underline underline-offset-2"
                >
                  자세히
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
