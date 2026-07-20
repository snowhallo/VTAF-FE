"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80",
]

export function ProjectGallery() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === MOCK_IMAGES.length - 1 ? 0 : prev + 1))
  }, [])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? MOCK_IMAGES.length - 1 : prev - 1))
  }, [])

  useEffect(() => {
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [handleNext])

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-slate-100 rounded-lg border border-slate-200 group">
        <Image
          src={MOCK_IMAGES[activeIndex]}
          alt="Hình ảnh thực tế dự án"
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover transition-opacity duration-300"
          priority
        />
        
        {/* Navigation Overlays */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-slate-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label="Ảnh trước"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-slate-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label="Ảnh tiếp theo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      
      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {MOCK_IMAGES.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative w-full aspect-video rounded-md overflow-hidden border-2 transition-all ${
              activeIndex === index ? "border-[#006B3F] shadow-sm" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`Hình thu nhỏ ${index + 1}`}
              fill
              sizes="(max-width: 768px) 33vw, 200px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
