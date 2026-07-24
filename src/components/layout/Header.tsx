import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Menu, X, Heart, User, ExternalLink } from "lucide-react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4 lg:gap-10">
          <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 overflow-hidden rounded-full border border-slate-200 shrink-0">
              <img
                src="/Logo.jpg"
                alt="Logo VTAF"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif font-bold text-[12px] sm:text-[14px] md:text-[16px] text-[#C21A30] tracking-[0.2px] leading-[1.2] whitespace-nowrap">
                QUỸ HỖ TRỢ NHÂN TÀI VIỆT NAM
              </span>
              <span className="font-sans text-[7px] sm:text-[8px] md:text-[9px] text-[#064423] font-semibold tracking-[0.2px] mt-[1px] whitespace-nowrap">
                VIETNAM TALENTS ASSISTANCE FUND
              </span>
            </div>
          </Link>

          {/* Desktop & Tablet Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            <a
              href="https://quynhantai.org"
              className="flex items-center text-[13px] xl:text-sm font-medium text-slate-600 transition-colors hover:text-[#006B3F] uppercase"
            >
              Trang chủ
            </a>
            <a
              href="https://quynhantai.org/gioi-thieu"
              className="flex items-center text-[13px] xl:text-sm font-medium text-slate-600 transition-colors hover:text-[#006B3F] uppercase"
            >
              Giới thiệu
            </a>
            <a
              href="https://quynhantai.org/hoat-dong"
              className="flex items-center text-[13px] xl:text-sm font-medium text-slate-600 transition-colors hover:text-[#006B3F] uppercase"
            >
              Hoạt động
            </a>
            <Link
              to="/campaigns/c1"
              className="flex items-center text-[13px] xl:text-sm font-bold text-[#006B3F] transition-colors uppercase border-b-2 border-[#006B3F]"
            >
              Tài trợ
            </Link>
            <a
              href="https://quynhantai.org/nhan-tai"
              className="flex items-center text-[13px] xl:text-sm font-medium text-slate-600 transition-colors hover:text-[#006B3F] uppercase"
            >
              Nhân tài
            </a>
            <a
              href="https://quynhantai.org/tin-tuc-su-kien"
              className="flex items-center text-[13px] xl:text-sm font-medium text-slate-600 transition-colors hover:text-[#006B3F] uppercase"
            >
              Tin tức
            </a>
            <a
              href="https://quynhantai.org/lien-he"
              className="flex items-center text-[13px] xl:text-sm font-medium text-slate-600 transition-colors hover:text-[#006B3F] uppercase"
            >
              Liên hệ
            </a>
          </nav>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button asChild variant="ghost" className="hidden sm:inline-flex text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900">
            <Link to="/auth">Đăng nhập</Link>
          </Button>

          {/* 🌟 REDESIGNED DONATION CTA BUTTON LINKING TO CAMPAIGNS OVERVIEW 🌟 */}
          <Button asChild className="text-xs sm:text-sm px-3.5 sm:px-4 py-2.5 bg-gradient-to-r from-[#C21A30] via-[#d61c37] to-[#e63946] hover:from-[#a01527] hover:to-[#C21A30] text-white font-bold rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95 animate-pulse-glow border border-rose-400/30">
            <Link to="/campaigns/c1" className="flex items-center gap-1.5 sm:gap-2">
              <Heart className="w-4 h-4 fill-current animate-heartbeat text-white shrink-0" />
              <span className="whitespace-nowrap">Quyên góp ngay</span>
            </Link>
          </Button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 lg:hidden flex flex-col bg-white border-t border-slate-200 animate-in slide-in-from-top duration-200 overflow-y-auto">
          <div className="px-5 py-6 space-y-5">
            <nav className="flex flex-col space-y-3 font-medium text-sm text-slate-700">
              <Link
                to="/campaigns/c1"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-emerald-50 text-[#006B3F] font-bold flex items-center justify-between"
              >
                <span>Xem tất cả chiến dịch quyên góp</span>
                <Heart className="w-4 h-4 text-[#006B3F]" />
              </Link>
              <a
                href="https://quynhantai.org"
                className="py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Trang chủ Quỹ</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="https://quynhantai.org/gioi-thieu"
                className="py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Giới thiệu</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="https://quynhantai.org/hoat-dong"
                className="py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Hoạt động</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="https://quynhantai.org/nhan-tai"
                className="py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Nhân tài</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="https://quynhantai.org/tin-tuc-su-kien"
                className="py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Tin tức & Sự kiện</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="https://quynhantai.org/lien-he"
                className="py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Liên hệ</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </nav>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Link
                to="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 text-center font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                Đăng nhập hệ thống
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 text-center font-bold text-white bg-[#006B3F] hover:bg-[#005030] rounded-xl text-sm transition-colors"
              >
                Vào Không gian làm việc
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
