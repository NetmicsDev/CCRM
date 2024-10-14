import ProgramNav from "./_components/nav";
import TopBar from "./_components/bar/top-bar";
import BottomBar from "./_components/bar/bottom-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen h-screen">
      <ProgramNav />
      <div className="relative flex flex-col w-screen pl-60 overflow-x-hidden">
        <div className="sticky top-0 z-10">
          <TopBar />
        </div>
        <div className="flex flex-1 mx-10 p-10 overflow-y-auto">{children}</div>
        <div className="bottom-0">
          <BottomBar />
        </div>
      </div>
    </div>
  );
}
