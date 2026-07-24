import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { ProgressBar } from "@/components/shared/ProgressBar"
import { ArrowRight, FolderKanban } from "lucide-react"

interface CampaignCardProps {
  id: string
  title: string
  description: string
  imageUrl: string
  raised?: number
  goal?: number
  showProgress?: boolean
  projectCount?: number
  badgeText?: string
}

export function CampaignCard({
  id,
  title,
  description,
  imageUrl,
  raised = 0,
  goal = 1,
  showProgress = false,
  projectCount,
  badgeText,
}: CampaignCardProps) {
  const progress = Math.min(Math.round((raised / goal) * 100), 100)

  return (
    <div className="flex flex-col group w-full bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-sm card-hover-effect hover:shadow-xl hover:border-[#006B3F]/30 relative overflow-hidden">
      {/* Category / Badge & Project Count */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {badgeText ? (
          <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-[#006B3F] text-[11px] font-extrabold border border-emerald-100 uppercase tracking-wider">
            {badgeText}
          </span>
        ) : (
          <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-[#006B3F] text-[11px] font-extrabold border border-emerald-100 uppercase tracking-wider">
            Chiến dịch trọng điểm
          </span>
        )}

        {projectCount !== undefined && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            <FolderKanban className="w-3 h-3 text-[#006B3F]" />
            {projectCount} dự án
          </span>
        )}
      </div>

      {/* Tiêu đề có đường gạch trang trí */}
      <div className="flex items-center gap-3 mb-2">
        <h3 className="font-bold text-lg md:text-xl text-slate-900 line-clamp-1">
          <Link to={`/campaigns/${id}`} className="hover:text-[#006B3F] transition-colors">
            {title}
          </Link>
        </h3>
        <div className="h-[2px] bg-[#006B3F] flex-1 opacity-70 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Tóm tắt */}
      <p className="text-xs md:text-sm text-slate-600 mb-5 line-clamp-3 leading-relaxed">
        {description}
      </p>

      {/* Progress Bar & Tiền quyên góp (Chỉ hiển thị khi showProgress = true) */}
      {showProgress && (raised > 0 || goal > 1) && (
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-2">
            <span className="font-extrabold text-[#006B3F] text-lg">
              {new Intl.NumberFormat("vi-VN").format(raised)}đ
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Mục tiêu {new Intl.NumberFormat("vi-VN").format(goal)}đ
            </span>
          </div>
          <ProgressBar progress={progress} height="h-2" />
        </div>
      )}

      {/* Box Hình ảnh và Nút */}
      <div className="relative w-full aspect-[16/9] border border-slate-200 overflow-hidden bg-slate-100 mt-auto rounded-xl shadow-inner">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

        {/* Nút Khám phá ngay */}
        <div className="absolute bottom-4 left-4 z-10">
          <Button
            asChild
            className="bg-white/95 hover:bg-white text-slate-900 font-bold rounded-lg shadow-md hover:shadow-lg h-9 px-4 text-xs backdrop-blur-sm transition-all group-hover:translate-x-1"
          >
            <Link to={`/campaigns/${id}`} className="flex items-center gap-1.5">
              <span>Xem các dự án trong chiến dịch</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#006B3F]" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
