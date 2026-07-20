"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  Plus,
  ArrowRight,
  ChevronRight,
  Bell,
  Wallet,
  Calendar,
  Eye,
  Edit2,
  Trash2,
  School,
} from "lucide-react";

// Mock school project data
const MOCK_SCHOOL_PROJECTS = [
  {
    id: 1,
    title: "Tài trợ phát triển tài năng học thuật cho học sinh xuất sắc vượt trội",
    category: "Học phí",
    status: "needs_revision",
    raised: 0,
    goal: 45000000,
    date: "20-07-2026",
    revisionReason: "Hồ sơ thiếu chứng nhận đạt giải học sinh giỏi cấp tỉnh của học sinh Nguyễn Văn A.",
  },
  {
    id: 2,
    title: "Tặng học bổng 5 học sinh giỏi đạt kết quả xuất sắc kỳ thi chọn đội tuyển Olympic quốc gia",
    category: "Học bổng",
    status: "published",
    raised: 35000000,
    goal: 50000000,
    date: "15-07-2026",
  },
  {
    id: 3,
    title: "Dự phòng hỗ trợ khẩn cấp học sinh vùng ngập lụt",
    category: "Hỗ trợ khẩn cấp",
    status: "draft",
    raised: 0,
    goal: 20000000,
    date: "19-07-2026",
  },
];

// Helper to format currency
const formatVND = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

