import Image from "next/image";
import ProgramNav from "./_components/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <ProgramNav />
      <div className="flex flex-col w-full">
        <nav className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex space-x-2">
              <button className="bg-blue-900 text-white px-4 py-2 rounded flex items-center">
                <Image
                  src="/images/program/google-icon.png"
                  alt="Google"
                  width={16}
                  height={16}
                />
                <span className="ml-2">캘린더 연동</span>
              </button>
              <button className="bg-blue-900 text-white px-4 py-2 rounded flex items-center">
                <Image
                  src="/images/program/google-icon.png"
                  alt="Google"
                  width={16}
                  height={16}
                />
                <span className="ml-2">드라이브 연동</span>
              </button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">
                서비스 메뉴얼
              </button>
            </div>
            <button className="bg-blue-900 text-white px-4 py-2 rounded">
              스토어 바로가기
            </button>
          </div>
        </nav>
        <div className="flex flex-1">{children}</div>
      </div>
    </div>
  );
}
