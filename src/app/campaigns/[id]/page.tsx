"use client";
import { useState, useCallback, useMemo, useEffect } from "react"
import Link from "next/link";
import { useParams } from "next/navigation";
import { CampaignSearch, StatusFilter } from "@/components/features/CampaignSearch"
import { ProjectCard } from "@/components/shared/ProjectCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { ChevronLeft, ChevronRight, ArrowUpDown, Filter, Sparkles, ChevronRight as ChevronRightIcon } from "lucide-react"

// ─── Extended Mock Projects Dataset (12 Projects) ────────────────────────────
export interface ProjectItem {
  id: string
  title: string
  imageUrl: string
  raised: number
  goal: number
  donorsCount: number
  daysLeft: number
  status: "active" | "closed"
  postedDate: string
}

const MOCK_CAMPAIGN_PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "Dự án cấp phát học bổng khu vực Miền núi phía Bắc",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    raised: 250000000,
    goal: 500000000,
    donorsCount: 154,
    daysLeft: 45,
    status: "active",
    postedDate: "2026-07-22",
  },
  {
    id: "p3",
    title: "Dự án đào tạo kỹ năng số cho học sinh vùng sâu vùng xa",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    raised: 88000000,
    goal: 100000000,
    donorsCount: 89,
    daysLeft: 3, // 🔴 Urgent (<= 7 days)
    status: "active",
    postedDate: "2026-07-15",
  },
  {
    id: "p4",
    title: "Chương trình trao tặng sách và thiết bị học tập cho trường tiểu học",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    raised: 120000000,
    goal: 150000000,
    donorsCount: 210,
    daysLeft: 5, // 🔴 Urgent (<= 7 days)
    status: "active",
    postedDate: "2026-07-10",
  },
  {
    id: "p5",
    title: "Học bổng bảo trợ cử nhân công nghệ tài năng thi Olympic toán học",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    raised: 45000000,
    goal: 200000000,
    donorsCount: 65,
    daysLeft: 14,
    status: "active",
    postedDate: "2026-07-18",
  },
  {
    id: "p6",
    title: "Trang bị phòng máy tính thông minh cho học sinh nghèo vượt khó",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    raised: 30000000,
    goal: 120000000,
    donorsCount: 42,
    daysLeft: 25,
    status: "active",
    postedDate: "2026-07-05",
  },
  {
    id: "p7",
    title: "Tài trợ chi phí sinh hoạt cho học sinh chuyên Tin thi Quốc gia",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    raised: 95000000,
    goal: 100000000,
    donorsCount: 178,
    daysLeft: 2, // 🔴 Urgent (<= 7 days)
    status: "active",
    postedDate: "2026-07-01",
  },
  {
    id: "p2",
    title: "Học bổng bồi dưỡng tài năng trẻ Đại học Bách Khoa",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    raised: 400000000,
    goal: 400000000,
    donorsCount: 320,
    daysLeft: 0,
    status: "closed",
    postedDate: "2026-06-01",
  },
  {
    id: "p8",
    title: "Nâng cấp cơ sở vật chất phòng thí nghiệm lý sinh cho THPT chuyên",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    raised: 150000000,
    goal: 150000000,
    donorsCount: 195,
    daysLeft: 0,
    status: "closed",
    postedDate: "2026-05-15",
  },
  {
    id: "p9",
    title: "Học bổng Nữ sinh theo đuổi ngành Khoa học máy tính",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    raised: 180000000,
    goal: 200000000,
    donorsCount: 130,
    daysLeft: 30,
    status: "active",
    postedDate: "2026-07-20",
  },
  {
    id: "p10",
    title: "Tài trợ tủ sách pháp luật và kỹ năng sống học đường",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
    raised: 25000000,
    goal: 80000000,
    donorsCount: 38,
    daysLeft: 40,
    status: "active",
    postedDate: "2026-07-21",
  },
  {
    id: "p11",
    title: "Chương trình huấn luyện kỹ năng mềm cho sinh viên năm cuối",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    raised: 60000000,
    goal: 60000000,
    donorsCount: 88,
    daysLeft: 0,
    status: "closed",
    postedDate: "2026-06-10",
  },
  {
    id: "p12",
    title: "Tài trợ thiết bị thể thao nâng cao thể chất học sinh miền núi",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
    raised: 70000000,
    goal: 90000000,
    donorsCount: 92,
    daysLeft: 6, // 🔴 Urgent (<= 7 days)
    status: "active",
    postedDate: "2026-07-08",
  },
]

