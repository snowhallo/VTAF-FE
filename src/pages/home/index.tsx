import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { CampaignCard } from "@/components/shared/CampaignCard"
import { ProjectCard } from "@/components/shared/ProjectCard"
import {
  Heart,
  Sparkles,
  Award,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Coins,
  GraduationCap,
  Users,
  CheckCircle2,
  Clock,
  Download,
  Building2,
  QrCode,
  FileCheck2,
  ChevronRight
} from "lucide-react"

// Mock Campaigns
const MOCK_CAMPAIGNS = [
  {
    id: "cp-1",
    title: "Cùng em tới trường - Xây dựng điểm trường Bản Mù, Yên Bái",
    description: "Dự án nhằm xây dựng mới 3 phòng học kiên cố, 1 nhà vệ sinh và cung cấp trang thiết bị học tập cho các em học sinh tiểu học tại vùng cao Bản Mù.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    raised: 150000000,
    goal: 200000000,
  },
  {
    id: "cp-2",
    title: "Nước sạch cho buôn làng - Lắp đặt hệ thống lọc nước tại Tây Nguyên",
    description: "Cung cấp hệ thống lọc nước công suất lớn cho 5 buôn làng đang thiếu nước sạch trầm trọng vào mùa khô, bảo vệ sức khỏe cho hơn 2,000 người dân.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    raised: 85000000,
    goal: 100000000,
  },
  {
    id: "cp-3",
    title: "Chắp cánh ước mơ - Quỹ học bổng mồ côi vì đại dịch",
    description: "Tài trợ học phí và sinh hoạt phí cho 500 trẻ em không may mất đi người thân trong đại dịch, đảm bảo các em không bị gián đoạn con đường học vấn.",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    raised: 250000000,
    goal: 500000000,
  }
]

// Mock Urgent Projects for Urgent Priority Feed
const URGENT_PROJECTS = [
  {
    id: "p3",
    title: "Dự án đào tạo kỹ năng số cho học sinh vùng sâu vùng xa",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    raised: 88000000,
    goal: 100000000,
    donorsCount: 89,
    daysLeft: 3, // 🔴 Urgent
    status: "active" as const,
  },
  {
    id: "p4",
    title: "Chương trình trao tặng sách và thiết bị học tập cho trường tiểu học",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    raised: 120000000,
    goal: 150000000,
    donorsCount: 210,
    daysLeft: 5, // 🔴 Urgent
    status: "active" as const,
  },
  {
    id: "p1",
    title: "Dự án cấp phát học bổng khu vực Miền núi phía Bắc",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    raised: 250000000,
    goal: 500000000,
    donorsCount: 154,
    daysLeft: 45,
    status: "active" as const,
  },
]

// Mock Live Donation Honour Feed
const LIVE_DONATIONS = [
  { name: "Nguyễn Hữu Tài", amount: 10000000, project: "Học bổng Olympic Toán quốc gia", time: "2 phút trước" },
  { name: "Nhà hảo tâm ẩn danh", amount: 5000000, project: "Nước sạch buôn làng Tây Nguyên", time: "15 phút trước" },
  { name: "Công ty Cổ phần Công nghệ ABC", amount: 25000000, project: "Cấp phát học bổng Miền núi", time: "1 giờ trước" },
  { name: "Trần Minh Đức", amount: 2000000, project: "Trang bị phòng máy tính", time: "3 giờ trước" },
]

