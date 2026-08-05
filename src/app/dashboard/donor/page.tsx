"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";;
import {
  Heart,
  DollarSign,
  TrendingUp,
  Award,
  Download,
  CheckCircle,
  Clock,
  Sparkles,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Building,
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
    evidenceFile: null,
  },
  {
    id: 4,
    title: "Tài trợ tài liệu học tập chuyên sâu và thiết bị thí nghiệm cho học sinh chuyên Tin",
    school: "Trường THPT Nguyễn Đình Chiểu",
    amountDonated: 15000000,
    dateDonated: "10-06-2026",
    projectStatus: "closed",
    evidenceFile: "Bao_cao_nghiem_thu_sach.pdf",
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

// All available projects for Watchlist discovery
const ALL_PROJECTS = [
  {
    id: "p-101",
    title: "Xây dựng điểm trường Bản Mù - Cùng em tới trường",
    school: "THPT Mù Cang Chải",
    goal: 200000000,
    raised: 150000000,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    category: "Cơ sở vật chất",
  },
  {
    id: "p-102",
    title: "Nước sạch tinh khiết cho buôn làng Tây Nguyên",
    school: "THCS Buôn Ma Thuột",
    goal: 100000000,
    raised: 85000000,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    category: "Y tế & Nước sạch",
  },
  {
    id: "p-103",
    title: "Quỹ học bổng mồ côi chắp cánh ước mơ học vấn",
    school: "THPT Nguyễn Đình Chiểu",
    goal: 500000000,
    raised: 250000000,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    category: "Học bổng",
  },
];

const formatVND = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

function DonorDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setActiveTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(location.pathname + "?" + params.toString());
  };
  const activeTab = (searchParams.get("tab") as "overview" | "stats" | "donated" | "history" | "watchlist") || "overview";
  

  // Watchlist stored in LocalStorage
  const [watchlistIds, setWatchlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("donor_watchlist");
    return saved ? JSON.parse(saved) : ["p-101", "p-103"];
  });

  const [notification, setNotification] = useState<string | null>(null);

  const toggleWatchlist = (id: string, title: string) => {
    let updated: string[];
    if (watchlistIds.includes(id)) {
      updated = watchlistIds.filter((item) => item !== id);
      setNotification(`Đã bỏ quan tâm dự án "${title}"`);
    } else {
      updated = [...watchlistIds, id];
      setNotification(`Đã đánh dấu quan tâm dự án "${title}". Bạn có thể quyên góp trong tương lai.`);
    }
    setWatchlistIds(updated);
    localStorage.setItem("donor_watchlist", JSON.stringify(updated));
    setTimeout(() => setNotification(null), 4000);
  };

  const totalDonated = MOCK_TRANSACTIONS.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-8 animate-fadeIn pb-12 w-full">
      {/* ❤️ TOP DONOR BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#00502e] via-[#006B3F] to-emerald-950 text-white p-6 md:p-8 rounded-3xl shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
          <Heart className="w-56 h-56 text-rose-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/20">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              NHÀ TÀI TRỢ VÀNG DỰ ÁN
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-extrabold tracking-tight">
              Xin chào, Nguyễn Hữu Tài 👋
            </h2>
            <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
              Cảm ơn bạn đã đồng hành cùng RaiseFund. Tất cả khoản tài trợ của bạn được minh bạch 100% qua sao kê điện tử.
            </p>
          </div>

          <Link href="/campaigns/cp-1"
            className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#C21A30] hover:bg-[#a01527] active:scale-95 text-white rounded-2xl text-xs font-bold shadow-lg transition-all cursor-pointer shrink-0"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Quyên góp ngay</span>
          </Link>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-[#006B3F] border border-emerald-200 text-xs font-bold flex items-center gap-2 shadow-sm animate-pop-in">
          <CheckCircle2 className="w-4 h-4" />
          {notification}
        </div>
      )}

      {/* 🎛️ NAVIGATION TABS FOR DONOR */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "overview" ? "bg-[#006B3F] text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Heart className="w-4 h-4 text-rose-400" />
          <span>Tổng quan</span>
        </button>

        <button
          onClick={() => setActiveTab("stats")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "stats" ? "bg-[#006B3F] text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Thống kê đóng góp</span>
        </button>

        <button
          onClick={() => setActiveTab("donated")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "donated" ? "bg-[#006B3F] text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Dự án đã quyên góp ({MOCK_SUPPORTED_PROJECTS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "history" ? "bg-[#006B3F] text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Lịch sử quyên góp ({MOCK_TRANSACTIONS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("watchlist")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "watchlist" ? "bg-purple-700 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Bookmark className="w-4 h-4 text-amber-300" />
          <span>Dự án quan tâm ({watchlistIds.length})</span>
        </button>
      </div>

      {/* ─── TAB OVERVIEW & STATS ─── */}
      {(activeTab === "overview" || activeTab === "stats") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Tổng tiền tài trợ</span>
            <p className="text-2xl font-extrabold text-[#006B3F]">{formatVND(totalDonated)}</p>
            <p className="text-[10px] text-emerald-600 font-bold">100% Đã giải ngân</p>
          </div>

          <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Dự án đã tài trợ</span>
            <p className="text-2xl font-extrabold text-slate-900">{MOCK_SUPPORTED_PROJECTS.length} Dự án</p>
            <p className="text-[10px] text-purple-600 font-bold">2 Trường học nhận hỗ trợ</p>
          </div>

          <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Dự án đang theo dõi</span>
            <p className="text-2xl font-extrabold text-purple-700">{watchlistIds.length} Dự án</p>
            <p className="text-[10px] text-amber-600 font-bold">Dự định tài trợ tương lai</p>
          </div>

          <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Chứng nhận Tấm lòng vàng</span>
            <p className="text-2xl font-extrabold text-amber-600">3 Bằng PDF</p>
            <p className="text-[10px] text-slate-400 font-medium">Kèm mã tra cứu VietQR</p>
          </div>
        </div>
      )}

      {/* ─── TAB DONATED PROJECTS ─── */}
      {(activeTab === "overview" || activeTab === "donated") && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#006B3F]" />
              Danh Sách Các Dự Án Đã Quyên Góp
            </h3>
            <p className="text-xs text-slate-500 mt-1">Chi tiết các dự án bạn đã chuyển tiền tài trợ thành công</p>
          </div>

          <div className="space-y-4">
            {MOCK_SUPPORTED_PROJECTS.map((proj) => (
              <div key={proj.id} className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-white transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">{proj.school}</span>
                  <span className="text-xs text-slate-400 font-medium">Ngày ủng hộ: {proj.dateDonated}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-base">{proj.title}</h4>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                  <span className="text-xs text-slate-600">
                    Số tiền đóng góp: <strong className="text-[#006B3F] font-bold text-sm">{formatVND(proj.amountDonated)}</strong>
                  </span>
                  <button className="px-3.5 py-2 bg-emerald-50 text-[#006B3F] hover:bg-emerald-100 font-bold text-xs rounded-xl transition-all border border-emerald-200 flex items-center gap-1.5 cursor-pointer">
                    <Download className="w-4 h-4" />
                    Tải chứng nhận PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB DONATION HISTORY ─── */}
      {(activeTab === "overview" || activeTab === "history") && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              Lịch Sử Giao Dịch Quyên Góp
            </h3>
            <p className="text-xs text-slate-500 mt-1">Nhật ký sao kê tự động ghi nhận trực tiếp qua cổng VietQR</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase bg-slate-50">
                  <th className="p-3">Mã GD</th>
                  <th className="p-3">Dự án tài trợ</th>
                  <th className="p-3">Phương thức</th>
                  <th className="p-3">Thời gian</th>
                  <th className="p-3">Số tiền</th>
                  <th className="p-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_TRANSACTIONS.map((tx) => (
                  <tr key={tx.txCode} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{tx.txCode}</td>
                    <td className="p-3 font-semibold text-slate-800 max-w-xs truncate">{tx.projectTitle}</td>
                    <td className="p-3 text-slate-600">{tx.method}</td>
                    <td className="p-3 text-slate-500">{tx.date}</td>
                    <td className="p-3 font-bold text-[#006B3F]">{formatVND(tx.amount)}</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">Thành công</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB WATCHLIST / FAVORITES ─── */}
      {activeTab === "watchlist" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500 fill-amber-400" />
              Danh Sách Dự Án Đang Quan Tâm (Watchlist)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Đánh dấu các dự án bạn muốn theo dõi để quyên góp trong tương lai. Bạn có thể bấm Đánh dấu quan tâm hoặc Bỏ quan tâm bất cứ lúc nào.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ALL_PROJECTS.map((proj) => {
              const isWatched = watchlistIds.includes(proj.id);
              const progressPct = Math.round((proj.raised / proj.goal) * 100);
              return (
                <div key={proj.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="relative h-40 overflow-hidden bg-slate-100">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleWatchlist(proj.id, proj.title)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-sm ${
                          isWatched ? "bg-amber-400 text-slate-950 font-bold" : "bg-black/40 text-white hover:bg-black/60"
                        }`}
                        title={isWatched ? "Bỏ quan tâm dự án" : "Đánh dấu quan tâm dự án"}
                      >
                        {isWatched ? <BookmarkCheck className="w-4 h-4 fill-slate-950" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="p-4 space-y-3">
                      <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {proj.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">{proj.title}</h4>
                      <p className="text-xs text-slate-500">{proj.school}</p>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Đã đạt: <strong>{formatVND(proj.raised)}</strong></span>
                          <span className="font-bold text-[#006B3F]">{progressPct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-[#006B3F] h-full" style={{ width: `${progressPct}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleWatchlist(proj.id, proj.title)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isWatched ? "bg-amber-100 text-amber-900 hover:bg-amber-200" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                      }`}
                    >
                      {isWatched ? "★ Đã quan tâm" : "☆ Đánh dấu quan tâm"}
                    </button>

                    <Link href={`/projects/${proj.id}`}
                      className="px-3.5 py-2 bg-[#006B3F] text-white hover:bg-[#00502e] font-bold text-xs rounded-xl shadow-xs transition-all"
                    >
                      Quyên góp
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


export default function DonorDashboard() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400 font-bold">Đang tải...</div>}>
      <DonorDashboardContent />
    </Suspense>
  );
}
