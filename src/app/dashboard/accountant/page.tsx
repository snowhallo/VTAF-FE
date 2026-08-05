"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Wallet,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Building,
  TrendingUp,
  AlertTriangle,
  FileText,
  Download,
  Award,
  Sparkles,
  DollarSign,
} from "lucide-react";

const formatVND = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
};

function AccountantContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "overview";

  const setActiveTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`/dashboard/accountant?${params.toString()}`);
  };

  const [stats] = useState({
    totalFund: 2340000000,
    disbursed: 1650000000,
    pendingDisbursement: 690000000,
    completedProjects: 14,
    pendingDisbursementProjects: 3,
  });

  const [notification, setNotification] = useState<string | null>(null);

  const [urgentDisbursements, setUrgentDisbursements] = useState([
    {
      id: 1,
      title: "Xây 3 phòng học kiên cố Pa Tần",
      school: "Trường THCS Pa Tần",
      bank: "VietinBank - 1029384756 (THCS Pa Tần)",
      amount: 150000000,
      closedDate: "20-07-2026",
      deadlineDays: 2,
      urgency: "warning",
      status: "pending",
    },
    {
      id: 2,
      title: "Tài trợ tài liệu học tập chuyên sâu và thiết bị thí nghiệm",
      school: "Trường THPT Nguyễn Đình Chiểu",
      bank: "BIDV - 8827361524 (THPT Nguyễn Đình Chiểu)",
      amount: 15000000,
      closedDate: "19-07-2026",
      deadlineDays: 1,
      urgency: "critical",
      status: "pending",
    },
  ]);

  const handleDisburse = (id: number, title: string) => {
    setUrgentDisbursements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "disbursed" } : item))
    );
    setNotification(`Đã tạo lệnh và giải ngân thành công kinh phí cho dự án "${title}"`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12 w-full">
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-[#006B3F] to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-xs font-bold text-emerald-200 border border-emerald-400/30">
            <Wallet className="w-3.5 h-3.5 text-amber-300" /> CỔNG QUẢN LÝ KẾ TOÁN VÀ GIẢI NGÂN QUỸ
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-extrabold">Tổng Quan Tài Chính & Lệnh Giải Ngân Kinh Phí</h2>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-[#006B3F] border border-emerald-200 text-xs font-bold flex items-center gap-2 shadow-sm animate-pop-in">
          <CheckCircle2 className="w-4 h-4" /> {notification}
        </div>
      )}

      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: "overview", label: "Mục Tổng quan", icon: Wallet },
          { id: "stats", label: "Mục Thống kê thu chi", icon: TrendingUp },
          { id: "transactions", label: "Mục Sao kê VietQR Realtime", icon: FileText },
          { id: "disbursement", label: `Mục Lệnh giải ngân (${urgentDisbursements.filter(i => i.status === 'pending').length})`, icon: DollarSign },
          { id: "certificates", label: "Mục Cấp chứng nhận PDF", icon: Award },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === t.id ? "bg-[#006B3F] text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {(activeTab === "overview" || activeTab === "disbursement") && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" /> Mục Lệnh Giải Ngân Kinh Phí (Hạn SLA ≤ 5 ngày)
          </h3>
          <div className="space-y-4">
            {urgentDisbursements.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-600">{item.school} | {item.bank}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-base font-extrabold text-[#006B3F]">{formatVND(item.amount)}</span>
                  {item.status === "disbursed" ? (
                    <span className="px-4 py-2 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Đã giải ngân
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDisburse(item.id, item.title)}
                      className="px-4 py-2 bg-[#006B3F] text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer"
                    >
                      Giải ngân ngay
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AccountantOverviewPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400 font-bold">Đang tải Cổng Kế toán...</div>}>
      <AccountantContent />
    </Suspense>
  );
}
