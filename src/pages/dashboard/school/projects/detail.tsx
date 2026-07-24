import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  FileText,
  AlertCircle,
  Upload,
  FileSpreadsheet,
  Download,
} from "lucide-react";

// Mock data query matching projects
const MOCK_PROJECTS_DETAIL: Record<string, any> = {
  "1": {
    id: 1,
    title: "Tài trợ phát triển tài năng học thuật cho học sinh xuất sắc vượt trội tại trường THPT Nguyễn Đình Chiểu",
    category: "Học phí",
    status: "needs_revision",
    raised: 0,
    goal: 45000000,
    date: "20-07-2026",
    beneficiaryCount: 15,
    educationLevel: "THPT",
    circumstance: "Học sinh có thành tích học tập thuộc top 1% của khối, đạt kết quả xuất sắc trong các cuộc thi chuyên môn nhưng gia đình đang gặp khó khăn tài chính đột biến.",
    bankAccount: "1166889999",
    bankOwner: "TRUONG THPT NGUYEN DINH CHIEU",
    revisionReason: "Hồ sơ của học sinh Nguyễn Văn A còn thiếu giấy chứng nhận đạt giải học sinh giỏi cấp tỉnh. Yêu cầu nhà trường bổ sung thêm file scan.",
    files: {
      proposal: "De_xuat_hoc_phi_signed.pdf",
      list: "Danh_sach_15_hoc_sinh.xlsx",
    },
    donors: [],
  },
  "2": {
    id: 2,
    title: "Tặng học bổng 5 học sinh giỏi đạt kết quả xuất sắc kỳ thi chọn đội tuyển Olympic quốc gia",
    category: "Học bổng",
    status: "published",
    raised: 35000000,
    goal: 50000000,
    date: "15-07-2026",
    beneficiaryCount: 5,
    educationLevel: "THPT",
    circumstance: "Học bổng đặc biệt bồi dưỡng cho 5 thành viên đội tuyển thi học sinh giỏi quốc gia đạt điểm số xuất sắc nhất kỳ thi sát hạch.",
    bankAccount: "1166889999",
    bankOwner: "TRUONG THPT NGUYEN DINH CHIEU",
    files: {
      proposal: "De_xuat_hoc_bong_signed.pdf",
      list: "Danh_sach_5_thu_khoa.xlsx",
    },
    donors: [
      { name: "Nguyễn Thế Mạnh", amount: 15000000, time: "2 giờ trước", wish: "Mong các em luôn vững tin học tập tốt và cống hiến cho đất nước!" },
      { name: "Phạm Thị Huệ", amount: 10000000, time: "5 giờ trước", wish: "Chắp cánh tương lai cho các nhân tài đất nước." },
      { name: "Ẩn danh", amount: 10000000, time: "1 ngày trước", wish: "" },
    ],
  },
  "3": {
    id: 3,
    title: "Tài trợ nghiên cứu khoa học & phát triển dự án sáng tạo kỹ thuật trẻ",
    category: "Hỗ trợ nghiên cứu",
    status: "draft",
    raised: 0,
    goal: 20000000,
    date: "19-07-2026",
    beneficiaryCount: 10,
    educationLevel: "THPT",
    circumstance: "Hỗ trợ mua vật tư, linh kiện thí nghiệm và công cụ nghiên cứu chế tạo robot tham dự cuộc thi sáng tạo khoa học kỹ thuật trẻ.",
    bankAccount: "1166889999",
    bankOwner: "TRUONG THPT NGUYEN DINH CHIEU",
    files: {},
    donors: [],
  },
  "4": {
    id: 4,
    title: "Tài trợ tài liệu học tập chuyên sâu và thiết bị thí nghiệm cho học sinh chuyên Tin",
    category: "Thiết bị học tập",
    status: "closed",
    raised: 15000000,
    goal: 15000000,
    date: "10-06-2026",
    beneficiaryCount: 25,
    educationLevel: "THPT",
    circumstance: "Mua sách lập trình chuyên sâu, tài khoản học trực tuyến quốc tế và bo mạch nhúng phục vụ nghiên cứu cho đội tuyển tin học.",
    bankAccount: "1166889999",
    bankOwner: "TRUONG THPT NGUYEN DINH CHIEU",
    files: {
      proposal: "De_xuat_sach_signed.pdf",
      list: "Danh_sach_25_hoc_sinh.xlsx",
    },
    donors: [
      { name: "Lê Minh Tuấn", amount: 15000000, time: "1 tháng trước", wish: "Ủng hộ thiết bị học tập cho các lập trình viên tương lai" },
    ],
  },
  "5": {
    id: 5,
    title: "Tài trợ chi phí tham dự kỳ thi chọn học sinh giỏi cấp Quốc gia cho học sinh năng khiếu",
    category: "Sinh hoạt phí",
    status: "submitted",
    raised: 0,
    goal: 30000000,
    date: "18-07-2026",
    beneficiaryCount: 12,
    educationLevel: "THPT",
    circumstance: "Tài trợ chi phí ăn ở, đi lại tập trung thi đội tuyển quốc gia tại thủ đô cho các học sinh xuất sắc.",
    bankAccount: "1166889999",
    bankOwner: "TRUONG THPT NGUYEN DINH CHIEU",
    files: {
      proposal: "De_xuat_sinh_hoat_signed.pdf",
    },
    donors: [],
  },
};

