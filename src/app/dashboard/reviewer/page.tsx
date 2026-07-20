"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Search,
  Eye,
  Check,
  X,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Flag,
} from "lucide-react";

// Mock submissions wait queue data
const INITIAL_SUBMISSIONS = [
  {
    id: 1,
    school: "Trường THPT Nguyễn Đình Chiểu",
    title: "Tài trợ phát triển tài năng học thuật cho học sinh xuất sắc vượt trội",
    category: "Học phí",
    amount: 45000000,
    time: "2 giờ trước",
    status: "submitted",
  },
  {
    id: 5,
    school: "Trường THCS Sơn La",
    title: "Tài trợ chi phí tham dự kỳ thi chọn học sinh giỏi cấp Quốc gia cho học sinh năng khiếu",
    category: "Sinh hoạt phí",
    amount: 30000000,
    time: "4 giờ trước",
    status: "submitted",
  },
  {
    id: 6,
    school: "Trường Mầm non Hoa Mai",
    title: "Tài trợ học cụ lập trình robot thông minh cho câu lạc bộ Tin học trẻ",
    category: "Thiết bị học tập",
    amount: 15000000,
    time: "5 giờ trước",
    status: "under_review",
  },
];

// Mock anomalies alert
const MOCK_ANOMALIES = [
  {
    id: 101,
    projectTitle: "Học bổng Sơn La chắp cánh ước mơ",
    reason: "Dự án nhận vượt 15% số tiền mục tiêu (Hiện tại đạt 115%)",
    severity: "high",
    time: "10 phút trước",
  },
  {
    id: 102,
    projectTitle: "Mái trường cho em - Tiểu học Mường Lát",
    reason: "Phát sinh quyên góp lớn bất thường (1 giao dịch 100,000,000đ từ nhà tài trợ ẩn danh)",
    severity: "medium",
    time: "1 giờ trước",
  },
];

const formatVND = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

export default function ReviewerOverview() {
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [filterSort, setFilterSort] = useState("newest");

  const handleAccept = (id: number) => {
    // Transition submission to under review
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: "under_review" } : sub))
    );
    alert("Đã tiếp nhận hồ sơ xét duyệt thành công!");
  };

  const handleReject = (id: number) => {
    if (confirm("Từ chối hồ sơ đề xuất này?")) {
      setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
      alert("Đã từ chối tiếp nhận hồ sơ.");
    }
  };

  return (
    <div className="space-y-6">
      {/* 👋 Greeting header */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 font-playfair">Không gian kiểm duyệt Quỹ</h2>
        <p className="text-xs text-slate-500">Rà soát, đối chiếu hồ sơ từ các nhà trường và quản lý tiến trình dự án</p>
      </div>

      {/* 🔔 Daily Alert banner */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 flex-1">
          <p className="text-xs font-bold text-slate-800">Cần ưu tiên xử lý hôm nay:</p>
          <div className="text-xs text-slate-600 space-y-1 leading-relaxed">
            <p>• Có <strong>{submissions.filter((s) => s.status === "submitted").length} hồ sơ mới</strong> chờ tiếp nhận xét duyệt sơ bộ.</p>
            <p>• 1 hồ sơ của <strong className="text-slate-800">THCS Sơn La</strong> sắp hết hạn thời gian tiếp nhận (còn 4 giờ).</p>
          </div>
        </div>
      </div>

      {/* 📊 Reviewer Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Waiting queue widget */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Chờ tiếp nhận</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
              8
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-extrabold text-slate-800">8</span>
            <span className="text-xs text-slate-400 block mt-1">Đề xuất mới gửi lên</span>
          </div>
        </div>

        {/* Reviewing widget */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Đang xét duyệt</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-xs">
              3
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-extrabold text-slate-800">3</span>
            <span className="text-xs text-slate-400 block mt-1">Đang đối soát chứng từ</span>
          </div>
        </div>

        {/* Total Active widget */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Đang kêu gọi</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xs">
              12
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-extrabold text-slate-800">12</span>
            <span className="text-xs text-slate-400 block mt-1">Dự án công khai web</span>
          </div>
        </div>

        {/* Anomalies alert widget */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Bất thường</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600 font-bold text-xs">
              2
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-extrabold text-rose-600">2</span>
            <span className="text-xs text-slate-400 block mt-1">Cảnh báo hệ thống</span>
          </div>
        </div>
      </div>

      {/* ─── MAIN REVIEW SECTION: SUBMISSIONS & ANOMALIES ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Submission Queue (2/3) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-800">Hàng chờ xét duyệt</h3>
              <p className="text-xs text-slate-500">Đề xuất cần kiểm duyệt sơ bộ trước khi xuất bản</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={filterSort}
                onChange={(e) => setFilterSort(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-[11px] font-semibold text-slate-600 focus:outline-none cursor-pointer"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
              </select>
              <Link
                href="/dashboard/reviewer/submissions"
                className="text-xs font-bold text-[#006B3F] hover:underline"
              >
                Xem tất cả
              </Link>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {submissions.map((sub) => {
              const isSubmitted = sub.status === "submitted";

              return (
                <div key={sub.id} className="py-4 first:pt-0 last:pb-0 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-500">
                          {sub.category}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {sub.school}
                        </span>
                      </div>
                      <Link
                        href={`/dashboard/reviewer/submissions/${sub.id}`}
                        className="font-bold text-sm text-slate-800 hover:text-[#006B3F] transition-colors leading-snug line-clamp-2 block"
                      >
                        {sub.title}
                      </Link>
                      <p className="text-[10px] text-slate-400 font-medium">Gửi: {sub.time}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isSubmitted ? (
                        <>
                          <button
                            onClick={() => handleAccept(sub.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-[#006B3F] hover:text-white border border-emerald-200 hover:border-transparent rounded-lg text-[10px] font-bold text-emerald-800 transition-all cursor-pointer"
                          >
                            <Check className="w-3 h-3" />
                            Tiếp nhận
                          </button>
                          <button
                            onClick={() => handleReject(sub.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 hover:bg-rose-600 hover:text-white border border-rose-200 hover:border-transparent rounded-lg text-[10px] font-bold text-rose-800 transition-all cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                            Từ chối
                          </button>
                        </>
                      ) : (
                        <Link
                          href={`/dashboard/reviewer/submissions/${sub.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 hover:bg-amber-100 rounded-lg text-[10px] font-bold text-amber-800 transition-all"
                        >
                          <Eye className="w-3 h-3" />
                          Xem hồ sơ
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Anomalies & Warnings (1/3) */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Flag className="w-4.5 h-4.5 text-rose-500" />
                Cảnh báo bất thường
              </h3>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-100 text-rose-700">
                {MOCK_ANOMALIES.length}
              </span>
            </div>

            <div className="space-y-3">
              {MOCK_ANOMALIES.map((anomaly) => (
                <div
                  key={anomaly.id}
                  className="p-3 border border-rose-100 rounded-xl space-y-1.5 bg-rose-50/20"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-800 text-xs truncate max-w-[170px]">
                      {anomaly.projectTitle}
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium whitespace-nowrap">{anomaly.time}</span>
                  </div>
                  <p className="text-[11px] text-rose-700 font-medium leading-normal">
                    {anomaly.reason}
                  </p>
                  <button
                    onClick={() => alert(`Reviewer xử lý bất thường cho dự án: ${anomaly.projectTitle}`)}
                    className="text-[10px] font-bold text-rose-800 underline hover:text-rose-950 block"
                  >
                    Xem xét giao dịch giải ngân &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
