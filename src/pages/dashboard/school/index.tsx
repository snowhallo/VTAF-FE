import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FileText,
  Clock,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  Plus,
  ArrowRight,
  Wallet,
  Eye,
  Edit2,
  Trash2,
  School,
  Sparkles,
  PieChart,
  Activity,
  Award,
  Filter,
  XCircle,
} from "lucide-react";

// Mock school project dataset for THPT Nguyễn Đình Chiểu
const MOCK_SCHOOL_PROJECTS = [
  {
    id: 1,
    title: "Tài trợ phát triển tài năng học thuật cho học sinh xuất sắc vượt trội",
    schoolName: "THPT Nguyễn Đình Chiểu",
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
    schoolName: "THPT Nguyễn Đình Chiểu",
    category: "Học bổng",
    status: "approved",
    raised: 35000000,
    goal: 50000000,
    date: "15-07-2026",
  },
  {
    id: 3,
    title: "Dự phòng hỗ trợ khẩn cấp học sinh vùng ngập lụt",
    schoolName: "THPT Nguyễn Đình Chiểu",
    category: "Hỗ trợ khẩn cấp",
    status: "draft",
    raised: 0,
    goal: 20000000,
    date: "19-07-2026",
  },
  {
    id: 4,
    title: "Trang bị phòng máy tính lập trình AI cho câu lạc bộ STEM",
    schoolName: "THPT Nguyễn Đình Chiểu",
    category: "Thiết bị",
    status: "pending",
    raised: 0,
    goal: 80000000,
    date: "22-07-2026",
  },
  {
    id: 5,
    title: "Xây mới nhà vệ sinh đạt chuẩn cho học sinh nghèo",
    schoolName: "THPT Nguyễn Đình Chiểu",
    category: "Cơ sở vật chất",
    status: "rejected",
    raised: 0,
    goal: 30000000,
    date: "10-06-2026",
    rejectedReason: "Kinh phí vượt quá hạn mức hỗ trợ đợt 1 năm 2026",
  },
];

const formatVND = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

