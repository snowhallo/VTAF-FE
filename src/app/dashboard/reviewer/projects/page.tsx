"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Building,
  Download,
  Eye,
  Settings,
  ChevronDown,
} from "lucide-react";

// Mock projects list data
const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "Tài trợ phát triển tài năng học thuật cho học sinh xuất sắc vượt trội",
    school: "Trường THPT Nguyễn Đình Chiểu",
    category: "Học phí",
    status: "needs_revision",
    raised: 0,
    goal: 45000000,
    date: "20-07-2026",
  },
  {
    id: 2,
    title: "Tặng học bổng 5 học sinh giỏi đạt kết quả xuất sắc kỳ thi chọn đội tuyển Olympic quốc gia",
    school: "Trường THPT Nguyễn Đình Chiểu",
    category: "Học bổng",
    status: "published",
    raised: 35000000,
    goal: 50000000,
    date: "15-07-2026",
  },
  {
    id: 4,
    title: "Tài trợ tài liệu học tập chuyên sâu và thiết bị thí nghiệm cho học sinh chuyên Tin",
    school: "Trường THPT Nguyễn Đình Chiểu",
    category: "Thiết bị học tập",
    status: "closed",
    raised: 15000000,
    goal: 15000000,
    date: "10-06-2026",
  },
  {
    id: 8,
    title: "Học bổng chắp cánh tài năng trẻ tỉnh Điện Biên",
    school: "Trường THPT Điện Biên 1",
    category: "Học bổng",
    status: "published",
    raised: 120000000,
    goal: 120000000,
    date: "05-07-2026",
  },
  {
    id: 9,
    title: "Xây dựng nhà bán trú kiên cố cho học sinh tiểu học Mường Lát",
    school: "Trường Tiểu học Mường Lát",
    category: "Thiết bị học tập",
    status: "stopped",
    raised: 12000000,
    goal: 80000000,
    date: "25-06-2026",
  },
];

const formatVND = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

export default function ReviewerProjectsPage() {
  const [projects] = useState(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSchool, setSelectedSchool] = useState("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.school.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === "all" || project.status === selectedStatus;
      const matchesSchool = selectedSchool === "all" || project.school === selectedSchool;
      return matchesSearch && matchesStatus && matchesSchool;
    });
  }, [projects, searchQuery, selectedStatus, selectedSchool]);

  // Status badging configs
  const statusMap: Record<string, { bg: string; text: string; label: string; icon: any }> = {
    draft: { bg: "bg-slate-100", text: "text-slate-600 border-slate-200", label: "Bản nháp", icon: Clock },
    submitted: { bg: "bg-blue-50 border-blue-100", text: "text-blue-700 border-blue-200", label: "Đã nộp", icon: Clock },
    under_review: { bg: "bg-amber-50 border-amber-100", text: "text-amber-700 border-amber-200", label: "Kiểm duyệt", icon: Clock },
    needs_revision: { bg: "bg-rose-50 border-rose-100", text: "text-rose-700 border-rose-200", label: "Cần bổ sung", icon: AlertCircle },
    published: { bg: "bg-emerald-50 border-emerald-100", text: "text-emerald-700 border-emerald-200", label: "Đang nhận", icon: CheckCircle },
    stopped: { bg: "bg-red-50 border-red-100", text: "text-red-700 border-red-200", label: "Tạm dừng", icon: AlertCircle },
    closed: { bg: "bg-purple-50 border-purple-100", text: "text-purple-700 border-purple-200", label: "Hoàn thành", icon: CheckCircle },
  };

  const handleExportCSV = () => {
    alert("Đang xuất báo cáo danh sách dự án sang định dạng CSV...");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 font-playfair">Quản lý dự án Quỹ</h2>
          <p className="text-xs text-slate-500">Giám sát tổng thể tất cả các dự án đang hoạt động và hồ sơ tài chính giải ngân</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors"
        >
          <Download className="w-4 h-4" />
          Xuất báo cáo (CSV)
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên dự án, trường học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F] transition-all bg-slate-50/50"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer appearance-none"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="published">Đang kêu gọi</option>
            <option value="closed">Hoàn thành</option>
            <option value="needs_revision">Cần bổ sung hồ sơ</option>
            <option value="stopped">Tạm dừng</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* School Filter */}
        <div className="relative">
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer appearance-none"
          >
            <option value="all">Tất cả đối tác trường</option>
            <option value="Trường THPT Nguyễn Đình Chiểu">Trường THPT Nguyễn Đình Chiểu</option>
            <option value="Trường THPT Điện Biên 1">Trường THPT Điện Biên 1</option>
            <option value="Trường Tiểu học Mường Lát">Trường Tiểu học Mường Lát</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-5">Tên dự án</th>
                <th className="py-3.5 px-5">Đối tác trường</th>
                <th className="py-3.5 px-5">Trạng thái</th>
                <th className="py-3.5 px-5">Tiến trình</th>
                <th className="py-3.5 px-5">Ngày tạo</th>
                <th className="py-3.5 px-5 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => {
                  const statusCfg = statusMap[project.status];
                  const StatusIcon = statusCfg.icon;
                  const progressPct = Math.round((project.raised / project.goal) * 100);

                  return (
                    <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-5 max-w-sm">
                        <div className="space-y-1">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-500 inline-block">
                            {project.category}
                          </span>
                          <span className="font-bold text-slate-800 leading-snug line-clamp-2 block">
                            {project.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          {project.school}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusCfg.bg} ${statusCfg.text}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusCfg.label}
                        </span>
                      </td>
                      <td className="py-4 px-5 min-w-[120px]">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
                            <span>{formatVND(project.raised)}</span>
                            <span>{progressPct}%</span>
                          </div>
                          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#006B3F] rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(progressPct, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {project.date}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <Link
                          href={`/dashboard/reviewer/submissions/${project.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#006B3F]/10 hover:bg-[#006B3F] hover:text-white rounded-lg text-[10px] font-bold text-[#006B3F] transition-all"
                        >
                          <Settings className="w-3.5 h-3.5" />
                          Quản lý
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium bg-slate-50/20">
                    Không tìm thấy dự án phù hợp
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
