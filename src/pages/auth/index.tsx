import { useState, useEffect, useRef, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Eye, EyeOff, Loader2, Phone, Lock, User, Mail, AtSign,
  ArrowRight, ChevronLeft, Check, MessageSquare, Shield,
  Crown, School, Heart, ShieldCheck, Wallet, Sparkles, Key
} from "lucide-react"
import { authenticateUser, registerNewUser, getStoredUsers } from "@/utils/userStore"

type Tab = "login" | "register" | "forgot"
type ForgotStep = "choose" | "otp" | "new-password" | "success"
type ResetMethod = "phone" | "email"

const OTP_EXPIRE_SECONDS = 300 // 5 phút

// Inline SVG icons
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

// Field Component
function Field({
  label, type = "text", placeholder, value, onChange, error,
  icon: Icon, rightEl, autoComplete, disabled,
}: {
  label?: string; type?: string; placeholder: string; value: string
  onChange: (v: string) => void; error?: string
  icon?: React.ElementType; rightEl?: React.ReactNode
  autoComplete?: string; disabled?: boolean
}) {
  return (
    <div>
      {label && <label className="block text-xs font-bold text-slate-700 mb-1.5">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />}
        <input
          type={type} value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} autoComplete={autoComplete}
          disabled={disabled}
          className={`
            w-full h-11 ${Icon ? "pl-10" : "pl-4"} pr-10
            rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 bg-white
            transition-all focus:outline-none focus:ring-2
            disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
            ${error ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:border-[#006B3F] focus:ring-[#006B3F]/20"}
          `}
        />
        {rightEl && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</div>}
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  )
}

// Social Buttons
function SocialButtons({ action }: { action: "Đăng nhập" | "Đăng ký" }) {
  return (
    <div className="space-y-2.5">
      <button type="button" className="w-full h-11 flex items-center justify-center gap-3 px-4 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer">
        <FacebookIcon /><span>{action} bằng Facebook</span>
      </button>
      <button type="button" className="w-full h-11 flex items-center justify-center gap-3 px-4 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer">
        <GoogleIcon /><span>{action} bằng Google</span>
      </button>
    </div>
  )
}

function Divider({ text }: { text: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
      <div className="relative flex justify-center"><span className="bg-white px-3 text-xs font-semibold text-slate-400">{text}</span></div>
    </div>
  )
}

// Submit button
function SubmitBtn({ label, loading, loadingLabel }: { label: string; loading: boolean; loadingLabel: string }) {
  return (
    <button type="submit" disabled={loading}
      className="w-full h-12 bg-[#006B3F] hover:bg-[#005030] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-60 cursor-pointer">
      {loading
        ? <><Loader2 className="w-5 h-5 animate-spin" />{loadingLabel}</>
        : <><span>{label}</span><ArrowRight className="w-5 h-5" /></>
      }
    </button>
  )
}

