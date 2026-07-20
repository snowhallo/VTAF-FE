"use client"

import { useState } from "react"
import { X, User, Mail, Eye, EyeOff, Loader2, Check, Copy, ChevronRight, MessageSquare } from "lucide-react"
import Link from "next/link"

// ─── Types ─────────────────────────────────────────────────────────────────
interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  projectTitle: string
  remainingAmount: number
}

const QUICK_AMOUNTS = [50000, 100000, 200000, 500000, 1000000]
const BANK_INFO = {
  bankName: "Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)",
  accountName: "QUỸ HỖ TRỢ NHÂN TÀI VIỆT NAM",
  accountNumber: "0071001234567",
}

// ─── CopyButton ─────────────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="flex items-center gap-1 text-xs text-[#006B3F] hover:underline shrink-0"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Đã sao chép" : "Sao chép"}
    </button>
  )
}

// ─── Step 1: Donation Form ──────────────────────────────────────────────────
function DonationForm({
  projectTitle,
  remainingAmount,
  onConfirm,
}: {
  projectTitle: string
  remainingAmount: number
  onConfirm: (data: { amount: number; name: string; email: string; message: string; anonymous: boolean }) => void
}) {
  const [amount, setAmount] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [includeMessage, setIncludeMessage] = useState(false)
  const [anonymous, setAnonymous] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatVND = (n: number) => new Intl.NumberFormat("en-US").format(n)
  const numAmount = Number(amount.replace(/\./g, "").replace(/,/g, ""))

  const handleAmountInput = (raw: string) => {
    const digits = raw.replace(/\D/g, "")
    setAmount(digits ? formatVND(Number(digits)) : "")
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!amount) e.amount = "Vui lòng nhập số tiền muốn ủng hộ."
    else if (numAmount <= 0) e.amount = "Số tiền phải lớn hơn 0đ."
    else if (numAmount < 10000) e.amount = "Số tiền tối thiểu là 10.000đ."
    else if (numAmount > remainingAmount) e.amount = `Số tiền vượt mức còn thiếu (tối đa ${formatVND(remainingAmount)}đ).`
    if (!anonymous && !name.trim()) e.name = "Vui lòng nhập họ và tên hoặc chọn ẩn danh."
    if (!agreeTerms) e.terms = "Vui lòng đồng ý với Điều khoản & Điều kiện để tiếp tục."
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onConfirm({ amount: numAmount, name: anonymous ? "Nhà hảo tâm ẩn danh" : name.trim(), email, message: includeMessage ? message : "", anonymous })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 pb-2 space-y-5">

        {/* Project info */}
        <div className="bg-slate-50 rounded-lg px-4 py-3 text-sm border border-slate-100">
          <p className="text-slate-500 text-xs mb-0.5">Bạn đang ủng hộ</p>
          <p className="font-semibold text-slate-900 leading-snug line-clamp-2">{projectTitle}</p>
          <p className="text-xs mt-1">
            Còn cần: <span className="text-[#C21A30] font-bold">{formatVND(remainingAmount)}đ</span>
          </p>
        </div>

        {/* Số tiền ủng hộ */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-3">
            Số tiền ủng hộ <span className="text-red-500">*</span>
          </label>
          {/* Quick amounts */}
          <div className="flex flex-wrap gap-2 mb-3">
            {QUICK_AMOUNTS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setAmount(formatVND(q))}
                className={`px-3.5 py-1.5 rounded border text-sm font-medium transition-all ${
                  numAmount === q
                    ? "bg-[#006B3F] text-white border-[#006B3F]"
                    : "bg-white text-slate-600 border-slate-300 hover:border-[#006B3F] hover:text-[#006B3F]"
                }`}
              >
                {formatVND(q)}đ
              </button>
            ))}
          </div>
          {/* Custom input */}
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={amount}
              onChange={(e) => handleAmountInput(e.target.value)}
              placeholder="Hoặc nhập số tiền khác"
              className={`w-full h-11 px-4 pr-8 rounded border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.amount ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:border-[#006B3F] focus:ring-[#006B3F]/20"
              }`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">đ</span>
          </div>
          {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
        </div>

        {/* Lời nhắn gửi */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="include-message"
              checked={includeMessage}
              onChange={(e) => setIncludeMessage(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 accent-[#006B3F] cursor-pointer"
            />
            <label htmlFor="include-message" className="text-sm font-semibold text-slate-800 cursor-pointer flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-slate-400" />
              Lời nhắn gửi <span className="font-normal text-slate-400">(tuỳ chọn)</span>
            </label>
            {includeMessage && (
              <span className={`ml-auto text-xs ${message.length > 180 ? "text-red-500" : "text-slate-400"}`}>{message.length}/200</span>
            )}
          </div>
          {includeMessage && (
            <textarea
              value={message}
              onChange={(e) => e.target.value.length <= 200 && setMessage(e.target.value)}
              rows={3}
              placeholder="Nhập nhắn gửi đến các nhân tài..."
              className="w-full px-4 py-3 rounded border border-slate-300 text-sm text-slate-900 bg-white resize-none focus:outline-none focus:ring-2 focus:border-[#006B3F] focus:ring-[#006B3F]/20 transition-all"
            />
          )}
        </div>

        {/* Thông tin nhà tài trợ */}
        <div>
          <p className="text-sm font-semibold text-slate-800 mb-1">Thông tin nhà tài trợ</p>
          <p className="text-xs text-slate-500 mb-3">
            Vui lòng{" "}
            <Link href="/auth" className="text-[#006B3F] hover:underline font-medium">Đăng ký</Link>
            {" "}hoặc{" "}
            <Link href="/auth" className="text-[#006B3F] hover:underline font-medium">Đăng nhập</Link>
            {" "}để theo dõi hành trình ủng hộ của mình.
          </p>

          {/* Họ và tên */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Họ và tên {!anonymous && <span className="text-red-500">*</span>}
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={(e) => { setAnonymous(e.target.checked); if (e.target.checked) setName("") }}
                    className="w-4 h-4 rounded border-slate-300 accent-[#006B3F]"
                  />
                  <span className="text-sm text-slate-600">Ẩn danh</span>
                </label>
              </div>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={anonymous ? "" : name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={anonymous ? "Nhà hảo tâm ẩn danh" : "Nhập họ và tên"}
                  disabled={anonymous}
                  className={`w-full h-11 pl-10 pr-4 rounded border text-sm text-slate-900 bg-white transition-all focus:outline-none focus:ring-2 ${
                    anonymous ? "bg-slate-50 text-slate-400 cursor-not-allowed border-slate-200" :
                    errors.name ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:border-[#006B3F] focus:ring-[#006B3F]/20"
                  }`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email <span className="text-slate-400 font-normal">(tuỳ chọn)</span></label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  disabled={anonymous}
                  className={`w-full h-11 pl-10 pr-4 rounded border text-sm text-slate-900 bg-white transition-all focus:outline-none focus:ring-2 ${
                    anonymous ? "bg-slate-50 text-slate-400 cursor-not-allowed border-slate-200" : "border-slate-300 focus:border-[#006B3F] focus:ring-[#006B3F]/20"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-slate-300 accent-[#006B3F] shrink-0"
            />
            <span className="text-xs text-slate-600 leading-relaxed">
              Bằng việc ủng hộ, bạn đã đồng ý với{" "}
              <a href="/terms" target="_blank" className="text-[#006B3F] hover:underline font-medium">
                Điều khoản &amp; Điều kiện
              </a>
              {" "}của Quỹ Hỗ trợ nhân lực nhân tài Việt Nam.
            </span>
          </label>
          {errors.terms && <p className="text-red-500 text-xs mt-1 ml-6">{errors.terms}</p>}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-slate-100 px-6 py-4 shrink-0">
        <button
          type="submit"
          className="w-full h-13 py-3.5 bg-[#C21A30] hover:bg-[#a01527] text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-sm text-base"
        >
          Tiếp tục
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  )
}

// ─── Step 2: QR Payment ─────────────────────────────────────────────────────
function PaymentQrStep({
  amount,
  name,
  projectTitle,
  onClose,
}: {
  amount: number
  name: string
  projectTitle: string
  onClose: () => void
}) {
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const formatVND = (n: number) => new Intl.NumberFormat("vi-VN").format(n)
  const transferContent = `QUYNH ${name.replace(/\s/g, "").toUpperCase().slice(0, 10)} ${amount}`
  const qrUrl = `https://img.vietqr.io/image/vietcombank-${BANK_INFO.accountNumber}-print.jpg?amount=${amount}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`

  const handleConfirm = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 py-10 text-center gap-4">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
          <Check className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Cảm ơn bạn rất nhiều! ❤️</h3>
        <p className="text-slate-500 text-sm max-w-xs">Chúng tôi đã ghi nhận xác nhận của bạn. Khoản ủng hộ sẽ được xử lý sớm nhất có thể.</p>
        <button onClick={onClose} className="mt-4 h-11 px-8 bg-[#006B3F] text-white font-bold rounded-lg hover:bg-[#00824d] transition-colors">
          Đóng
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <div className="text-center">
          <p className="text-sm text-slate-500 mb-1">Quét mã QR để chuyển khoản</p>
          <p className="font-bold text-[#006B3F] text-2xl">{formatVND(amount)}đ</p>
        </div>
        <div className="flex justify-center">
          <div className="p-3 border-2 border-slate-200 rounded-xl bg-white shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl}
              alt="Mã QR thanh toán VietQR"
              width={200}
              height={200}
              className="rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(transferContent)}`
              }}
            />
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl border border-slate-200 divide-y divide-slate-200 text-sm overflow-hidden">
          {[
            { label: "Ngân hàng", value: "Vietcombank" },
            { label: "Chủ tài khoản", value: BANK_INFO.accountName },
            { label: "Số tài khoản", value: BANK_INFO.accountNumber },
            { label: "Số tiền", value: `${formatVND(amount)}đ` },
            { label: "Nội dung CK", value: transferContent },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-4 px-4 py-3">
              <span className="text-slate-500 shrink-0 w-28">{label}</span>
              <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                <span className="font-semibold text-slate-800 text-right break-all">{value}</span>
                <CopyButton text={value} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          ⚠️ Vui lòng chuyển khoản đúng nội dung để giao dịch được xử lý tự động. Quỹ sẽ xác nhận trong vòng 24 giờ làm việc.
        </p>
      </div>
      <div className="border-t border-slate-100 px-6 py-4">
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full py-3.5 bg-[#006B3F] hover:bg-[#00824d] text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 text-base"
        >
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Đang xác nhận...</> : "✅ Tôi đã chuyển khoản xong"}
        </button>
      </div>
    </div>
  )
}

// ─── Main Modal ─────────────────────────────────────────────────────────────
export function DonationModal({ isOpen, onClose, projectTitle, remainingAmount }: DonationModalProps) {
  const [step, setStep] = useState<"form" | "qr">("form")
  const [donationData, setDonationData] = useState<{ amount: number; name: string; email: string; message: string; anonymous: boolean } | null>(null)

  if (!isOpen) return null

  const handleClose = () => {
    setStep("form")
    setDonationData(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal — wider to match BA mockup */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            {step === "qr" && (
              <button onClick={() => setStep("form")} className="text-slate-500 hover:text-slate-700 text-sm">
                ← Quay lại
              </button>
            )}
            <h2 className="text-base font-bold text-slate-900">
              {step === "form" ? "Thông tin ủng hộ" : "Quét mã QR để thanh toán"}
            </h2>
          </div>
          <button onClick={handleClose} aria-label="Đóng" className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step bar */}
        <div className="flex px-6 pt-3 pb-1 gap-2 shrink-0">
          <div className="flex-1 h-1 rounded-full bg-[#006B3F]" />
          <div className={`flex-1 h-1 rounded-full transition-all ${step === "qr" ? "bg-[#006B3F]" : "bg-slate-200"}`} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {step === "form" ? (
            <DonationForm
              projectTitle={projectTitle}
              remainingAmount={remainingAmount}
              onConfirm={(data) => { setDonationData(data); setStep("qr") }}
            />
          ) : donationData ? (
            <PaymentQrStep
              amount={donationData.amount}
              name={donationData.name}
              projectTitle={projectTitle}
              onClose={handleClose}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
