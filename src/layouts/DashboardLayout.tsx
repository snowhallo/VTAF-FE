import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Building,
  Settings,
  Bell,
  Menu,
  X,
  ChevronDown,
  LogOut,
  ChevronRight,
  FileText,
  Shield,
  Heart,
  School,
  Sparkles,
  ExternalLink,
  Crown,
  Users,
  ShieldCheck,
} from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
}

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Persistent active role management (so clicking /dashboard/settings keeps the user's active workspace role)
  const [activeRole, setActiveRole] = useState<"admin" | "school" | "reviewer" | "donor" | "accountant">(() => {
    const saved = localStorage.getItem("dashboard_active_role");
    if (saved && ["admin", "school", "reviewer", "donor", "accountant"].includes(saved)) {
      return saved as any;
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

  // Sidebar Menu Items for Admin Role
  const adminMenu: MenuItem[] = [
    { name: "Mục User (Tài khoản)", href: "/dashboard/admin?tab=users", icon: Users },
    { name: "Mục Cấp Role", href: "/dashboard/admin?tab=assign-role", icon: ShieldCheck },
    { name: "Tạo Role & Cấp quyền động", href: "/dashboard/admin?tab=roles", icon: Crown },
    { name: "Các chiến dịch", href: "/dashboard/admin?tab=campaigns", icon: Heart },
    { name: "Các dự án gây quỹ", href: "/dashboard/admin?tab=projects", icon: Building },
    { name: "Thống kê hệ thống", href: "/dashboard/admin?tab=stats", icon: LayoutDashboard },
    { name: "Cài đặt tài khoản", href: "/dashboard/settings", icon: Settings },
  ];

  // Sidebar Menu Items for Reviewer Role
  const reviewerMenu: MenuItem[] = [
    { name: "Tổng quan", href: "/dashboard/reviewer?tab=overview", icon: LayoutDashboard },
    { name: "Thống kê kiểm duyệt", href: "/dashboard/reviewer?tab=stats", icon: LayoutDashboard },
    { name: "Dự án cần kiểm duyệt", href: "/dashboard/reviewer?tab=submissions", icon: FileText, badge: "3" },
    { name: "Chiến dịch hiện tại (Chỉ xem)", href: "/dashboard/reviewer?tab=campaigns", icon: Heart },
    { name: "Dự án hiện tại (Chỉ xem)", href: "/dashboard/reviewer?tab=projects", icon: Building },
    { name: "Cảnh báo bất thường", href: "/dashboard/reviewer?tab=alerts", icon: ShieldCheck, badge: "⚠️" },
    { name: "Cài đặt tài khoản", href: "/dashboard/settings", icon: Settings },
  ];

  // Sidebar Menu Items for School Role
  const schoolMenu: MenuItem[] = [
    { name: "Tổng quan", href: "/dashboard/school?tab=overview", icon: LayoutDashboard },
    { name: "Thống kê", href: "/dashboard/school?tab=stats", icon: LayoutDashboard },
    { name: "Các dự án đã tạo", href: "/dashboard/school?tab=created", icon: ClipboardList },
    { name: "Dự án hiện tại của trường", href: "/dashboard/school?tab=school_only", icon: Building },
    { name: "Cài đặt tài khoản", href: "/dashboard/settings", icon: Settings },
  ];

  // Sidebar Menu Items for Donor Role
  const donorMenu: MenuItem[] = [
    { name: "Tổng quan", href: "/dashboard/donor?tab=overview", icon: LayoutDashboard },
    { name: "Thống kê đóng góp", href: "/dashboard/donor?tab=stats", icon: LayoutDashboard },
    { name: "Dự án đã quyên góp", href: "/dashboard/donor?tab=donated", icon: Heart },
    { name: "Lịch sử quyên góp", href: "/dashboard/donor?tab=history", icon: ClipboardList },
    { name: "Dự án quan tâm (Watchlist)", href: "/dashboard/donor?tab=watchlist", icon: Crown },
    { name: "Cài đặt tài khoản", href: "/dashboard/settings", icon: Settings },
  ];

  // Sidebar Menu Items for Accountant Role
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
      navigate("/dashboard/admin");
    } else if (role === "reviewer") {
      navigate("/dashboard/reviewer");
    } else if (role === "donor") {
      navigate("/dashboard/donor");
    } else if (role === "accountant") {
      navigate("/dashboard/accountant");
    } else {
      navigate("/dashboard/school");
    }
  };

  const isActive = (href: string) => {
    const currentFull = location.pathname + location.search;
    if (href.includes("?tab=")) {
      return currentFull === href || (location.pathname === href.split("?")[0] && location.search === "" && href.endsWith("users"));
    }
    return pathname === href;
  };

  const getBreadcrumbs = () => {
    if (!pathname) return [];
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      let label = segment;
      if (segment === "dashboard") label = "Dashboard";
      else if (segment === "admin") label = "Cổng Admin";
      else if (segment === "school") label = "Cổng Nhà trường";
      else if (segment === "reviewer") label = "Cổng Kiểm duyệt";
      else if (segment === "donor") label = "Cổng Nhà tài trợ";
      else if (segment === "settings") label = "Cài đặt tài khoản";
      else if (segment === "projects") label = "Dự án";
      else if (segment === "new") label = "Tạo mới";
      else if (segment === "submissions") label = "Hàng chờ";
      else if (segment === "profile") label = "Hồ sơ";
      else if (!isNaN(Number(segment))) label = `Chi tiết #${segment}`;
      return { label, href };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans">
      {/* ─── DESKTOP SIDEBAR ─── */}
      <aside className="hidden lg:flex lg:flex-col w-64 border-r border-slate-200/80 bg-white shrink-0 sticky top-0 h-screen shadow-sm z-30">
        {/* Logo Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-200 shrink-0">
              <img src="/Logo.jpg" alt="Logo RaiseFund" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-sm text-[#C21A30] leading-none">RaiseFund</h1>
              <p className="text-[9px] text-[#064423] font-semibold tracking-wide mt-0.5">HỆ THỐNG QUẢN LÝ QUỸ</p>
            </div>
          </Link>
          <a href="https://quynhantai.org" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-600 p-1" title="Mở trang chủ Quỹ">
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Role Switcher */}
        <div className="p-3 border-b border-slate-100 bg-slate-50/50">
          <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1.5 px-1">
            Không gian làm việc
          </label>
          <div className="relative">
            <select
              value={currentRole}
              onChange={(e) => handleRoleChange(e.target.value as "admin" | "school" | "reviewer" | "donor" | "accountant")}
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F] appearance-none cursor-pointer shadow-xs"
            >
              <option value="admin">👑 Cổng Admin Quản trị</option>
              <option value="accountant">💰 Cổng Kế toán Quỹ</option>
              <option value="school">🏫 Cổng Nhà trường</option>
              <option value="reviewer">🛡️ Cổng Kiểm duyệt</option>
              <option value="donor">❤️ Cổng Nhà tài trợ</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {activeMenu.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? "bg-[#006B3F] text-white shadow-md shadow-emerald-900/10"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    active ? "bg-white text-[#006B3F]" : "bg-rose-100 text-rose-700 animate-pulse"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 p-2 bg-white border border-slate-200/80 rounded-xl shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#006B3F]/10 text-[#006B3F] flex items-center justify-center font-bold text-xs shrink-0">
              {currentRole === "admin" ? <Crown className="w-4 h-4 text-purple-700" /> : currentRole === "school" ? <School className="w-4 h-4" /> : currentRole === "reviewer" ? <Shield className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-800 truncate">
                {currentRole === "admin" ? "Admin Quản trị VTAF" : currentRole === "school" ? "THPT Nguyễn Đình Chiểu" : currentRole === "reviewer" ? "Hội đồng Kiểm duyệt" : "Nguyễn Hữu Tài"}
              </p>
              <p className="text-[10px] text-slate-400 font-medium truncate">
                {currentRole === "admin" ? "Super Admin" : currentRole === "school" ? "Tài khoản đối tác" : currentRole === "reviewer" ? "Chuyên viên thẩm định" : "Nhà tài trợ Vàng"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── MOBILE SIDEBAR OVERLAY ─── */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)} />
          <div className="relative w-72 bg-white h-full flex flex-col shadow-2xl z-10 animate-pop-in">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src="/Logo.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-slate-200" />
                <div>
                  <h1 className="font-bold text-sm text-slate-800">RaiseFund</h1>
                  <p className="text-[10px] text-slate-400 font-medium">Hệ thống Vận hành Quỹ</p>
                </div>
              </div>
              <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 border-b border-slate-100">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2">
                Không gian làm việc
              </label>
              <div className="relative">
                <select
                  value={currentRole}
                  onChange={(e) => {
                    handleRoleChange(e.target.value as "admin" | "school" | "reviewer" | "donor" | "accountant");
                    setIsMobileSidebarOpen(false);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs font-bold text-slate-800 appearance-none"
                >
                  <option value="admin">👑 Cổng Admin Quản trị</option>
                  <option value="accountant">💰 Cổng Kế toán Quỹ</option>
                  <option value="school">🏫 Cổng Nhà trường</option>
                  <option value="reviewer">🛡️ Cổng Kiểm duyệt</option>
                  <option value="donor">❤️ Cổng Nhà tài trợ</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
              {activeMenu.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      active ? "bg-[#006B3F] text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-100 text-rose-700">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* ─── MAIN CONTENT AREA ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <header className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-6 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumbs */}
            <nav className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Link to="/dashboard/school" className="hover:text-[#006B3F] transition-colors">
                Trang chủ Quỹ
              </Link>
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={crumb.href}>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  <span className={i === breadcrumbs.length - 1 ? "font-bold text-slate-900" : "hover:text-slate-700"}>
                    {crumb.label}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {/* Notification button */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors relative cursor-pointer"
                title="Thông báo hệ thống"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 animate-pop-in">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#006B3F]" />
                      Thông báo mới (2)
                    </h3>
                    <button onClick={() => setIsNotificationsOpen(false)} className="text-[10px] text-slate-400 hover:text-slate-600">Đóng</button>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                      <p className="font-bold text-[#006B3F]">✅ Dự án đã duyệt công khai</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">Dự án trao học bổng Olympic đã được phê duyệt kêu gọi vốn.</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100">
                      <p className="font-bold text-amber-800">⚠️ Yêu cầu bổ sung hồ sơ</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">Dự án học phí cần đính kèm chứng nhận học sinh giỏi cấp tỉnh.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Role indicator pill */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#006B3F] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {currentRole === "admin" ? "Admin Quản trị" : currentRole === "school" ? "Trường học" : currentRole === "reviewer" ? "Kiểm duyệt viên" : "Nhà tài trợ"}
              </span>
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#006B3F] to-emerald-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {currentRole === "admin" ? "AD" : currentRole === "school" ? "TH" : currentRole === "reviewer" ? "KD" : "NT"}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-pop-in">
                  <div className="px-4 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900">
                      {currentRole === "admin" ? "Admin Quản trị VTAF" : currentRole === "school" ? "THPT Nguyễn Đình Chiểu" : currentRole === "reviewer" ? "Hội đồng Thẩm định" : "Nguyễn Hữu Tài"}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">user@quynhantai.org</p>
                  </div>
                  <Link
                    to="/dashboard/settings"
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Cài đặt tài khoản
                  </Link>
                  <button
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      navigate("/auth");
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất hệ thống
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
