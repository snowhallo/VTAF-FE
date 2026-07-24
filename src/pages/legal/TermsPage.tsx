import { useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import { ShieldCheck, FileText, ChevronRight, HelpCircle, Mail, Phone } from "lucide-react"

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
            <RouterLink to="/" className="hover:text-slate-900 transition-colors whitespace-nowrap">
              Trang chủ
            </RouterLink>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-bold whitespace-nowrap">
              Điều khoản & Điều kiện sử dụng
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="w-full bg-gradient-to-r from-[#00502e] via-[#006B3F] to-[#064423] py-14 md:py-18 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
            <FileText className="w-4 h-4 text-amber-300" />
            <span>VĂN BẢN PHÁP LÝ HỆ THỐNG RAISEFUND</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-extrabold tracking-wide uppercase">
            ĐIỀU KHOẢN & ĐIỀU KIỆN SỬ DỤNG
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Cập nhật lần cuối ngày 22 tháng 07 năm 2026. Áp dụng cho toàn bộ Nhà tài trợ, Nhà trường đối tác và người dùng truy cập hệ thống Quỹ.
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
                Mục mục điều khoản
              </h3>
              <nav className="space-y-2 text-slate-600 font-medium">
                <a href="#section-1" className="block hover:text-[#006B3F] hover:translate-x-1 transition-all">
                  1. Mục đích & Phạm vi áp dụng
                </a>
                <a href="#section-2" className="block hover:text-[#006B3F] hover:translate-x-1 transition-all">
                  2. Quy định quyên góp & Ủng hộ
                </a>
                <a href="#section-3" className="block hover:text-[#006B3F] hover:translate-x-1 transition-all">
                  3. Cơ chế giải ngân & Thẩm định
                </a>
                <a href="#section-4" className="block hover:text-[#006B3F] hover:translate-x-1 transition-all">
                  4. Trách nhiệm của Nhà trường
                </a>
                <a href="#section-5" className="block hover:text-[#006B3F] hover:translate-x-1 transition-all">
                  5. Quyền lợi của Nhà tài trợ
                </a>
                <a href="#section-6" className="block hover:text-[#006B3F] hover:translate-x-1 transition-all">
                  6. Xử lý tranh chấp & Liên hệ
                </a>
              </nav>
            </div>
          </div>

          {/* Legal Text Content Column */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">

            {/* Section 1 */}
            <div id="section-1" className="space-y-3 scroll-mt-24">
              <h2 className="font-serif font-bold text-xl md:text-2xl text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#006B3F] text-sm font-bold flex items-center justify-center">1</span>
                Mục đích & Phạm vi áp dụng
              </h2>
              <p>
                Chào mừng bạn đến với Nền tảng quyên góp trực tuyến <strong>RaiseFund</strong> thuộc <strong>Quỹ Hỗ trợ Nhân tài Việt Nam (VTAF)</strong>. Bằng việc truy cập, tạo tài khoản hoặc thực hiện giao dịch ủng hộ trên nền tảng, bạn xác nhận đã đọc, hiểu và đồng ý tuân thủ toàn bộ các quy định trong Điều khoản sử dụng này.
              </p>
              <div className="p-4 bg-emerald-50/70 border-l-4 border-[#006B3F] rounded-r-xl text-xs md:text-sm text-slate-700">
                <strong>Cam kết tôn chỉ:</strong> Quỹ Hỗ trợ Nhân tài Việt Nam hoạt động theo nguyên tắc phi lợi nhuận, minh bạch 100% tài chính và tập trung nguồn lực hỗ trợ tối đa cho học sinh, sinh viên tài năng có hoàn cảnh đặc biệt.
              </div>
            </div>

            {/* Section 2 */}
            <div id="section-2" className="space-y-3 scroll-mt-24">
              <h2 className="font-serif font-bold text-xl md:text-2xl text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#006B3F] text-sm font-bold flex items-center justify-center">2</span>
                Quy định quyên góp & Ủng hộ
              </h2>
              <p>
                Tất cả các khoản đóng góp từ Nhà tài trợ là tự nguyện. Quỹ tiếp nhận ủng hộ qua cổng thanh toán mã VietQR tự động hoặc chuyển khoản ngân hàng chính thức của Quỹ tại các Ngân hàng đối tác (MBBank, Vietcombank).
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-slate-600">
                <li>Mọi khoản quyên góp sau khi hệ thống ghi nhận thành công sẽ không hoàn lại, trừ trường hợp giao dịch bị lặp do lỗi kỹ thuật ngân hàng.</li>
                <li>Nhà tài trợ có quyền lựa chọn công khai tên hoặc ẩn danh khi xuất hiện trên bảng vinh danh người ủng hộ.</li>
                <li>Danh sách giao dịch được cập nhật tự động realtime trên hệ thống RaiseFund.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="section-3" className="space-y-3 scroll-mt-24">
              <h2 className="font-serif font-bold text-xl md:text-2xl text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#006B3F] text-sm font-bold flex items-center justify-center">3</span>
                Cơ chế giải ngân & Thẩm định
              </h2>
              <p>
                Để đảm bảo tiền tài trợ đến đúng đối tượng thụ hưởng, RaiseFund áp dụng quy trình thẩm định 3 lớp nghiêm ngặt:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs md:text-sm text-slate-600">
                <li><strong>Lớp 1 (Nhà trường nộp đề xuất):</strong> Hiệu trưởng hoặc Đại diện hợp pháp của nhà trường lập hồ sơ đính kèm danh sách học sinh đạt giải.</li>
                <li><strong>Lớp 2 (Hội đồng Kiểm duyệt thẩm định):</strong> Chuyên viên Quỹ rà soát chứng minh nhân thân, xác nhận từ Sở GD&ĐT hoặc Hội đồng thi.</li>
                <li><strong>Lớp 3 (Giải ngân trực tiếp):</strong> Tiền được chuyển trực tiếp vào tài khoản ngân hàng chính thức đứng tên Nhà trường, không qua trung gian cá nhân.</li>
              </ol>
            </div>

            {/* Section 4 */}
            <div id="section-4" className="space-y-3 scroll-mt-24">
              <h2 className="font-serif font-bold text-xl md:text-2xl text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#006B3F] text-sm font-bold flex items-center justify-center">4</span>
                Trách nhiệm của Nhà trường đối tác
              </h2>
              <p>
                Nhà trường đối tác cam kết cung cấp thông tin trung thực, chính xác về hoàn cảnh và thành tích của học sinh. Sau khi dự án được giải ngân thành công, Nhà trường có nghĩa vụ tải lên báo cáo nghiệm thu tài chính và hình ảnh trao tặng thực tế trong vòng 30 ngày.
              </p>
            </div>

            {/* Section 5 */}
            <div id="section-5" className="space-y-3 scroll-mt-24">
              <h2 className="font-serif font-bold text-xl md:text-2xl text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#006B3F] text-sm font-bold flex items-center justify-center">5</span>
                Quyền lợi của Nhà tài trợ
              </h2>
              <p>
                Nhà tài trợ đóng góp trên RaiseFund được cấp **Chứng nhận Tấm lòng vàng Điện tử (PDF)** có mã QR tra cứu tính hợp lệ, nhận báo cáo giải ngân chi tiết và được mời tham dự các chương trình trao học bổng trực tiếp.
              </p>
            </div>

            {/* Section 6 */}
            <div id="section-6" className="space-y-3 scroll-mt-24 pt-4 border-t border-slate-100">
              <h2 className="font-serif font-bold text-xl md:text-2xl text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-[#006B3F]" />
                Thắc mắc & Hỗ trợ Pháp lý
              </h2>
              <p className="text-xs md:text-sm text-slate-600">
                Nếu bạn có bất kỳ thắc mắc nào liên quan đến Điều khoản sử dụng hoặc cần hỗ trợ xác nhận giao dịch, xin vui lòng liên hệ Ban Điều hành Quỹ:
              </p>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2 text-xs md:text-sm">
                <p className="font-bold text-slate-900">BAN ĐIỀU HÀNH QUỸ HỖ TRỢ NHÂN TÀI VIỆT NAM</p>
                <p className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4 text-[#006B3F]" />
                  <span>Email: <strong>quynhantai@gmail.com</strong></span>
                </p>
                <p className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4 text-[#006B3F]" />
                  <span>Hotline: <strong>098 777 3889</strong> (Thứ 2 – Thứ 6, 9h00 – 17h00)</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
