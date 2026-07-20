import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { ProgressBar } from "@/components/shared/ProgressBar"

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
  const isClosed = status === "closed"

  return (
    <Card className="overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-lg">
      <Link href={`/projects/${id}`} className="relative h-56 w-full overflow-hidden block">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-slate-900/20" />
        <div className="absolute top-4 left-4">
          <Badge variant={isClosed ? "secondary" : "default"} className={`shadow-sm ${isClosed ? '' : 'bg-[#006B3F] hover:bg-[#00824d] text-white'}`}>
            {isClosed ? "Đã kết thúc" : "Đang kêu gọi"}
          </Badge>
        </div>
      </Link>
      
      <CardContent className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg line-clamp-2 mb-4 hover:text-[#006B3F] transition-colors">
          <Link href={`/projects/${id}`}>{title}</Link>
        </h3>
        
        <div className="mt-auto space-y-4">
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-bold text-[#006B3F]">
                {new Intl.NumberFormat("vi-VN").format(raised)}đ
              </span>
              <span className="text-sm text-slate-500">
                / {new Intl.NumberFormat("vi-VN").format(goal)}đ
              </span>
            </div>
            <ProgressBar progress={progress} height="h-2" />
          </div>
          
          <div className="flex justify-between items-center text-sm text-slate-500 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span>{donorsCount} lượt</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>{daysLeft} ngày</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
