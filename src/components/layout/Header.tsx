import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 md:w-11 md:h-11 overflow-hidden rounded-full border border-slate-200 shrink-0">
              <Image 
                src="/Logo_quy.jpg" 
                alt="Logo VTAF" 
                fill 
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-[family-name:var(--font-playfair)] font-bold text-[14px] md:text-[16px] text-[#C21A30] tracking-[0.2px] leading-[1.25] whitespace-nowrap">
                QUỸ HỖ TRỢ NHÂN TÀI VIỆT NAM
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[8px] md:text-[9px] text-[#064423] font-semibold tracking-[0.2px] mt-[2px] whitespace-nowrap">
                VIETNAM TALENTS ASSISTANCE FUND
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex gap-4 lg:gap-6">
            <Link
              href="https://quynhantai.org"
              className="flex items-center text-[13px] lg:text-sm font-medium text-slate-600 transition-colors hover:text-[#006B3F] uppercase"
            >
              Trang chủ
            </Link>
            <Link
              href="https://quynhantai.org/gioi-thieu"
              className="flex items-center text-[13px] lg:text-sm font-medium text-slate-600 transition-colors hover:text-[#006B3F] uppercase"
            >
              Giới thiệu
            </Link>
            <Link
              href="https://quynhantai.org/hoat-dong"
              className="flex items-center text-[13px] lg:text-sm font-medium text-slate-600 transition-colors hover:text-[#006B3F] uppercase"
            >
              Hoạt động
            </Link>
            <Link
              href="/"
              className="flex items-center text-[13px] lg:text-sm font-bold text-[#006B3F] transition-colors uppercase border-b-2 border-[#006B3F]"
            >
              Tài trợ
            </Link>
            <Link
              href="https://quynhantai.org/nhan-tai"
              className="flex items-center text-[13px] lg:text-sm font-medium text-slate-600 transition-colors hover:text-[#006B3F] uppercase"
            >
              Nhân tài
            </Link>
            <Link
              href="https://quynhantai.org/tin-tuc-su-kien"
              className="flex items-center text-[13px] lg:text-sm font-medium text-slate-600 transition-colors hover:text-[#006B3F] uppercase"
            >
              Tin tức
            </Link>
            <Link
              href="https://quynhantai.org/lien-he"
              className="flex items-center text-[13px] lg:text-sm font-medium text-slate-600 transition-colors hover:text-[#006B3F] uppercase"
            >
              Liên hệ
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/auth">Đăng nhập</Link>
          </Button>
          <Button asChild>
            <Link href="/projects/p1">Quyên góp ngay</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
