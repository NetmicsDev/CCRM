import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import { SearchField, TextField } from "../../Text";
import TextLabel from "../../Text/label";
import { CheckBox } from "../../CheckBox";

const mockCustomers = [
  {
    name: "홍길동",
    phone: "010-8513-3549",
    email: "2ZxwH@example.com",
  },
  {
    name: "김재훈",
    phone: "010-1111-2222",
    email: "2ZxwH@example.com",
  },
  {
    name: "구제연",
    phone: "010-3333-4444",
    email: "2ZxwH@example.com",
  },
];

export default function GroupMemberDialog() {
  const closeDialog = useDialogStore((state) => state.closeDialog);

  return (
    <div className="flex flex-col w-[640px] gap-4">
      <div className="px-6 py-4 border-b border-b-grayscale-11">
        <h2 className="text-xl font-normal">그룹 고객 추가</h2>
      </div>
      <div className="px-6">
        <SearchField placeholder="고객명을 검색하세요" onSearch={() => {}} />
      </div>
      <div className="px-6">
        <table className="w-full ">
          <thead>
            <tr className="table w-full table-fixed bg-grayscale-12">
              <th className="text-left p-2 w-12">
                <CheckBox name="all_select" />
              </th>
              <th className="text-left">
                <span>고객명</span>
              </th>
              <th className="text-left">
                <span>연락처</span>
              </th>
              <th className="text-left">
                <span>그룹</span>
              </th>
            </tr>
          </thead>
          <tbody className="block max-h-64 overflow-y-scroll">
            {mockCustomers.map((customer) => (
              <tr key={customer.name} className="table w-full table-fixed">
                <td className="p-2 w-12">
                  <CheckBox name={customer.name} />
                </td>
                <td className="">{customer.name}</td>
                <td className="">{customer.phone}</td>
                <td className=""></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between px-6 pb-6">
        <PrimaryButton
          title="취소"
          color="gray"
          className="w-20 h-10 rounded text-base"
          onClick={closeDialog}
        />
        <PrimaryButton
          title="추가"
          color="primary"
          className="w-20 h-10 rounded text-base"
          onClick={() => closeDialog()}
        />
      </div>
    </div>
  );
}
