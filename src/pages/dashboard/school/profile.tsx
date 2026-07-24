import React, { useState } from "react";
import {
  Building,
  Shield,
  Save,
  CreditCard,
} from "lucide-react";

export default function SchoolProfilePage() {
  const [, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: "Trường THPT Nguyễn Đình Chiểu",
    schoolCode: "S-NDC-3729",
    representative: "Thầy Nguyễn Hữu Nhân",
    title: "Hiệu trưởng",
    phone: "028 3829 3892",
    email: "nguyendinhchieu@edu.vn",
    address: "Số 24 đường Pasteur, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    bankName: "MBBank (Ngân hàng TMCP Quân đội)",
    bankAccount: "1166889999",
    bankOwner: "TRUONG THPT NGUYEN DINH CHIEU",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      alert("Cập nhật thông tin nhà trường thành công!");
    }, 200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 font-serif">Hồ sơ nhà trường</h2>
        <p className="text-xs text-slate-500">Quản lý thông tin liên hệ và tài khoản ngân hàng nhận giải ngân từ Quỹ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic School Information */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building className="w-5 h-5 text-[#006B3F]" />
            <h3 className="font-bold text-sm text-slate-800">Thông tin chung nhà trường</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Tên trường chính thức *</label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F] bg-slate-50/50"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Mã định danh trường (Mã hệ thống)</label>
              <input
                type="text"
                name="schoolCode"
                value={formData.schoolCode}
                disabled
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Người đại diện (Hiệu trưởng / Đại diện) *</label>
              <input
                type="text"
                name="representative"
                value={formData.representative}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Chức danh người đại diện *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Số điện thoại liên hệ *</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Email nhận thông báo *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Địa chỉ trường *</label>
            <textarea
              name="address"
              rows={2}
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none"
            />
          </div>
        </div>

        {/* Financial Disbursements MB Bank Account Details */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#006B3F]" />
            <h3 className="font-bold text-sm text-slate-800">Tài khoản ngân hàng nhận giải ngân (MBBank)</h3>
          </div>

          <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl flex gap-3 text-xs text-[#006B3F] mb-4">
            <Shield className="w-5 h-5 flex-shrink-0 text-[#006B3F] mt-0.5" />
            <p className="leading-relaxed">
              <strong>Bảo vệ an toàn giải ngân:</strong> Quỹ chỉ hỗ trợ chuyển khoản giải ngân trực tiếp vào tài khoản ngân hàng chính thức đứng tên Nhà trường. Nhà trường vui lòng điền chính xác tài khoản MBBank để hệ thống kích hoạt tự động đối soát giao dịch VietQR khi có tài trợ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Ngân hàng liên kết</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                disabled
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Số tài khoản MBBank nhận giải ngân *</label>
              <input
                type="text"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleInputChange}
                placeholder="Nhập số tài khoản ngân hàng MB"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700">Tên chủ tài khoản chính xác (Viết hoa không dấu)*</label>
              <input
                type="text"
                name="bankOwner"
                value={formData.bankOwner}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none uppercase"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006B3F] hover:bg-[#005030] text-white font-bold rounded-lg text-xs shadow-md transition-all cursor-pointer active:scale-95"
          >
            <Save className="w-4 h-4" />
            Lưu thay đổi hồ sơ
          </button>
        </div>
      </form>
    </div>
  );
}
