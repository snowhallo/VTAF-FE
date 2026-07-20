import { SearchX } from "lucide-react"

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({ 
  title = "Không tìm thấy kết quả", 
  description = "Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để xem thêm dự án." 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="bg-slate-100 p-6 rounded-full mb-6">
        <SearchX className="w-12 h-12 text-slate-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 max-w-md">{description}</p>
    </div>
  )
}
