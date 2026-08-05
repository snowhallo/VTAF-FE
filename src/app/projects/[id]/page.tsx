"use client";
import { useState, useEffect, useCallback, Suspense } from "react"
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, ChevronLeft, Heart, Share2, CalendarDays, Users, Landmark, Clock, Sparkles } from "lucide-react"
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

const GENERATE_MOCK_DONORS = () => {
  const sampleMessages = [
    "Chúc Huyền sớm bình phục, cố gắng lên nhé",
    "Chúc chị mau khoẻ ạ",
    "Mong các em luôn vững tin học tập tốt!",
    "Chúc dự án sớm hoàn thành mục tiêu",
    "Chắp cánh tương lai cho các em học sinh",
    "Ủng hộ một chút tấm lòng nhỏ",
    "",
    "Chúc các em gặt hái nhiều thành công",
    "Gửi lời chúc sức khỏe và thành công",
    "",
  ]

  const sampleNames = [
    { name: "Nhà hảo tâm", initial: "D" },
    { name: "Nguyễn Văn An", initial: "A" },
    { name: "Phạm Thị Bích", initial: "B" },
    { name: "Trần Quang Cường", initial: "C" },
    { name: "Lê Thị Duyên", initial: "D" },
    { name: "Hoàng Minh Đức", initial: "Đ" },
    { name: "Vũ Hải Đăng", initial: "Đ" },
    { name: "Đỗ Thanh Giang", initial: "G" },
    { name: "Nhà hảo tâm ẩn danh", initial: "D" },
    { name: "Bùi Tuyết Mai", initial: "M" },
  ]

  const amounts = [50000, 100000, 200000, 300000, 500000, 1000000, 2000000]

  const donors = []
  for (let i = 1; i <= 154; i++) {
    const nameObj = sampleNames[i % sampleNames.length]
    const amount = amounts[i % amounts.length]
    const msg = sampleMessages[i % sampleMessages.length]
    const day = String((i % 28) + 1).padStart(2, "0")
    const month = String(((Math.floor(i / 28) + 6) % 12) + 1).padStart(2, "0")
    const formattedAmount = new Intl.NumberFormat("vi-VN").format(amount)

    donors.push({
      id: i,
      name: `${nameObj.name} đã ủng hộ ${formattedAmount} VND`,
      initial: nameObj.initial,
      amount: amount,
      message: msg,
      time: `${day}/${month}/2026`,
    })
  }
  return donors
}

const ALL_MOCK_DONORS = GENERATE_MOCK_DONORS()

interface ProjectDetailData {
  id: string
  title: string
  campaignId: string
  campaignName: string
  status: "active" | "closed"
  raised: number
  goal: number
  donorsCount: number
  daysLeft: number
  postedDate: string
  imageUrl: string
  tags: { label: string; color: string }[]
  story: string
}

