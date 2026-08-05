import Link from "next/link"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { ProgressBar } from "@/components/shared/ProgressBar"
import { Users, Clock } from "lucide-react"

interface ProjectCardProps {
  id: string
  title: string
  imageUrl: string
  raised: number
  goal: number
  donorsCount: number
  daysLeft: number
  status: "active" | "closed"
}

export function ProjectCard({
  id,
  title,
  imageUrl,
  raised,
  goal,
  donorsCount,
  daysLeft,
  status,
}: ProjectCardProps) {
  const progress = Math.min((raised / goal) * 100, 100)
  const isClosed = status === "closed" || daysLeft <= 0

  // 🎨 Dynamic badge color logic based on user rules:
  // - Closed/Finished -> GREEN
  // - <= 7 days remaining -> RED (Urgent)
  // - > 7 days remaining -> YELLOW/AMBER
  const getDaysLeftBadge = () => {
    if (isClosed) {
      return {
        text: "Đã hoàn thành",
        badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
        iconStyle: "text-emerald-600",
      }
    }
    if (daysLeft <= 7) {
      return {
        text: `Còn ${daysLeft} ngày`,
        badgeStyle: "font-bold animate-pulse-bold border",
        iconStyle: "text-inherit",
      }
    }
    return {
      text: `Còn ${daysLeft} ngày`,
      badgeStyle: "bg-amber-50 text-amber-700 border-amber-200/80",
      iconStyle: "text-amber-600",
    }
  }

  const daysBadge = getDaysLeftBadge()

  return (
    <Card className="overflow-hidden flex flex-col group card-hover-effect border border-slate-200/80 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:border-[#006B3F]/30">
      <Link href={`/projects/${id}`} className="relative h-56 w-full overflow-hidden block">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-slate-900/10 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
        <div className="absolute top-4 left-4">
          <Badge variant={isClosed ? "secondary" : "default"} className={`shadow-md text-xs font-semibold px-3 py-1 ${isClosed ? 'bg-emerald-600 text-white' : 'bg-[#006B3F] hover:bg-[#00824d] text-white'}`}>
            {isClosed ? "Đã kết thúc" : "Đang kêu gọi"}
          </Badge>
        </div>
      </Link>
      
      <CardContent className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-base md:text-lg line-clamp-2 mb-4 group-hover:text-[#006B3F] transition-colors leading-snug">
          <Link href={`/projects/${id}`}>{title}</Link>
        </h3>
        
        <div className="mt-auto space-y-4">
          <div>
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
          
          <div className="flex justify-between items-center text-xs font-medium text-slate-500 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Users className="w-4 h-4 text-[#006B3F]" />
              <span>{donorsCount} lượt</span>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-semibold text-[11px] ${daysBadge.badgeStyle}`}>
              <Clock className={`w-3.5 h-3.5 ${daysBadge.iconStyle}`} />
              <span>{daysBadge.text}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
