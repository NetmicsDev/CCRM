import Image from "next/image";
import ProgramNav from "./_components/nav";
import TopBar from "./_components/top-bar";
import { Children } from "react";
import BottomBar from "./_components/bottom-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <ProgramNav />
      <div className="flex flex-col justify-between">
        <TopBar>{children}</TopBar>
        <BottomBar></BottomBar>
      </div>
    </div>
  );
}
