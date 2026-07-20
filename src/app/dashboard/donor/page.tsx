"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  Download,
  CheckCircle,
  Clock,
  ExternalLink,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

// Mock donor's supported projects
const MOCK_SUPPORTED_PROJECTS = [
  {
    id: 2,
    title: "Tặng học bổng 5 học sinh giỏi đạt kết quả xuất sắc kỳ thi chọn đội tuyển Olympic quốc gia",
    school: "Trường THPT Nguyễn Đình Chiểu",
    amountDonated: 10000000,
    dateDonated: "15-07-2026",
    projectStatus: "published",
    evidenceFile: null, // Still in progress, no evidence yet
  },
  {
    id: 4,
    title: "Tài trợ tài liệu học tập chuyên sâu và thiết bị thí nghiệm cho học sinh chuyên Tin",
    school: "Trường THPT Nguyễn Đình Chiểu",
    amountDonated: 15000000,
    dateDonated: "10-06-2026",
    projectStatus: "closed",
    evidenceFile: "Bao_cao_nghiem_thu_sach.pdf", // Available proof of disbursement!
  },
];

// Mock donor's transaction history
const MOCK_TRANSACTIONS = [
  {
    txCode: "RF-98213",
    projectTitle: "Tặng học bổng 5 học sinh giỏi đạt kết quả xuất sắc kỳ thi chọn đội tuyển Olympic quốc gia",
    amount: 10000000,
    method: "Chuyển khoản VietQR (MB)",
    date: "15-07-2026 10:15",
    status: "success",
  },
  {
    txCode: "RF-71239",
    projectTitle: "Tài trợ tài liệu học tập chuyên sâu và thiết bị thí nghiệm cho học sinh chuyên Tin",
    amount: 10000000,
    method: "Chuyển khoản VietQR (MB)",
    date: "10-06-2026 14:02",
    status: "success",
  },
  {
    txCode: "RF-70981",
    projectTitle: "Tài trợ tài liệu học tập chuyên sâu và thiết bị thí nghiệm cho học sinh chuyên Tin",
    amount: 5000000,
    method: "Chuyển khoản VietQR (MB)",
    date: "09-06-2026 09:45",
    status: "success",
  },
];

const formatVND = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

export default function DonorDashboard() {
  const totalDonated = MOCK_TRANSACTIONS.reduce((acc, t) => acc + t.amount, 0);
  const supportedCount = MOCK_SUPPORTED_PROJECTS.length;
  const txCount = MOCK_TRANSACTIONS.length;

  return (
    <div className="space-y-6">
      {/* 👋 Top Greeting Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none flex items-center justify-center pr-6">
          <Heart className="w-48 h-48" />
        </div>
        <div className="space-y-2 relative z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-700/50 text-emerald-100">
            Nhà hảo tâm đồng hành
          </span>
          <h2 className="text-xl md:text-2xl font-bold font-playfair tracking-wide">
            Xin chào, Nguyễn Hữu Tài 👋
          </h2>
          <p className="text-xs md:text-sm text-emerald-100/90 max-w-xl">
            Cảm ơn bạn đã chắp cánh tài năng và nâng bước các học sinh vượt khó. Toàn bộ các khoản tài trợ của bạn đều được giải ngân minh bạch trực tiếp đến nhà trường dưới sự đối soát nghiêm ngặt của Quỹ.
          </p>
        </div>
      </div>

      {/* 📊 Donor stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total donation card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Tổng đóng góp</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <DollarSign className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-extrabold text-slate-800">{formatVND(totalDonated)}</span>
            <span className="text-xs text-slate-400 block mt-1">Đã chuyển trực tiếp cho các trường</span>
          </div>
        </div>

        {/* Projects count card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Dự án đã đồng hành</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Award className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-extrabold text-slate-800">{supportedCount} dự án</span>
            <span className="text-xs text-slate-400 block mt-1">Học bổng & Học phí</span>
          </div>
        </div>

        {/* Transaction count card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Số lượt đóng góp</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <TrendingUp className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-extrabold text-slate-800">{txCount} lượt</span>
            <span className="text-xs text-slate-400 block mt-1">Giao dịch qua VietQR MB</span>
          </div>
        </div>
      </div>

      {/* ─── MAIN GRID: SUPPORTED PROJECTS & HISTORY ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Supported projects (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Supported projects table card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-sm text-slate-800">Dự án đang đồng hành</h3>
              <p className="text-xs text-slate-500">Theo dõi tiến trình giải ngân và minh chứng thực hiện hỗ trợ từ nhà trường</p>
            </div>

            <div className="divide-y divide-slate-100">
              {MOCK_SUPPORTED_PROJECTS.map((proj) => {
                const isClosed = proj.projectStatus === "closed";

                return (
                  <div key={proj.id} className="py-4 first:pt-0 last:pb-0 flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="text-[10px] text-slate-400 font-semibold block">{proj.school}</span>
                        <Link
                          href={`/projects/${proj.id}`}
                          className="font-bold text-sm text-slate-800 hover:text-[#006B3F] transition-colors leading-snug line-clamp-2 block"
                        >
                          {proj.title}
                        </Link>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 self-start">
                        {isClosed ? (
                          <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200">
                            Đã hoàn thành
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            Đang kêu gọi
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="space-y-1">
                        <span className="text-slate-400 block font-medium">Bạn đã ủng hộ:</span>
                        <span className="font-bold text-slate-800">{formatVND(proj.amountDonated)}</span>
                        <span className="text-[10px] text-slate-400 block">Ngày ủng hộ: {proj.dateDonated}</span>
                      </div>

                      <div className="space-y-1 sm:text-right">
                        <span className="text-slate-400 block font-medium">Minh chứng từ Trường:</span>
                        {proj.evidenceFile ? (
                          <button
                            onClick={() => alert(`Đang tải minh chứng nghiệm thu của dự án: ${proj.evidenceFile}`)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-[10px] font-bold border border-emerald-200"
                          >
                            <Download className="w-3 h-3" />
                            Tải minh chứng chi (.pdf)
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg text-[10px] font-bold border border-amber-200">
                            <Clock className="w-3 h-3" />
                            Đang chờ trường nghiệm thu
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Transaction History (1/3) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-800">Lịch sử giao dịch</h3>
            <p className="text-xs text-slate-500">Các khoản tài trợ đã chuyển khoản thành công</p>
          </div>

          <div className="space-y-3">
            {MOCK_TRANSACTIONS.map((tx) => (
              <div
                key={tx.txCode}
                className="p-3 border border-slate-100 rounded-xl space-y-1.5 bg-slate-50/30 text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-slate-700">{tx.txCode}</span>
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-2.5 h-2.5" />
                    Thành công
                  </span>
                </div>
                <p className="text-slate-600 font-medium line-clamp-2 leading-relaxed">
                  {tx.projectTitle}
                </p>
                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 font-semibold border-t border-slate-100">
                  <span>{tx.date}</span>
                  <span className="text-slate-800 font-extrabold">{formatVND(tx.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
