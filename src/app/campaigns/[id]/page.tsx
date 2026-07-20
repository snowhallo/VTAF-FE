"use client"

import { useState, useCallback } from "react"
import { CampaignSearch, StatusFilter } from "@/components/features/CampaignSearch"
import { ProjectCard } from "@/components/shared/ProjectCard"
import { EmptyState } from "@/components/shared/EmptyState"

// Dữ liệu mẫu (Mock data)
const MOCK_PROJECTS = [
  {
    id: "p1",
    title: "Dự án cấp phát học bổng khu vực Miền núi phía Bắc",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    raised: 250000000,
    goal: 500000000,
    donorsCount: 154,
    daysLeft: 45,
    status: "active" as const
  },
  {
    id: "p2",
    title: "Học bổng bồi dưỡng tài năng trẻ Đại học Bách Khoa",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    raised: 400000000,
    goal: 400000000,
    donorsCount: 320,
    daysLeft: 0,
    status: "closed" as const
  },
  {
    id: "p3",
    title: "Dự án đào tạo kỹ năng số cho học sinh vùng sâu vùng xa",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    raised: 50000000,
    goal: 100000000,
    donorsCount: 89,
    daysLeft: 20,
    status: "active" as const
  }
]

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")

  const handleSearch = useCallback((query: string, status: StatusFilter) => {
    setSearchQuery(query)
    setStatusFilter(status)
  }, [])

  const filteredProjects = MOCK_PROJECTS.filter((project) => {
    const matchesQuery = project.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesQuery && matchesStatus
  })

  const hasActiveFilter = searchQuery !== "" || statusFilter !== "all"

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
      {/* Hero Banner */}
      <section className="w-full bg-[#006B3F] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-white mb-4 uppercase tracking-wide">
            TRỢ LÝ AI HỖ TRỢ CỬ NHÂN TÀI NĂNG
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
            Chiến dịch ứng dụng trí tuệ nhân tạo để đồng hành cùng các bạn sinh viên xuất sắc trên con đường chinh phục tri thức và sự nghiệp.
          </p>
        </div>
      </section>

      {/* Khu vực Tìm kiếm và Danh sách Dự án */}
      <section className="container mx-auto px-4 md:px-6 -mt-6 relative z-10">
        {/* Thanh tìm kiếm */}
        <div className="bg-white px-6 py-5 rounded-xl shadow-sm border border-slate-200 mb-10">
          <CampaignSearch onSearch={handleSearch} />
        </div>

        {/* Header danh sách */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Danh sách dự án
          </h2>
          <span className="text-sm text-slate-500">
            {filteredProjects.length} dự án{hasActiveFilter ? " được tìm thấy" : ""}
          </span>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
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
