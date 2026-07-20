import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      {/* Main footer content */}
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-16">

          {/* ── Col 1: Logo + tagline ── */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-slate-200 shrink-0">
                <Image
                  src="/Logo_quy.jpg"
                  alt="Logo Quỹ Hỗ trợ Nhân tài Việt Nam"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-[family-name:var(--font-playfair)] font-bold text-[15px] text-[#C21A30] tracking-[0.2px] leading-[1.25] whitespace-nowrap">
                  QUỸ HỖ TRỢ NHÂN TÀI VIỆT NAM
                </span>
                <span className="font-[family-name:var(--font-inter)] text-[9px] text-[#064423] font-semibold tracking-[0.2px] mt-[2px] whitespace-nowrap">
                  VIETNAM TALENTS ASSISTANCE FUND
                </span>
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[240px]">
              Chắp cánh tài năng trẻ Việt Nam
            </p>
          </div>

          {/* ── Col 2: Danh mục ── */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4 text-sm uppercase tracking-wide">Danh mục</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Về chúng tôi", href: "/about" },
                { label: "Dự án", href: "/campaigns" },
                { label: "Liên hệ", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-600 hover:text-[#006B3F] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Liên hệ ── */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4 text-sm uppercase tracking-wide">Liên hệ</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
                <span>Tầng 2, số 21, ngõ Yên Ninh, phố Yên Ninh, phường Ba Đình, Hà Nội</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-slate-400" />
                <span>098 777 3889 <span className="text-slate-400 text-xs">(Thứ 2 – Thứ 6, 9h–17h)</span></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-slate-400" />
                <a href="mailto:quynhantai@gmail.com" className="hover:text-[#006B3F] transition-colors">
                  quynhantai@gmail.com
                </a>
              </li>
            </ul>

            {/* Social — ẩn tạm, mở lại sau */}
            {/* 
            <div className="mt-6">
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-2">
                Kết nối với Quỹ tại đây
              </p>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
            */}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <p>©{new Date().getFullYear()} Quỹ Hỗ trợ Nhân tài Việt Nam. Bảo lưu mọi quyền.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-[#006B3F] transition-colors">Điều khoản &amp; Điều kiện</Link>
            <Link href="/privacy" className="hover:text-[#006B3F] transition-colors">Chính sách bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