const MOCK_PROJECTS_DATABASE: Record<string, ProjectDetailData> = {
  p1: {
    id: "p1",
    title: "Dự án cấp phát học bổng khu vực Miền núi phía Bắc",
    campaignId: "c1",
    campaignName: "Cùng em tới trường - Xây dựng điểm trường Bản Mù",
    status: "active",
    raised: 250000000,
    goal: 500000000,
    donorsCount: 154,
    daysLeft: 45,
    postedDate: "22/07/2026",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    tags: [
      { label: "Học bổng", color: "bg-emerald-100 text-emerald-700" },
      { label: "Giáo dục", color: "bg-blue-100 text-blue-700" },
    ],
    story: "Khu vực Miền núi phía Bắc là nơi sinh sống của hàng ngàn học sinh có tinh thần hiếu học phi thường, dù hoàn cảnh gia đình còn nhiều khó khăn, thiếu thốn về cả vật chất lẫn điều kiện học tập. Rất nhiều em đạt thành tích học tập xuất sắc nhưng đứng trước nguy cơ phải dở dang con đường tri thức.",
  },
  p2: {
    id: "p2",
    title: "Tài trợ học bổng học thuật cho học sinh THPT Nguyễn Đình Chiểu",
    campaignId: "c1",
    campaignName: "Cùng em tới trường - Xây dựng điểm trường Bản Mù",
    status: "active",
    raised: 35000000,
    goal: 50000000,
    donorsCount: 42,
    daysLeft: 12,
    postedDate: "18/07/2026",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    tags: [
      { label: "Học bổng", color: "bg-emerald-100 text-emerald-700" },
      { label: "Trung học", color: "bg-amber-100 text-amber-800" },
    ],
    story: "Tài trợ 10 suất học bổng tài năng dành cho học sinh nghèo vượt khó đạt thành tích xuất sắc kỳ thi Olympic môn Toán và Vật lý.",
  },
  p3: {
    id: "p3",
    title: "Dự án đào tạo kỹ năng số cho học sinh vùng sâu vùng xa",
    campaignId: "c1",
    campaignName: "Cùng em tới trường - Xây dựng điểm trường Bản Mù",
    status: "active",
    raised: 88000000,
    goal: 100000000,
    donorsCount: 89,
    daysLeft: 3,
    postedDate: "15/07/2026",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    tags: [
      { label: "Kỹ năng số", color: "bg-indigo-100 text-indigo-700" },
      { label: "Công nghệ", color: "bg-cyan-100 text-cyan-700" },
    ],
    story: "Dự án tập trung trang bị phòng máy tính hiện đại và hướng dẫn kỹ năng lập trình, sử dụng Internet an toàn cho các em học sinh tiểu học và THCS vùng cao, giúp các em hội nhập với kỷ nguyên công nghệ số.",
  },
  p4: {
    id: "p4",
    title: "Chương trình trao tặng sách và thiết bị học tập cho trường tiểu học",
    campaignId: "c1",
    campaignName: "Cùng em tới trường - Xây dựng điểm trường Bản Mù",
    status: "active",
    raised: 120000000,
    goal: 150000000,
    donorsCount: 210,
    daysLeft: 5,
    postedDate: "10/07/2026",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80",
    tags: [
      { label: "Sách & Thiết bị", color: "bg-emerald-100 text-emerald-700" },
      { label: "Tiểu học", color: "bg-amber-100 text-amber-800" },
    ],
    story: "Quyên góp 5.000 đầu sách tham khảo, sách khoa học và bàn ghế chuẩn nhân trắc học cho 3 trường tiểu học vùng khó khăn, tiếp sức tri thức cho hàng ngàn em nhỏ.",
  },
  p5: {
    id: "p5",
    title: "Xây dựng 3 phòng học kiên cố & nhà công vụ tại điểm trường Pa Tần",
    campaignId: "c1",
    campaignName: "Cùng em tới trường - Xây dựng điểm trường Bản Mù",
    status: "active",
    raised: 150000000,
    goal: 200000000,
    donorsCount: 178,
    daysLeft: 20,
    postedDate: "05/07/2026",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
    tags: [
      { label: "Xây dựng", color: "bg-[#006B3F]/10 text-[#006B3F]" },
      { label: "Cơ sở vật chất", color: "bg-blue-100 text-blue-800" },
    ],
    story: "Cung cấp kinh phí kiên cố hóa 3 phòng học mái tôn cũ nát, hỗ trợ chỗ ở an toàn cho các thầy cô giáo cắm bản kiên trì gieo chữ.",
  },
}

