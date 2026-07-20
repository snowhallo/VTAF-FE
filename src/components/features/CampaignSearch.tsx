"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Search, ChevronDown, X } from "lucide-react"

export type StatusFilter = "all" | "active" | "closed"

interface CampaignSearchProps {
  onSearch: (query: string, status: StatusFilter) => void
}

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "active", label: "Đang diễn ra" },
  { value: "closed", label: "Hoàn thành" },
]

export function CampaignSearch({ onSearch }: CampaignSearchProps) {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<StatusFilter>("all")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = useCallback(() => {
    onSearch(query, status)
  }, [query, status, onSearch])

  const handleReset = () => {
    setQuery("")
    setStatus("all")
    onSearch("", "all")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  const selectedLabel = STATUS_OPTIONS.find((o) => o.value === status)?.label

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
      {/* Ô tìm kiếm */}
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tìm kiếm theo tên hoặc mô tả dự án"
          className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-300 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/30 focus:border-[#006B3F] transition"
        />
      </div>

      {/* Dropdown lọc trạng thái */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen((v) => !v)}
          className={`flex items-center justify-between gap-2 h-11 px-4 min-w-[180px] rounded-lg border text-sm transition-all
            ${dropdownOpen
              ? "border-[#006B3F] ring-2 ring-[#006B3F]/20 text-[#006B3F] bg-emerald-50"
              : "border-slate-300 text-slate-600 bg-white hover:border-slate-400"
            }`}
        >
          <span>{selectedLabel ?? "Lọc theo trạng thái"}</span>
          <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ${dropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {dropdownOpen && (
          <div className="absolute z-20 top-full mt-1.5 left-0 min-w-full bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
            {STATUS_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer text-sm text-slate-700"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 accent-[#006B3F] cursor-pointer"
                  checked={status === opt.value}
                  onChange={() => {
                    setStatus((prev) => (prev === opt.value ? "all" : opt.value))
                  }}
                />
                {opt.label}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Nút Tìm kiếm */}
      <button
        type="button"
        onClick={handleSearch}
        className="h-11 px-6 rounded-lg bg-[#C21A30] hover:bg-[#a01527] text-white text-sm font-bold transition-all hover:-translate-y-0.5 shadow-sm whitespace-nowrap"
      >
        Tìm kiếm
      </button>

      {/* Nút Xóa bộ lọc */}
      <button
        type="button"
        onClick={handleReset}
        className="h-11 px-4 rounded-lg border border-slate-300 text-slate-600 text-sm hover:bg-slate-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
      >
        <X className="w-3.5 h-3.5" />
        Xóa bộ lọc
      </button>
    </div>
  )
}
