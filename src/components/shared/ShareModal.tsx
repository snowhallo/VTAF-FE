"use client"

import { useEffect, useRef, useState } from "react"
import { X, Link2, Check } from "lucide-react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  projectTitle: string
  projectUrl?: string
}

// Zalo SVG icon
function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#0068FF" />
      <path
        d="M24 10C16.268 10 10 16.268 10 24C10 27.356 11.155 30.446 13.09 32.872L11 38L16.52 36.08C18.808 37.316 21.32 38 24 38C31.732 38 38 31.732 38 24C38 16.268 31.732 10 24 10ZM31.2 29.2H21.6V27.2H28.4L21.6 20.4V18.8H31.2V20.8H24.4L31.2 27.6V29.2ZM17.2 28C16.537 28 16 27.463 16 26.8C16 26.137 16.537 25.6 17.2 25.6C17.863 25.6 18.4 26.137 18.4 26.8C18.4 27.463 17.863 28 17.2 28ZM17.2 22.4C16.537 22.4 16 21.863 16 21.2C16 20.537 16.537 20 17.2 20C17.863 20 18.4 20.537 18.4 21.2C18.4 21.863 17.863 22.4 17.2 22.4Z"
        fill="white"
      />
    </svg>
  )
}

export function ShareModal({ isOpen, onClose, projectTitle, projectUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  const shareUrl = projectUrl ?? (typeof window !== "undefined" ? window.location.href : "")
  const shareText = `Hãy cùng ủng hộ dự án: "${projectTitle}" – Quỹ Hỗ trợ Nhân tài Việt Nam`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback
      const el = document.createElement("textarea")
      el.value = shareUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(url, "_blank", "width=600,height=400")
  }

  const handleZalo = () => {
    const url = `https://zalo.me/share?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`
    window.open(url, "_blank", "width=600,height=500")
  }

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" />

      {/* Modal panel */}
      <div
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn"
        style={{ animationDuration: "0.25s" }}
      >
        {/* Header gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#006B3F] via-[#00824d] to-[#C21A30]" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Chia sẻ dự án</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Chọn nền tảng để chia sẻ dự án này tới nhiều người hơn nữa
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors flex-shrink-0 ml-4"
            aria-label="Đóng"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Project title preview */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Dự án</p>
            <p className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">{projectTitle}</p>
          </div>

          {/* Social share buttons */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Chia sẻ qua mạng xã hội</p>
            <div className="grid grid-cols-2 gap-3">
              {/* Facebook */}
              <button
                onClick={handleFacebook}
                className="group flex items-center gap-3 p-4 rounded-xl border-2 border-transparent bg-[#1877F2]/8 hover:bg-[#1877F2]/15 hover:border-[#1877F2]/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1877F2] flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 text-white fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="text-left min-w-0">
                  <p className="font-semibold text-sm text-slate-800">Facebook</p>
                  <p className="text-xs text-slate-500 truncate">Chia sẻ bài viết</p>
                </div>
              </button>

              {/* Zalo */}
              <button
                onClick={handleZalo}
                className="group flex items-center gap-3 p-4 rounded-xl border-2 border-transparent bg-[#0068FF]/8 hover:bg-[#0068FF]/15 hover:border-[#0068FF]/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                  <ZaloIcon className="w-10 h-10 rounded-xl" />
                </div>
                <div className="text-left min-w-0">
                  <p className="font-semibold text-sm text-slate-800">Zalo</p>
                  <p className="text-xs text-slate-500 truncate">Gửi tin nhắn</p>
                </div>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">hoặc sao chép liên kết</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Copy link */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 min-w-0">
              <Link2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="text-sm text-slate-600 truncate font-mono">{shareUrl}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className={`flex-shrink-0 h-12 px-4 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
                copied
                  ? "bg-[#006B3F] text-white"
                  : "bg-slate-900 text-white hover:bg-slate-700"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Đã sao chép
                </>
              ) : (
                "Sao chép"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