// ─── Fast 200ms Ultra-Responsive Image Carousel ──────────────────────────────
function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  const extendedImages = [...images, images[0]]
  const total = images.length

  const next = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsTransitioning(true)
    setCurrent((c) => c + 1)
    setDragOffset(0)
  }, [isAnimating])

  const prev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsTransitioning(true)
    if (current === 0) {
      setCurrent(total - 1)
    } else {
      setCurrent((c) => c - 1)
    }
    setDragOffset(0)
  }

  const handleTransitionEnd = () => {
    setIsAnimating(false)
    if (current >= total) {
      setIsTransitioning(false)
      setCurrent(0)
    }
  }

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false)
        if (current >= total) {
          setIsTransitioning(false)
          setCurrent(0)
        }
      }, 230)
      return () => clearTimeout(timer)
    }
  }, [isAnimating, current, total])

  const handleDragStart = (clientX: number) => {
    if (isAnimating) return
    setIsDragging(true)
    setStartX(clientX)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    const deltaX = clientX - startX
    setDragOffset(deltaX)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragOffset < -40) {
      next()
    } else if (dragOffset > 40) {
      prev()
    }
    setDragOffset(0)
  }

  useEffect(() => {
    if (isDragging || isAnimating) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, isDragging, isAnimating])

  const activeDotIndex = current >= total ? 0 : current

  return (
    <div
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 group select-none cursor-grab active:cursor-grabbing touch-pan-y shadow-md"
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`flex w-full h-full ${
          isTransitioning && !isDragging
            ? "transition-transform duration-200 cubic-bezier(0.16, 1, 0.3, 1)"
            : ""
        }`}
        style={{
          transform: `translateX(calc(-${current * 100}% + ${dragOffset}px))`,
        }}
      >
        {extendedImages.map((img, i) => (
          <div key={i} className="w-full h-full shrink-0 relative">
            <img
              src={img}
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        disabled={isAnimating}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg backdrop-blur-md transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer hover:scale-105 active:scale-95 z-10 disabled:opacity-50"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-slate-900" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        disabled={isAnimating}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg backdrop-blur-md transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer hover:scale-105 active:scale-95 z-10 disabled:opacity-50"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-slate-900" />
      </button>

      <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              if (isAnimating) return
              setIsAnimating(true)
              setIsTransitioning(true)
              setCurrent(i)
              setDragOffset(0)
            }}
            className={`rounded-full transition-all duration-200 cursor-pointer ${
              i === activeDotIndex ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Donors Widget with Original Pagination Design ────────────────────────────
function DonorsWidget({ donorsCount }: { donorsCount: number }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(ALL_MOCK_DONORS.length / itemsPerPage)

  const currentDonors = ALL_MOCK_DONORS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const getPageNumbers = () => {
    const maxVisible = 4
    let start = Math.max(1, currentPage - 1)
    let end = Math.min(totalPages, start + maxVisible - 1)
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1)
    }
    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return { pages, start, end }
  }

  const { pages, start, end } = getPageNumbers()

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-[#006B3F]" />
          Ủng hộ
        </h3>
        <span className="text-xs font-bold text-[#006B3F] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          {donorsCount} lượt ủng hộ
        </span>
      </div>

      <ul className="divide-y divide-slate-100 min-h-[300px]">
        {currentDonors.map((donor) => (
          <li key={donor.id} className="px-5 py-3.5 hover:bg-slate-50/80 transition-colors">
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0 mt-0.5">
                {donor.initial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 leading-snug">{donor.name}</p>
                {donor.message && (
                  <p className="text-xs text-slate-500 mt-1 italic leading-relaxed bg-slate-50/60 p-2 rounded border border-slate-100/60">
                    &ldquo;{donor.message}&rdquo;
                  </p>
                )}
                <p className="text-[10px] text-slate-400 mt-1 font-medium">{donor.time}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="px-4 py-3 bg-slate-50/60 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-[11px] text-slate-500 font-medium">
          Trang <strong>{currentPage}</strong> / <strong>{totalPages}</strong> ({ALL_MOCK_DONORS.length} lượt)
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Trang trước"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {start > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  currentPage === 1
                    ? "bg-[#006B3F] text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                1
              </button>
              {start > 2 && <span className="text-slate-400 text-[10px] px-0.5">...</span>}
            </>
          )}

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                currentPage === page
                  ? "bg-[#006B3F] text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ))}

          {end < totalPages && (
            <>
              {end < totalPages - 1 && <span className="text-slate-400 text-[10px] px-0.5">...</span>}
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  currentPage === totalPages
                    ? "bg-[#006B3F] text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Trang sau"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Fast 200ms Ultra-Responsive Carousel for Related Projects ───────────────
function RelatedProjectsCarousel({ projects }: { projects: (ProjectDetailData & { raised: number; goal: number; donorsCount: number; daysLeft: number; status: "active" | "closed" })[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  const itemsPerPage = 2
  const totalPages = Math.ceil(projects.length / itemsPerPage)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
    setDragOffset(0)
  }, [isAnimating])

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsTransitioning(true)
    if (currentIndex === 0) {
      setCurrentIndex(totalPages - 1)
    } else {
      setCurrentIndex((prev) => prev - 1)
    }
    setDragOffset(0)
  }

  const handleTransitionEnd = () => {
    setIsAnimating(false)
    if (currentIndex >= totalPages) {
      setIsTransitioning(false)
      setCurrentIndex(0)
    }
  }

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false)
        if (currentIndex >= totalPages) {
          setIsTransitioning(false)
          setCurrentIndex(0)
        }
      }, 230)
      return () => clearTimeout(timer)
    }
  }, [isAnimating, currentIndex, totalPages])

  const handleDragStart = (clientX: number) => {
    if (isAnimating) return
    setIsDragging(true)
    setStartX(clientX)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    const deltaX = clientX - startX
    setDragOffset(deltaX)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragOffset < -50) {
      nextSlide()
    } else if (dragOffset > 50) {
      prevSlide()
    }
    setDragOffset(0)
  }

  const pages = []
  for (let i = 0; i < totalPages; i++) {
    pages.push(projects.slice(i * itemsPerPage, (i + 1) * itemsPerPage))
  }
  pages.push(projects.slice(0, itemsPerPage))

  const activeDotIndex = currentIndex >= totalPages ? 0 : currentIndex

  return (
    <div className="space-y-6 pt-6 border-t border-slate-200/80">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-extrabold text-[#006B3F] uppercase tracking-wider block mb-1">
            Cùng chiến dịch quyên góp
          </span>
          <h2 className="font-serif font-bold text-xl md:text-2xl text-slate-900">
            Các Dự Án Liên Quan Phải Quan Tâm
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-[#006B3F] transition-all flex items-center justify-center shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-[#006B3F] transition-all flex items-center justify-center shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y p-1"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <div
          onTransitionEnd={handleTransitionEnd}
          className={`flex w-full ${
            isTransitioning && !isDragging
              ? "transition-transform duration-200 cubic-bezier(0.16, 1, 0.3, 1)"
              : ""
          }`}
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
          }}
        >
          {pages.map((pageProjects, pageIdx) => (
            <div key={pageIdx} className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6 pointer-events-auto px-0.5">
              {pageProjects.map((p) => (
                <ProjectCard key={p.id} {...p} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (isAnimating) return
                setIsTransitioning(true)
                setIsAnimating(true)
                setCurrentIndex(idx)
                setDragOffset(0)
              }}
              className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                idx === activeDotIndex
                  ? "w-8 bg-[#006B3F]"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide page ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Project Sidebar ──────────────────────────────────────────────────────────
function ProjectSidebar({
  project,
  onDonate,
  onShare,
}: {
  project: ProjectDetailData
  onDonate: () => void
  onShare: () => void
}) {
  const progress = Math.min(100, Math.round((project.raised / project.goal) * 100))
  const isClosed = project.status === "closed" || project.daysLeft <= 0

  const daysBadge = (() => {
    if (isClosed) {
      return {
        text: "Đã hoàn thành",
        badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200/80 font-bold",
        iconStyle: "text-emerald-600",
      }
    }
    if (project.daysLeft <= 7) {
      return {
        text: `Còn ${project.daysLeft} ngày`,
        badgeStyle: "font-bold animate-pulse-bold border",
        iconStyle: "text-inherit",
      }
    }
    return {
      text: `Còn ${project.daysLeft} ngày`,
      badgeStyle: "bg-amber-50 text-amber-700 border-amber-200/80 font-semibold",
      iconStyle: "text-amber-600",
    }
  })()

  return (
    <div className="space-y-6">
      {/* Target Progress Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-5">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
          <span className="flex items-center gap-1.5 font-medium">
            <CalendarDays className="w-4 h-4 text-slate-400" />
            Đăng ngày {project.postedDate}
          </span>
          <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] ${daysBadge.badgeStyle}`}>
            <Clock className={`w-3.5 h-3.5 ${daysBadge.iconStyle}`} />
            {daysBadge.text}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-2xl font-extrabold text-[#006B3F]">
              {new Intl.NumberFormat("vi-VN").format(project.raised)} VND
            </span>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Mục tiêu {new Intl.NumberFormat("vi-VN").format(project.goal)} VND
          </p>

          <ProgressBar progress={progress} className="mb-2" />
          <div className="flex justify-between text-xs text-slate-400 mb-5">
            <span className="text-[#006B3F] font-semibold">{progress}%</span>
            <span>{project.donorsCount} lượt ủng hộ</span>
          </div>
        </div>

        <div className="border-t border-slate-100 mx-5" />

        <div className="px-5 py-4 space-y-2.5">
          <button
            onClick={onDonate}
            className="w-full h-12 bg-[#C21A30] hover:bg-[#a01527] text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all hover:-translate-y-0.5 active:scale-95 animate-pulse-glow cursor-pointer"
            disabled={isClosed}
          >
            <Heart className="w-5 h-5 fill-current animate-heartbeat text-white" />
            Ủng hộ dự án ngay
          </button>
          <button
            onClick={onShare}
            className="w-full h-11 border border-slate-200 bg-slate-50/80 hover:bg-white hover:border-[#0068FF]/50 text-slate-700 font-semibold rounded-lg flex items-center justify-center gap-2 text-sm shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-[#0068FF]" />
            Chia sẻ dự án
          </button>
        </div>
      </div>

      {/* Donors Widget with full Pagination */}
      <DonorsWidget donorsCount={project.donorsCount} />

      {/* Disbursement Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Landmark className="w-4 h-4 text-[#006B3F]" />
          <h3 className="font-bold text-slate-900 text-sm">Giải ngân</h3>
        </div>
        <div className="px-5 py-4 flex items-start gap-2 text-slate-500">
          <div>
            <p className="text-xs font-semibold text-slate-700">Dự án này chưa giải ngân</p>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Dự án sẽ cập nhật thông tin giải ngân sớm nhất có thể. Xin hãy theo dõi.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectDetailContent() {
  const params = useParams()
  const id = (params?.id as string) || "p1"

  const project = MOCK_PROJECTS_DATABASE[id] || MOCK_PROJECTS_DATABASE["p1"]
  const [donationOpen, setDonationOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  const relatedProjects = Object.values(MOCK_PROJECTS_DATABASE).filter(
    (p) => p.id !== project.id
  )

  const remainingAmount = Math.max(0, project.goal - project.raised)

  return (
    <div className="min-h-screen bg-slate-50 pb-16 font-sans">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
            <Link href="/" className="hover:text-slate-900 transition-colors whitespace-nowrap">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href="/campaigns" className="hover:text-slate-900 transition-colors whitespace-nowrap">
              Chiến dịch
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-none">
              {project.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Col (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Tags */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              <h1 className="font-serif font-bold text-2xl md:text-3xl text-slate-900 leading-tight">
                {project.title}
              </h1>
            </div>

            {/* Carousel */}
            <ImageCarousel images={MOCK_IMAGES} />

            {/* Campaign info box */}
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#006B3F]/10 flex items-center justify-center text-[#006B3F] font-bold shrink-0">
                  VTAF
                </div>
                <div>
                  <p className="text-xs text-slate-500">Thuộc chiến dịch</p>
                  <p className="font-bold text-sm text-[#006B3F]">{project.campaignName}</p>
                </div>
              </div>
              <Link href={`/campaigns/${project.campaignId}`}
                className="text-xs font-semibold text-[#006B3F] hover:underline whitespace-nowrap"
              >
                Xem chiến dịch &rarr;
              </Link>
            </div>

            {/* Story / Description */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
              <h2 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-4">
                Câu chuyện dự án
              </h2>

              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4 text-sm md:text-base">
                <p>{project.story}</p>

                <div className="p-4 bg-slate-50 border-l-4 border-[#006B3F] rounded-r-xl italic text-[#006B3F] font-medium">
                  "Đầu tư vào giáo dục và bồi dưỡng nhân tài là đầu tư hiệu quả nhất cho tương lai quốc gia. 
                  Mỗi sự ủng hộ hôm nay là một bệ phóng nâng bước nhân tài Việt." ❤️
                </div>

                <p>
                  Quỹ Hỗ trợ Nhân tài Việt Nam khởi xướng dự án nhằm trao trực tiếp các suất học bổng toàn phần 
                  và bán phần đến tận tay các em học sinh giỏi, giúp các em yên tâm đến trường và nuôi dưỡng ước mơ.
                </p>

                <h3 className="font-bold text-slate-900 text-lg pt-2">Mục tiêu cụ thể của dự án:</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>Trao 100 suất học bổng vượt khó học giỏi cho các em học sinh cấp 2 & 3.</li>
                  <li>Tài trợ bộ thiết bị học tập và tài liệu tham khảo chuyên sâu cho các em thi học sinh giỏi.</li>
                  <li>Tổ chức các buổi tư vấn hướng nghiệp và phát triển kỹ năng mềm.</li>
                </ul>

                <h3 className="font-bold text-slate-900 text-lg pt-2">Cam kết minh bạch:</h3>
                <p>
                  Toàn bộ khoản tiền ủng hộ sẽ được đối soát tự động, công khai danh sách nhà tài trợ 
                  và giải ngân trực tiếp tới tài khoản ngân hàng chính thức của các trường học đối tác.
                </p>
              </div>
            </div>

            {/* Related Projects Carousel Slider Section */}
            {relatedProjects.length > 0 && (
              <RelatedProjectsCarousel projects={relatedProjects} />
            )}
          </div>

          {/* Right Col: Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <ProjectSidebar
                project={project}
                onDonate={() => setDonationOpen(true)}
                onShare={() => setShareOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
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

export default function ProjectDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400 font-bold">Đang tải chi tiết dự án...</div>}>
      <ProjectDetailContent />
    </Suspense>
  )
}
