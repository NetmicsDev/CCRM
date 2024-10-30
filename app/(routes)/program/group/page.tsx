"use client";

import PrimaryButton from "@/app/_components/Button/button";
import GroupDialog from "@/app/_components/Dialog/group/group";
import GroupMemberDialog from "@/app/_components/Dialog/group/member";
import Dropdown from "@/app/_components/Dropdown";
import Icon from "@/app/_components/Icon";
import { Input, SearchField } from "@/app/_components/Text";
import cn from "@/app/_utils/cn";
import useDialogStore from "@/app/_utils/dialog/store";
import { useState } from "react";

const mockGroupData = [
  {
    id: "1",
    name: "그룹 1",
    customers: 2,
  },
  {
    id: "2",
    name: "판교헬스 동호회",
    customers: 3,
  },
  {
    id: "3",
    name: "그룹 3",
    customers: 6,
  },
];

export default function GroupManagementPage() {
  const openCustom = useDialogStore((state) => state.openCustom);
  const [groupData, setGroupData] = useState(mockGroupData);
  const [selectedGroup, setSelectedGroup] = useState<any>();

  const addGroup = async () => {
    const groupName = await openCustom<string | undefined>(<GroupDialog />);
    if (!groupName) return;

    setGroupData([
      ...groupData,
      { id: String(groupData.length + 1), name: groupName, customers: 0 },
    ]);
  };

  const editGroupName = async () => {
    const newName = await openCustom<string | undefined>(
      <GroupDialog groupName={selectedGroup.name} />
    );
    if (!newName) return;

    setGroupData(
      groupData.map((item) =>
        item.id === selectedGroup.id ? { ...item, name: newName } : item
      )
    );
    setSelectedGroup({ ...selectedGroup, name: newName });
  };

  const deleteGroup = () => {
    setGroupData(groupData.filter((item) => item.id !== selectedGroup.id));
    setSelectedGroup(undefined);
  };

  const addCustomer = async () => {
    const result = await openCustom(<GroupMemberDialog />);
    if (!result) return;
  };

  const deleteCustomer = () => {
    setSelectedGroup({
      ...selectedGroup,
      customers: selectedGroup.customers - 1,
    });
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto my-10">
      <h1 className="text-3xl font-normal">그룹 관리</h1>
      <div className="flex flex-1 gap-4 mt-8">
        <div className="flex flex-col border-r border-grayscale-11 px-4">
          <PrimaryButton
            title="그룹 추가"
            color="primary"
            className="rounded font-normal text-lg"
            onClick={addGroup}
          />
          <ul className="mt-2">
            {groupData.map((item, i) => (
              <li key={i}>
                <div
                  className={cn(
                    "px-4 py-3 rounded hover:bg-grayscale-12 truncate cursor-pointer",
                    selectedGroup?.id === item.id
                      ? "bg-grayscale-13 font-medium"
                      : "font-normal"
                  )}
                  onClick={() =>
                    selectedGroup?.id !== item.id && setSelectedGroup(item)
                  }
                >
                  {item.name}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {selectedGroup ? (
            <div>
              <div className="flex items-center gap-4">
                <div className="flex-1 ">
                  <h2 className="text-2xl font-medium">
                    {selectedGroup.name}
                    <span className="ml-2 text-grayscale-6 text-xl font-normal">
                      ({selectedGroup.customers}명)
                    </span>
                  </h2>
                </div>
                <PrimaryButton
                  title="그룹명 변경"
                  color="primary"
                  className="w-28 h-12 rounded font-normal text-base"
                  onClick={editGroupName}
                />
                <PrimaryButton
                  title="그룹 삭제"
                  color="primary"
                  className="w-28 h-12 rounded font-normal text-base"
                  onClick={deleteGroup}
                />
              </div>
              <div className="flex mt-6 mb-4 items-center gap-4">
                <div className="flex-1">
                  <SearchField
                    placeholder="고객명을 검색하세요"
                    onSearch={() => {}}
                  />
                </div>
                <PrimaryButton
                  title="고객 추가"
                  color="primary"
                  className="w-24 h-14 rounded font-normal text-base"
                  onClick={addCustomer}
                />
              </div>
              <ul className="text-lg font-normal">
                {Array.from({ length: selectedGroup.customers }).map((_, i) => (
                  <li
                    key={i}
                    className="w-full p-3 rounded hover:bg-grayscale-12 justify-between flex items-center"
                  >
                    <span>고객 {i + 1}</span>
                    <Icon
                      type="delete"
                      className="w-10 h-10 p-2 rounded hover:bg-sub-1 hover:bg-opacity-10 hover:fill-sub-1 cursor-pointer"
                      onClick={deleteCustomer}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-2xl">그룹를 선택하십시오.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
