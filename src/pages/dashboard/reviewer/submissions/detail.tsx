import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  FileSpreadsheet,
  Building,
  Check,
  X,
  MessageSquare,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

// Mock submissions details matching IDs
const MOCK_SUBMISSIONS_DETAILS: Record<string, any> = {
  "1": {
    id: 1,
    school: "Trường THPT Nguyễn Đình Chiểu",
    title: "Tài trợ phát triển tài năng học thuật cho học sinh xuất sắc vượt trội",
    category: "Học phí",
    amount: 45000000,
    date: "20-07-2026",
    status: "submitted",
    beneficiaryCount: 15,
    circumstance: "Các em là học sinh có kết quả học tập xuất sắc thuộc top 1% của khối, đạt giải cao trong kỳ thi học sinh giỏi cấp tỉnh nhưng gia đình có hoàn cảnh khó khăn đột xuất cần bảo trợ học phí.",
    bankAccount: "1166889999",
    bankOwner: "TRUONG THPT NGUYEN DINH CHIEU",
    files: {
      proposal: "De_xuat_signed_off.pdf",
      list: "Danh_sach_15_hoc_sinh_tai_nang.xlsx",
    },
    history: [
      { sender: "school", text: "Trường THPT Nguyễn Đình Chiểu nộp đề xuất dự án chính thức.", time: "20-07-2026 09:00" },
    ],
  },
  "5": {
    id: 5,
    school: "Trường THCS Sơn La",
    title: "Tài trợ chi phí tham dự kỳ thi chọn học sinh giỏi cấp Quốc gia cho học sinh năng khiếu",
    category: "Sinh hoạt phí",
    amount: 30000000,
    date: "18-07-2026",
    status: "submitted",
    beneficiaryCount: 12,
    circumstance: "Hỗ trợ học sinh trong đội tuyển năng khiếu tham dự kỳ thi chọn học sinh giỏi cấp quốc gia để bồi dưỡng và cất cánh thế hệ nhân tài trẻ.",
    bankAccount: "9988776655",
    bankOwner: "TRUONG THCS BAN COI SON LA",
    files: {
      proposal: "Cong_van_tiet_kiem_dong.pdf",
    },
    history: [
      { sender: "school", text: "Trường THCS Sơn La nộp đề xuất dự án.", time: "18-07-2026 14:30" },
    ],
  },
  "6": {
    id: 6,
    school: "Trường Mầm non Hoa Mai",
    title: "Tài trợ học cụ lập trình robot thông minh cho câu lạc bộ Tin học trẻ",
    category: "Thiết bị học tập",
    amount: 15000000,
    date: "16-07-2026",
    status: "under_review",
    beneficiaryCount: 8,
    circumstance: "Hỗ trợ học cụ, thiết bị thực hành lập trình robot thông minh STEM phục vụ học sinh mầm non có năng khiếu khoa học công nghệ vượt trội phát triển tư duy logic.",
    bankAccount: "1122334455",
    bankOwner: "MAM NON HOA MAI DUC TRONG",
    files: {
      proposal: "To_trinh_thiet_bi.pdf",
      list: "Danh_sach_dung_cu_can_tai_tro.xlsx",
    },
    history: [
      { sender: "school", text: "Nhà trường nộp đề xuất dự án.", time: "16-07-2026 10:00" },
      { sender: "reviewer", text: "Nhân viên Quỹ Nguyễn Văn Quỹ đã tiếp nhận hồ sơ xét duyệt.", time: "17-07-2026 08:30" },
    ],
  },
};

const formatVND = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

