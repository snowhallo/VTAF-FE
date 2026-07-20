"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  FileText,
  AlertCircle,
  Eye,
  Calendar,
  Building,
} from "lucide-react";

// Mock submissions data
const INITIAL_SUBMISSIONS = [
  {
    id: 1,
    school: "Trường THPT Nguyễn Đình Chiểu",
    title: "Tài trợ phát triển tài năng học thuật cho học sinh xuất sắc vượt trội",
    category: "Học phí",
    amount: 45000000,
    date: "20-07-2026",
    status: "submitted",
  },
  {
    id: 5,
    school: "Trường THCS Sơn La",
    title: "Tài trợ chi phí tham dự kỳ thi chọn học sinh giỏi cấp Quốc gia cho học sinh năng khiếu",
    category: "Sinh hoạt phí",
    amount: 30000000,
    date: "18-07-2026",
    status: "submitted",
  },
  {
    id: 6,
    school: "Trường Mầm non Hoa Mai",
    title: "Tài trợ học cụ lập trình robot thông minh cho câu lạc bộ Tin học trẻ",
    category: "Thiết bị học tập",
    amount: 15000000,
    date: "16-07-2026",
    status: "under_review",
  },
  {
    id: 7,
    school: "Trường THCS Lý Tự Trọng",
    title: "Trao tặng 10 suất học bổng đặc biệt khuyến tài cho tài năng trẻ",
    category: "Học bổng",
    amount: 20000000,
    date: "12-07-2026",
    status: "needs_revision",
  },
];

const formatVND = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

export default function ReviewerSubmissionsPage() {
  const [submissions] = useState(INITIAL_SUBMISSIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const matchesSearch =
        sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.school.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === "all" || sub.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [submissions, searchQuery, selectedStatus]);

  const statusMap: Record<string, { bg: string; text: string; label: string; icon: any }> = {
    submitted: { bg: "bg-blue-50 border-blue-100", text: "text-blue-700 border-blue-200", label: "Chờ tiếp nhận", icon: FileText },
    under_review: { bg: "bg-amber-50 border-amber-100", text: "text-amber-700 border-amber-200", label: "Đang xét duyệt", icon: Clock },
    needs_revision: { bg: "bg-rose-50 border-rose-100", text: "text-rose-700 border-rose-200", label: "Yêu cầu bổ sung", icon: AlertCircle },
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 font-playfair">Hàng chờ xét duyệt hồ sơ</h2>
        <p className="text-xs text-slate-500">Xem xét và đánh giá các đề xuất hỗ trợ tài chính từ các nhà trường gửi tới Quỹ</p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên trường, tên dự án..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F] transition-all bg-slate-50/50"
          />
        </div>

        {/* Status select */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full md:w-48 bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="all">Tất cả hàng chờ</option>
            <option value="submitted">Chờ tiếp nhận</option>
            <option value="under_review">Đang xét duyệt</option>
            <option value="needs_revision">Cần bổ sung hồ sơ</option>
          </select>
        </div>
      </div>

      {/* Submissions table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-5">Đề xuất dự án</th>
                <th className="py-3.5 px-5">Nhà trường nộp</th>
                <th className="py-3.5 px-5">Số tiền yêu cầu</th>
                <th className="py-3.5 px-5">Trạng thái hàng chờ</th>
                <th className="py-3.5 px-5">Ngày nộp</th>
                <th className="py-3.5 px-5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((sub) => {
                  const statusCfg = statusMap[sub.status];
                  const StatusIcon = statusCfg.icon;

                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-5 max-w-sm">
                        <div className="space-y-1">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-500 inline-block">
                            {sub.category}
                          </span>
                          <Link
                            href={`/dashboard/reviewer/submissions/${sub.id}`}
                            className="font-bold text-slate-800 hover:text-[#006B3F] transition-colors leading-snug line-clamp-2 block"
                          >
                            {sub.title}
                          </Link>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          {sub.school}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <span className="font-bold text-slate-800">{formatVND(sub.amount)}</span>
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusCfg.bg} ${statusCfg.text}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusCfg.label}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {sub.date}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <Link
                          href={`/dashboard/reviewer/submissions/${sub.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#006B3F]/10 hover:bg-[#006B3F] hover:text-white rounded-lg text-[10px] font-bold text-[#006B3F] transition-all whitespace-nowrap"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Xét duyệt
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium bg-slate-50/20">
                    Không tìm thấy đề xuất xét duyệt nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