// Password strength
function PasswordStrength({ password }: { password: string }) {
  const strength =
    password.length === 0 ? 0
      : password.length < 6 ? 1
        : /(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(password) ? 4
          : /(?=.*[A-Z])(?=.*[0-9])/.test(password) ? 3
            : password.length >= 8 ? 2 : 1
  const colors = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"]
  const labels = ["", "Yếu", "Trung bình", "Khá", "Mạnh"]
  const textColors = ["", "text-red-500", "text-orange-500", "text-yellow-600", "text-green-600"]
  if (!password) return null
  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? colors[strength] : "bg-slate-200"}`} />
        ))}
      </div>
      <span className={`text-xs font-medium ${textColors[strength]}`}>{labels[strength]}</span>
    </div>
  )
}

// Terms text
function TermsText() {
  return (
    <p className="text-center text-[11px] text-slate-400 leading-relaxed">
      Bằng việc tiếp tục, bạn đã đồng ý với{" "}
      <Link to="/terms" target="_blank" className="underline hover:text-slate-600">Điều khoản &amp; Điều kiện</Link>
      {" "}và{" "}
      <Link to="/privacy" target="_blank" className="underline hover:text-slate-600">Chính sách bảo mật</Link>
      {" "}của Quỹ Hỗ trợ nhân tài Việt Nam.
    </p>
  )
}

// FORGOT PASSWORD FLOW
function ForgotPasswordFlow({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate()
  const [step, setStep] = useState<ForgotStep>("choose")
  const [method, setMethod] = useState<ResetMethod>("phone")
  const [contact, setContact] = useState("")
  const [contactError, setContactError] = useState("")
  const [loading, setLoading] = useState(false)

  // OTP state
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [otpError, setOtpError] = useState("")
  const [secondsLeft, setSecondsLeft] = useState(OTP_EXPIRE_SECONDS)
  const [canResend, setCanResend] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  // New password state
  const [newPw, setNewPw] = useState("")
  const [confirmPw, setConfirmPw] = useState("")
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pwErrors, setPwErrors] = useState<Record<string, string>>({})

  const startTimer = useCallback(() => {
    setSecondsLeft(OTP_EXPIRE_SECONDS)
    setCanResend(false)
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!)
          setCanResend(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
  }, [])

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (method === "phone" && !/^0[3-9][0-9]{8}$/.test(contact.replace(/\s/g, ""))) {
      setContactError("Số điện thoại Việt Nam không hợp lệ."); return
    }
    if (method === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
      setContactError("Địa chỉ email không hợp lệ."); return
    }
    setContactError("")
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    startTimer()
    setStep("otp")
  }

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[idx] = val.slice(-1)
    setOtp(next)
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus()
    if (!val && idx > 0) inputRefs.current[idx - 1]?.focus()
  }

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (digits.length === 6) {
      setOtp(digits.split(""))
      inputRefs.current[5]?.focus()
    }
    e.preventDefault()
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (secondsLeft === 0) { setOtpError("Mã đã hết hạn. Vui lòng gửi lại."); return }
    if (otp.join("").length < 6) { setOtpError("Vui lòng nhập đủ 6 chữ số."); return }
    setOtpError("")
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    if (timerRef.current) clearInterval(timerRef.current)
    setStep("new-password")
  }

  const handleResend = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setOtp(["", "", "", "", "", ""])
    startTimer()
    inputRefs.current[0]?.focus()
  }

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const err: Record<string, string> = {}
    if (!newPw) err.newPw = "Vui lòng nhập mật khẩu mới."
    else if (newPw.length < 8) err.newPw = "Mật khẩu phải có ít nhất 8 ký tự."
    if (!confirmPw) err.confirmPw = "Vui lòng xác nhận mật khẩu."
    else if (confirmPw !== newPw) err.confirmPw = "Mật khẩu xác nhận không khớp."
    setPwErrors(err)
    if (Object.keys(err).length > 0) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setStep("success")
  }

  useEffect(() => {
    if (step === "success") {
      const t = setTimeout(() => navigate("/"), 2000)
      return () => clearTimeout(t)
    }
  }, [step, navigate])

  const maskContact = (c: string) => {
    if (method === "phone") return c.replace(/(\d{3})\d{4}(\d{3})/, "$1****$2")
    const [user, domain] = c.split("@")
    return `${user.slice(0, 3)}***@${domain}`
  }

  return (
    <div className="space-y-5">
      {step === "choose" && (
        <>
          <div className="text-center space-y-1">
            <Shield className="w-10 h-10 text-[#006B3F] mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">Quên mật khẩu?</h3>
            <p className="text-xs text-slate-500">Chọn phương thức để nhận mã xác nhận</p>
          </div>

          <form onSubmit={handleSend} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {(["phone", "email"] as ResetMethod[]).map((m) => (
                <button
                  key={m} type="button"
                  onClick={() => { setMethod(m); setContact(""); setContactError("") }}
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${method === m ? "border-[#006B3F] bg-[#006B3F]/5 text-[#006B3F]" : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                >
                  {m === "phone"
                    ? <><Phone className="w-4 h-4 shrink-0" />Số điện thoại</>
                    : <><Mail className="w-4 h-4 shrink-0" />Email</>
                  }
                </button>
              ))}
            </div>

            <Field
              placeholder={method === "phone" ? "Nhập số điện thoại đã đăng ký" : "Nhập email đã đăng ký"}
              type={method === "email" ? "email" : "text"}
              value={contact}
              onChange={(v) => { setContact(v); setContactError("") }}
              error={contactError}
              icon={method === "phone" ? Phone : Mail}
              autoComplete={method === "email" ? "email" : "tel"}
            />

            <SubmitBtn label="Gửi mã xác nhận" loading={loading} loadingLabel="Đang gửi..." />
          </form>

          <button onClick={onBack} className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />Quay lại đăng nhập
          </button>
        </>
      )}

      {step === "otp" && (
        <>
          <div className="text-center space-y-1">
            <MessageSquare className="w-10 h-10 text-[#006B3F] mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">Nhập mã xác nhận</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Mã 6 chữ số đã được gửi đến<br />
              <span className="font-semibold text-slate-700">{maskContact(contact)}</span>
            </p>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => { inputRefs.current[idx] = el }}
                  type="text" inputMode="numeric" maxLength={1} value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className={`w-11 h-13 py-3 text-center text-xl font-bold rounded-xl border-2 transition-all focus:outline-none
                    ${digit ? "border-[#006B3F] bg-[#006B3F]/5 text-[#006B3F]" : "border-slate-300 text-slate-800"}
                    ${otpError ? "border-red-400" : "focus:border-[#006B3F]"}
                    ${secondsLeft === 0 ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                  disabled={secondsLeft === 0}
                />
              ))}
            </div>

            <div className="text-center">
              {secondsLeft > 0 ? (
                <span className={`text-xs font-semibold ${secondsLeft <= 60 ? "text-red-500" : "text-slate-600"}`}>
                  Mã hết hạn sau{" "}
                  <span className="font-mono">{formatTime(secondsLeft)}</span>
                </span>
              ) : (
                <p className="text-red-500 text-xs font-medium">Mã đã hết hạn!</p>
              )}
            </div>

            {otpError && <p className="text-red-500 text-xs text-center">{otpError}</p>}

            <SubmitBtn label="Xác nhận mã" loading={loading} loadingLabel="Đang xác nhận..." />

            <div className="text-center">
              {canResend ? (
                <button type="button" onClick={handleResend} disabled={loading}
                  className="text-xs text-[#006B3F] hover:underline font-bold disabled:opacity-50 cursor-pointer">
                  Gửi lại mã
                </button>
              ) : (
                <span className="text-xs text-slate-400">
                  Không nhận được mã? Gửi lại sau{" "}
                  <span className="font-mono font-medium">{formatTime(secondsLeft)}</span>
                </span>
              )}
            </div>
          </form>

          <button onClick={() => setStep("choose")} className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />Đổi phương thức
          </button>
        </>
      )}

      {step === "new-password" && (
        <>
          <div className="text-center space-y-1">
            <Lock className="w-10 h-10 text-[#006B3F] mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">Đặt mật khẩu mới</h3>
            <p className="text-xs text-slate-500">Nhập mật khẩu mới cho tài khoản của bạn</p>
          </div>

          <form onSubmit={handleSetPassword} className="space-y-3">
            <div>
              <Field
                type={showNewPw ? "text" : "password"}
                placeholder="Mật khẩu mới (ít nhất 8 ký tự)"
                value={newPw}
                onChange={setNewPw}
                error={pwErrors.newPw}
                icon={Lock}
                autoComplete="new-password"
                rightEl={
                  <button type="button" onClick={() => setShowNewPw(v => !v)} className="text-slate-400 hover:text-slate-600">
                    {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />
              <PasswordStrength password={newPw} />
            </div>

            <Field
              type={showConfirm ? "text" : "password"}
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPw}
              onChange={setConfirmPw}
              error={pwErrors.confirmPw}
              icon={Lock}
              autoComplete="new-password"
              rightEl={
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="text-slate-400 hover:text-slate-600">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <SubmitBtn label="Cập nhật mật khẩu" loading={loading} loadingLabel="Đang lưu..." />
          </form>
        </>
      )}

      {step === "success" && (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base">Đổi mật khẩu thành công! 🎉</h3>
            <p className="text-xs text-slate-500 mt-1">Đang chuyển hướng về trang chủ...</p>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-[#006B3F] rounded-full animate-[progress_2s_linear_forwards]" />
          </div>
        </div>
      )}
    </div>
  )
}

// LOGIN FORM CONNECTED TO LOCALSTORAGE USER STORE
function LoginForm({ onForgot }: { onForgot: () => void }) {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  // Quick fill admin credentials
  const handleFillAdmin = () => {
    setUsername("admin")
    setPassword("admin123")
    setErrors({})
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!username.trim()) e.username = "Vui lòng nhập tên đăng nhập."
    if (!password) e.password = "Vui lòng nhập mật khẩu."
    setErrors(e); return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))

    // Check user in stored users array
    const authenticatedUser = authenticateUser(username, password)

    setLoading(false)

    if (authenticatedUser) {
      navigate(`/dashboard/${authenticatedUser.roleId}`)
    } else {
      setErrors({
        auth: "Tên đăng nhập hoặc mật khẩu không chính xác. (Tài khoản Admin gợi ý: admin / admin123)",
      })
    }
  }

  return (
    <div className="space-y-4">
      {/* 👑 PRE-CREATED ADMIN NOTICE BOX 👑 */}
      <div className="p-3.5 bg-[#006B3F]/5 border border-[#006B3F]/20 rounded-2xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold text-[#006B3F] flex items-center gap-1.5 uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5 text-amber-500" />
            Tài khoản Admin tạo sẵn
          </span>
          <button
            type="button"
            onClick={handleFillAdmin}
            className="px-2.5 py-1 bg-[#006B3F] hover:bg-[#005030] text-white text-[10px] font-extrabold rounded-lg transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            ⚡ Điền Admin ngay
          </button>
        </div>
        <div className="text-xs text-slate-700 space-y-0.5 font-medium">
          <p>• Username: <strong className="font-mono text-purple-900 bg-purple-50 px-1 py-0.5 rounded">admin</strong></p>
          <p>• Mật khẩu: <strong className="font-mono text-purple-900 bg-purple-50 px-1 py-0.5 rounded">admin123</strong></p>
        </div>
      </div>

      <SocialButtons action="Đăng nhập" />
      <Divider text="Hoặc nhập tài khoản cá nhân" />

      {errors.auth && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold">
          {errors.auth}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <Field placeholder="Tên đăng nhập (hoặc email)" value={username} onChange={setUsername} error={errors.username} icon={User} autoComplete="username" />
        <Field
          type={showPw ? "text" : "password"} placeholder="Mật khẩu"
          value={password} onChange={setPassword} error={errors.password}
          icon={Lock} autoComplete="current-password"
          rightEl={
            <button type="button" onClick={() => setShowPw(v => !v)} className="text-slate-400 hover:text-slate-600">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        <div className="text-right">
          <button type="button" onClick={onForgot} className="text-xs text-slate-500 hover:text-[#006B3F] transition-colors">
            Quên mật khẩu?
          </button>
        </div>

        <SubmitBtn label="Đăng nhập Dashboard" loading={loading} loadingLabel="Đang kiểm tra tài khoản..." />
        <TermsText />
      </form>
    </div>
  )
}

// REGISTER FORM CONNECTED TO LOCALSTORAGE USER STORE
function RegisterForm() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPw, setConfirmPw] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const isUsernameValid = username.length === 0 || /^[a-zA-Z0-9_]{4,}$/.test(username)
  const isEmailValid = email.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isPhoneValid = phone.length === 0 || /^0[3-9][0-9]{8}$/.test(phone.replace(/\s/g, ""))

  const pwHasLength = password.length >= 8
  const pwHasLower = /[a-z]/.test(password)
  const pwHasUpper = /[A-Z]/.test(password)
  const pwHasNumber = /[0-9]/.test(password)
  const pwHasSpecial = /[^A-Za-z0-9]/.test(password)
  const isPasswordSecure = pwHasLength && pwHasLower && pwHasUpper && pwHasNumber && pwHasSpecial

  const validate = () => {
    const e: Record<string, string> = {}
    if (!username.trim()) e.username = "Vui lòng nhập tên đăng nhập."
    else if (!/^[a-zA-Z0-9_]{4,}$/.test(username)) e.username = "Tên đăng nhập không hợp lệ."

    if (!email.trim()) e.email = "Vui lòng nhập email."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email không hợp lệ."

    if (!phone.trim()) e.phone = "Vui lòng nhập số điện thoại."
    else if (!/^0[3-9][0-9]{8}$/.test(phone.replace(/\s/g, ""))) e.phone = "Số điện thoại không hợp lệ."

    if (!password) e.password = "Vui lòng nhập mật khẩu."
    else if (!isPasswordSecure) e.password = "Mật khẩu chưa đủ an toàn."

    if (!confirmPw) e.confirmPw = "Vui lòng xác nhận mật khẩu."
    else if (confirmPw !== password) e.confirmPw = "Mật khẩu xác nhận không khớp."

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))

    // Register user in LocalStorage store (Defaults to "donor" role)
    const newUser = registerNewUser({
      username: username,
      email: email,
      phone: phone,
      password: password,
      roleId: "donor",
    })

    setLoading(false)
    navigate(`/dashboard/${newUser.roleId}`)
  }

  return (
    <div className="space-y-4">
      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 leading-relaxed font-medium">
        ✨ <strong>Đăng ký tài khoản mới:</strong> Tài khoản mới sau khi tạo sẽ được lưu vào hệ thống Local. Admin có thể xem danh sách và tự do nâng/cấp Role cho bạn!
      </div>

      <SocialButtons action="Đăng ký" />
      <Divider text="Hoặc đăng ký bằng thông tin cá nhân" />

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Field
            placeholder="Tên đăng nhập (chữ, số, dấu _)"
            value={username}
            onChange={(v) => {
              setUsername(v)
              if (errors.username) setErrors(prev => ({ ...prev, username: "" }))
            }}
            error={errors.username}
            icon={AtSign}
            autoComplete="username"
          />
          {!isUsernameValid && (
            <p className="text-[11px] text-amber-600 mt-1 leading-relaxed">
              💡 Hướng dẫn: Tên đăng nhập phải có ít nhất 4 ký tự, chỉ gồm chữ cái, chữ số và dấu gạch dưới (_).
            </p>
          )}
        </div>

        <div>
          <Field
            type="email"
            placeholder="Địa chỉ email"
            value={email}
            onChange={(v) => {
              setEmail(v)
              if (errors.email) setErrors(prev => ({ ...prev, email: "" }))
            }}
            error={errors.email}
            icon={Mail}
            autoComplete="email"
          />
          {!isEmailValid && (
            <p className="text-[11px] text-amber-600 mt-1 leading-relaxed">
              💡 Hướng dẫn: Email phải đúng định dạng chuẩn (ví dụ: example@gmail.com).
            </p>
          )}
        </div>

        <div>
          <Field
            placeholder="Số điện thoại"
            value={phone}
            onChange={(v) => {
              setPhone(v)
              if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }))
            }}
            error={errors.phone}
            icon={Phone}
            autoComplete="tel"
          />
          {!isPhoneValid && (
            <p className="text-[11px] text-amber-600 mt-1 leading-relaxed">
              💡 Hướng dẫn: Số điện thoại phải có đúng 10 số di động Việt Nam.
            </p>
          )}
        </div>

        <div>
          <Field
            type={showPw ? "text" : "password"}
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(v) => {
              setPassword(v)
              if (errors.password) setErrors(prev => ({ ...prev, password: "" }))
            }}
            error={errors.password}
            icon={Lock}
            autoComplete="new-password"
            rightEl={
              <button type="button" onClick={() => setShowPw(v => !v)} className="text-slate-400 hover:text-slate-600">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />

          {password.length > 0 && (
            <div className="mt-2 p-2 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <p className="text-[11px] font-semibold text-slate-500 mb-1.5">Yêu cầu bảo mật mật khẩu:</p>
              {[
                { checked: pwHasLength, label: "Tối thiểu 8 ký tự" },
                { checked: pwHasLower, label: "Ít nhất 1 chữ cái thường (a-z)" },
                { checked: pwHasUpper, label: "Ít nhất 1 chữ cái hoa (A-Z)" },
                { checked: pwHasNumber, label: "Ít nhất 1 chữ số (0-9)" },
                { checked: pwHasSpecial, label: "Ít nhất 1 ký tự đặc biệt (@, #, $, ...)" },
              ].map((rule, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                  <span className={`font-bold ${rule.checked ? "text-green-600" : "text-slate-300"}`}>
                    {rule.checked ? "✓" : "○"}
                  </span>
                  <span className={rule.checked ? "text-green-700" : "text-slate-500"}>
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Field
          type={showConfirm ? "text" : "password"}
          placeholder="Nhập lại mật khẩu"
          value={confirmPw}
          onChange={(v) => {
            setConfirmPw(v)
            if (errors.confirmPw) setErrors(prev => ({ ...prev, confirmPw: "" }))
          }}
          error={errors.confirmPw}
          icon={Lock}
          autoComplete="new-password"
          rightEl={
            <button type="button" onClick={() => setShowConfirm(v => !v)} className="text-slate-400 hover:text-slate-600">
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        <SubmitBtn label="Đăng ký tài khoản" loading={loading} loadingLabel="Đang lưu vào hệ thống..." />
        <TermsText />
      </form>
    </div>
  )
}

export default function AuthPage() {
  const [tab, setTab] = useState<Tab>("login")

  return (
    <div className="min-h-screen bg-slate-200/80 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        {tab !== "forgot" && (
          <div className="flex justify-center pt-6 pb-2">
            <Link to="/" className="flex flex-col items-center gap-2">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-slate-200">
                <img src="/Logo.jpg" alt="Logo Quỹ" className="w-full h-full object-cover" />
              </div>
              <div className="text-center leading-tight">
                <div className="font-serif font-bold text-[12px] text-[#C21A30]">
                  QUỸ HỖ TRỢ NHÂN TÀI VIỆT NAM
                </div>
                <div className="text-[8px] text-[#064423] font-semibold tracking-wide">
                  VIETNAM TALENTS ASSISTANCE FUND
                </div>
              </div>
            </Link>
          </div>
        )}

        {tab !== "forgot" ? (
          <div className="flex border-b border-slate-200 mt-3">
            {(["login", "register"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 cursor-pointer ${tab === t ? "text-slate-900 border-slate-900" : "text-slate-400 border-transparent hover:text-slate-600"
                  }`}
              >
                {t === "login" ? "Đăng nhập" : "Đăng ký"}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100">
            <Link to="/" className="relative w-8 h-8 overflow-hidden rounded-full border border-slate-200 shrink-0">
              <img src="/Logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </Link>
            <span className="text-sm font-bold text-slate-800">Lấy lại mật khẩu</span>
          </div>
        )}

        <div className="px-6 py-5 max-h-[82vh] overflow-y-auto">
          {tab === "login" && <LoginForm onForgot={() => setTab("forgot")} />}
          {tab === "register" && <RegisterForm />}
          {tab === "forgot" && <ForgotPasswordFlow onBack={() => setTab("login")} />}
        </div>
      </div>
    </div>
  )
}
