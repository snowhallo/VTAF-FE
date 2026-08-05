"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building,
  Heart,
  Settings,
  Menu,
  X,
  Bell,
  ChevronDown,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Crown,
  FileText,
  ClipboardList,
  Sparkles,
  Wallet,
} from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Persistent active role state in localStorage
  const [activeRole, setActiveRole] = useState<"admin" | "school" | "reviewer" | "donor" | "accountant">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dashboard_active_role");
      if (saved && ["admin", "school", "reviewer", "donor", "accountant"].includes(saved)) {
        return saved as any;
      }
    }
    return "admin";
  });

  useEffect(() => {
    if (pathname.startsWith("/dashboard/admin")) {
      setActiveRole("admin");
      localStorage.setItem("dashboard_active_role", "admin");
    } else if (pathname.startsWith("/dashboard/reviewer")) {
      setActiveRole("reviewer");
      localStorage.setItem("dashboard_active_role", "reviewer");
    } else if (pathname.startsWith("/dashboard/donor")) {
      setActiveRole("donor");
      localStorage.setItem("dashboard_active_role", "donor");
    } else if (pathname.startsWith("/dashboard/accountant")) {
      setActiveRole("accountant");
      localStorage.setItem("dashboard_active_role", "accountant");
    } else if (pathname.startsWith("/dashboard/school")) {
      setActiveRole("school");
      localStorage.setItem("dashboard_active_role", "school");
    }
  }, [pathname]);

  const currentRole = activeRole;

  const adminMenu: MenuItem[] = [
    { name: "Mục User (Tài khoản)", href: "/dashboard/admin?tab=users", icon: Users },
    { name: "Mục Cấp Role", href: "/dashboard/admin?tab=assign-role", icon: ShieldCheck },
    { name: "Tạo Role & Cấp quyền động", href: "/dashboard/admin?tab=roles", icon: Crown },
    { name: "Các chiến dịch", href: "/dashboard/admin?tab=campaigns", icon: Heart },
    { name: "Các dự án gây quỹ", href: "/dashboard/admin?tab=projects", icon: Building },
    { name: "Thống kê hệ thống", href: "/dashboard/admin?tab=stats", icon: LayoutDashboard },
    { name: "Cài đặt tài khoản", href: "/dashboard/settings", icon: Settings },
  ];

  const reviewerMenu: MenuItem[] = [
    { name: "Tổng quan", href: "/dashboard/reviewer?tab=overview", icon: LayoutDashboard },
    { name: "Thống kê kiểm duyệt", href: "/dashboard/reviewer?tab=stats", icon: LayoutDashboard },
    { name: "Dự án cần kiểm duyệt", href: "/dashboard/reviewer?tab=submissions", icon: FileText, badge: "3" },
    { name: "Chiến dịch hiện tại (Chỉ xem)", href: "/dashboard/reviewer?tab=campaigns", icon: Heart },
    { name: "Dự án hiện tại (Chỉ xem)", href: "/dashboard/reviewer?tab=projects", icon: Building },
    { name: "Cảnh báo bất thường", href: "/dashboard/reviewer?tab=alerts", icon: ShieldCheck, badge: "⚠️" },
    { name: "Cài đặt tài khoản", href: "/dashboard/settings", icon: Settings },
  ];

  const schoolMenu: MenuItem[] = [
    { name: "Tổng quan", href: "/dashboard/school?tab=overview", icon: LayoutDashboard },
    { name: "Thống kê", href: "/dashboard/school?tab=stats", icon: LayoutDashboard },
    { name: "Các dự án đã tạo", href: "/dashboard/school?tab=created", icon: ClipboardList },
    { name: "Dự án hiện tại của trường", href: "/dashboard/school?tab=school_only", icon: Building },
    { name: "Cài đặt tài khoản", href: "/dashboard/settings", icon: Settings },
  ];

  const donorMenu: MenuItem[] = [
    { name: "Tổng quan", href: "/dashboard/donor?tab=overview", icon: LayoutDashboard },
    { name: "Thống kê đóng góp", href: "/dashboard/donor?tab=stats", icon: LayoutDashboard },
    { name: "Dự án đã quyên góp", href: "/dashboard/donor?tab=donated", icon: Heart },
    { name: "Lịch sử quyên góp", href: "/dashboard/donor?tab=history", icon: ClipboardList },
    { name: "Dự án quan tâm (Watchlist)", href: "/dashboard/donor?tab=watchlist", icon: Crown },
    { name: "Cài đặt tài khoản", href: "/dashboard/settings", icon: Settings },
  ];

  const accountantMenu: MenuItem[] = [
    { name: "Tổng quan tài chính", href: "/dashboard/accountant?tab=overview", icon: LayoutDashboard },
    { name: "Thống kê thu chi", href: "/dashboard/accountant?tab=stats", icon: LayoutDashboard },
    { name: "Sao kê VietQR Realtime", href: "/dashboard/accountant?tab=transactions", icon: ClipboardList },
    { name: "Lệnh giải ngân kinh phí", href: "/dashboard/accountant?tab=disbursement", icon: FileText, badge: "3" },
    { name: "Cấp chứng nhận PDF", href: "/dashboard/accountant?tab=certificates", icon: Sparkles },
    { name: "Cài đặt tài khoản", href: "/dashboard/settings", icon: Settings },
  ];

  const activeMenu = activeRole === "admin" ? adminMenu : activeRole === "reviewer" ? reviewerMenu : activeRole === "donor" ? donorMenu : activeRole === "accountant" ? accountantMenu : schoolMenu;

  const handleRoleChange = (role: "admin" | "school" | "reviewer" | "donor" | "accountant") => {
    setActiveRole(role);
    localStorage.setItem("dashboard_active_role", role);
    if (role === "admin") {
      router.push("/dashboard/admin");
    } else if (role === "reviewer") {
      router.push("/dashboard/reviewer");
    } else if (role === "donor") {
      router.push("/dashboard/donor");
    } else if (role === "accountant") {
      router.push("/dashboard/accountant");
    } else {
      router.push("/dashboard/school");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 h-16 bg-white border-b border-slate-200/80 px-4 md:px-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/Logo.jpg" alt="Logo Quỹ VTAF" className="w-9 h-9 rounded-full border border-slate-200 object-cover" />
            <div className="flex flex-col justify-center hidden sm:flex">
              <span className="font-serif font-bold text-[13px] text-[#C21A30] leading-tight">
                QUỸ HỖ TRỢ NHÂN TÀI VIỆT NAM
              </span>
              <span className="text-[9px] text-[#006B3F] font-bold tracking-tight">
                VTAF DASHBOARD
              </span>
            </div>
          </Link>
        </div>

        {/* User Account Menu */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl relative cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#006B3F] text-white flex items-center justify-center font-bold text-xs">
                {currentRole === "admin" ? "AD" : currentRole === "reviewer" ? "RV" : currentRole === "donor" ? "DN" : currentRole === "accountant" ? "AC" : "SC"}
              </div>
              <div className="text-left hidden md:block">
                <span className="block text-xs font-bold text-slate-800 leading-tight">
                  {currentRole === "admin" ? "Admin Quản trị" : currentRole === "reviewer" ? "Người kiểm duyệt" : currentRole === "donor" ? "Nhà tài trợ" : currentRole === "accountant" ? "Kế toán Quỹ" : "THPT Nguyễn Đình Chiểu"}
                </span>
                <span className="block text-[10px] text-slate-400 font-semibold uppercase">{currentRole}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
            </button>

            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-pop-in">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsUserDropdownOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Settings className="w-4 h-4 text-slate-400" /> Cài đặt tài khoản
                </Link>
                <Link
                  href="/auth"
                  onClick={() => setIsUserDropdownOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100"
                >
                  <LogOut className="w-4 h-4" /> Đăng xuất
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200/80 hidden lg:flex flex-col shrink-0">
          {/* Role Switcher */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1.5 px-1">
              Không gian làm việc
            </label>
            <div className="relative">
              <select
                value={currentRole}
                onChange={(e) => handleRoleChange(e.target.value as any)}
                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-3 pr-8 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F] appearance-none cursor-pointer shadow-xs"
              >
                <option value="admin">👑 Cổng Admin Quản trị</option>
                <option value="accountant">💰 Cổng Kế toán Quỹ</option>
                <option value="school">🏫 Cổng Nhà trường</option>
                <option value="reviewer">🛡️ Cổng Kiểm duyệt</option>
                <option value="donor">❤️ Cổng Nhà tài trợ</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto flex-1">
            {activeMenu.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#006B3F]" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-extrabold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Workspace Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