export default function SchoolDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") as any) || "overview";
  const setActiveTab = (tab: string) => setSearchParams({ tab });
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "pending" | "approved" | "rejected" | "needs_revision">("all");
  const [projects, setProjects] = useState(MOCK_SCHOOL_PROJECTS);

  const statusMap: Record<string, { bg: string; text: string; label: string; icon: any }> = {
    draft: {
      bg: "bg-slate-100 border-slate-200",
      text: "text-slate-600 font-bold",
      label: "Bản nháp",
      icon: Clock,
    },
    pending: {
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-700 font-bold",
      label: "Chờ kiểm duyệt",
      icon: Clock,
    },
    approved: {
      bg: "bg-emerald-50 border-emerald-200",
      text: "text-emerald-700 font-bold",
      label: "Đã kiểm duyệt",
      icon: CheckCircle,
    },
    rejected: {
      bg: "bg-rose-50 border-rose-200",
      text: "text-rose-700 font-bold",
      label: "Bị từ chối",
      icon: XCircle,
    },
    needs_revision: {
      bg: "bg-purple-50 border-purple-200 animate-pulse",
      text: "text-purple-700 font-bold",
      label: "Cần bổ sung",
      icon: AlertCircle,
    },
  };

  const filteredProjects = projects.filter((p) => {
    if (statusFilter === "all") return true;
    return p.status === statusFilter;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-12 w-full">
      {/* 🏫 SCHOOL HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-[#006B3F] to-emerald-900 text-white p-6 md:p-8 rounded-3xl shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/20">
              <School className="w-3.5 h-3.5" />
              CỔNG THÔNG TIN NHÀ TRƯỜNG ĐỐI TÁC
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-extrabold tracking-tight">
              Trường THPT Nguyễn Đình Chiểu
            </h2>
            <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
              Quản lý danh sách các đề xuất học bổng, tạo dự án mới và theo dõi tiến độ giải ngân kinh phí.
            </p>
          </div>

          <Link
            to="/dashboard/school/projects/new"
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-2xl text-xs shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            + Đề xuất dự án mới
          </Link>
        </div>
      </div>

      {/* 🎛️ NAVIGATION TABS FOR SCHOOL */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "overview" ? "bg-[#006B3F] text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <School className="w-4 h-4" />
          <span>Tổng quan</span>
        </button>

        <button
          onClick={() => setActiveTab("stats")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "stats" ? "bg-[#006B3F] text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Thống kê</span>
        </button>

        <button
          onClick={() => setActiveTab("created")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "created" ? "bg-[#006B3F] text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Dự án đã tạo ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("school_only")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "school_only" ? "bg-[#006B3F] text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Award className="w-4 h-4 text-amber-300" />
          <span>Dự án hiện tại của Trường</span>
        </button>
      </div>

      {/* ─── TAB OVERVIEW & STATS ─── */}
      {(activeTab === "overview" || activeTab === "stats") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Tổng tiền đã nhận giải ngân</span>
            <p className="text-2xl font-extrabold text-[#006B3F]">35,000,000 ₫</p>
            <p className="text-[10px] text-emerald-600 font-bold">1 Dự án đang công khai</p>
          </div>

          <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Tổng dự án đã nộp</span>
            <p className="text-2xl font-extrabold text-slate-900">{projects.length} Dự án</p>
            <p className="text-[10px] text-amber-600 font-bold">1 Hồ sơ cần bổ sung</p>
          </div>

          <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Học sinh được tài trợ</span>
            <p className="text-2xl font-extrabold text-purple-700">12 Học sinh</p>
            <p className="text-[10px] text-purple-600 font-bold">Học bổng vượt khó</p>
          </div>

          <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Đánh giá tin cậy</span>
            <p className="text-2xl font-extrabold text-blue-600">4.9 / 5.0</p>
            <p className="text-[10px] text-slate-500 font-medium">Đối tác tin cậy Hạng A</p>
          </div>
        </div>
      )}

      {/* ─── TAB CREATED PROJECTS (WITH 5 STATUS FILTERS) ─── */}
      {(activeTab === "overview" || activeTab === "created") && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#006B3F]" />
                Danh Sách Dự Án Đã Tạo Theo Trạng Thái
              </h3>
              <p className="text-xs text-slate-500 mt-1">Lọc hồ sơ theo từng giai đoạn kiểm duyệt và nộp đề xuất</p>
            </div>

            {/* 5 Status Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Tất cả ({projects.length})
              </button>

              <button
                onClick={() => setStatusFilter("draft")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === "draft" ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Nháp
              </button>

              <button
                onClick={() => setStatusFilter("pending")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === "pending" ? "bg-amber-600 text-white" : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                }`}
              >
                Chờ kiểm duyệt
              </button>

              <button
                onClick={() => setStatusFilter("approved")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === "approved" ? "bg-[#006B3F] text-white" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                Đã kiểm duyệt
              </button>

              <button
                onClick={() => setStatusFilter("rejected")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === "rejected" ? "bg-rose-600 text-white" : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                }`}
              >
                Bị từ chối
              </button>

              <button
                onClick={() => setStatusFilter("needs_revision")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === "needs_revision" ? "bg-purple-700 text-white" : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                }`}
              >
                Cần bổ sung
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredProjects.map((project) => {
              const statusInfo = statusMap[project.status] || statusMap.draft;
              const StatusIcon = statusInfo.icon;
              return (
                <div
                  key={project.id}
                  className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-white transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${statusInfo.bg} ${statusInfo.text}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusInfo.label}
                      </span>
                      <span className="text-xs text-slate-500 font-bold">{project.category}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">Ngày khởi tạo: {project.date}</span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base">{project.title}</h4>

                  {project.status === "needs_revision" && project.revisionReason && (
                    <div className="p-3 bg-purple-50 border-l-4 border-purple-600 rounded-r-xl text-xs text-purple-900 font-medium">
                      ⚠️ <strong>Yêu cầu bổ sung từ Hội đồng Thẩm định:</strong> {project.revisionReason}
                    </div>
                  )}

                  {project.status === "rejected" && project.rejectedReason && (
                    <div className="p-3 bg-rose-50 border-l-4 border-rose-600 rounded-r-xl text-xs text-rose-900 font-medium">
                      ❌ <strong>Lý do từ chối:</strong> {project.rejectedReason}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                    <span className="text-xs text-slate-600">
                      Mục tiêu kinh phí: <strong className="text-[#006B3F] font-bold">{formatVND(project.goal)}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-500 hover:text-slate-900 bg-white rounded-xl border border-slate-200 text-xs font-bold flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── TAB SCHOOL ONLY PROJECTS ─── */}
      {activeTab === "school_only" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Các Dự Án Hiện Tại Thuộc Trường THPT Nguyễn Đình Chiểu
            </h3>
            <p className="text-xs text-slate-500 mt-1">Danh sách riêng các dự án đã và đang khởi tạo bởi nhà trường hiện tại</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div key={p.id} className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-[#006B3F] text-[10px] font-bold">
                  {p.schoolName}
                </span>
                <h4 className="font-bold text-slate-900 text-sm">{p.title}</h4>
                <p className="text-xs text-slate-600">Mục tiêu: {formatVND(p.goal)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
