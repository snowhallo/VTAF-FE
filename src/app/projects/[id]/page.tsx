"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon, Heart, Share2, CalendarDays, Users, Landmark, Clock } from "lucide-react"
import { DonationModal } from "@/components/shared/DonationModal"
import { ShareModal } from "@/components/shared/ShareModal"
import { ProjectCard } from "@/components/shared/ProjectCard"
import { ProgressBar } from "@/components/shared/ProgressBar"

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80",
]

const MOCK_DONORS = [
  { id: 1, name: "Nhà hảo tâm đã ủng hộ 300.000 VND", initial: "D", amount: 300000, message: "Chúc Huyền sớm bình phục, cố gắng lên nhé", time: "19/07/2026" },
  { id: 2, name: "Nhà hảo tâm đã ủng hộ 100.000 VND", initial: "D", amount: 100000, message: "", time: "18/07/2026" },
  { id: 3, name: "Nhà hảo tâm đã ủng hộ 50.000 VND", initial: "D", amount: 50000, message: "Chúc chị mau khoẻ ạ", time: "16/07/2026" },
  { id: 4, name: "Nhà hảo tâm đã ủng hộ 50.000 VND", initial: "D", amount: 50000, message: "", time: "15/07/2026" },
]

const MOCK_PROJECT = {
  id: "p1",
  title: "Dự án cấp phát học bổng khu vực Miền núi phía Bắc",
  campaignId: "c1",
  campaignName: "Trợ lý AI hỗ trợ cử nhân tài năng",
  status: "active" as "active" | "closed",
  raised: 250000000,
  goal: 500000000,
  donorsCount: 154,
  daysLeft: 45,
  postedDate: "22/07/2026",
  tags: [
    { label: "Học bổng", color: "bg-emerald-100 text-emerald-700" },
    { label: "Giáo dục", color: "bg-blue-100 text-blue-700" },
  ],
}