const formatVND = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

export default function SchoolProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const idStr = params.id || "1";
  const [project, setProject] = useState(MOCK_PROJECTS_DETAIL[idStr] || MOCK_PROJECTS_DETAIL["1"]);

  // Revision state
  const [replyText, setReplyText] = useState("");
  const [uploadedRevisionFile, setUploadedRevisionFile] = useState("");
  const [, setIsRevisionSubmitted] = useState(false);

  // Evidence state for closed project
  const [evidenceUploaded, setEvidenceUploaded] = useState(false);
  const [evidenceFile, setEvidenceFile] = useState("");

  const statusMap: Record<string, { bg: string; text: string; label: string; color: string }> = {
    draft: { bg: "bg-slate-100", text: "text-slate-600 border-slate-200", label: "Bản nháp", color: "slate" },
    submitted: { bg: "bg-blue-50 border-blue-100", text: "text-blue-700 border-blue-200", label: "Đã nộp, chờ kiểm duyệt", color: "blue" },
    under_review: { bg: "bg-amber-50 border-amber-100", text: "text-amber-700 border-amber-200", label: "Đang xét duyệt", color: "amber" },
    needs_revision: { bg: "bg-rose-50 border-rose-100", text: "text-rose-700 border-rose-200", label: "Yêu cầu bổ sung hồ sơ", color: "rose" },
    published: { bg: "bg-emerald-50 border-emerald-100", text: "text-emerald-700 border-emerald-200", label: "Đang kêu gọi tài trợ", color: "emerald" },
    stopped: { bg: "bg-red-50 border-red-100", text: "text-red-700 border-red-200", label: "Tạm dừng kêu gọi", color: "red" },
    closed: { bg: "bg-purple-50 border-purple-100", text: "text-purple-700 border-purple-200", label: "Đã giải ngân & hoàn thành", color: "purple" },
  };

  const statusCfg = statusMap[project.status];
  const progressPct = Math.round((project.raised / project.goal) * 100);

  // Submit revision handler
  const handleRevisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() && !uploadedRevisionFile) {
      alert("Vui lòng nhập nội dung giải trình hoặc đính kèm hồ sơ bổ sung.");
      return;
    }
    setIsRevisionSubmitted(true);
    setTimeout(() => {
      setProject((prev: any) => ({
        ...prev,
        status: "submitted",
      }));
      alert("Đã gửi hồ sơ bổ sung thành công! Trạng thái dự án chuyển về: Chờ duyệt.");
    }, 1000);
  };

  // Submit evidence handler
  const handleEvidenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceFile) {
      alert("Vui lòng tải lên ảnh minh chứng hoặc báo cáo.");
      return;
    }
    setEvidenceUploaded(true);
    alert("Cảm ơn trường! Quỹ đã ghi nhận báo cáo minh chứng giải ngân hỗ trợ học sinh của bạn.");
  };

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        to="/dashboard/school/projects"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại danh sách đề xuất
      </Link>

      {/* Detail Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-500">
              {project.category}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 border rounded-full text-[10px] font-bold ${statusCfg.bg} ${statusCfg.text}`}
            >
              {statusCfg.label}
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 font-serif leading-snug">{project.title}</h2>
          <p className="text-xs text-slate-400">Đăng lúc: {project.date}</p>
        </div>

        {project.status === "published" && (
          <div className="flex-shrink-0 bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">Tiến độ quyên góp</p>
            <p className="text-base font-extrabold text-emerald-700">{progressPct}%</p>
            <p className="text-[10px] text-slate-500">{formatVND(project.raised)} / {formatVND(project.goal)}</p>
          </div>
        )}
      </div>

      {/* NEEDS REVISION INTERACTIVE FORM */}
      {project.status === "needs_revision" && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-rose-100 text-rose-800 rounded-lg flex-shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-rose-900">Yêu cầu bổ sung hồ sơ từ Quỹ</h3>
              <p className="text-xs text-rose-700 leading-relaxed font-medium">
                {project.revisionReason}
              </p>
            </div>
          </div>

          <form onSubmit={handleRevisionSubmit} className="bg-white p-4 rounded-xl border border-rose-100 space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Nội dung phản hồi / Giải trình *</label>
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Nhập nội dung giải trình của nhà trường..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                Đính kèm tài liệu bổ sung (PDF)
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setUploadedRevisionFile(file.name);
                  }}
                  className="hidden"
                />
              </label>
              {uploadedRevisionFile && (
                <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                  File: {uploadedRevisionFile}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-[#006B3F] hover:bg-[#005030] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors"
            >
              Gửi hồ sơ bổ sung
            </button>
          </form>
        </div>
      )}

      {/* SYSTEM TIMELINE */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-800">Tiến trình xét duyệt đề xuất</h3>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative">
          {[
            { step: 1, label: "Tạo bản nháp", desc: "Trường soạn đề xuất", status: "completed" },
            { step: 2, label: "Gửi đề xuất", desc: "Nộp hồ sơ thành công", status: project.status === "draft" ? "upcoming" : "completed" },
            { step: 3, label: "Kiểm duyệt", desc: project.status === "needs_revision" ? "Yêu cầu sửa đổi" : "Quỹ rà soát hồ sơ", status: project.status === "draft" ? "upcoming" : project.status === "submitted" || project.status === "needs_revision" ? "current" : "completed" },
            { step: 4, label: "Công khai", desc: "Đang kêu gọi đóng góp", status: project.status === "published" ? "current" : project.status === "closed" ? "completed" : "upcoming" },
            { step: 5, label: "Hoàn thành", desc: "Đã nhận giải ngân & hỗ trợ", status: project.status === "closed" ? "current" : "upcoming" },
          ].map((item) => {
            return (
              <div key={item.step} className="flex md:flex-col items-center md:text-center gap-3 md:flex-1 relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
                    item.status === "completed"
                      ? "bg-[#006B3F] border-[#006B3F] text-white"
                      : item.status === "current"
                      ? "bg-amber-50 border-amber-600 text-amber-600 ring-4 ring-amber-500/10"
                      : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}
                >
                  {item.status === "completed" ? <CheckCircle className="w-4 h-4" /> : item.step}
                </div>
                <div className="text-left md:text-center">
                  <p className="text-xs font-bold text-slate-800 leading-tight">{item.label}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TWO COLUMNS: DETAILS & DONORS/ATTACHMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-3">Chi tiết đề xuất hỗ trợ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 block font-medium">Số lượng học sinh thụ hưởng:</span>
                <span className="font-bold text-slate-800">{project.beneficiaryCount} học sinh ({project.educationLevel})</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block font-medium">Mục tiêu tài chính đề xuất:</span>
                <span className="font-bold text-[#006B3F]">{formatVND(project.goal)}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block font-medium">Số tài khoản nhận giải ngân (MBBank):</span>
                <span className="font-bold text-slate-800">{project.bankAccount}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block font-medium">Tên chủ tài khoản ngân hàng:</span>
                <span className="font-bold text-slate-800 uppercase">{project.bankOwner}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500 block">Hoàn cảnh cụ thể học sinh:</span>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
                {project.circumstance}
              </p>
            </div>
          </div>

          {project.status === "closed" && (
            <div className="bg-purple-50/50 border border-purple-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-purple-700 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-purple-900">Báo cáo & Minh chứng kết quả thực hiện hỗ trợ</h3>
                  <p className="text-xs text-purple-700 leading-relaxed font-medium">
                    Nhà trường vui lòng tải lên bằng chứng chi trả học bổng/học phí (biên lai nộp tiền hoặc biên bản bàn giao) kèm hình ảnh thực tế bàn giao để Quỹ ghi nhận nghiệm thu.
                  </p>
                </div>
              </div>

              {!evidenceUploaded ? (
                <form onSubmit={handleEvidenceSubmit} className="bg-white p-4 rounded-xl border border-purple-100 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      Tải lên chứng từ chi (PDF/ZIP) *
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setEvidenceFile(file.name);
                        }}
                        className="hidden"
                      />
                    </label>
                    {evidenceFile && (
                      <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                        {evidenceFile}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#006B3F] hover:bg-[#005030] text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Nộp báo cáo nghiệm thu
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Báo cáo minh chứng đã được nộp thành công và đang chờ Quỹ xác nhận!</span>
                </div>
              )}
            </div>
          )}

          {project.donors && project.donors.length > 0 && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-3">
                Lịch sử ủng hộ của dự án ({project.donors.length})
              </h3>
              <div className="divide-y divide-slate-100">
                {project.donors.map((donor: any, idx: number) => (
                  <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-slate-600 font-semibold text-xs">
                      {donor.name === "Ẩn danh" ? "AD" : donor.name.slice(0, 1)}
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-bold text-slate-800 text-xs">{donor.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{donor.time}</span>
                      </div>
                      <p className="text-[10px] text-[#006B3F] font-bold">Đã ủng hộ: {formatVND(donor.amount)}</p>
                      {donor.wish && (
                        <p className="text-xs text-slate-500 italic bg-slate-50/50 p-2.5 rounded-lg border border-slate-100/60 leading-normal">
                          &ldquo;{donor.wish}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-3">Hồ sơ đính kèm</h3>
            {Object.keys(project.files).length > 0 ? (
              <div className="space-y-2">
                {project.files.proposal && (
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4.5 h-4.5 text-red-600 flex-shrink-0" />
                      <span className="font-semibold text-slate-700 truncate">{project.files.proposal}</span>
                    </div>
                    <button
                      onClick={() => alert(`Đang tải file ${project.files.proposal}`)}
                      className="p-1 text-[#006B3F] hover:bg-white border border-transparent hover:border-slate-200 rounded-md"
                      title="Tải về"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                {project.files.list && (
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileSpreadsheet className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
                      <span className="font-semibold text-slate-700 truncate">{project.files.list}</span>
                    </div>
                    <button
                      onClick={() => alert(`Đang tải file ${project.files.list}`)}
                      className="p-1 text-[#006B3F] hover:bg-white border border-transparent hover:border-slate-200 rounded-md"
                      title="Tải về"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center font-medium py-3">Chưa có tài liệu đính kèm</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
