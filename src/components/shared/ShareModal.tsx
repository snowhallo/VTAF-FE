import { useEffect, useRef, useState } from "react"
import { X, Link2, Check, Share2, Send, MessageCircle } from "lucide-react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  projectTitle: string
  projectUrl?: string
}

// ─── Official Zalo SVG Icon ──────────────────────────────────────────────────
function ZaloIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="500" rx="120" fill="#0068FF" />
      {/* Official Zalo Typographic Logo Path */}
      <path
        d="M178.6 307.2C167.8 307.2 159 298.4 159 287.6C159 276.8 167.8 268 178.6 268C189.4 268 198.2 276.8 198.2 287.6C198.2 298.4 189.4 307.2 178.6 307.2ZM178.6 230C167.8 230 159 221.2 159 210.4C159 199.6 167.8 190.8 178.6 190.8C189.4 190.8 198.2 199.6 198.2 210.4C198.2 221.2 189.4 230 178.6 230ZM338.8 307.2H230.2V288.6L307.6 211.2H230.2V188.8H338.8V207.4L261.4 284.8H338.8V307.2Z"
        fill="white"
      />
      <path
        d="M141.2 321.4C122.4 321.4 107.2 306.2 107.2 287.4V210.6C107.2 191.8 122.4 176.6 141.2 176.6H358.8C377.6 176.6 392.8 191.8 392.8 210.6V287.4C392.8 306.2 377.6 321.4 358.8 321.4H141.2ZM141.2 196.6C133.5 196.6 127.2 202.9 127.2 210.6V287.4C127.2 295.1 133.5 301.4 141.2 301.4H358.8C366.5 301.4 372.8 295.1 372.8 287.4V210.6C372.8 202.9 366.5 196.6 358.8 196.6H141.2Z"
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

  const handleMessenger = () => {
    const url = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareUrl)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(shareUrl)}`
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
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-pop-in"
      >
        {/* Header gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0068FF] via-[#006B3F] to-[#C21A30]" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#006B3F] flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Chia sẻ dự án</h2>
              <p className="text-xs text-slate-500">
                Lan tỏa yêu thương tới cộng đồng
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Đóng"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Project title preview */}
          <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Dự án đang chia sẻ</p>
            <p className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">{projectTitle}</p>
          </div>

          {/* Social share buttons */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Chia sẻ qua mạng xã hội</p>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Zalo */}
              <button
                onClick={handleZalo}
                className="group flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200/80 bg-blue-50/40 hover:bg-blue-50 hover:border-[#0068FF]/40 transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-1.5">
                  <ZaloIcon className="w-10 h-10" />
                </div>
                <span className="font-bold text-xs text-slate-800">Zalo</span>
                <span className="text-[10px] text-slate-400">Gửi tin nhắn</span>
              </button>

              {/* Facebook */}
              <button
                onClick={handleFacebook}
                className="group flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200/80 bg-blue-50/40 hover:bg-blue-50 hover:border-[#1877F2]/40 transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1877F2] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-1.5">
                  <svg className="w-5 h-5 text-white fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="font-bold text-xs text-slate-800">Facebook</span>
                <span className="text-[10px] text-slate-400">Bài viết</span>
              </button>

              {/* Messenger */}
              <button
                onClick={handleMessenger}
                className="group flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200/80 bg-pink-50/40 hover:bg-pink-50 hover:border-pink-300 transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0084FF] via-[#A833E6] to-[#FF5252] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-1.5">
                  <MessageCircle className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="font-bold text-xs text-slate-800">Messenger</span>
                <span className="text-[10px] text-slate-400">Trò chuyện</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] text-slate-400 font-medium">Hoặc sao chép liên kết</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Copy link box */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 min-w-0">
              <Link2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="text-xs text-slate-600 truncate font-mono">{shareUrl}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className={`flex-shrink-0 h-10 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                copied
                  ? "bg-[#006B3F] text-white shadow-sm"
                  : "bg-slate-900 text-white hover:bg-slate-800 shadow-md"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Đã chép
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
