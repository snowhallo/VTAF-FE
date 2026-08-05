"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("dashboard_active_role") || "admin";
    router.replace(`/dashboard/${saved}`);
  }, [router]);

  return (
    <div className="p-8 text-center text-xs text-slate-400 font-bold">
      Đang chuyển hướng tới Không gian làm việc...
    </div>
  );
}
