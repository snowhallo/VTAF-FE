import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  Check,
  Upload,
  Info,
  AlertCircle,
  FileText,
  Users,
  Image as ImageIcon,
} from "lucide-react";

export default function CreateProjectPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Học phí",
    campaign: "Chiến dịch Nâng Bước Thủ Khoa 2026",
    beneficiaryCount: "",
    educationLevel: "THPT",
    circumstance: "",
    amountNeeded: "",
    bankAccount: "1166889999",
    bankOwner: "TRUONG THPT NGUYEN DINH CHIEU",
    startDate: "2026-08-01",
    endDate: "2026-09-30",
  });

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});
  const [validationError, setValidationError] = useState("");

  const steps = [
    { number: 1, title: "Thông tin chung", desc: "Mô tả dự án & chiến dịch" },
    { number: 2, title: "Đối tượng", desc: "Học sinh thụ hưởng" },
    { number: 3, title: "Tài chính", desc: "Số tiền & Ngân hàng" },
    { number: 4, title: "Hồ sơ đính kèm", desc: "Văn bản, minh chứng" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "amountNeeded") {
      const digits = value.replace(/\D/g, "");
      const formatted = digits ? new Intl.NumberFormat("en-US").format(Number(digits)) : "";
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setValidationError("");
  };

  const handleFileUpload = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles((prev) => ({ ...prev, [fieldName]: file.name }));
    }
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.title.trim()) return "Vui lòng nhập tên đề xuất dự án";
      if (!formData.description.trim()) return "Vui lòng nhập mô tả ngắn";
    } else if (currentStep === 2) {
      if (!formData.beneficiaryCount || Number(formData.beneficiaryCount) <= 0) {
        return "Số lượng nhân tài/học sinh giỏi thụ hưởng phải lớn hơn 0";
      }
      if (!formData.circumstance.trim()) return "Vui lòng mô tả thành tích nổi bật và tiềm năng phát triển của học sinh";
      if (!uploadedFiles.beneficiaryList) return "Vui lòng upload danh sách học sinh (PDF/Excel)";
    } else if (currentStep === 3) {
      const rawAmount = Number(formData.amountNeeded.replace(/,/g, ""));
      if (!formData.amountNeeded || rawAmount <= 0) {
        return "Số tiền cần hỗ trợ phải lớn hơn 0";
      }
      if (!formData.bankAccount) return "Vui lòng nhập số tài khoản ngân hàng";
      if (!formData.bankOwner) return "Vui lòng nhập tên chủ tài khoản";
    } else if (currentStep === 4) {
      if (!uploadedFiles.schoolDeclaration) return "Vui lòng đính kèm văn bản đề nghị hỗ trợ có chữ ký";
      if (!uploadedFiles.coverPhoto) return "Vui lòng upload ít nhất 1 ảnh minh họa";
    }
    return "";
  };

  const handleNext = () => {
    const error = validateStep();
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError("");
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setValidationError("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateStep();
    if (error) {
      setValidationError(error);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Nộp đề xuất thành công! Đề xuất đã được gửi tới Quỹ để xét duyệt.");
      navigate("/dashboard/school/projects");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        to="/dashboard/school/projects"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại danh sách đề xuất
      </Link>

      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 font-serif">Đăng ký đề xuất hỗ trợ mới</h2>
        <p className="text-xs text-slate-500">Nhà trường nộp hồ sơ, danh sách học sinh khó khăn gửi tới Quỹ</p>
      </div>

      {/* STEP PROGRESS INDICATOR */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
        <div className="grid grid-cols-4 gap-2 relative">
          {steps.map((step) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;

            return (
              <div key={step.number} className="flex flex-col items-center text-center space-y-2 relative z-10">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border transition-all ${
                    isCompleted
                      ? "bg-[#006B3F] border-[#006B3F] text-white"
                      : isCurrent
                      ? "bg-emerald-50 border-[#006B3F] text-[#006B3F] ring-4 ring-emerald-500/10"
                      : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                </div>
                <div className="hidden sm:block">
                  <p className={`text-[11px] font-bold ${isCurrent ? "text-slate-800" : "text-slate-500"}`}>
                    {step.title}
                  </p>
                  <p className="text-[9px] text-slate-400 font-medium">{step.desc}</p>
                </div>
              </div>
            );
          })}

          <div className="absolute top-[18px] left-[12.5%] right-[12.5%] h-0.5 bg-slate-100 -z-10">
            <div
              className="h-full bg-[#006B3F] transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* ERROR BANNER */}
      {validationError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-700 font-semibold animate-shake">
          <AlertCircle className="w-4.5 h-4.5 text-red-600 flex-shrink-0 mt-0.5" />
          <span>{validationError}</span>
        </div>
      )}

      {/* STEP FORM CARD */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        {/* STEP 1: GENERAL INFO */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-800">Bước 1: Thông tin chung đề xuất</h3>
              <p className="text-[11px] text-slate-500">Mô tả tên dự án và phân loại chiến dịch chính</p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Tên đề xuất dự án *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ví dụ: Quyên góp học bổng bồi dưỡng năng lực học thuật cho 15 học sinh giỏi đạt giải cấp Tỉnh"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F] bg-slate-50/30"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Loại hình hỗ trợ *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F] bg-slate-50/30 cursor-pointer"
                >
                  <option value="Học phí">Học phí</option>
                  <option value="Học bổng">Học bổng vượt khó</option>
                  <option value="Thiết bị học tập">Thiết bị, dụng cụ học tập</option>
                  <option value="Sinh hoạt phí">Sinh hoạt phí & đi lại</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Thuộc chiến dịch của Quỹ *</label>
                <select
                  name="campaign"
                  value={formData.campaign}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F] bg-slate-50/30 cursor-pointer"
                >
                  <option value="Chiến dịch Nâng Bước Thủ Khoa 2026">Chiến dịch Nâng Bước Thủ Khoa 2026</option>
                  <option value="Đồng hành cùng học sinh vùng cao khó khăn">Đồng hành cùng học sinh vùng cao khó khăn</option>
                  <option value="Học bổng toàn phần chắp cánh tương lai">Học bổng toàn phần chắp cánh tương lai</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Mô tả tóm tắt hoàn cảnh & lý do xin quỹ *</label>
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Ghi ngắn gọn hoàn cảnh chung của các học sinh và lý do đề xuất gửi lên Quỹ..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F] bg-slate-50/30"
              />
            </div>
          </div>
        )}

        {/* STEP 2: BENEFICIARIES */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-800">Bước 2: Đối tượng thụ hưởng</h3>
              <p className="text-[11px] text-slate-500">Khai báo số lượng học sinh thụ hưởng và mô tả hoàn cảnh chi tiết</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Số lượng học sinh thụ hưởng *</label>
                <input
                  type="number"
                  name="beneficiaryCount"
                  value={formData.beneficiaryCount}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: 15"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Cấp học *</label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none cursor-pointer"
                >
                  <option value="Mầm non">Mầm non</option>
                  <option value="Tiểu học">Tiểu học</option>
                  <option value="THCS">THCS</option>
                  <option value="THPT">THPT</option>
                  <option value="Đại học">Đại học / Cao đẳng</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Mô tả thành tích học tập & tiềm năng phát triển *</label>
              <textarea
                name="circumstance"
                rows={4}
                value={formData.circumstance}
                onChange={handleInputChange}
                placeholder="Mô tả chi tiết các giải thưởng học sinh giỏi, thành tích học thuật nổi bật, điểm số GPA xuất sắc và tiềm năng phát triển của các nhân tài học thuật..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>

            {/* Beneficiary List Upload */}
            <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 text-center">
              <Users className="w-8 h-8 text-slate-400" />
              <div className="text-xs">
                <span className="font-bold text-[#006B3F] cursor-pointer hover:underline relative">
                  Tải lên danh sách học sinh thụ hưởng *
                  <input
                    type="file"
                    accept=".xlsx,.xls,.pdf"
                    onChange={(e) => handleFileUpload("beneficiaryList", e)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </span>
                <span className="text-slate-500"> hoặc kéo thả file vào đây</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Hỗ trợ định dạng: .xlsx, .xls, .pdf (Dưới 10MB)</p>
              {uploadedFiles.beneficiaryList && (
                <div className="mt-2 flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-[10px] rounded-full border border-emerald-200">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{uploadedFiles.beneficiaryList}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: FINANCIAL DETAILS */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-800">Bước 3: Dự toán tài chính & Tài khoản nhận tiền</h3>
              <p className="text-[11px] text-slate-500">Khai báo số tiền cần gây quỹ và số tài khoản MB của nhà trường</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Tổng số tiền cần tài trợ (VND) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">₫</span>
                  <input
                    type="text"
                    name="amountNeeded"
                    value={formData.amountNeeded}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: 45,000,000"
                    className="w-full pl-7 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Số tài khoản MBBank nhận tiền giải ngân *</label>
                <input
                  type="text"
                  name="bankAccount"
                  value={formData.bankAccount}
                  onChange={handleInputChange}
                  placeholder="Nhập số tài khoản ngân hàng Quân Đội MB"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Tên chủ tài khoản ngân hàng (Trường)*</label>
                <input
                  type="text"
                  name="bankOwner"
                  value={formData.bankOwner}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: TRUONG THPT NGUYEN DINH CHIEU"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Bắt đầu kêu gọi</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Kết thúc kêu gọi</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex gap-2">
                <Info className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-800">Nguyên tắc nhận tiền giải ngân</p>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Để đảm bảo tính minh bạch, tiền tài trợ chỉ được chuyển trực tiếp vào tài khoản ngân hàng chính thức của nhà trường (không chuyển qua cá nhân giáo viên hoặc học sinh). Nhà trường có trách nhiệm phân bổ đúng học phí cho học sinh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: ATTACHMENTS */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-800">Bước 4: Hồ sơ đính kèm & Minh chứng</h3>
              <p className="text-[11px] text-slate-500">Tải lên các văn bản đề nghị, hồ sơ hoàn cảnh học sinh đóng dấu mộc</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50/50 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <FileText className="w-4.5 h-4.5 text-[#006B3F]" />
                    Đề xuất chính thức đóng dấu mộc trường *
                  </span>
                  <p className="text-[10px] text-slate-500">
                    Công văn hoặc tờ trình do Hiệu trưởng ký tên, đóng dấu đề xuất xin Quỹ chắp cánh tài chính.
                  </p>
                </div>
                <div>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#006B3F]/10 hover:bg-[#006B3F]/20 text-[#006B3F] font-semibold rounded-lg text-[10px] cursor-pointer transition-colors mt-2">
                    <Upload className="w-3.5 h-3.5" />
                    Tải văn bản lên
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg"
                      onChange={(e) => handleFileUpload("schoolDeclaration", e)}
                      className="hidden"
                    />
                  </label>
                  {uploadedFiles.schoolDeclaration && (
                    <p className="text-[9px] text-emerald-800 font-medium truncate mt-1">
                      ✓ {uploadedFiles.schoolDeclaration}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 bg-slate-50/50 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Users className="w-4.5 h-4.5 text-[#006B3F]" />
                    Bảng điểm / Chứng nhận thành tích (nếu có)
                  </span>
                  <p className="text-[10px] text-slate-500">
                    Bản sao chụp học bạ/bảng điểm học tập, chứng nhận giải thưởng học sinh giỏi cấp tỉnh/thành phố/quốc gia hoặc các cuộc thi học thuật khác.
                  </p>
                </div>
                <div>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#006B3F]/10 hover:bg-[#006B3F]/20 text-[#006B3F] font-semibold rounded-lg text-[10px] cursor-pointer transition-colors mt-2">
                    <Upload className="w-3.5 h-3.5" />
                    Tải lên hồ sơ
                    <input
                      type="file"
                      accept=".pdf,.zip,.rar"
                      onChange={(e) => handleFileUpload("academicAchievements", e)}
                      className="hidden"
                    />
                  </label>
                  {uploadedFiles.academicAchievements && (
                    <p className="text-[9px] text-emerald-800 font-medium truncate mt-1">
                      ✓ {uploadedFiles.academicAchievements}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 bg-slate-50/50 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between md:col-span-2">
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <ImageIcon className="w-4.5 h-4.5 text-[#006B3F]" />
                    Ảnh bìa minh họa dự án *
                  </span>
                  <p className="text-[10px] text-slate-500">
                    Tải lên ít nhất 1 hình ảnh về trường học, lớp học hoặc chân dung các học sinh cần giúp đỡ (để hiển thị làm ảnh cover khi dự án được phê duyệt công khai).
                  </p>
                </div>
                <div>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#006B3F]/10 hover:bg-[#006B3F]/20 text-[#006B3F] font-semibold rounded-lg text-[10px] cursor-pointer transition-colors mt-2">
                    <Upload className="w-3.5 h-3.5" />
                    Chọn ảnh minh họa
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("coverPhoto", e)}
                      className="hidden"
                    />
                  </label>
                  {uploadedFiles.coverPhoto && (
                    <p className="text-[9px] text-emerald-800 font-medium truncate mt-1">
                      ✓ {uploadedFiles.coverPhoto}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP NAVIGATION BUTTONS */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1 || isSubmitting}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Quay lại
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#006B3F] hover:bg-[#005030] text-white font-bold rounded-lg text-xs shadow transition-all"
            >
              Tiếp tục
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#006B3F] hover:bg-[#005030] text-white font-bold rounded-lg text-xs shadow disabled:opacity-70 transition-all cursor-pointer"
            >
              {isSubmitting ? "Đang gửi hồ sơ..." : "Nộp đề xuất & Đóng dấu"}
              <Save className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