export default function ReviewerSubmissionDetailPage() {
  const params = useParams<{ id: string }>();
  const idStr = params.id || "1";
  const [submission, setSubmission] = useState(MOCK_SUBMISSIONS_DETAILS[idStr] || MOCK_SUBMISSIONS_DETAILS["1"]);

  // Review states
  const [activeAction, setActiveAction] = useState<"approve" | "revision" | "reject" | null>(null);
  const [noteText, setNoteText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Status mapping
  const statusMap: Record<string, { bg: string; text: string; label: string }> = {
    submitted: { bg: "bg-blue-50 border-blue-100", text: "text-blue-700 border-blue-200", label: "Chờ tiếp nhận" },
    under_review: { bg: "bg-amber-50 border-amber-100", text: "text-amber-700 border-amber-200", label: "Đang xét duyệt" },
    needs_revision: { bg: "bg-rose-50 border-rose-100", text: "text-rose-700 border-rose-200", label: "Yêu cầu bổ sung" },
    published: { bg: "bg-emerald-50 border-emerald-100", text: "text-emerald-700 border-emerald-200", label: "Đã phê duyệt & Công khai" },
    rejected: { bg: "bg-red-50 border-red-100", text: "text-red-700 border-red-200", label: "Đã từ chối" },
  };

  const statusCfg = statusMap[submission.status];

  // Action Panel triggers
  const handleApprove = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setSubmission((prev: any) => ({
        ...prev,
        status: "published",
        history: [...prev.history, { sender: "reviewer", text: "Hồ sơ đã được duyệt chính thức và công khai dự án gây quỹ.", time: "Vừa xong" }],
      }));
      setIsProcessing(false);
      setActiveAction(null);
      alert("Phê duyệt thành công! Dự án đã được chuyển trạng thái: Đã công khai.");
    }, 1000);
  };

  const handleRevisionRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) {
      alert("Vui lòng ghi nội dung yêu cầu bổ sung hồ sơ.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setSubmission((prev: any) => ({
        ...prev,
        status: "needs_revision",
        history: [...prev.history, { sender: "reviewer", text: `Yêu cầu bổ sung hồ sơ: ${noteText}`, time: "Vừa xong" }],
      }));
      setIsProcessing(false);
      setNoteText("");
      setActiveAction(null);
      alert("Đã gửi yêu cầu bổ sung hồ sơ tới nhà trường.");
    }, 1000);
  };

  const handleRejectRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) {
      alert("Vui lòng ghi lý do từ chối hồ sơ.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setSubmission((prev: any) => ({
        ...prev,
        status: "rejected",
        history: [...prev.history, { sender: "reviewer", text: `Từ chối hồ sơ đề xuất. Lý do: ${noteText}`, time: "Vừa xong" }],
      }));
      setIsProcessing(false);
      setNoteText("");
      setActiveAction(null);
      alert("Đã từ chối hồ sơ đề xuất thành công.");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        to="/dashboard/reviewer/submissions"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại danh sách hàng chờ
      </Link>

      {/* Header Info */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-500">
              {submission.category}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 border rounded-full text-[10px] font-bold ${statusCfg.bg} ${statusCfg.text}`}
            >
              {statusCfg.label}
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 font-serif leading-snug">{submission.title}</h2>
          <p className="text-xs text-slate-400">Nộp bởi: {submission.school} | Ngày {submission.date}</p>
        </div>
      </div>

      {/* MAIN 2-COLUMN VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* General details Box */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-3">Hồ sơ chi tiết đề xuất</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 block font-medium">Số lượng thụ hưởng:</span>
                <span className="font-bold text-slate-800">{submission.beneficiaryCount} học sinh</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block font-medium">Số tiền xin quỹ hỗ trợ:</span>
                <span className="font-bold text-[#006B3F]">{formatVND(submission.amount)}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block font-medium">Số tài khoản MBBank nhận giải ngân:</span>
                <span className="font-bold text-slate-800">{submission.bankAccount}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block font-medium">Tên chủ tài khoản:</span>
                <span className="font-bold text-slate-800 uppercase">{submission.bankOwner}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500 block">Hoàn cảnh mô tả từ nhà trường:</span>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
                {submission.circumstance}
              </p>
            </div>
          </div>

          {/* Attachments Preview */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-3">Tài liệu & Minh chứng đi kèm</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {submission.files.proposal && (
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4.5 h-4.5 text-red-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-700 truncate">{submission.files.proposal}</p>
                      <p className="text-[9px] text-slate-400 font-semibold">Tờ trình đề nghị đóng mộc</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Xem trước văn bản ${submission.files.proposal}`)}
                    className="p-1.5 text-[#006B3F] hover:bg-white rounded-lg border border-transparent hover:border-slate-200 flex-shrink-0 cursor-pointer"
                    title="Xem"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              )}

              {submission.files.list && (
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileSpreadsheet className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-700 truncate">{submission.files.list}</p>
                      <p className="text-[9px] text-slate-400 font-semibold">Danh sách học sinh chi tiết</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Xem trước bảng excel ${submission.files.list}`)}
                    className="p-1.5 text-[#006B3F] hover:bg-white rounded-lg border border-transparent hover:border-slate-200 flex-shrink-0 cursor-pointer"
                    title="Xem"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Timeline Exchange History */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-3">Lịch sử trao đổi / Xử lý hồ sơ</h3>
            <div className="space-y-4 relative pl-4 border-l border-slate-200">
              {submission.history.map((hist: any, index: number) => {
                const isReviewerMsg = hist.sender === "reviewer";

                return (
                  <div key={index} className="relative">
                    <div
                      className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ${
                        isReviewerMsg ? "bg-[#006B3F]" : "bg-blue-600"
                      }`}
                    ></div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2 font-bold text-slate-800">
                        <span>{isReviewerMsg ? "Nhân viên Quỹ" : "Nhà trường"}</span>
                        <span className="text-[9px] text-slate-400 font-medium">{hist.time}</span>
                      </div>
                      <p className="text-slate-600 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100/50 leading-relaxed">
                        {hist.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Actions & School Info (1/3) */}
        <div className="space-y-6">
          {/* ACTION PANEL */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-3">Quyết định kiểm duyệt</h3>

            {submission.status !== "published" && submission.status !== "rejected" ? (
              <div className="space-y-3">
                {activeAction === null ? (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setActiveAction("approve")}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#006B3F] hover:bg-[#005030] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      Phê duyệt & Công khai
                    </button>
                    <button
                      onClick={() => setActiveAction("revision")}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Yêu cầu bổ sung
                    </button>
                    <button
                      onClick={() => setActiveAction("reject")}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      Từ chối đề xuất
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeAction === "approve" && (
                      <div className="space-y-3 text-xs bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                        <AlertTriangle className="w-5 h-5 text-emerald-600" />
                        <p className="font-semibold text-slate-800">
                          Xác nhận phê duyệt hồ sơ và chuyển dự án sang trạng thái công khai gây quỹ trên trang chủ?
                        </p>
                        <div className="flex items-center gap-2 pt-2">
                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={handleApprove}
                            className="px-3 py-1.5 bg-[#006B3F] text-white font-bold rounded-lg text-[10px] cursor-pointer"
                          >
                            Đồng ý duyệt
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveAction(null)}
                            className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-[10px] font-bold cursor-pointer"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    )}

                    {activeAction === "revision" && (
                      <form onSubmit={handleRevisionRequest} className="space-y-3">
                        <label className="block text-xs font-bold text-slate-700">Yêu cầu bổ sung nội dung gì? *</label>
                        <textarea
                          rows={4}
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Mô tả cụ thể giấy tờ hoặc thông tin nhà trường cần bổ sung..."
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#006B3F]"
                        />
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={isProcessing}
                            className="flex-1 py-2 bg-amber-600 text-white font-bold rounded-lg text-xs cursor-pointer"
                          >
                            Gửi yêu cầu
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveAction(null);
                              setNoteText("");
                            }}
                            className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs cursor-pointer"
                          >
                            Hủy
                          </button>
                        </div>
                      </form>
                    )}

                    {activeAction === "reject" && (
                      <form onSubmit={handleRejectRequest} className="space-y-3">
                        <label className="block text-xs font-bold text-rose-700">Lý do từ chối đề xuất *</label>
                        <textarea
                          rows={4}
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Nhập lý do chi tiết từ chối phê duyệt dự án này..."
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500"
                        />
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={isProcessing}
                            className="flex-1 py-2 bg-rose-600 text-white font-bold rounded-lg text-xs cursor-pointer"
                          >
                            Xác nhận từ chối
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveAction(null);
                              setNoteText("");
                            }}
                            className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs cursor-pointer"
                          >
                            Hủy
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center text-xs text-slate-400 font-semibold">
                Kiểm duyệt hồ sơ đã kết thúc.
              </div>
            )}
          </div>

          {/* SCHOOL PORTAL SIDEBAR MINI */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <Building className="w-5 h-5 text-slate-500" />
              <h3 className="font-bold text-sm text-slate-800">Thông tin nhà trường</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Tên trường:</span>
                <span className="font-bold text-slate-800">{submission.school}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Người đại diện:</span>
                <span className="font-bold text-slate-700">Thầy Nguyễn Hữu Nhân (Hiệu trưởng)</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Trạng thái đối tác trường:</span>
                <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Đã xác minh
                </span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                <span>Số đề xuất trước đây:</span>
                <span className="text-slate-800">4 dự án</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
