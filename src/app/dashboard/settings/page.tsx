"use client";
import { useState, useRef, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  Upload,
  Camera,
  Trash2,
  Save,
  Lock,
  ShieldCheck,
  Bell,
  CheckCircle,
  KeyRound,
  Sparkles,
  CreditCard,
  Building2,
  CheckCircle2,
  Sliders,
  Shield,
  Award,
  Wallet,
  EyeOff,
  Send,
} from "lucide-react";

export default function AccountSettingsPage() {
  // Read active role from localStorage
  const [activeRole, setActiveRole] = useState<"admin" | "school" | "reviewer" | "donor" | "accountant">("admin");

  useEffect(() => {
    const saved = localStorage.getItem("dashboard_active_role");
    if (saved && ["admin", "school", "reviewer", "donor", "accountant"].includes(saved)) {
      setActiveRole(saved as any);
    }
  }, []);

  // Avatar upload state
  const [avatarUrl, setAvatarUrl] = useState<string>("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Common Profile State
  const [fullName, setFullName] = useState(() => {
    if (activeRole === "school") return "Ban BGH THPT Nguyễn Đình Chiểu";
    if (activeRole === "reviewer") return "PGS.TS Trần Văn Nam";
    if (activeRole === "accountant") return "Nguyễn Thị Phương Thảo (Kế toán)";
    if (activeRole === "admin") return "Admin Tổng Quỹ VTAF";
    return "Nguyễn Hữu Tài";
  });

  const [email, setEmail] = useState(() => {
    if (activeRole === "school") return "thpt.nguyendinhchieu@edu.vn";
    if (activeRole === "reviewer") return "tvnam.reviewer@quynhantai.org";
    if (activeRole === "accountant") return "ketoan@quynhantai.org";
    if (activeRole === "admin") return "admin@quynhantai.org";
    return "huutai@quynhantai.org";
  });

  const [phone, setPhone] = useState("0987773889");

  // Role-Specific Settings State
  // 1. School Specifics
  const [schoolCode, setSchoolCode] = useState("THPT-NDC-8812");
  const [bankName, setBankName] = useState("BIDV - Ngân hàng TMCP Đầu tư và Phát triển Việt Nam");
  const [bankAccountNo, setBankAccountNo] = useState("8827361524");
  const [bankAccountHolder, setBankAccountHolder] = useState("TRUONG THPT NGUYEN DINH CHIEU");

  // 2. Reviewer Specifics
  const [reviewExpertise, setReviewExpertise] = useState("Học bổng tài năng & Thiết bị khoa học");
  const [notifyOnNewSubmission, setNotifyOnNewSubmission] = useState(true);
  const [notifyOnAnomalyAlert, setNotifyOnAnomalyAlert] = useState(true);

  // 3. Donor Specifics
  const [displayNameOnBoard, setDisplayNameOnBoard] = useState("Nguyễn Hữu Tài");
  const [isAnonymousDonor, setIsAnonymousDonor] = useState(false);
  const [autoEmailReceipt, setAutoEmailReceipt] = useState(true);
  const [receiveWatchlistUpdates, setReceiveWatchlistUpdates] = useState(true);

  // 4. Accountant Specifics
  const [vietqrMerchantId, setVietqrMerchantId] = useState("VTAF-MB-88912");
  const [autoSlaReminder, setAutoSlaReminder] = useState(true);
  const [maxFastDisburseLimit, setMaxFastDisburseLimit] = useState("500,000,000 ₫");

  // 5. Admin Specifics
  const [systemAlertEmail, setSystemAlertEmail] = useState("security-alerts@quynhantai.org");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Security Form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Save feedback state
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    }, 600);
  };

  const getRoleTitle = () => {
    switch (activeRole) {
      case "admin":
        return { title: "Cài Đặt Hệ Thống Quản Trị & Super Admin", badge: "👑 Cổng Admin", color: "bg-purple-100 text-purple-800" };
      case "reviewer":
        return { title: "Cài Đặt Hồ Sơ Hội Đồng Thẩm Định Viên", badge: "🛡️ Cổng Kiểm duyệt", color: "bg-blue-100 text-blue-800" };
      case "school":
        return { title: "Cài Đặt Thông Tin Trường & Tài Khoản Ngân Hàng Giải Ngân", badge: "🏫 Cổng Nhà trường", color: "bg-amber-100 text-amber-800" };
      case "donor":
        return { title: "Cài Đặt Hồ Sơ Nhà Tài Trợ & Quyền Riêng Tư Quyên Góp", badge: "❤️ Cổng Nhà tài trợ", color: "bg-emerald-100 text-emerald-800" };
      case "accountant":
        return { title: "Cài Đặt Cổng Kế Toán Quỹ & Kết Nối VietQR", badge: "💰 Cổng Kế toán Quỹ", color: "bg-indigo-100 text-indigo-800" };
    }
  };

  const roleMeta = getRoleTitle();

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12 w-full">
      {/* 🌟 TOP HEADER BANNER ACCORDING TO ROLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${roleMeta.color}`}>
              {roleMeta.badge}
            </span>
          </div>
          <h1 className="font-serif font-bold text-2xl md:text-3xl text-slate-900 flex items-center gap-2.5">
            <User className="w-7 h-7 text-[#006B3F]" />
            {roleMeta.title}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Các tùy chỉnh đã được cá nhân hóa chuyên biệt theo đúng quyền hạn làm việc của bạn.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-50 text-[#006B3F] border border-emerald-200 text-xs font-bold animate-pop-in shadow-xs">
            <CheckCircle2 className="w-4 h-4" />
            Đã lưu cấu hình cài đặt thành công!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: AVATAR & ROLE IDENTITY CARD */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6 text-center">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 text-left">
              Ảnh đại diện hồ sơ
            </h3>

            <div className="relative inline-block mx-auto group">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-emerald-100 shadow-md group-hover:opacity-95 transition-all">
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 p-2.5 bg-[#006B3F] hover:bg-[#005030] text-white rounded-full shadow-lg transition-transform active:scale-90 cursor-pointer"
                title="Tải ảnh mới"
              >
                <Camera className="w-4 h-4" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                Tải ảnh mới
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <h4 className="font-bold text-base text-slate-900">{fullName}</h4>
              <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${roleMeta.color}`}>
                {roleMeta.badge}
              </span>
              <p className="text-xs text-slate-500 font-medium">{email}</p>
            </div>
          </div>
        </div>

        {/* RIGHT 2 COLUMNS: ROLE-SPECIFIC EDITABLE FORMS */}
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* COMMON INFORMATION SECTION */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <User className="w-5 h-5 text-[#006B3F]" />
                1. Thông Tin Định Danh Cá Nhân
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Tên hiển thị người dùng</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email liên hệ hệ thống</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Số điện thoại liên lạc</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F]"
                  />
                </div>
              </div>
            </div>

            {/* 🏫 ROLE SCHOOL: BANK ACCOUNT & LEGAL INFORMATION */}
            {activeRole === "school" && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="font-serif font-bold text-lg text-amber-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Building2 className="w-5 h-5 text-amber-600" />
                  2. Cấu Hình Tài Khoản Ngân Hàng Nhận Giải Ngân (Nhà trường)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Mã định danh trường học</label>
                    <input
                      type="text"
                      value={schoolCode}
                      onChange={(e) => setSchoolCode(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-bold bg-slate-50"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Ngân hàng thụ hưởng</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Số tài khoản ngân hàng</label>
                    <input
                      type="text"
                      value={bankAccountNo}
                      onChange={(e) => setBankAccountNo(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-mono font-bold text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Tên chủ tài khoản (Trùng tên trường)</label>
                    <input
                      type="text"
                      value={bankAccountHolder}
                      onChange={(e) => setBankAccountHolder(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                    />
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
                  ⚠️ <strong>Lưu ý quan trọng:</strong> Kinh phí quyên góp sẽ được Kế toán Quỹ chuyển trực tiếp vào STK đã đăng ký ở trên trong tối đa 5 ngày kể từ khi kết thúc vận động.
                </div>
              </div>
            )}

            {/* 🛡️ ROLE REVIEWER: AUDIT & NOTIFICATION PREFERENCES */}
            {activeRole === "reviewer" && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="font-serif font-bold text-lg text-blue-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  2. Cấu Hình Chuyên Môn & Cảnh Báo Thẩm Định
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Lĩnh vực chuyên môn chính</label>
                    <input
                      type="text"
                      value={reviewExpertise}
                      onChange={(e) => setReviewExpertise(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                    />
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-xs font-bold text-slate-800">Nhận Email ngay khi có dự án mới gửi tới hàng chờ</span>
                      <input
                        type="checkbox"
                        checked={notifyOnNewSubmission}
                        onChange={(e) => setNotifyOnNewSubmission(e.target.checked)}
                        className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-slate-200">
                      <span className="text-xs font-bold text-slate-800">Tự động cảnh báo khi dự án xuất hiện dòng tiền bất thường</span>
                      <input
                        type="checkbox"
                        checked={notifyOnAnomalyAlert}
                        onChange={(e) => setNotifyOnAnomalyAlert(e.target.checked)}
                        className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* ❤️ ROLE DONOR: PRIVACY & WATCHLIST PREFERENCES */}
            {activeRole === "donor" && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="font-serif font-bold text-lg text-emerald-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Award className="w-5 h-5 text-[#006B3F]" />
                  2. Cấu Hình Quyền Riêng Tư & Vinh Danh Nhà Tài Trợ
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Tên hiển thị công khai trên Bảng vinh danh</label>
                    <input
                      type="text"
                      value={displayNameOnBoard}
                      onChange={(e) => setDisplayNameOnBoard(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
                    />
                  </div>

                  <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <EyeOff className="w-4 h-4 text-emerald-700" /> Tùy chọn Quyên góp Ẩn danh
                        </span>
                        <p className="text-[11px] text-slate-500">Ẩn tên và thông tin trên sao kê công khai gửi tới cộng đồng</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={isAnonymousDonor}
                        onChange={(e) => setIsAnonymousDonor(e.target.checked)}
                        className="w-5 h-5 rounded accent-[#006B3F] cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-emerald-200/80">
                      <div>
                        <span className="text-xs font-bold text-slate-900">Tự động nhận Bằng chứng nhận PDF qua Email</span>
                        <p className="text-[11px] text-slate-500">Gửi file PDF chứng nhận Tấm lòng vàng ngay sau khi giao dịch thành công</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={autoEmailReceipt}
                        onChange={(e) => setAutoEmailReceipt(e.target.checked)}
                        className="w-5 h-5 rounded accent-[#006B3F] cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* 💰 ROLE ACCOUNTANT: VIETQR & SLA CONFIGURATION */}
            {activeRole === "accountant" && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="font-serif font-bold text-lg text-indigo-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Wallet className="w-5 h-5 text-indigo-600" />
                  2. Cấu Hình Cổng Kết Nối VietQR & Nhắc Nhở Hạn Giải Ngân
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Mã Merchant VietQR kết nối</label>
                    <input
                      type="text"
                      value={vietqrMerchantId}
                      onChange={(e) => setVietqrMerchantId(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-mono font-bold bg-slate-50"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Hạn mức phê duyệt giải ngân nhanh</label>
                    <input
                      type="text"
                      value={maxFastDisburseLimit}
                      onChange={(e) => setMaxFastDisburseLimit(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-bold text-indigo-900"
                    />
                  </div>
                </div>

                <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-200">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="text-xs font-bold text-indigo-950">Cảnh báo SMS & Email khi lệnh giải ngân chạm mốc 4/5 ngày SLA</span>
                      <p className="text-[11px] text-slate-500">Đảm bảo không vi phạm quy định tối đa 5 ngày chuyển tiền cho nhà trường</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoSlaReminder}
                      onChange={(e) => setAutoSlaReminder(e.target.checked)}
                      className="w-5 h-5 rounded accent-indigo-700 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* 👑 ROLE ADMIN: SECURITY & SYSTEM CONTROLS */}
            {activeRole === "admin" && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="font-serif font-bold text-lg text-purple-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Sliders className="w-5 h-5 text-purple-600" />
                  2. Cấu Hình An Ninh & Điều Hành Hệ Thống (Super Admin)
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Email nhận cảnh báo sự cố an ninh khẩn cấp</label>
                    <input
                      type="email"
                      value={systemAlertEmail}
                      onChange={(e) => setSystemAlertEmail(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>

                  <div className="p-4 bg-rose-50/80 rounded-2xl border border-rose-200">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-xs font-bold text-rose-900">Bật chế độ bảo trì hệ thống (Maintenance Mode)</span>
                        <p className="text-[11px] text-slate-500">Tạm dừng nhận quyên góp để nâng cấp máy chủ toàn hệ thống</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={maintenanceMode}
                        onChange={(e) => setMaintenanceMode(e.target.checked)}
                        className="w-5 h-5 rounded accent-rose-600 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: COMMON SECURITY & PASSWORD CHANGE */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <KeyRound className="w-5 h-5 text-amber-600" />
                3. Đổi Mật Khẩu & Bảo Mật 2FA
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Mật khẩu mới</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="space-y-0.5">
                  <span className="font-bold text-xs text-slate-900 block">Xác thực 2 yếu tố (2FA)</span>
                  <span className="text-[11px] text-slate-500">Kích hoạt OTP xác thực cho tài khoản khi đăng nhập và phê duyệt</span>
                </div>
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 accent-[#006B3F] cursor-pointer"
                />
              </div>
            </div>

            {/* SAVE BUTTON */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-3.5 bg-[#006B3F] hover:bg-[#005030] active:scale-95 text-white font-bold rounded-2xl text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Đang lưu cấu hình..." : "Lưu Thay Đổi Cài Đặt Hồ Sơ"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
