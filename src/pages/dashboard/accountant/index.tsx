import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  Search,
  DollarSign,
  ShieldCheck,
} from "lucide-react";

const formatVND = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
};

export default function AccountantOverviewPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") as any) || "overview";
  const setActiveTab = (tab: string) => setSearchParams({ tab });

  const [stats] = useState({
    totalFund: 2340000000,
    disbursed: 1650000000,
    pendingDisbursement: 690000000,
    completedProjects: 14,
    pendingDisbursementProjects: 3,
  });

  const [notification, setNotification] = useState<string | null>(null);

  // Mock pending disbursement urgent projects
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
    {
      id: 3,
      title: "Học bổng chắp cánh tài năng trẻ tỉnh Điện Biên",
      school: "Trường THPT Điện Biên 1",
      bank: "Agribank - 9918273645 (THPT Điện Biên 1)",
      amount: 120000000,
      closedDate: "21-07-2026",
      deadlineDays: 3,
      urgency: "ok",
      status: "pending",
    },
  ]);

  const mockTransactions = [
    { code: "VQR-99201", name: "Nguyễn Hữu Tài", amount: 10000000, bank: "MBBank", time: "10:15 - 24/07", project: "Học bổng Nguyễn Đình Chiểu" },
    { code: "VQR-99202", name: "Cty TNHH Công nghệ ABC", amount: 50000000, bank: "Vietcombank", time: "09:30 - 24/07", project: "Nước sạch Tây Nguyên" },
    { code: "VQR-99203", name: "Trần Thị Mai", amount: 2000000, bank: "Techcombank", time: "08:45 - 24/07", project: "Điểm trường Bản Mù" },
  ];

  const handleDisburse = (id: number, title: string) => {
    setUrgentDisbursements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "disbursed" } : item))
    );
    setNotification(`Đã tạo lệnh và giải ngân thành công kinh phí cho dự án "${title}"`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12 w-full">
      {/* 💰 ACCOUNTANT HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-[#006B3F] to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 backdrop-blur-md text-xs font-bold text-emerald-200 border border-emerald-400/30">
              <Wallet className="w-3.5 h-3.5 text-amber-300" />
              CỔNG QUẢN LÝ KẾ TOÁN VÀ GIẢI NGÂN QUỸ
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-extrabold tracking-tight">
              Tổng Quan Tài Chính & Lệnh Giải Ngân Kinh Phí
            </h2>
            <p className="text-xs md:text-sm text-slate-200 max-w-2xl leading-relaxed">
              Thực hiện đối soát giao dịch VietQR, quyết định giải ngân trong thời hạn tối đa 5 ngày và xuất chứng từ minh bạch.
            </p>
          </div>

          <button
            onClick={() => setActiveTab("disbursement")}
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-2xl text-xs shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            Tạo Lệnh Giải ngân mới
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-[#006B3F] border border-emerald-200 text-xs font-bold flex items-center gap-2 shadow-sm animate-pop-in">
          <CheckCircle2 className="w-4 h-4" />
          {notification}
        </div>
      )}

      {/* 🎛️ NAVIGATION TABS FOR ACCOUNTANT */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "overview" ? "bg-[#006B3F] text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span>Mục Tổng quan</span>
        </button>

        <button
          onClick={() => setActiveTab("stats")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "stats" ? "bg-[#006B3F] text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Mục Thống kê thu chi</span>
        </button>

        <button
          onClick={() => setActiveTab("transactions")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "transactions" ? "bg-[#006B3F] text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Mục Sao kê VietQR Realtime</span>
        </button>

        <button
          onClick={() => setActiveTab("disbursement")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "disbursement" ? "bg-amber-500 text-slate-950 shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Mục Lệnh giải ngân ({urgentDisbursements.filter(i => i.status === 'pending').length})</span>
        </button>

        <button
          onClick={() => setActiveTab("certificates")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "certificates" ? "bg-purple-700 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Award className="w-4 h-4 text-amber-300" />
          <span>Mục Cấp chứng nhận PDF</span>
        </button>
      </div>

      {/* 📊 FINANCIAL METRICS CARDS */}
      {(activeTab === "overview" || activeTab === "stats") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Tổng Quỹ Tiếp Nhận</span>
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-[#006B3F]">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              {formatVND(stats.totalFund)}
            </p>
            <span className="inline-block text-[11px] font-semibold text-emerald-700">
              Dữ liệu đối soát VietQR tự động
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Đã Giải Ngân Cho Trường</span>
              <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-700">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-extrabold text-blue-900 tracking-tight">
              {formatVND(stats.disbursed)}
            </p>
            <span className="inline-block text-[11px] font-semibold text-blue-700">
              {stats.completedProjects} dự án đã nhận kinh phí
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Số Tiền Chờ Giải Ngân</span>
              <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-extrabold text-amber-900 tracking-tight">
              {formatVND(stats.pendingDisbursement)}
            </p>
            <span className="inline-block text-[11px] font-semibold text-amber-700">
              Hạn quy định SLA ≤ 5 ngày
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">SLA Hạn Giải Ngân</span>
              <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-700">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-extrabold text-purple-900 tracking-tight">
              Tối đa 5 Ngày
            </p>
            <span className="inline-block text-[11px] font-semibold text-purple-700">
              Kể từ khi dự án dừng quyên góp
            </span>
          </div>
        </div>
      )}

      {/* ─── TAB DISBURSEMENT (SLA ≤ 5 DAYS) ─── */}
      {(activeTab === "overview" || activeTab === "disbursement") && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                Mục Lệnh Giải Ngân Kinh Phí Cho Nhà Trường (Quy định ≤ 5 ngày)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Danh sách các dự án đã đủ kinh phí đang đếm ngược thời gian giải ngân cho nhà trường.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {urgentDisbursements.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Đã hoàn thành vận động
                    </span>
                    <span className="text-xs font-bold text-slate-500">Dừng quỹ ngày {item.closedDate}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-600 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    {item.school} | STK: <span className="font-mono text-slate-700">{item.bank}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Số tiền giải ngân</span>
                    <span className="text-base font-extrabold text-[#006B3F]">{formatVND(item.amount)}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Hạn SLA còn lại</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold ${
                        item.urgency === "critical"
                          ? "bg-rose-100 text-rose-800 border border-rose-200 animate-pulse"
                          : item.urgency === "warning"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-blue-100 text-blue-800 border border-blue-200"
                      }`}
                    >
                      {item.urgency === "critical" && <AlertTriangle className="w-3.5 h-3.5" />}
                      Còn {item.deadlineDays} ngày (Hạn 5 ngày)
                    </span>
                  </div>

                  {item.status === "disbursed" ? (
                    <span className="px-4 py-2 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Đã giải ngân
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDisburse(item.id, item.title)}
                      className="px-4 py-2 bg-[#006B3F] hover:bg-[#005030] text-white font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer"
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

      {/* ─── TAB REALTIME VIETQR TRANSACTIONS ─── */}
      {activeTab === "transactions" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Mục Sao Kê VietQR Đối Soát Realtime
            </h3>
            <p className="text-xs text-slate-500 mt-1">Các giao dịch quyên góp nhận vào tài khoản Quỹ từ ngân hàng</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase bg-slate-50">
                  <th className="p-3">Mã GD</th>
                  <th className="p-3">Người quyên góp</th>
                  <th className="p-3">Số tiền</th>
                  <th className="p-3">Ngân hàng</th>
                  <th className="p-3">Thời gian</th>
                  <th className="p-3">Dự án thụ hưởng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockTransactions.map((t) => (
                  <tr key={t.code} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{t.code}</td>
                    <td className="p-3 font-semibold text-slate-800">{t.name}</td>
                    <td className="p-3 font-bold text-[#006B3F]">{formatVND(t.amount)}</td>
                    <td className="p-3 text-slate-600">{t.bank}</td>
                    <td className="p-3 text-slate-500">{t.time}</td>
                    <td className="p-3 text-slate-700 font-medium">{t.project}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB CERTIFICATES ─── */}
      {activeTab === "certificates" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Mục Cấp Chứng Nhận Tấm Lòng Vàng (PDF)
            </h3>
            <p className="text-xs text-slate-500 mt-1">Xuất file chứng nhận điện tử kèm mã QR tra cứu tính hợp lệ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border border-slate-200 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 space-y-3">
              <h4 className="font-bold text-slate-900 text-base">Chứng nhận #CN-2026-001</h4>
              <p className="text-xs text-slate-600">Cấp cho: <strong>Nguyễn Hữu Tài</strong> (Tài trợ 10,000,000 ₫)</p>
              <button className="px-4 py-2 bg-[#006B3F] text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer">
                <Download className="w-4 h-4" /> Tải chứng nhận PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