// Mock Partner Institutions
const PARTNER_SCHOOLS = [
  { name: "Đại học Bách Khoa Hà Nội", role: "Đối tác Bảo trợ Tài năng Chuyên sâu", count: "150+ Sinh viên thụ hưởng" },
  { name: "Trường THPT Nguyễn Đình Chiểu", role: "Đơn vị liên kết chương trình học bổng", count: "45 Học sinh giỏi nhận hỗ trợ" },
  { name: "Đại học Quốc gia Hà Nội", role: "Đối tác kiểm duyệt học thuật", count: "200+ Đề xuất nộp hồ sơ" },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 overflow-hidden">
      {/* 🌟 1. HERO BANNER WITH VIBRANT GRADIENT 🌟 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#00502e] via-[#006B3F] to-[#064423] py-16 md:py-24 text-white">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C21A30]/15 rounded-full blur-3xl pointer-events-none -ml-40 -mb-40" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl space-y-6 animate-pop-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200 animate-float">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>CHIẾN DỊCH QUYÊN GÓP NĂM 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-white leading-tight tracking-tight">
              Chắp Cánh Tài Năng Trẻ <span className="text-amber-300 underline decoration-amber-300/40 underline-offset-8">Việt Nam</span>
            </h1>

            <p className="text-white/90 text-base md:text-xl font-medium leading-relaxed max-w-2xl">
              Đồng hành cùng hàng ngàn học sinh, cử nhân tài năng vượt qua hoàn cảnh khó khăn để vươn tới tri thức và cống hiến cho đất nước.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/campaigns/c1"
                className="px-6 py-3.5 bg-[#C21A30] hover:bg-[#a01527] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2 text-base animate-pulse-glow"
              >
                <Heart className="w-5 h-5 fill-current animate-heartbeat" />
                Quyên góp ngay hôm nay
              </Link>
              <a
                href="https://quynhantai.org/gioi-thieu"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl backdrop-blur-sm transition-all flex items-center gap-2 text-base"
              >
                <span>Tìm hiểu về Quỹ</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 📊 2. PREMIUM IMPACT STATS SECTION 📊 */}
      <section className="relative -mt-8 md:-mt-12 z-20 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

          <div className="group relative bg-white/90 backdrop-blur-xl border border-slate-200/80 hover:border-emerald-500/40 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#00502e] to-[#009e5b] text-white flex items-center justify-center shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform">
                <Coins className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12.5%
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-slate-900 via-[#006B3F] to-emerald-700 bg-clip-text text-transparent">
              485.000.000đ
            </h3>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">Tổng kinh phí tài trợ</p>
          </div>

          <div className="group relative bg-white/90 backdrop-blur-xl border border-slate-200/80 hover:border-rose-500/40 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#a01527] to-[#e63946] text-white flex items-center justify-center shadow-lg shadow-rose-900/20 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 fill-current animate-heartbeat" />
              </div>
              <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                154 lượt ủng hộ
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-slate-900 via-[#C21A30] to-rose-600 bg-clip-text text-transparent">
              154+
            </h3>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">Nhà hảo tâm đồng hành</p>
          </div>

          <div className="group relative bg-white/90 backdrop-blur-xl border border-slate-200/80 hover:border-indigo-500/40 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-indigo-900/20 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                Miền Bắc & Trung
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-700 to-blue-600 bg-clip-text text-transparent">
              12 Trường
            </h3>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">Trường học & Viện đối tác</p>
          </div>

          <div className="group relative bg-white/90 backdrop-blur-xl border border-slate-200/80 hover:border-amber-500/40 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-400 text-white flex items-center justify-center shadow-lg shadow-amber-900/20 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                Đối soát tự động
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-slate-900 via-amber-700 to-yellow-600 bg-clip-text text-transparent">
              100%
            </h3>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">Minh bạch công khai</p>
          </div>

        </div>
      </section>

      {/* 🔴 3. URGENT PRIORITY PROJECTS FEED SECTION 🔴 */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 animate-pulse">
                <Clock className="w-3.5 h-3.5" />
                CẦN QUYÊN GÓP KHẨN CẤP
              </div>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900">
                Dự án sắp hết hạn cần đồng hành
              </h2>
              <p className="text-slate-600 text-sm md:text-base">
                Ưu tiên ủng hộ các dự án đang tiến gần mốc thời hạn để đảm bảo kinh phí giải ngân kịp thời cho học sinh.
              </p>
            </div>
            <Link
              to="/campaigns/c1"
              className="text-xs md:text-sm font-bold text-[#006B3F] hover:underline flex items-center gap-1"
            >
              Xem tất cả dự án &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {URGENT_PROJECTS.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* 🌟 4. FEATURED CAMPAIGNS SECTION 🌟 */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#006B3F] text-xs font-bold border border-emerald-100">
                <TrendingUp className="w-3.5 h-3.5" />
                CỘNG ĐỒNG CHUNG TAY
              </div>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900">Chiến dịch quyên góp trọng điểm</h2>
              <p className="text-slate-600 text-sm md:text-base">
                Những chương trình quy mô lớn đang cần sự hỗ trợ từ cộng đồng để tạo ra những thay đổi mang tính bước ngoặt.
              </p>
            </div>
            <Button variant="outline" asChild className="rounded-xl border-slate-300 hover:bg-slate-100">
              <Link to="/campaigns/c1">Xem tất cả chiến dịch &rarr;</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_CAMPAIGNS.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* 🔄 5. 4-STEP TRANSPARENCY WORKFLOW SECTION 🔄 */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-emerald-50/50 border-t border-slate-200/80">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-[#006B3F] text-xs font-bold uppercase tracking-wider">
              Quy trình 4 bước đơn giản
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900">
              Minh bạch tuyệt đối từng đồng ủng hộ
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Hệ thống công nghệ tự động hóa từ khâu tiếp nhận quyên góp đến giải ngân tận tay nhà trường.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006B3F] font-extrabold flex items-center justify-center text-base">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900">Chọn dự án thụ hưởng</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dễ dàng tìm kiếm và lựa chọn dự án học bổng hoặc thiết bị học tập phù hợp với mong muốn của bạn.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#C21A30] font-extrabold flex items-center justify-center text-base">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900">Quét mã VietQR</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Thực hiện chuyển khoản nhanh chóng qua ứng dụng ngân hàng bất kỳ với thông tin giao dịch chính xác 100%.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-extrabold flex items-center justify-center text-base">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900">Nhận chứng nhận PDF</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hệ thống tự động cấp Chứng nhận Tấm lòng vàng Điện tử gửi trực tiếp tới email của bạn.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 font-extrabold flex items-center justify-center text-base">
                4
              </div>
              <h3 className="font-bold text-base text-slate-900">Theo dõi báo cáo nghiệm thu</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Xem chứng minh giải ngân và hình ảnh trao tặng trực tiếp từ phía Nhà trường trên hệ thống.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 📜 6. LIVE DONATION HONOUR WALL FEED 📜 */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-100">
                <Heart className="w-3.5 h-3.5 fill-current animate-heartbeat" />
                DÒNG THỜI GIAN ĐỦ THÔNG TIN
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
                Lượt quyên góp mới nhất từ cộng đồng
              </h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Mỗi khoản đóng góp nhỏ bé đều là nguồn động viên to lớn giúp các em học sinh có thêm động lực vươn lên.
              </p>
            </div>

            <div className="lg:col-span-2 space-y-3">
              {LIVE_DONATIONS.map((d, index) => (
                <div key={index} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4 hover:bg-emerald-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#006B3F] font-bold flex items-center justify-center shrink-0">
                      {d.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs md:text-sm text-slate-900">{d.name}</h4>
                      <p className="text-[11px] text-slate-500 truncate max-w-[200px] sm:max-w-xs">{d.project}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-extrabold text-xs md:text-sm text-[#006B3F] block">
                      +{new Intl.NumberFormat("vi-VN").format(d.amount)}đ
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{d.time}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 🏫 7. PARTNER INSTITUTIONS SHOWCASE 🏫 */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-xl md:text-3xl font-serif font-bold text-slate-900">Trường học & Viện đối tác đồng hành</h2>
            <p className="text-xs md:text-sm text-slate-600">Đơn vị tiếp nhận và giải ngân trực tiếp kinh phí học bổng</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PARTNER_SCHOOLS.map((school, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006B3F] flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{school.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{school.role}</p>
                  <span className="inline-block text-[11px] font-bold text-[#006B3F] mt-2 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {school.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
