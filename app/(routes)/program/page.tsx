import Image from "next/image";
import { ProgramMainSearchBar } from "./_components/nav/search";

export default function ProgramPage() {
  const searchList = ["암", "심근경색", "뇌졸중", "교통사고"];

  return (
    <div className=" w-full justify-start">
      <div className="max-w-4xl mx-20 p-6">
        {/* 검색바 */}
        <ProgramMainSearchBar />
        {/* 인기 검색어 */}
        <div className="mb-6 flex">
          <span className="flex space-x-2 mr-2 mt-2 font-bold text-main-1">
            인기검색어
          </span>
          <div className="mt-2 flex space-x-2 text-main-5 font-semibold">
            {searchList.map((element, index) => (
              <a
                href="#"
                className="hover:underline"
              >
                #{element}
              </a>
            ))}
          </div>
        </div>
        {/* 통합 검색결과 */}
        <div className="bg-white">
          <h2 className="text-2xl font-bold mb-4">통합 검색결과</h2>
          <div className="text-lg text-gray-600 pb-2 border-b border-grayscale-11">
            고객 <span className="text-sub-1">0건</span>
          </div>
        </div>
      </div>
    </div>
  );
}
