"use client";
import { useState, useMemo, useEffect } from "react"
import Link from "next/link";
import { CampaignCard } from "@/components/shared/CampaignCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { Search, ChevronRight, Sparkles, FolderKanban, Filter, Heart, ArrowRight } from "lucide-react"

export interface CampaignListItem {
  id: string
  title: string
  badgeText: string
  description: string
  imageUrl: string
  projectCount: number
  status: "active" | "closed"
}

export const ALL_CAMPAIGNS: CampaignListItem[] = [
  {
    id: "c1",
    title: "Trợ lý AI hỗ trợ cử nhân tài năng",
    badgeText: "CÔNG NGHỆ & BẢO TRỢ TÀI NĂNG",
    description: "Chiến dịch ứng dụng trí tuệ nhân tạo để đồng hành cùng các bạn sinh viên xuất sắc trên con đường chinh phục tri thức và cống hiến cho đất nước.",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    projectCount: 12,
    status: "active",
  },
  {
    id: "cp-1",
    title: "Cùng em tới trường - Xây dựng điểm trường Bản Mù, Yên Bái",
    badgeText: "CƠ SỞ VẬT CHẤT HỌC ĐƯỜNG",
    description: "Dự án quyên góp nhằm xây dựng mới 3 phòng học kiên cố, 1 nhà vệ sinh và cung cấp trang thiết bị học tập cho các em học sinh tiểu học tại vùng cao Bản Mù.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    projectCount: 6,
    status: "active",
  },
  {
    id: "cp-2",
    title: "Nước sạch cho buôn làng - Lắp đặt hệ thống lọc nước tại Tây Nguyên",
    badgeText: "Y TẾ & SỨC KHỎE CỘNG ĐỒNG",
    description: "Cung cấp hệ thống lọc nước công suất lớn cho 5 buôn làng đang thiếu nước sạch trầm trọng vào mùa khô, bảo vệ sức khỏe cho hơn 2,000 người dân địa phương.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    projectCount: 6,
    status: "active",
  },
  {
    id: "cp-3",
    title: "Chắp cánh ước mơ - Quỹ học bổng mồ côi vì đại dịch",
    badgeText: "AN SINH & KHUYẾN HỌC",
    description: "Tài trợ học phí và sinh hoạt phí cho 500 trẻ em không may mất đi người thân trong đại dịch, đảm bảo các em không bị gián đoạn con đường học vấn cho đến khi trưởng thành.",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    projectCount: 6,
    status: "active",
  },
]

export default function CampaignListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const filteredCampaigns = useMemo(() => {
    return ALL_CAMPAIGNS.filter((campaign) => {
      const matchesSearch =
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.badgeText.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === "all" ||
        (selectedCategory === "tech" && campaign.badgeText.includes("CÔNG NGHỆ")) ||
        (selectedCategory === "facility" && campaign.badgeText.includes("CƠ SỞ VẬT CHẤT")) ||
        (selectedCategory === "health" && campaign.badgeText.includes("Y TẾ")) ||
        (selectedCategory === "scholarship" && campaign.badgeText.includes("AN SINH"))

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
            <Link href="/" className="hover:text-slate-900 transition-colors whitespace-nowrap">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-bold whitespace-nowrap">
              Danh sách chiến dịch quyên góp
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="w-full bg-gradient-to-r from-[#00502e] via-[#006B3F] to-[#064423] py-14 md:py-20 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200 animate-float">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>QUỸ HỖ TRỢ NHÂN TÀI VIỆT NAM</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-extrabold tracking-wide uppercase">
            DANH SÁCH CÁC CHIẾN DỊCH QUYÊN GÓP
          </h1>
          <p className="text-white/90 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed">
            Tổng hợp các chương trình quyên góp quy mô lớn nhằm hỗ trợ học sinh, cử nhân và hạ tầng giáo dục trên toàn quốc. Hãy chọn chiến dịch phù hợp để khám phá các dự án thụ hưởng.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar Section */}
      <section className="container mx-auto px-4 md:px-6 -mt-6 relative z-10">
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-md border border-slate-200/80 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm chiến dịch theo tên, nội dung hoặc lĩnh vực..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/30 focus:border-[#006B3F] transition"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-[#006B3F] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setSelectedCategory("tech")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === "tech"
                    ? "bg-[#006B3F] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Công nghệ & AI
              </button>
              <button
                onClick={() => setSelectedCategory("facility")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === "facility"
                    ? "bg-[#006B3F] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Cơ sở vật chất
              </button>
              <button
                onClick={() => setSelectedCategory("health")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === "health"
                    ? "bg-[#006B3F] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Nước sạch & Y tế
              </button>
              <button
                onClick={() => setSelectedCategory("scholarship")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === "scholarship"
                    ? "bg-[#006B3F] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Học bổng
              </button>
            </div>
          </div>
        </div>

        {/* Section Title & Counter */}
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-[#006B3F]" />
            Chiến dịch quyên góp hiện có ({filteredCampaigns.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Bấm chọn chiến dịch để xem chi tiết các dự án thụ hưởng
          </span>
        </div>

        {/* Campaign Cards Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                id={campaign.id}
                title={campaign.title}
                description={campaign.description}
                imageUrl={campaign.imageUrl}
                badgeText={campaign.badgeText}
                projectCount={campaign.projectCount}
                showProgress={false}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Không tìm thấy chiến dịch nào"
            description={
              searchQuery
                ? `Không có chiến dịch nào khớp với từ khóa "${searchQuery}". Hãy thử tìm kiếm từ khóa khác.`
                : "Không tìm thấy chiến dịch phù hợp với bộ lọc."
            }
          />
        )}
      </section>
    </div>
  )
}
