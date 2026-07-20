import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

import { ProgressBar } from "@/components/shared/ProgressBar"

interface CampaignCardProps {
  id: string
  title: string
  description: string
  imageUrl: string
  raised?: number
  goal?: number
}

export function CampaignCard({ id, title, description, imageUrl, raised = 0, goal = 1 }: CampaignCardProps) {
  const progress = Math.min(Math.round((raised / goal) * 100), 100)

  return (
    <div className="flex flex-col group w-full bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all">
      {/* Tiêu đề có đường gạch ngang kéo dài */}
      <div className="flex items-center gap-3 mb-2">
        <h3 className="font-bold text-lg md:text-xl text-slate-900 whitespace-nowrap">
          <Link href={`/campaigns/${id}`} className="hover:text-[#006B3F] transition-colors">{title}</Link>
        </h3>
        <div className="h-[2px] bg-slate-900 w-full" />
      </div>
      
      {/* Tóm tắt */}
      <p className="text-sm md:text-base text-slate-600 mb-5 line-clamp-3">
        {description}
      </p>

      {/* Progress Bar & Tiền quyên góp */}
      {(raised > 0 || goal > 1) && (
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-2">
            <span className="font-bold text-[#006B3F] text-lg">
              {new Intl.NumberFormat("vi-VN").format(raised)}đ
            </span>
            <span className="text-sm text-slate-500">
              / {new Intl.NumberFormat("vi-VN").format(goal)}đ
            </span>
          </div>
          <ProgressBar progress={progress} height="h-2" />
        </div>
      )}

      {/* Box Hình ảnh và Nút */}
      <div className="relative w-full aspect-[4/3] md:aspect-video border-2 border-slate-900 overflow-hidden bg-slate-100 mt-auto rounded-lg">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Nút Tìm hiểu thêm ở góc dưới trái */}
        <div className="absolute bottom-4 left-4 z-10">
          <Button 
            asChild 
            variant="outline" 
            className="bg-white border-2 border-slate-900 text-slate-900 font-semibold hover:bg-slate-100 rounded-none shadow-none h-10 px-4"
          >
            <Link href={`/campaigns/${id}`}>Tìm hiểu thêm &gt;&gt;</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