const MOCK_RELATED_PROJECTS = [
  {
    id: "p3",
    title: "Dự án đào tạo kỹ năng số cho học sinh vùng sâu vùng xa",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    raised: 50000000,
    goal: 100000000,
    donorsCount: 89,
    daysLeft: 20,
    status: "active" as const,
    campaignId: "c1",
  },
  {
    id: "p4",
    title: "Tài trợ phòng máy tính hiện đại bồi dưỡng tin học cho tài năng trẻ Điện Biên",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    raised: 120000000,
    goal: 300000000,
    donorsCount: 92,
    daysLeft: 35,
    status: "active" as const,
    campaignId: "c1",
  },
  {
    id: "p5",
    title: "Chương trình sữa học đường hỗ trợ dinh dưỡng học sinh tiểu học",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    raised: 95000000,
    goal: 150000000,
    donorsCount: 110,
    daysLeft: 12,
    status: "active" as const,
    campaignId: "c1",
  },
  {
    id: "p6",
    title: "Học bổng chắp cánh năng khiếu vượt trội cho tài năng trẻ",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    raised: 45000000,
    goal: 80000000,
    donorsCount: 65,
    daysLeft: 18,
    status: "active" as const,
    campaignId: "c1",
  },
  {
    id: "p7",
    title: "Tặng học bổng & tài liệu nghiên cứu chuyên sâu cho học sinh giỏi Lai Châu",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    raised: 85000000,
    goal: 200000000,
    donorsCount: 142,
    daysLeft: 29,
    status: "active" as const,
    campaignId: "c1",
  },
  {
    id: "p8",
    title: "Dự án xây dựng điểm trường mầm non tại Mường Nhé",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    raised: 150000000,
    goal: 400000000,
    donorsCount: 180,
    daysLeft: 50,
    status: "active" as const,
    campaignId: "c1",
  },
  {
    id: "p9",
    title: "Hỗ trợ học bổng phát triển tài năng học thuật dài hạn cho học sinh xuất sắc Điện Biên",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    raised: 30000000,
    goal: 60000000,
    donorsCount: 45,
    daysLeft: 15,
    status: "active" as const,
    campaignId: "c1",
  },
  {
    id: "p10",
    title: "Tặng học bổng nghiên cứu khoa học và sách chuyên khảo cho học sinh chuyên Hà Giang",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    raised: 24000000,
    goal: 50000000,
    donorsCount: 38,
    daysLeft: 10,
    status: "active" as const,
    campaignId: "c1",
  },
  {
    id: "p11",
    title: "Quỹ tài trợ máy tính học tập học thuật cho học sinh giỏi Lào Cai",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    raised: 75000000,
    goal: 100000000,
    donorsCount: 95,
    daysLeft: 22,
    status: "active" as const,
    campaignId: "c1",
  },
  {
    id: "p12",
    title: "Dự án ánh sáng học đường cải thiện phòng học Sơn La",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    raised: 110000000,
    goal: 180000000,
    donorsCount: 122,
    daysLeft: 30,
    status: "active" as const,
    campaignId: "c1",
  },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function ImageSlider() {
  const total = MOCK_IMAGES.length
  // activeIndex: the visible slide index shown to user / indicators
  const [activeIndex, setActiveIndex] = useState(0)
  // exitIndex: slide being animated out (null when idle)
  const [exitIndex, setExitIndex]     = useState<number | null>(null)
  const [direction, setDirection]     = useState<"next" | "prev">("next")

  const goTo = useCallback((nextIdx: number, dir: "next" | "prev") => {
    if (exitIndex !== null) return   // block during animation
    setExitIndex(activeIndex)
    setDirection(dir)
    setActiveIndex(nextIdx)
  }, [activeIndex, exitIndex])

  const handleNext = useCallback(() => {
    goTo((activeIndex + 1) % total, "next")
  }, [activeIndex, total, goTo])

  const handlePrev = useCallback(() => {
    goTo((activeIndex - 1 + total) % total, "prev")
  }, [activeIndex, total, goTo])

  // Clear exitIndex after animation completes
  const handleExitEnd = useCallback(() => {
    setExitIndex(null)
  }, [])

  useEffect(() => {
    const id = setInterval(handleNext, 5000)
    return () => clearInterval(id)
  }, [handleNext])

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100 rounded-lg select-none">

      {/* Exiting slide — plays exit animation then disappears */}
      {exitIndex !== null && (
        <div
          key={`exit-${exitIndex}-${direction}`}
          className={`absolute inset-0 ${direction === "next" ? "carousel-exit-next" : "carousel-exit-prev"}`}
          onAnimationEnd={handleExitEnd}
        >
          <Image
            src={MOCK_IMAGES[exitIndex]}
            alt={`Hình ảnh dự án ${exitIndex + 1}`}
            fill className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
        </div>
      )}

      {/* Active slide — plays enter animation */}
      <div
        key={`active-${activeIndex}-${direction}`}
        className={`absolute inset-0 ${exitIndex !== null ? (direction === "next" ? "carousel-enter-next" : "carousel-enter-prev") : ""}`}
      >
        <Image
          src={MOCK_IMAGES[activeIndex]}
          alt={`Hình ảnh dự án ${activeIndex + 1}`}
          fill className="object-cover"
          sizes="(max-width: 1024px) 100vw, 800px"
          priority={activeIndex === 0}
        />
      </div>

      {/* Dot indicators (Flowbite style) */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {MOCK_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              if (i !== activeIndex) goTo(i, i > activeIndex ? "next" : "prev")
            }}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border-0 ${
              activeIndex === i ? "bg-white scale-110 shadow-sm" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Prev button (Flowbite style) */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        aria-label="Previous slide"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white transition-all">
          <ChevronLeft className="w-6 h-6 text-white" />
        </span>
      </button>

      {/* Next button (Flowbite style) */}
      <button
        type="button"
        onClick={handleNext}
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        aria-label="Next slide"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white transition-all">
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </span>
      </button>
    </div>
  )
}

function ContentTabs() {
  const [tab, setTab] = useState<"story" | "update">("story")

  return (
    <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex border-b border-slate-200">
        {([["story", "Câu chuyện"], ["update", "Cập nhật"]] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex-1 py-3.5 text-sm font-bold transition-colors ${tab === key ? "text-[#006B3F] border-b-2 border-[#006B3F] bg-slate-50" : "text-slate-500 hover:text-slate-700"}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="p-6 md:p-8 text-slate-700 leading-relaxed text-sm md:text-base">
        {tab === "story" ? (
          <div className="space-y-4">
            <p>Có những học sinh sở hữu tiềm năng và trí tuệ vượt trội, đạt thành tích cao trong các cuộc thi quốc tế và quốc gia. Nhưng vì điều kiện tài chính gia đình, các em có nguy cơ bỏ lỡ cơ hội tiếp xúc với các chương trình đào tạo chuyên sâu và tài liệu học tập tiên tiến.</p>
            <h3 className="text-lg font-bold text-slate-900 mt-6">Chung tay nâng bước nhân tài Việt</h3>
            <p>Mỗi suất học bổng không chỉ là một sự hỗ trợ tài chính — đó là bệ phóng giúp các tài năng học thuật có cơ hội tiếp cận giáo dục chất lượng cao, phát triển kỹ năng vượt trội và cống hiến cho xã hội.</p>
            <p>Quỹ Hỗ trợ Nhân tài Việt Nam đặt mục tiêu trao tặng 100 suất học bổng khuyến tài cho các học sinh xuất sắc vượt trội trong năm học 2026–2027. Mỗi suất trị giá 5.000.000 VND, hỗ trợ trực tiếp cho mục tiêu phát triển tài năng.</p>
            <blockquote className="border-l-4 border-[#006B3F] pl-4 italic text-slate-600 bg-slate-50 py-3 pr-4 rounded-r-lg">
              Đầu tư vào giáo dục và bồi dưỡng nhân tài là đầu tư hiệu quả nhất cho tương lai quốc gia. Mỗi sự ủng hộ hôm nay là một bệ phóng nâng bước nhân tài Việt. ❤️
            </blockquote>
          </div>
        ) : (
          <div className="space-y-4 text-slate-500 text-center py-8">
            <Clock className="w-12 h-12 mx-auto text-slate-300" />
            <p>Chưa có cập nhật nào từ ban tổ chức.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function RelatedProjectsSlider({ projects }: { projects: typeof MOCK_RELATED_PROJECTS }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      let val = 3
      if (window.innerWidth >= 1024) val = 3
      else if (window.innerWidth >= 768) val = 2
      else val = 1
      setItemsPerView(val)
      setCurrentPage(0)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Partition projects into pages
  const pages: typeof projects[] = []
  for (let i = 0; i < projects.length; i += itemsPerView) {
    pages.push(projects.slice(i, i + itemsPerView))
  }

  const totalPages = pages.length
  const visibleDots = Math.min(5, totalPages)

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative group/slider mt-6">
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        type="button"
        aria-label="Dự án trước"
        className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#C21A30] hover:bg-[#a01527] text-white flex items-center justify-center shadow-lg transition-all active:scale-95 z-20 hover:scale-105"
      >
        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>
      <button
        onClick={handleNext}
        type="button"
        aria-label="Dự án tiếp"
        className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#C21A30] hover:bg-[#a01527] text-white flex items-center justify-center shadow-lg transition-all active:scale-95 z-20 hover:scale-105"
      >
        <ChevronRightIcon className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      {/* Viewport wrapper */}
      <div className="w-full overflow-hidden px-1">
        <div
          className="flex transition-transform duration-700"
          style={{
            transform: `translateX(-${currentPage * (100 / totalPages)}%)`,
            width: `${totalPages * 100}%`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {pages.map((pageItems, pageIdx) => (
            <div
              key={pageIdx}
              style={{ width: `${100 / totalPages}%` }}
              className="flex justify-center gap-6 flex-shrink-0 px-2"
            >
              {pageItems.map((p) => (
                <div
                  key={p.id}
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] max-w-[360px] flex-shrink-0"
                >
                  <ProjectCard {...p} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination indicators (Image 2 style) */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {Array.from({ length: visibleDots }).map((_, idx) => {
          const isActive = Math.min(currentPage, visibleDots - 1) === idx
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentPage(idx)}
              className={`h-3 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-8 bg-[#FF9800]"
                  : "w-3 bg-[#FFEBE0] hover:bg-[#FFD4C2]"
              }`}
              aria-label={`Trang ${idx + 1}`}
            />
          )
        })}
      </div>
    </div>
  )
}

function ProjectSidebar({ project, onDonate, onShare }: { project: typeof MOCK_PROJECT; onDonate: () => void; onShare: () => void }) {
  const progress = Math.min(Math.round((project.raised / project.goal) * 100), 100)

  return (
    <div className="space-y-4">
      {/* Stats Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Date badge */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-slate-50">
          <CalendarDays className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-500">Ngày tạo {project.postedDate}</span>
        </div>

        <div className="px-5 pt-5 pb-4">
          <p className="text-xs text-slate-500 font-medium mb-1">Đã quyên góp</p>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {new Intl.NumberFormat("vi-VN").format(project.raised)} VND
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Mục tiêu {new Intl.NumberFormat("vi-VN").format(project.goal)} VND
          </p>

          {/* Progress bar */}
          <ProgressBar progress={progress} className="mb-2" />
          <div className="flex justify-between text-xs text-slate-400 mb-5">
            <span className="text-[#006B3F] font-semibold">{progress}%</span>
            <span>{project.donorsCount} lượt ủng hộ</span>
          </div>


        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 mx-5" />

        {/* CTA Buttons */}
        <div className="px-5 py-4 space-y-2.5">
          <button
            onClick={onDonate}
            className="w-full h-12 bg-[#C21A30] hover:bg-[#a01527] text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all hover:-translate-y-0.5"
            disabled={project.status === "closed"}
          >
            <Heart className="w-5 h-5 fill-current" />
            Ủng hộ
          </button>
          <button
            onClick={onShare}
            className="w-full h-10 border border-slate-300 hover:border-slate-400 text-slate-600 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Chia sẻ dự án
          </button>
        </div>
      </div>

      {/* Donor List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#006B3F]" />
            Ủng hộ
          </h3>
          <span className="text-sm font-semibold text-[#006B3F]">{project.donorsCount} lượt ủng hộ</span>
        </div>
        <ul className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
          {MOCK_DONORS.map((donor) => (
            <li key={donor.id} className="px-5 py-3.5 hover:bg-slate-50 transition-colors">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm flex-shrink-0">
                  {donor.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 leading-snug">{donor.name}</p>
                  {donor.message && (
                    <p className="text-xs text-slate-500 mt-0.5 italic">"{donor.message}"</p>
                  )}
                  <p className="text-xs text-slate-400 mt-1">{donor.time}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Disbursement ─ Separate card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100">
          <Landmark className="w-4 h-4 text-[#006B3F]" />
          <h3 className="font-bold text-slate-900">Giải ngân</h3>
        </div>
        <div className="px-5 py-4 flex items-start gap-2 text-slate-500">
          <div>
            <p className="text-sm font-semibold text-slate-600">Dự án này chưa giải ngân</p>
            <p className="text-xs text-slate-400 mt-1">Dự án sẽ cập nhật thông tin giải ngân sớm nhất có thể. Xin hãy theo dõi.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = MOCK_PROJECT
  const [donationOpen, setDonationOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const remainingAmount = project.goal - project.raised

  const relatedProjects = MOCK_RELATED_PROJECTS.filter(
    (p) => p.campaignId === project.campaignId && p.status === "active" && p.id !== project.id
  )

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center text-sm text-slate-500 gap-1 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#006B3F] transition-colors">Trang chủ</Link>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <Link href={`/campaigns/${project.campaignId}`} className="hover:text-[#006B3F] transition-colors truncate max-w-[200px]">
            {project.campaignName}
          </Link>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <span className="text-slate-900 font-medium truncate max-w-[240px]">{project.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Left Column ── */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug mb-3">
              {project.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag.label} className={`px-3 py-1 rounded-full text-xs font-semibold ${tag.color}`}>
                  • {tag.label}
                </span>
              ))}
            </div>

            {/* Image Slider */}
            <ImageSlider />

            {/* Content Tabs */}
            <ContentTabs />
          </div>

          {/* ── Right Sidebar ── */}
          <div className="w-full lg:w-[360px] xl:w-[380px] flex-shrink-0">
            <div className="sticky top-24">
              <ProjectSidebar project={project} onDonate={() => setDonationOpen(true)} onShare={() => setShareOpen(true)} />
            </div>
          </div>
        </div>

        {/* ── Related Projects Section ── */}
        {relatedProjects.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#006B3F] rounded-full" />
              Dự án cùng chiến dịch đang diễn ra
            </h2>
            <RelatedProjectsSlider projects={relatedProjects} />
          </div>
        )}
      </div>

      <DonationModal
        isOpen={donationOpen}
        onClose={() => setDonationOpen(false)}
        projectTitle={project.title}
        remainingAmount={remainingAmount}
      />
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        projectTitle={project.title}
      />
    </div>
  )
}
