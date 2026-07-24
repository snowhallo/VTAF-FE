import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  AlertTriangle,
  Eye,
  Check,
  X,
  Shield,
  FileText,
  Clock,
  TrendingUp,
  AlertCircle,
  Sparkles,
  Search,
  Heart,
  Building,
  CheckCircle2,
  Lock,
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
  {
    id: 103,
    projectTitle: "Hệ thống lọc nước tinh khiết Bản Mù",
    reason: "Báo cáo tiến độ nghiệm thu trễ 15 ngày so với cam kết ban đầu",
    severity: "low",
    time: "3 giờ trước",
  },
];

const formatVND = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

export default function ReviewerOverview() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") as any) || "overview";
  const setActiveTab = (tab: string) => setSearchParams({ tab });
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  
  // LocalStorage state for dismissed alerts
  const [dismissedAlertIds, setDismissedAlertIds] = useState<number[]>(() => {
    const saved = localStorage.getItem("reviewer_dismissed_alerts");
    return saved ? JSON.parse(saved) : [];
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleDismissAlert = (id: number) => {
    const updated = [...dismissedAlertIds, id];
    setDismissedAlertIds(updated);
    localStorage.setItem("reviewer_dismissed_alerts", JSON.stringify(updated));
    setNotification("Đã đánh dấu cảnh báo là không có gì bất thường. Cảnh báo sẽ không hiển thị lại nữa.");
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAccept = (id: number) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: "under_review" } : sub))
    );
    setNotification("Đã tiếp nhận hồ sơ xét duyệt thành công!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleReject = (id: number) => {
    if (confirm("Từ chối hồ sơ đề xuất này?")) {
      setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
    }
  };

  const visibleAnomalies = MOCK_ANOMALIES.filter((a) => !dismissedAlertIds.includes(a.id));

  return (
    <div className="space-y-8 animate-fadeIn pb-12 w-full">
      {/* 🛡️ TOP REVIEWER BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
          <Shield className="w-56 h-56 text-amber-400" />
        </div>
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md text-xs font-semibold text-amber-300 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            CỔNG HỘI ĐỒNG THẨM ĐỊNH & KIỂM DUYỆT
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-extrabold tracking-tight">
            Không Gian Thẩm Định & Giám Sát An Toàn Quỹ
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Rà soát tính minh bạch của các dự án, thẩm định hồ sơ nộp từ nhà trường và xử lý các cảnh báo bất thường.
          </p>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-[#006B3F] border border-emerald-200 text-xs font-bold flex items-center gap-2 shadow-sm animate-pop-in">
          <CheckCircle2 className="w-4 h-4" />
          {notification}
        </div>
      )}

      {/* 🎛️ NAVIGATION TABS FOR REVIEWER */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "overview" ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Shield className="w-4 h-4 text-amber-400" />
          <span>Tổng quan</span>
        </button>

        <button
          onClick={() => setActiveTab("stats")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "stats" ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Thống kê</span>
        </button>

        <button
          onClick={() => setActiveTab("submissions")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "submissions" ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Dự án cần kiểm duyệt ({submissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("campaigns")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "campaigns" ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Heart className="w-4 h-4 text-rose-500" />
          <span>Các chiến dịch hiện tại (Chỉ xem)</span>
        </button>

        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "projects" ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Building className="w-4 h-4 text-blue-500" />
          <span>Các dự án hiện tại (Chỉ xem)</span>
        </button>

        <button
          onClick={() => setActiveTab("alerts")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "alerts" ? "bg-amber-600 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-300" />
          <span>Cảnh báo bất thường ({visibleAnomalies.length})</span>
        </button>
      </div>

      {/* ─── TAB 1 & OVERVIEW SECTION ─── */}
      {(activeTab === "overview" || activeTab === "stats") && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Hồ sơ chờ duyệt</span>
              <p className="text-2xl font-extrabold text-amber-600">{submissions.length} Hồ sơ</p>
              <p className="text-[10px] text-slate-400 font-medium">Cập nhật realtime</p>
            </div>

            <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Đã duyệt trong tháng</span>
              <p className="text-2xl font-extrabold text-[#006B3F]">28 Hồ sơ</p>
              <p className="text-[10px] text-emerald-600 font-bold">Tỉ lệ duyệt thành công: 93%</p>
            </div>

            <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Cảnh báo bất thường</span>
              <p className="text-2xl font-extrabold text-rose-600">{visibleAnomalies.length} Cảnh báo</p>
              <p className="text-[10px] text-slate-400 font-medium">Cần xử lý kiểm tra</p>
            </div>

            <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Thời gian phản hồi TB</span>
              <p className="text-2xl font-extrabold text-slate-900">4.2 Giờ</p>
              <p className="text-[10px] text-blue-600 font-bold">Vượt 20% chỉ tiêu KPI</p>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: SUBMISSIONS WAIT QUEUE ─── */}
      {(activeTab === "overview" || activeTab === "submissions") && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" />
                Hàng Chờ Hồ Sơ Cần Kiểm Duyệt
              </h3>
              <p className="text-xs text-slate-500 mt-1">Danh sách hồ sơ nộp từ các nhà trường đối tác đang chờ thẩm định</p>
            </div>
          </div>

          <div className="space-y-4">
            {submissions.map((sub) => (
              <div key={sub.id} className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-white transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[10px]">
                      {sub.category}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{sub.school}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm md:text-base leading-snug">{sub.title}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-3">
                    <span>Kinh phí đề xuất: <strong className="text-[#006B3F] font-bold">{formatVND(sub.amount)}</strong></span>
                    <span>• {sub.time}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleAccept(sub.id)}
                    className="px-4 py-2 bg-[#006B3F] hover:bg-[#00502e] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    Tiếp nhận duyệt
                  </button>
                  <button
                    onClick={() => handleReject(sub.id)}
                    className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    Từ chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 4: CAMPAIGNS VIEW ONLY ─── */}
      {activeTab === "campaigns" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" />
                Các Chiến Dịch Hiện Tại (Chế độ Chỉ Xem)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Người kiểm duyệt chỉ có quyền theo dõi tiến độ, không có quyền chỉnh sửa/thay đổi nội dung chiến dịch.
              </p>
            </div>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              Quyền Chỉ Xem (Read-only)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full">Đang diễn ra</span>
              <h4 className="font-bold text-slate-900 text-base">Cùng Em Tới Trường 2026 - Vùng Cao Yên Bái</h4>
              <p className="text-xs text-slate-600">Đã nhận quyên góp: 380,000,000 VNĐ / 500,000,000 VNĐ</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-[#006B3F] h-full w-[76%]" />
              </div>
              <p className="text-[11px] text-slate-400 italic">🔒 Chức năng chỉnh sửa đã bị khóa theo vai trò Kiểm duyệt viên.</p>
            </div>

            <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 font-bold text-[10px] rounded-full">Đang diễn ra</span>
              <h4 className="font-bold text-slate-900 text-base">Nước Sạch Cho Buôn Làng Tây Nguyên</h4>
              <p className="text-xs text-slate-600">Đã nhận quyên góp: 195,000,000 VNĐ / 300,000,000 VNĐ</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[65%]" />
              </div>
              <p className="text-[11px] text-slate-400 italic">🔒 Chức năng chỉnh sửa đã bị khóa theo vai trò Kiểm duyệt viên.</p>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 5: PROJECTS VIEW ONLY ─── */}
      {activeTab === "projects" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-500" />
                Các Dự Án Hiện Tại (Chế độ Chỉ Xem)
              </h3>
              <p className="text-xs text-slate-500 mt-1">Danh sách tất cả dự án đang chạy trên toàn hệ thống (không hỗ trợ thao tác chỉnh sửa)</p>
            </div>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              Quyền Chỉ Xem (Read-only)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase bg-slate-50">
                  <th className="p-3">Mã DA</th>
                  <th className="p-3">Tên Dự án</th>
                  <th className="p-3">Đơn vị đề xuất</th>
                  <th className="p-3">Kinh phí</th>
                  <th className="p-3">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">#DA-101</td>
                  <td className="p-3 font-semibold text-slate-800">Xây nhà bán trú Mù Cang Chải</td>
                  <td className="p-3 text-slate-600">THPT Nguyễn Đình Chiểu</td>
                  <td className="p-3 font-bold text-[#006B3F]">250,000,000 VNĐ</td>
                  <td className="p-3">
                    <span className="text-slate-400 font-medium italic">🔒 Khóa chỉnh sửa</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">#DA-102</td>
                  <td className="p-3 font-semibold text-slate-800">Hệ thống lọc nước tinh khiết Bản Mù</td>
                  <td className="p-3 text-slate-600">THPT Mù Cang Chải</td>
                  <td className="p-3 font-bold text-[#006B3F]">120,000,000 VNĐ</td>
                  <td className="p-3">
                    <span className="text-slate-400 font-medium italic">🔒 Khóa chỉnh sửa</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 6: ANOMALIES & DISMISS ALERTS ─── */}
      {activeTab === "alerts" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Cảnh Báo Bất Thường Hệ Thống
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Hệ thống tự động phát hiện các giao dịch hoặc tiến độ bất thường. Nếu đã kiểm tra xác nhận không có vấn đề, hãy bấm nút đánh dấu để ẩn cảnh báo.
            </p>
          </div>

          {visibleAnomalies.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-slate-900 text-base">Tất cả cảnh báo đã được xác nhận an toàn!</h4>
              <p className="text-xs text-slate-500">Hiện tại không còn bất kỳ cảnh báo bất thường nào cần xử lý.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {visibleAnomalies.map((ano) => (
                <div key={ano.id} className="p-5 border border-amber-200 rounded-2xl bg-amber-50/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">
                        {ano.severity} Severity
                      </span>
                      <span className="text-xs text-slate-400">{ano.time}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base">{ano.projectTitle}</h4>
                    <p className="text-xs text-rose-700 font-medium">⚠️ Nguyên nhân: {ano.reason}</p>
                  </div>

                  <button
                    onClick={() => handleDismissAlert(ano.id)}
                    className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Đánh dấu không có gì bất thường
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
