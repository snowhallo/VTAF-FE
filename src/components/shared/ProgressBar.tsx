"use client"

import { useEffect, useState } from "react"

interface ProgressBarProps {
  progress: number // Tỷ lệ phần trăm từ 0 đến 100
  height?: string  // Lớp CSS chỉ chiều cao, ví dụ: "h-2"
  className?: string
}

export function ProgressBar({ progress, height = "h-2.5", className = "" }: ProgressBarProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Tạo độ trễ ngắn để kích hoạt hiệu ứng chuyển cảnh mượt mà khi mount component
    const timer = setTimeout(() => {
      setWidth(Math.min(100, Math.max(0, progress)))
    }, 100)
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className={`premium-progress-container ${height} ${className}`} role="progressbar" aria-valuenow={width} aria-valuemin={0} aria-valuemax={100}>
      <div
        className="premium-progress-fill"
        style={{ width: `${width}%` }}
      />
    </div>
  )
}
