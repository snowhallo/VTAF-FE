"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");
  const isAuth = pathname.startsWith("/auth");

  if (isDashboard || isAuth) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