interface CampaignData {
  id: string
  title: string
  subtitle: string
  badgeText: string
  description: string
  projects: ProjectItem[]
}

const MOCK_CAMPAIGNS_DATABASE: Record<string, CampaignData> = {
  c1: {
    id: "c1",
    title: "TRỢ LÝ AI HỖ TRỢ CỬ NHÂN TÀI NĂNG",
    subtitle: "CHIẾN DỊCH QUYÊN GÓP TRỌNG ĐIỂM NĂM 2026",
    badgeText: "CÔNG NGHỆ & BẢO TRỢ TÀI NĂNG",
    description: "Chiến dịch ứng dụng trí tuệ nhân tạo để đồng hành cùng các bạn sinh viên, cử nhân xuất sắc trên con đường chinh phục tri thức và cống hiến cho đất nước.",
    projects: MOCK_CAMPAIGN_PROJECTS,
  },
  "cp-1": {
    id: "cp-1",
    title: "CÙNG EM TỚI TRƯỜNG - XÂY DỰNG ĐIỂM TRƯỜNG BẢN MÙ, YÊN BÁI",
    subtitle: "CHIẾN DỊCH HỖ TRỢ VÙNG CAO NĂM 2026",
    badgeText: "CƠ SỞ VẬT CHẤT HỌC ĐƯỜNG",
    description: "Dự án quyên góp nhằm xây dựng mới 3 phòng học kiên cố, 1 nhà vệ sinh và cung cấp trang thiết bị học tập cho các em học sinh tiểu học tại vùng cao Bản Mù.",
    projects: MOCK_CAMPAIGN_PROJECTS.slice(0, 6),
  },
  "cp-2": {
    id: "cp-2",
    title: "NƯỚC SẠCH CHO BUÔN LÀNG - LẮP ĐẶT HỆ THỐNG LỌC NƯỚC TẠI TÂY NGUYÊN",
    subtitle: "CHIẾN DỊCH NƯỚC SẠCH HỌC ĐƯỜNG & BUÔN LÀNG",
    badgeText: "Y TẾ & SỨC KHỎE CỘNG ĐỒNG",
    description: "Cung cấp hệ thống lọc nước công suất lớn cho 5 buôn làng đang thiếu nước sạch trầm trọng vào mùa khô, bảo vệ sức khỏe cho hơn 2,000 người dân địa phương.",
    projects: MOCK_CAMPAIGN_PROJECTS.slice(3, 9),
  },
  "cp-3": {
    id: "cp-3",
    title: "CHẮP CÁNH ƯỚC MƠ - QUỸ HỌC BỔNG MỒ CÔI VÌ ĐẠI DỊCH",
    subtitle: "CHIẾN DỊCH BẢO TRỢ HỌC PHÍ DÀI HẠN",
    badgeText: "AN SINH & KHUYẾN HỌC",
    description: "Tài trợ học phí và sinh hoạt phí cho 500 trẻ em không may mất đi người thân trong đại dịch, đảm bảo các em không bị gián đoạn con đường học vấn cho đến khi trưởng thành.",
    projects: MOCK_CAMPAIGN_PROJECTS.slice(6, 12),
  },
}

export type SortCriterion = "urgent" | "newest" | "needed" | "popular"