export default function SchoolDashboard() {
  const [projects, setProjects] = useState(MOCK_SCHOOL_PROJECTS);
  const [showProfileAlert, setShowProfileAlert] = useState(true);

  // Status mapping to colors and labels
  const statusMap: Record<string, { bg: string; text: string; label: string; icon: any }> = {
    draft: {
      bg: "bg-slate-100",
      text: "text-slate-600 border-slate-200",
      label: "Bản nháp",
      icon: Clock,
    },
    submitted: {
      bg: "bg-blue-50 border-blue-100",
      text: "text-blue-700 border-blue-200",
      label: "Đã nộp",
      icon: FileText,
    },
    under_review: {
      bg: "bg-amber-50 border-amber-100",
      text: "text-amber-700 border-amber-200",
      label: "Đang xét duyệt",
      icon: Clock,
    },
    needs_revision: {
      bg: "bg-rose-50 border-rose-100",
      text: "text-rose-700 border-rose-200",
      label: "Cần bổ sung",
      icon: AlertCircle,
    },
    published: {
      bg: "bg-emerald-50 border-emerald-100",
      text: "text-emerald-700 border-emerald-200",
      label: "Đang kêu gọi",
      icon: CheckCircle,
    },
    stopped: {
      bg: "bg-red-50 border-red-100",
      text: "text-red-700 border-red-200",
      label: "Tạm dừng",
      icon: AlertCircle,
    },
    closed: {
      bg: "bg-purple-50 border-purple-100",
      text: "text-purple-700 border-purple-200",
      label: "Hoàn thành",
      icon: CheckCircle,
    },
  };

  const getStats = () => {
    const totalProjects = projects.length;
    const pendingProjects = projects.filter((p) => p.status === "needs_revision" || p.status === "draft").length;
    const activeProjects = projects.filter((p) => p.status === "published").length;
    const totalRaised = projects.reduce((acc, p) => acc + p.raised, 0) + 115000000; // Adding previous closed campaigns mock amount
    return { totalProjects, pendingProjects, activeProjects, totalRaised };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* 👋 Top Greeting & Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#006B3F] to-[#005030] text-white p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none flex items-center justify-center pr-6">
          <School className="w-48 h-48" />
        </div>
        <div className="space-y-2 relative z-10">
          <h2 className="text-2xl font-bold font-playfair tracking-wide">
            Xin chào, Trường THPT Nguyễn Đình Chiểu 👋
          </h2>
          <p className="text-sm text-emerald-100/90 max-w-xl">
            Chào mừng nhà trường đến với Cổng quản lý RaiseFund. Tại đây, trường có thể dễ dàng nộp các đề xuất xin hỗ trợ học phí, học bổng và theo dõi tiến độ các dự án đang triển khai.
          </p>
        </div>
        <div className="relative z-10 flex-shrink-0">
          <Link
            href="/dashboard/school/projects/new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#006B3F] hover:bg-emerald-50 active:scale-95 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            Tạo đề xuất hỗ trợ
          </Link>
        </div>
      </div>

      {/* ⚠ Profile Info Alert */}
      {showProfileAlert && (
        <div className="flex items-start md:items-center justify-between gap-4 p-4 bg-amber-50 border border-amber-200/60 rounded-xl animate-fade-in">
          <div className="flex items-start md:items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-800 flex-shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-amber-900">Thông tin trường chưa hoàn tất</p>
              <p className="text-xs text-amber-700">
                Vui lòng cập nhật số tài khoản MBBank của nhà trường để Quỹ có thể thực hiện giải ngân khi dự án đạt mục tiêu.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/school/profile"
              className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1.5 whitespace-nowrap"
            >
              Hoàn thiện ngay
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setShowProfileAlert(false)}
              className="text-xs text-amber-400 hover:text-amber-600 font-bold px-1"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* 📊 Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Tổng đề xuất đã nộp</span>
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-800">{stats.totalProjects}</span>
            <span className="text-xs text-slate-400 block mt-1">Dự án đã ghi nhận</span>
          </div>
        </div>

        {/* Pending Approval Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Chờ duyệt / Cần sửa</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-800">{stats.pendingProjects}</span>
            <span className="text-xs text-slate-400 block mt-1">Yêu cầu phản hồi sớm</span>
          </div>
        </div>

        {/* Active Raising Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Đang kêu gọi</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#006B3F]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-800">{stats.activeProjects}</span>
            <span className="text-xs text-slate-400 block mt-1">Công khai trên trang chủ</span>
          </div>
        </div>

        {/* Total Raised Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Tổng tài trợ đã nhận</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xl md:text-2xl font-extrabold text-slate-800 truncate block">
              {formatVND(stats.totalRaised)}
            </span>
            <span className="text-xs text-slate-400 block mt-1">Đã giải ngân & kết quả</span>
          </div>
        </div>
      </div>

      {/* ─── MAIN GRID: PROJECTS + NOTIFICATIONS ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Projects Table (2/3) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-800">Dự án của trường tôi</h3>
              <p className="text-xs text-slate-500">Các hồ sơ tài chính đã đăng ký với Quỹ</p>
            </div>
            <Link
              href="/dashboard/school/projects"
              className="text-xs font-bold text-[#006B3F] hover:text-[#005030] flex items-center gap-1"
            >
              Xem tất cả
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {projects.map((project) => {
              const statusCfg = statusMap[project.status];
              const StatusIcon = statusCfg.icon;
              const progressPct = Math.round((project.raised / project.goal) * 100);

              return (
                <div key={project.id} className="py-4 first:pt-0 last:pb-0 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                          {project.category}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${statusCfg.bg} ${statusCfg.text}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {statusCfg.label}
                        </span>
                      </div>
                      <Link
                        href={`/dashboard/school/projects/${project.id}`}
                        className="font-bold text-sm text-slate-800 hover:text-[#006B3F] transition-colors leading-snug line-clamp-2 block"
                      >
                        {project.title}
                      </Link>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Link
                        href={`/dashboard/school/projects/${project.id}`}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      {project.status === "draft" && (
                        <>
                          <button
                            className="p-1.5 text-slate-400 hover:text-[#006B3F] hover:bg-slate-50 rounded-lg transition-colors"
                            title="Sửa bản nháp"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("Xóa bản nháp này?")) {
                                setProjects(projects.filter((p) => p.id !== project.id));
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Anomaly warning banner if needs revision */}
                  {project.status === "needs_revision" && project.revisionReason && (
                    <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-lg text-xs text-rose-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-500" />
                      <p>
                        <span className="font-bold">Lý do yêu cầu sửa đổi:</span> {project.revisionReason}{" "}
                        <Link
                          href={`/dashboard/school/projects/${project.id}`}
                          className="font-bold underline hover:text-rose-900 block mt-1"
                        >
                          Cập nhật lại hồ sơ ngay &rarr;
                        </Link>
                      </p>
                    </div>
                  )}

                  {/* Fund Raising Progress (if published or closed) */}
                  {project.status === "published" && (
                    <div className="space-y-1 bg-slate-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">
                          Đã kêu gọi: <strong className="text-slate-800">{formatVND(project.raised)}</strong> / {formatVND(project.goal)}
                        </span>
                        <span className="font-bold text-[#006B3F]">{progressPct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#006B3F] rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Notifications & Guidelines (1/3) */}
        <div className="space-y-6">
          {/* Notifications List */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                <Bell className="w-4.5 h-4.5 text-[#006B3F]" />
                Thông báo & Nhắc nhở
              </h3>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-red-50/40 border border-red-100 rounded-xl flex gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-800">Cần bổ sung hồ sơ gấp!</p>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    Hồ sơ đề xuất "Tài trợ phát triển tài năng học thuật" của bạn đã bị yêu cầu chỉnh sửa. Lý do: Thiếu bảng điểm học tập năm học gần nhất của học sinh Nguyễn Văn A.
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium block">2 giờ trước</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl flex gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-800">Dự án chính thức công khai</p>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    Dự án "Tặng học bổng 5 học sinh" đã được Quỹ phê duyệt và chính thức nhận tài trợ trên website.
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium block">2 ngày trước</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Guide card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-4 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
            <h4 className="font-bold text-sm tracking-wide">Quy định Vận hành ngắn gọn</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="inline-flex w-4 h-4 rounded-full bg-slate-700 items-center justify-center text-[10px] text-slate-300 mt-0.5">1</span>
                <span>Nhà trường tạo đề xuất hỗ trợ cùng hồ sơ/chứng từ minh bạch.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-flex w-4 h-4 rounded-full bg-slate-700 items-center justify-center text-[10px] text-slate-300 mt-0.5">2</span>
                <span>Quỹ phê duyệt hồ sơ và mở nhận đóng góp thông qua tài khoản MB của Quỹ.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-flex w-4 h-4 rounded-full bg-slate-700 items-center justify-center text-[10px] text-slate-300 mt-0.5">3</span>
                <span>Khi đạt mục tiêu, Quỹ thực hiện giải ngân trực tiếp vào số tài khoản MBBank của Trường.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
