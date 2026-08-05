"use client";
import Link from "next/link";
import { useEffect } from "react"

import { Lock, ShieldCheck, ChevronRight, Key, EyeOff, FileText, Mail, Phone } from "lucide-react"

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
            <Link href="/" className="hover:text-slate-900 transition-colors whitespace-nowrap">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-bold whitespace-nowrap">
              Chính sách bảo mật thông tin
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="w-full bg-gradient-to-r from-[#00502e] via-[#006B3F] to-[#064423] py-14 md:py-18 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
            <Lock className="w-4 h-4 text-amber-300" />
            <span>AN AN TOÀN VÀ BẢO MẬT DỮ LIỆU</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-extrabold tracking-wide uppercase">
            CHÍNH SÁCH BẢO MẬT THÔNG TIN
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Quỹ Hỗ trợ Nhân tài Việt Nam cam kết bảo vệ tuyệt đối thông tin cá nhân và dữ liệu giao dịch tài trợ của quý nhà hảo tâm và các đối tác.
          </p>
        </div>
      </section>

      {/* Main Content Viewport */}
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Quick Index Navigation Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
                <ShieldCheck className="w-4 h-4 text-[#006B3F]" />
                Mục chính sách
              </h3>
              <nav className="space-y-2 text-slate-600 font-medium">
                <a href="#privacy-1" className="block hover:text-[#006B3F] hover:translate-x-1 transition-all">
                  1. Dữ liệu chúng tôi thu thập
                </a>
                <a href="#privacy-2" className="block hover:text-[#006B3F] hover:translate-x-1 transition-all">
                  2. Mục đích sử dụng dữ liệu
                </a>
                <a href="#privacy-3" className="block hover:text-[#006B3F] hover:translate-x-1 transition-all">
                  3. Bảo mật thanh toán VietQR
                </a>
                <a href="#privacy-4" className="block hover:text-[#006B3F] hover:translate-x-1 transition-all">
                  4. Chia sẻ dữ liệu với đối tác
                </a>
                <a href="#privacy-5" className="block hover:text-[#006B3F] hover:translate-x-1 transition-all">
                  5. Quyền hạn của Người dùng
                </a>
              </nav>
            </div>
          </div>

          {/* Privacy Text Content Column */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">

            {/* Section 1 */}
            <div id="privacy-1" className="space-y-3 scroll-mt-24">
              <h2 className="font-serif font-bold text-xl md:text-2xl text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#006B3F] text-sm font-bold flex items-center justify-center">1</span>
                Dữ liệu cá nhân chúng tôi thu thập
              </h2>
              <p>
                Khi quý nhà hảo tâm thực hiện giao dịch ủng hộ hoặc Nhà trường tạo tài khoản đối tác trên RaiseFund, chúng tôi chỉ thu thập các thông tin thực sự cần thiết bao gồm:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-slate-600">
                <li><strong>Thông tin định danh:</strong> Họ và tên, Địa chỉ Email, Số điện thoại (nếu cung cấp).</li>
                <li><strong>Thông tin giao dịch:</strong> Số tiền ủng hộ, Mã giao dịch ngân hàng (Mã tham chiếu VietQR), Thời gian thực hiện.</li>
                <li><strong>Thông tin nhà trường:</strong> Tên trường, Mã số thuế/Quyết định thành lập, Số tài khoản ngân hàng chính thức của trường.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div id="privacy-2" className="space-y-3 scroll-mt-24">
              <h2 className="font-serif font-bold text-xl md:text-2xl text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#006B3F] text-sm font-bold flex items-center justify-center">2</span>
                Mục đích sử dụng dữ liệu
              </h2>
              <p>
                Thông tin của bạn được sử dụng duy nhất cho các mục đích công khai, minh bạch hoạt động ủng hộ:
              </p>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs md:text-sm text-slate-600">
                <li>Ghi nhận và đối soát tự động khoản tiền tài trợ trên bảng vinh danh công khai.</li>
                <li>Phát hành <strong>Chứng nhận Tấm lòng vàng Điện tử (PDF)</strong> và gửi báo cáo giải ngân định kỳ qua Email.</li>
                <li>Liên hệ xác nhận trong trường hợp xảy ra sự cố kỹ thuật chuyển khoản.</li>
              </ol>
              <div className="p-4 bg-emerald-50/70 border-l-4 border-[#006B3F] rounded-r-xl text-xs md:text-sm text-slate-700 font-medium">
                🔒 Quỹ Hỗ trợ Nhân tài Việt Nam cam kết KHÔNG BAO GIỜ bán, cho thuê hoặc chia sẻ dữ liệu cá nhân của bạn cho bên thứ ba vì mục đích thương mại hay quảng cáo.
              </div>
            </div>

            {/* Section 3 */}
            <div id="privacy-3" className="space-y-3 scroll-mt-24">
              <h2 className="font-serif font-bold text-xl md:text-2xl text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#006B3F] text-sm font-bold flex items-center justify-center">3</span>
                Bảo mật thông tin giao dịch VietQR
              </h2>
              <p>
                RaiseFund không lưu trữ thông tin thẻ ngân hàng hay mật khẩu Internet Banking của người dùng. Mọi thao tác quét mã VietQR được thực hiện trực tiếp trên ứng dụng Ngân hàng bảo mật của chính bạn. Hệ thống của chúng tôi chỉ nhận phản hồi xác nhận giao dịch qua cổng Webhook mã hóa SSL 256-bit.
              </p>
            </div>

            {/* Section 4 */}
            <div id="privacy-4" className="space-y-3 scroll-mt-24">
              <h2 className="font-serif font-bold text-xl md:text-2xl text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#006B3F] text-sm font-bold flex items-center justify-center">4</span>
                Quyền Chế độ Ẩn danh (Anonymous Donation)
              </h2>
              <p>
                Nếu bạn chọn chế độ <strong>"Ủng hộ ẩn danh"</strong> khi quyên góp, tên của bạn sẽ được thay thế bằng <em>"Nhà hảo tâm ẩn danh"</em> trên tất cả các trang thống kê công khai. Danh tính thực của bạn được bảo mật tuyệt đối trong cơ sở dữ liệu mã hóa của Quỹ.
              </p>
            </div>

            {/* Section 5 */}
            <div id="privacy-5" className="space-y-3 scroll-mt-24 pt-4 border-t border-slate-100">
              <h2 className="font-serif font-bold text-xl md:text-2xl text-slate-900 flex items-center gap-2">
                <Key className="w-6 h-6 text-[#006B3F]" />
                Quyền hạn đối với Dữ liệu của bạn
              </h2>
              <p className="text-xs md:text-sm text-slate-600">
                Bạn có quyền yêu cầu trích xuất, chỉnh sửa hoặc xóa bỏ thông tin cá nhân khỏi hệ thống công khai của Quỹ bất kỳ lúc nào bằng cách gửi yêu cầu tới:
              </p>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2 text-xs md:text-sm">
                <p className="font-bold text-slate-900">BỘ PHẬN BẢO VỆ DỮ LIỆU CÁ NHÂN - VTAF</p>
                <p className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4 text-[#006B3F]" />
                  <span>Email tiếp nhận: <strong>quynhantai@gmail.com</strong></span>
                </p>
                <p className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4 text-[#006B3F]" />
                  <span>Hotline khẩn cấp: <strong>098 777 3889</strong></span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
