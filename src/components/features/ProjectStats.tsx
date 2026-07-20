import { Badge } from "@/components/ui/Badge"
import { ProgressBar } from "@/components/shared/ProgressBar"

interface ProjectStatsProps {
  raised: number
  goal: number
  donorsCount: number
  daysLeft: number
  status: "active" | "closed"
}

export function ProjectStats({ raised, goal, donorsCount, daysLeft, status }: ProjectStatsProps) {
  const progress = Math.min(Math.round((raised / goal) * 100), 100)
  
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-slate-500 font-medium mb-1">Đã quyên góp được</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold text-[#006B3F]">
              {new Intl.NumberFormat('vi-VN').format(raised)}đ
            </h2>
          </div>
        </div>
        <Badge variant={status === "active" ? "default" : "secondary"} className={status === "active" ? "bg-[#006B3F] hover:bg-[#00824d] text-white" : ""}>
          {status === "active" ? "Đang kêu gọi" : "Đã kết thúc"}
        </Badge>
      </div>

      {/* Thanh Progress */}
      <ProgressBar progress={progress} height="h-2.5" className="mb-2" />
      <div className="flex justify-between text-sm font-medium mb-8">
        <span className="text-[#006B3F]">{progress}%</span>
        <span className="text-slate-500">Mục tiêu: {new Intl.NumberFormat('vi-VN').format(goal)}đ</span>
      </div>

      {/* Thông số chi tiết */}
      <div className="grid grid-cols-2 gap-4 divide-x divide-slate-100 border-t border-slate-100 pt-6">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold text-slate-800 mb-1">{donorsCount}</span>
          <span className="text-sm text-slate-500">Lượt ủng hộ</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold text-slate-800 mb-1">{daysLeft}</span>
          <span className="text-sm text-slate-500">Ngày còn lại</span>
        </div>
      </div>
    </div>
  )
}
