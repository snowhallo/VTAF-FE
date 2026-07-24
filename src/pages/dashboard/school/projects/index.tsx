import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Clock,
  CheckCircle,
  FileText,
  AlertCircle,
  Eye,
  Edit2,
  Trash2,
  Filter,
  Calendar,
} from "lucide-react";

// Mock data representing school's project submissions
const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "Tài trợ phát triển tài năng học thuật cho học sinh xuất sắc vượt trội tại trường THPT Nguyễn Đình Chiểu",
    category: "Học phí",
    status: "needs_revision",
    raised: 0,
    goal: 45000000,
    date: "20-07-2026",
    beneficiaryCount: 15,
  },
  {
    id: 2,
    title: "Tặng học bổng 5 học sinh giỏi đạt kết quả xuất sắc kỳ thi chọn đội tuyển Olympic quốc gia",
    category: "Học bổng",
    status: "published",
    raised: 35000000,
    goal: 50000000,
    date: "15-07-2026",
    beneficiaryCount: 5,
  },
  {
    id: 3,
    title: "Tài trợ nghiên cứu khoa học & phát triển dự án sáng tạo kỹ thuật trẻ",
    category: "Hỗ trợ nghiên cứu",
    status: "draft",
    raised: 0,
    goal: 20000000,
    date: "19-07-2026",
    beneficiaryCount: 10,
  },
  {
    id: 4,
    title: "Tài trợ tài liệu học tập chuyên sâu và thiết bị thí nghiệm cho học sinh chuyên Tin",
    category: "Thiết bị học tập",
    status: "closed",
    raised: 15000000,
    goal: 15000000,
    date: "10-06-2026",
    beneficiaryCount: 25,
  },
  {
    id: 5,
    title: "Tài trợ chi phí tham dự kỳ thi chọn học sinh giỏi cấp Quốc gia cho học sinh năng khiếu",
    category: "Sinh hoạt phí",
    status: "submitted",
    raised: 0,
    goal: 30000000,
    date: "18-07-2026",
    beneficiaryCount: 12,
  },
];

const formatVND = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

export default function SchoolProjectsPage() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === "all" || project.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [projects, searchQuery, selectedStatus]);

  const statusMap: Record<string, { bg: string; text: string; label: string; icon: any }> = {
    draft: { bg: "bg-slate-100", text: "text-slate-600 border-slate-200", label: "Bản nháp", icon: Clock },
    submitted: { bg: "bg-blue-50 border-blue-100", text: "text-blue-700 border-blue-200", label: "Đã nộp", icon: FileText },
    under_review: { bg: "bg-amber-50 border-amber-100", text: "text-amber-700 border-amber-200", label: "Đang xét duyệt", icon: Clock },
    needs_revision: { bg: "bg-rose-50 border-rose-100", text: "text-rose-700 border-rose-200", label: "Cần bổ sung", icon: AlertCircle },
    published: { bg: "bg-emerald-50 border-emerald-100", text: "text-emerald-700 border-[#006B3F]", label: "Đang kêu gọi", icon: CheckCircle },
    stopped: { bg: "bg-red-50 border-red-100", text: "text-red-700 border-red-200", label: "Tạm dừng", icon: AlertCircle },
    closed: { bg: "bg-purple-50 border-purple-100", text: "text-purple-700 border-purple-200", label: "Đã giải ngân", icon: CheckCircle },
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa đề xuất dự án này?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 font-serif">Danh sách Đề xuất & Dự án</h2>
          <p className="text-xs text-slate-500">Quản lý hồ sơ kêu gọi, theo dõi tiến độ tài trợ và cập nhật báo cáo nghiệm thu của nhà trường</p>
        </div>
        <Link
          to="/dashboard/school/projects/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#006B3F] hover:bg-[#005030] text-white font-semibold rounded-lg text-xs shadow transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Tạo đề xuất mới
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tiêu đề, loại hỗ trợ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F] transition-all bg-slate-50/50"
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full md:w-48 bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="draft">Bản nháp</option>
            <option value="submitted">Đã nộp</option>
            <option value="needs_revision">Cần bổ sung hồ sơ</option>
            <option value="published">Đang kêu gọi</option>
            <option value="closed">Đã hoàn thành</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-5">Tên đề xuất</th>
                <th className="py-3.5 px-5">Học sinh thụ hưởng</th>
                <th className="py-3.5 px-5">Mục tiêu tài chính</th>
                <th className="py-3.5 px-5">Trạng thái</th>
                <th className="py-3.5 px-5">Ngày tạo</th>
                <th className="py-3.5 px-5 text-right">Thao tác</th>
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
                          <Link
                            to={`/dashboard/school/projects/${project.id}`}
                            className="font-bold text-slate-800 hover:text-[#006B3F] transition-colors leading-snug line-clamp-2 block"
                          >
                            {project.title}
                          </Link>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="font-semibold text-slate-700">{project.beneficiaryCount} học sinh</span>
                      </td>
                      <td className="py-4 px-5">
                        <div className="space-y-1">
                          <span className="font-semibold text-slate-800">{formatVND(project.goal)}</span>
                          {project.raised > 0 && (
                            <div className="text-[10px] text-slate-400">
                              Đã nhận {progressPct}% ({formatVND(project.raised)})
                            </div>
                          )}
                        </div>
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
                          {project.date}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <Link
                            to={`/dashboard/school/projects/${project.id}`}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          {project.status === "draft" && (
                            <>
                              <button
                                className="p-1.5 text-slate-500 hover:text-[#006B3F] hover:bg-slate-100 rounded-lg transition-colors"
                                title="Chỉnh sửa"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(project.id)}
                                className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Xóa"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium bg-slate-50/20">
                    Không tìm thấy đề xuất phù hợp
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