export default function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>()

  // 🎯 Dynamic Campaign Lookup (defaults to c1 if ID not found)
  const campaign = (id && MOCK_CAMPAIGNS_DATABASE[id]) ? MOCK_CAMPAIGNS_DATABASE[id] : MOCK_CAMPAIGNS_DATABASE["c1"]

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [sortBy, setSortBy] = useState<SortCriterion>("urgent") // Default: Urgent First (Sắp hết hạn)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 6

  // Smooth scroll to top whenever campaign ID changes!
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setCurrentPage(1)
  }, [id])

  const handleSearch = useCallback((query: string, status: StatusFilter) => {
    setSearchQuery(query)
    setStatusFilter(status)
    setCurrentPage(1)
  }, [])

  // 🎯 OPTIMAL SORTING & FILTERING LOGIC FOR CAMPAIGN PROJECTS
  const processedProjects = useMemo(() => {
    let result = [...campaign.projects]

    // 1. Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter((p) => p.title.toLowerCase().includes(q))
    }

    // 2. Status filter
    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter)
    }

    // 3. Sorting criteria
    result.sort((a, b) => {
      // Always prioritize active projects before closed ones
      if (a.status === "active" && b.status === "closed") return -1
      if (a.status === "closed" && b.status === "active") return 1

      if (sortBy === "urgent") {
        return a.daysLeft - b.daysLeft
      }
      if (sortBy === "newest") {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      }
      if (sortBy === "needed") {
        const pctA = a.raised / a.goal
        const pctB = b.raised / b.goal
        return pctA - pctB
      }
      if (sortBy === "popular") {
        return b.donorsCount - a.donorsCount
      }
      return 0
    })

    return result
  }, [campaign.projects, searchQuery, statusFilter, sortBy])

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(processedProjects.length / itemsPerPage))
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return processedProjects.slice(start, start + itemsPerPage)
  }, [processedProjects, currentPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 400, behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
            <Link href="/" className="hover:text-slate-900 transition-colors whitespace-nowrap">
              Trang chủ
            </Link>
            <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500 font-medium whitespace-nowrap">
              Chiến dịch quyên góp
            </span>
            <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-bold truncate max-w-[300px]">
              {campaign.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Dynamic Campaign Hero Banner */}
      <section className="w-full bg-gradient-to-r from-[#00502e] via-[#006B3F] to-[#064423] py-14 md:py-18 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200 animate-float">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{campaign.badgeText}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold tracking-wide uppercase max-w-4xl mx-auto leading-tight">
            {campaign.title}
          </h1>
          <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            {campaign.description}
          </p>
        </div>
      </section>

      {/* Khu vực Tìm kiếm, Bộ lọc và Danh sách Dự án */}
      <section className="container mx-auto px-4 md:px-6 -mt-6 relative z-10">
        {/* Thanh tìm kiếm */}
        <div className="bg-white px-6 py-5 rounded-2xl shadow-md border border-slate-200/80 mb-8">
          <CampaignSearch onSearch={handleSearch} />
        </div>

        {/* Header danh sách & Thanh Sắp xếp */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900">
              Danh sách dự án thuộc chiến dịch ({processedProjects.length})
            </h2>
            <span className="text-xs font-bold text-[#006B3F] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              Trang {currentPage} / {totalPages}
            </span>
          </div>

          {/* Controls: Sorting Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 whitespace-nowrap">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              Sắp xếp theo:
            </span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as SortCriterion)
                setCurrentPage(1)
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F] appearance-none cursor-pointer"
            >
              <option value="urgent">🔴 Khẩn cấp nhất (Sắp hết hạn)</option>
              <option value="newest">🆕 Mới nhất</option>
              <option value="needed">📉 Cần ủng hộ nhất (% Đạt thấp)</option>
              <option value="popular">❤️ Được quan tâm nhất (Nhiều ủng hộ)</option>
            </select>
          </div>
        </div>

        {/* Project Cards Grid */}
        {paginatedProjects.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {paginatedProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-6 py-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <span className="text-slate-500 font-medium">
                  Hiển thị <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> - <strong>{Math.min(currentPage * itemsPerPage, processedProjects.length)}</strong> trên <strong>{processedProjects.length}</strong> dự án
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Trang trước"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentPage === page
                          ? "bg-[#006B3F] text-[#ffffff] shadow-md"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Trang sau"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <EmptyState
            title="Không tìm thấy dự án nào"
            description={
              searchQuery
                ? `Không có dự án nào khớp với từ khóa "${searchQuery}"${statusFilter !== "all" ? ` và trạng thái "${statusFilter === "active" ? "Đang diễn ra" : "Hoàn thành"}"` : ""}. Hãy thử lại với bộ lọc khác.`
                : `Không có dự án nào ở trạng thái "${statusFilter === "active" ? "Đang diễn ra" : "Hoàn thành"}".`
            }
          />
        )}
      </section>
    </div>
  )
}
