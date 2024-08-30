import MainNavItem from "../_components/nav/nav-item";

export default function ServiceCenterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center">
      <main className="flex max-w-[1200px] flex-col items-center">
        <header className="flex w-[1200px] h-[221px] bg-service-center bg-cover bg-center justify-center items-center mt-10">
          <div className="flex flex-col items-center text-grayscale-14 ">
            <h1 className="text-[42px]">고객센터</h1>
            <p className="pt-2 ">평일 : 10시 ~ 18시 | 주말/공휴일 휴무</p>
          </div>
        </header>
        <nav className="flex flex-row h-14">
          <MainNavItem href="/service-center/notice" width={"w-[200px]"}>
            공지사항
          </MainNavItem>
          <MainNavItem href="/service-center/faq" width={"w-[200px]"}>
            FAQ
          </MainNavItem>
          <MainNavItem href="/service-center/inquiry" width={"w-[200px]"}>
            1:1 문의
          </MainNavItem>
        </nav>
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
