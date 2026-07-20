"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  UserCheck,
  Building,
  Settings,
  Bell,
  Menu,
  X,
  ChevronDown,
  LogOut,
  ChevronRight,
  ShieldCheck,
  School,
  FileText,
  AlertTriangle,
} from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Determine current role based on URL path
  const isReviewer = pathname?.startsWith("/dashboard/reviewer");
  const isDonor = pathname?.startsWith("/dashboard/donor");
  const currentRole = isReviewer ? "reviewer" : isDonor ? "donor" : "school";

  // Sidebar Menu Items for School Role
  const schoolMenu: MenuItem[] = [
    { name: "Tổng quan", href: "/dashboard/school", icon: LayoutDashboard },
    { name: "Đề xuất & Dự án", href: "/dashboard/school/projects", icon: ClipboardList },
    { name: "Thông tin trường", href: "/dashboard/school/profile", icon: Building },
  ];

  // Sidebar Menu Items for Reviewer Role
  const reviewerMenu: MenuItem[] = [
    { name: "Tổng quan", href: "/dashboard/reviewer", icon: LayoutDashboard },
    { name: "Hàng chờ xét duyệt", href: "/dashboard/reviewer/submissions", icon: FileText, badge: "3" },
    { name: "Quản lý dự án", href: "/dashboard/reviewer/projects", icon: ClipboardList },
  ];

  // Sidebar Menu Items for Donor Role
  const donorMenu: MenuItem[] = [
    { name: "Tổng quan", href: "/dashboard/donor", icon: LayoutDashboard },
    { name: "Lịch sử tài trợ", href: "/dashboard/donor/history", icon: ClipboardList },
  ];

  const activeMenu = currentRole === "reviewer" ? reviewerMenu : currentRole === "donor" ? donorMenu : schoolMenu;

  const handleRoleChange = (role: "school" | "reviewer" | "donor") => {
    if (role === "reviewer") {
      router.push("/dashboard/reviewer");
    } else if (role === "donor") {
      router.push("/dashboard/donor");
    } else {
      router.push("/dashboard/school");
    }
  };

  // Helper to check if a link is active
  const isActive = (href: string) => {
    if (href === "/dashboard/school" || href === "/dashboard/reviewer" || href === "/dashboard/donor") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  // Generate breadcrumb items
  const getBreadcrumbs = () => {
    if (!pathname) return [];
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      let label = segment;
      if (segment === "dashboard") label = "Dashboard";
      else if (segment === "school") label = "Nhà trường";
      else if (segment === "reviewer") label = "Kiểm duyệt";
      else if (segment === "donor") label = "Nhà tài trợ";
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
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0 z-30">
        {/* Sidebar Header / Logo */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#006B3F] flex items-center justify-center text-white font-bold text-lg">
            R
          </div>
          <div>
            <h1 className="font-bold text-sm text-slate-800 leading-tight">RaiseFund</h1>
            <p className="text-[10px] text-slate-400 font-medium">Hệ thống Vận hành Quỹ</p>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="p-4 border-b border-slate-100">
          <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2">
            Không gian làm việc
          </label>
          <div className="relative">
            <select
              value={currentRole}
              onChange={(e) => handleRoleChange(e.target.value as "school" | "reviewer" | "donor")}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F] appearance-none cursor-pointer"
            >
              <option value="school">🏫 Cổng Nhà trường</option>
              <option value="reviewer">🛡️ Cổng Kiểm duyệt</option>
              <option value="donor">❤️ Cổng Nhà tài trợ</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {activeMenu.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-[#006B3F]/10 text-[#006B3F]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? "text-[#006B3F]" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                    active ? "bg-[#006B3F] text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-700 text-xs">
              {currentRole === "reviewer" ? "NV" : currentRole === "donor" ? "NT" : "TR"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {currentRole === "reviewer" ? "Nguyễn Văn Quỹ" : currentRole === "donor" ? "Nguyễn Hữu Tài" : "THPT Nguyễn Đình Chiểu"}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {currentRole === "reviewer" ? "reviewer@quynhantai.org" : currentRole === "donor" ? "huutai.donor@gmail.com" : "school@nguyendinhchieu.edu.vn"}
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 hover:border-slate-300 hover:bg-white rounded-lg text-xs font-semibold text-slate-600 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Về trang chủ
          </Link>
        </div>
      </aside>

      {/* ─── MOBILE SIDEBAR DRAWER ─── */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-slate-900/40 backdrop-blur-sm transition-opacity">
          <div className="w-64 bg-white h-full flex flex-col shadow-xl animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#006B3F] flex items-center justify-center text-white font-bold text-lg">
                  R
                </div>
                <div>
                  <h1 className="font-bold text-sm text-slate-800 leading-tight">RaiseFund</h1>
                  <p className="text-[10px] text-slate-400 font-medium">Hệ thống Vận hành Quỹ</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Role Switcher */}
            <div className="p-4 border-b border-slate-100">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2">
                Không gian làm việc
              </label>
              <div className="relative">
                <select
                  value={currentRole}
                  onChange={(e) => {
                    handleRoleChange(e.target.value as "school" | "reviewer" | "donor");
                    setIsMobileSidebarOpen(false);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 focus:outline-none appearance-none"
                >
                  <option value="school">🏫 Cổng Nhà trường</option>
                  <option value="reviewer">🛡️ Cổng Kiểm duyệt</option>
                  <option value="donor">❤️ Cổng Nhà tài trợ</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Menu Links */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {activeMenu.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-[#006B3F]/10 text-[#006B3F]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${active ? "text-[#006B3F]" : "text-slate-400"}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        active ? "bg-[#006B3F] text-white" : "bg-slate-100 text-slate-600"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-700 text-xs">
                  {currentRole === "reviewer" ? "NV" : currentRole === "donor" ? "NT" : "TR"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-800 truncate">
                    {currentRole === "reviewer" ? "Nguyễn Văn Quỹ" : currentRole === "donor" ? "Nguyễn Hữu Tài" : "THPT Nguyễn Đình Chiểu"}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {currentRole === "reviewer" ? "reviewer@quynhantai.org" : currentRole === "donor" ? "huutai.donor@gmail.com" : "school@nguyendinhchieu.edu.vn"}
                  </p>
                </div>
              </div>
              <Link
                href="/"
                className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 hover:border-slate-300 hover:bg-white rounded-lg text-xs font-semibold text-slate-600 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ─── MAIN CONTENT WRAPPER ─── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumbs */}
            <nav className="hidden sm:flex items-center space-x-1.5 text-xs font-medium text-slate-500">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.href}>
                  {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-300" />}
                  {idx === breadcrumbs.length - 1 ? (
                    <span className="text-slate-800 font-semibold truncate max-w-[200px]">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-slate-800 transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Workspace indicator for mobile */}
            <span className="md:hidden px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 rounded-full">
              {currentRole === "reviewer" ? "Kiểm duyệt" : currentRole === "donor" ? "Nhà tài trợ" : "Nhà trường"}
            </span>

            {/* Notification button */}
            <button className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

            {/* User profile dropdown trigger */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all text-left"
              >
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                  {currentRole === "reviewer" ? "NV" : currentRole === "donor" ? "NT" : "TR"}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {isUserDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsUserDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-30 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-800">
                        {currentRole === "reviewer" ? "Nguyễn Văn Quỹ" : currentRole === "donor" ? "Nguyễn Hữu Tài" : "THPT Nguyễn Đình Chiểu"}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {currentRole === "reviewer" ? "reviewer@quynhantai.org" : currentRole === "donor" ? "huutai.donor@gmail.com" : "school@nguyendinhchieu.edu.vn"}
                      </p>
                    </div>
                    <Link
                      href={currentRole === "reviewer" ? "/dashboard/reviewer" : "/dashboard/school/profile"}
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <Building className="w-4 h-4 text-slate-400" />
                      Thông tin chung
                    </Link>
                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        alert("Tính năng cài đặt đang được xây dựng.");
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-left"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Cài đặt tài khoản
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <Link
                      href="/"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50/50 hover:text-red-700 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Đăng xuất
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
