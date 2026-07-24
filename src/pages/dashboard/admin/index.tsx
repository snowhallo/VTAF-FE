import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import {
  Users,
  ShieldAlert,
  UserCheck,
  UserPlus,
  Search,
  Filter,
  ArrowUpDown,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Building,
  Heart,
  Shield,
  Crown,
  TrendingUp,
  Activity,
  RefreshCw,
  Edit,
  ShieldCheck,
  Key,
  Plus,
  Save,
  Trash2,
  Lock,
  Check,
  Sliders,
  FolderPlus,
  KeyRound
} from "lucide-react"

// Permission Item Interface
export interface PermissionItem {
  id: string
  label: string
  description: string
  isCustom?: boolean
}

// Permission Module Group Interface
export interface PermissionGroup {
  moduleName: string
  permissions: PermissionItem[]
}

// Initial System Permission Matrix Groups
const INITIAL_PERMISSION_GROUPS: PermissionGroup[] = [
  {
    moduleName: "📦 Quản lý Dự án & Chiến dịch",
    permissions: [
      { id: "proj_create", label: "Tạo dự án mới", description: "Cho phép nộp hồ sơ đề xuất dự án mới" },
      { id: "proj_edit", label: "Sửa nội dung dự án", description: "Cập nhật mô tả, hình ảnh và mục tiêu kinh phí" },
      { id: "proj_approve", label: "Duyệt công khai dự án", description: "Phê duyệt đưa dự án lên trang chủ để kêu gọi vốn" },
      { id: "proj_close", label: "Đóng / Kết thúc dự án", description: "Dừng nhận quyên góp và chuyển trạng thái giải ngân" },
    ],
  },
  {
    moduleName: "💰 Tài chính & Giải ngân",
    permissions: [
      { id: "fin_view_tx", label: "Xem lịch sử giao dịch", description: "Tra cứu sao kê VietQR realtime" },
      { id: "fin_disburse", label: "Tạo lệnh giải ngân", description: "Chuyển tiền tài trợ sang tài khoản nhà trường" },
      { id: "fin_export_pdf", label: "Cấp chứng nhận PDF", description: "Tự động xuất chứng nhận Tấm lòng vàng" },
    ],
  },
  {
    moduleName: "👥 Quản lý Tài khoản & Phân quyền",
    permissions: [
      { id: "user_view", label: "Xem danh sách người dùng", description: "Tra cứu hồ sơ các role hệ thống" },
      { id: "user_assign_role", label: "Cấp / Đổi vai trò", description: "Phân quyền động cho bất kỳ tài khoản nào" },
      { id: "user_suspend", label: "Khóa / Mở khóa tài khoản", description: "Tạm dừng quyền truy cập khi có vi phạm" },
    ],
  },
]

// Role Definition Interface
interface RoleDefinition {
  id: string
  name: string
  description: string
  colorBadge: string
  permissionIds: string[]
  isSystem?: boolean
}

// Initial Roles
const INITIAL_ROLES: RoleDefinition[] = [
  {
    id: "admin",
    name: "Admin Quản trị Tổng",
    description: "Toàn quyền truy cập và cấu hình ma trận phân quyền hệ thống",
    colorBadge: "bg-purple-100 text-purple-800 border-purple-200",
    permissionIds: ["proj_create", "proj_edit", "proj_approve", "proj_close", "fin_view_tx", "fin_disburse", "fin_export_pdf", "user_view", "user_assign_role", "user_suspend"],
    isSystem: true,
  },
  {
    id: "reviewer",
    name: "Hội đồng Kiểm duyệt",
    description: "Thẩm định hồ sơ dự án, đối soát chứng minh tài chính và xét duyệt công khai",
    colorBadge: "bg-blue-100 text-blue-800 border-blue-200",
    permissionIds: ["proj_edit", "proj_approve", "proj_close", "fin_view_tx", "user_view"],
    isSystem: true,
  },
  {
    id: "school",
    name: "Trường học Đối tác",
    description: "Nộp hồ sơ đề xuất học bổng, cập nhật tiến độ và tải báo cáo nghiệm thu",
    colorBadge: "bg-amber-100 text-amber-800 border-amber-200",
    permissionIds: ["proj_create", "proj_edit", "fin_view_tx"],
    isSystem: true,
  },
  {
    id: "donor",
    name: "Nhà tài trợ",
    description: "Quyên góp ủng hộ dự án, nhận chứng nhận PDF và xem lịch sử đóng góp",
    colorBadge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    permissionIds: ["fin_view_tx", "fin_export_pdf"],
    isSystem: true,
  },
  {
    id: "accountant",
    name: "Kế toán Quỹ VTAF",
    description: "Đối soát thu chi VietQR, lập lệnh giải ngân và xuất báo cáo tài chính",
    colorBadge: "bg-indigo-100 text-indigo-800 border-indigo-200",
    permissionIds: ["fin_view_tx", "fin_disburse", "fin_export_pdf"],
    isSystem: false,
  },
]

// System Users dataset
interface SystemUser {
  id: string
  name: string
  email: string
  roleId: string
  organization: string
  status: "active" | "suspended"
  createdAt: string
}

const INITIAL_USERS: SystemUser[] = [
  {
    id: "usr-1",
    name: "Nguyễn Hữu Tài",
    email: "huutai@quynhantai.org",
    roleId: "donor",
    organization: "Cá nhân",
    status: "active",
    createdAt: "15-01-2026",
  },
  {
    id: "usr-2",
    name: "Ban BGH THPT Nguyễn Đình Chiểu",
    email: "thpt.nguyendinhchieu@edu.vn",
    roleId: "school",
    organization: "Trường THPT Nguyễn Đình Chiểu",
    status: "active",
    createdAt: "10-02-2026",
  },
  {
    id: "usr-3",
    name: "PGS.TS Tran Van Nam",
    email: "tvnam.reviewer@quynhantai.org",
    roleId: "reviewer",
    organization: "Hội đồng Thẩm định VTAF",
    status: "active",
    createdAt: "01-01-2026",
  },
  {
    id: "usr-4",
    name: "Admin Tổng Quỹ VTAF",
    email: "admin@quynhantai.org",
    roleId: "admin",
    organization: "Quỹ Hỗ trợ Nhân tài Việt Nam",
    status: "active",
    createdAt: "01-01-2026",
  },
  {
    id: "usr-5",
    name: "Kế toán trưởng VTAF",
    email: "ketoan@quynhantai.org",
    roleId: "accountant",
    organization: "Ban Tài chính VTAF",
    status: "active",
    createdAt: "05-03-2026",
  },
]

export default function AdminDashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = (searchParams.get("tab") as any) || "users"
  const setActiveTab = (tab: string) => setSearchParams({ tab })
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>(INITIAL_PERMISSION_GROUPS)
  const [roles, setRoles] = useState<RoleDefinition[]>(INITIAL_ROLES)
  const [users, setUsers] = useState<SystemUser[]>(INITIAL_USERS)

  // Filter & Edit states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("all")
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [selectedRoleIdForMatrix, setSelectedRoleIdForMatrix] = useState<string>("reviewer")
  const [notification, setNotification] = useState<string | null>(null)

  // Modal States
  const [isCreatingRoleModalOpen, setIsCreatingRoleModalOpen] = useState(false)
  const [isCreatingPermModalOpen, setIsCreatingPermModalOpen] = useState(false)

  // New Role Form State
  const [newRoleName, setNewRoleName] = useState("")
  const [newRoleDesc, setNewRoleDesc] = useState("")

  // New Permission Form State
  const [targetModuleName, setTargetModuleName] = useState(permissionGroups[0]?.moduleName || "")
  const [customModuleName, setCustomModuleName] = useState("")
  const [newPermLabel, setNewPermLabel] = useState("")
  const [newPermId, setNewPermId] = useState("")
  const [newPermDesc, setNewPermDesc] = useState("")

  // Active Role being configured in Matrix
  const activeMatrixRole = roles.find((r) => r.id === selectedRoleIdForMatrix) || roles[0]

  // Dynamic Role Change for User
  const handleAssignUserRole = (userId: string, newRoleId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, roleId: newRoleId } : u))
    )
    const targetUser = users.find((u) => u.id === userId)
    const targetRole = roles.find((r) => r.id === newRoleId)
    setNotification(`Đã phân vai trò "${targetRole?.name}" thành công cho ${targetUser?.name}`)
    setEditingUserId(null)
    setTimeout(() => setNotification(null), 4000)
  }

  // Toggle Permission Checkbox for Role
  const handleTogglePermission = (roleId: string, permId: string) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id !== roleId) return role
        const hasPerm = role.permissionIds.includes(permId)
        const updatedPerms = hasPerm
          ? role.permissionIds.filter((p) => p !== permId)
          : [...role.permissionIds, permId]
        return { ...role, permissionIds: updatedPerms }
      })
    )
  }

  // Create New Custom Role
  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRoleName.trim()) return

    const newRole: RoleDefinition = {
      id: `role_${Date.now()}`,
      name: newRoleName.trim(),
      description: newRoleDesc.trim() || "Vai trò tùy chỉnh mới tạo",
      colorBadge: "bg-indigo-100 text-indigo-800 border-indigo-200",
      permissionIds: ["proj_create", "fin_view_tx"],
      isSystem: false,
    }

    setRoles((prev) => [...prev, newRole])
    setSelectedRoleIdForMatrix(newRole.id)
    setIsCreatingRoleModalOpen(false)
    setNewRoleName("")
    setNewRoleDesc("")
    setNotification(`Đã tạo thành công vai trò mới: "${newRole.name}"`)
    setTimeout(() => setNotification(null), 4000)
  }

  // 🌟 Create New Dynamic Permission Item & Add to Matrix
  const handleCreatePermission = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPermLabel.trim()) return

    const module = targetModuleName === "__NEW__" ? (customModuleName.trim() || "⚡ Module Tùy chỉnh Mới") : targetModuleName
    const generatedId = newPermId.trim() ? newPermId.trim().toLowerCase().replace(/\s+/g, "_") : `perm_${Date.now()}`

    const newPermItem: PermissionItem = {
      id: generatedId,
      label: newPermLabel.trim(),
      description: newPermDesc.trim() || "Quyền hạn chức năng mới được cấp bởi Admin",
      isCustom: true,
    }

    setPermissionGroups((prevGroups) => {
      const existingGroupIndex = prevGroups.findIndex((g) => g.moduleName === module)
      if (existingGroupIndex >= 0) {
        const updated = [...prevGroups]
        updated[existingGroupIndex] = {
          ...updated[existingGroupIndex],
          permissions: [...updated[existingGroupIndex].permissions, newPermItem],
        }
        return updated
      } else {
        return [...prevGroups, { moduleName: module, permissions: [newPermItem] }]
      }
    })

    // Automatically assign newly created permission to the active role
    handleTogglePermission(activeMatrixRole.id, generatedId)

    setIsCreatingPermModalOpen(false)
    setNewPermLabel("")
    setNewPermId("")
    setNewPermDesc("")
    setCustomModuleName("")
    setNotification(`Đã thêm quyền mới "${newPermItem.label}" vào ma trận hệ thống!`)
    setTimeout(() => setNotification(null), 4000)
  }

  const filteredUsers = users.filter((u) => {
    const matchesQuery =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.organization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRoleFilter === "all" || u.roleId === selectedRoleFilter
    return matchesQuery && matchesRole
  })

  return (
    <div className="space-y-8 animate-fadeIn pb-12 w-full">
      {/* 👑 ADMIN HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 backdrop-blur-md text-xs font-bold text-purple-200 border border-purple-400/30">
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              BẢNG QUẢN TRỊ ADMIN - HỆ THỐNG PHÂN QUYỀN RBAC ĐỘNG
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-extrabold tracking-tight">
              Quản Lý User, Phân Role & Cấp Quyền Động
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Tạo vai trò tùy chỉnh, quản lý danh sách tài khoản, xem hồ sơ chi tiết và cấp quyền hoạt động động trên toàn hệ thống.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCreatingPermModalOpen(true)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold rounded-2xl text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-emerald-400/30"
            >
              <KeyRound className="w-4 h-4" />
              + Thêm Quyền mới
            </button>

            <button
              onClick={() => setIsCreatingRoleModalOpen(true)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-extrabold rounded-2xl text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              + Tạo Role mới
            </button>
          </div>
        </div>
      </div>

      {/* Notification Alert */}
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-[#006B3F] border border-emerald-200 text-xs font-bold flex items-center gap-2 shadow-sm animate-pop-in">
          <CheckCircle2 className="w-4 h-4" />
          {notification}
        </div>
      )}

      {/* 🎛️ NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "users"
              ? "bg-[#006B3F] text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>1. Gán Role cho Tài khoản ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("roles")}
          className={`px-5 py-3 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "roles"
              ? "bg-[#006B3F] text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>2. Quản lý Role & Ma trận Quyền ({roles.length} Role)</span>
        </button>
      </div>

      {/* ─── TAB 1: USER MANAGEMENT & ROLE ASSIGNMENT ─── */}
      {activeTab === "users" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-fadeIn w-full">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-purple-700" />
                Danh sách Tài khoản người dùng
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Chọn vai trò có sẵn để cấp cho người dùng hệ thống
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm tên, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                />
              </div>

              <select
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
                className="h-10 px-3 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-700 cursor-pointer"
              >
                <option value="all">Tất cả Role</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
                  <th className="p-3 rounded-l-xl">Họ tên & Email</th>
                  <th className="p-3">Tổ chức</th>
                  <th className="p-3">Role hiện tại (Click để gán)</th>
                  <th className="p-3">Trạng thái</th>
                  <th className="p-3 rounded-r-xl text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => {
                  const currentRoleDef = roles.find((r) => r.id === user.roleId) || roles[0]
                  return (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-medium">
                        <span className="font-bold text-slate-900 block text-sm">{user.name}</span>
                        <span className="text-slate-400 text-[11px]">{user.email}</span>
                      </td>

                      <td className="p-3 text-slate-600 font-semibold">{user.organization}</td>

                      <td className="p-3">
                        {editingUserId === user.id ? (
                          <select
                            autoFocus
                            defaultValue={user.roleId}
                            onChange={(e) => handleAssignUserRole(user.id, e.target.value)}
                            onBlur={() => setEditingUserId(null)}
                            className="p-1.5 rounded-xl border border-purple-400 bg-purple-50 text-xs font-bold text-purple-900 focus:outline-none cursor-pointer"
                          >
                            {roles.map((r) => (
                              <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                          </select>
                        ) : (
                          <button
                            onClick={() => setEditingUserId(user.id)}
                            className={`px-3 py-1 rounded-full text-xs font-extrabold border cursor-pointer hover:scale-105 transition-transform ${currentRoleDef.colorBadge}`}
                            title="Click để cấp lại Role"
                          >
                            {currentRoleDef.name}
                          </button>
                        )}
                      </td>

                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                          user.status === "active" ? "bg-emerald-50 text-[#006B3F] border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}>
                          {user.status === "active" ? "🟢 Hoạt động" : "🔴 Tạm khóa"}
                        </span>
                      </td>

                      <td className="p-3 text-right">
                        <button
                          onClick={() => setEditingUserId(user.id)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Edit className="w-3 h-3" />
                          Gán Role
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ─── TAB 3: ROLE DEFINITION & PERMISSION MATRIX ─── */}
      {activeTab === "roles" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
          {/* Left Col: Existing Roles List */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#006B3F]" />
                  Danh sách Vai trò (Role)
                </h3>
                <p className="text-xs text-slate-500">Bấm chọn vai trò để cấu hình ma trận quyền bên phải</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {roles.map((r) => {
                const isSelected = r.id === selectedRoleIdForMatrix
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRoleIdForMatrix(r.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.01]"
                        : "bg-slate-50/50 hover:bg-slate-100/80 border-slate-200 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm flex items-center gap-2">
                        {r.name}
                        {r.isSystem && (
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${r.colorBadge}`}>
                            Hệ thống
                          </span>
                        )}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </div>

                    <p className={`text-xs ${isSelected ? "text-slate-300" : "text-slate-500"} line-clamp-2`}>
                      {r.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-semibold pt-1 border-t border-slate-200/40">
                      <span>Số quyền được cấp:</span>
                      <span className={`font-bold ${isSelected ? "text-amber-300" : "text-[#006B3F]"}`}>
                        {r.permissionIds.length} quyền
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={() => setIsCreatingRoleModalOpen(true)}
                className="w-full py-2.5 bg-[#006B3F] hover:bg-[#005030] text-white font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Thêm Role mới
              </button>

              <button
                onClick={() => setIsCreatingPermModalOpen(true)}
                className="w-full py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-purple-200"
              >
                <KeyRound className="w-4 h-4" />
                Thêm Quyền mới vào Ma trận
              </button>
            </div>
          </div>

          {/* Right 2 Cols: Granular Permission Matrix */}
          <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-xl text-slate-900">
                    Ma trận quyền: <span className="text-purple-700">{activeMatrixRole.name}</span>
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">{activeMatrixRole.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsCreatingPermModalOpen(true)}
                  className="px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#006B3F] font-bold rounded-xl text-xs border border-emerald-200 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Thêm Quyền mới
                </button>

                <button
                  onClick={() => {
                    setNotification(`Đã lưu cấu hình ma trận quyền cho Role "${activeMatrixRole.name}"`)
                    setTimeout(() => setNotification(null), 3000)
                  }}
                  className="px-5 py-2.5 bg-[#006B3F] hover:bg-[#005030] active:scale-95 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Lưu ma trận
                </button>
              </div>
            </div>

            {/* Permission Checkbox Groups */}
            <div className="space-y-6">
              {permissionGroups.map((group) => (
                <div key={group.moduleName} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                  <h4 className="font-bold text-xs md:text-sm text-slate-900 uppercase tracking-wider text-[#006B3F] flex items-center justify-between">
                    <span>{group.moduleName}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({group.permissions.length} item)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.permissions.map((perm) => {
                      const isChecked = activeMatrixRole.permissionIds.includes(perm.id)
                      return (
                        <label
                          key={perm.id}
                          className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                            isChecked
                              ? "bg-white border-emerald-500 shadow-xs"
                              : "bg-white/60 border-slate-200 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleTogglePermission(activeMatrixRole.id, perm.id)}
                            className="mt-0.5 w-4 h-4 rounded border-slate-300 accent-[#006B3F] cursor-pointer"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-bold text-xs text-slate-900 block truncate">{perm.label}</span>
                              {perm.isCustom && (
                                <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 text-[9px] font-extrabold shrink-0">
                                  🆕 Mới thêm
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 font-medium leading-tight block mt-0.5">
                              {perm.description}
                            </span>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 4: CAMPAIGNS MANAGEMENT ─── */}
      {activeTab === "campaigns" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-fadeIn w-full">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600" />
                Quản Lý Tất Cả Các Chiến Dịch Quyên Góp
              </h3>
              <p className="text-xs text-slate-500 mt-1">Danh sách các chương trình kêu gọi quyên góp quy mô lớn trên toàn quốc</p>
            </div>
            <button className="px-4 py-2 bg-[#006B3F] text-white text-xs font-bold rounded-xl hover:bg-[#00502e] cursor-pointer">
              + Tạo chiến dịch mới
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border border-slate-200 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">Đang diễn ra</span>
                <span className="text-xs text-slate-500 font-bold">Hạn còn 15 ngày</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Cùng Em Tới Trường 2026 - Vùng Cao Yên Bái</h4>
              <p className="text-xs text-slate-600">Mục tiêu: 500,000,000 VNĐ • Đã đạt: 380,000,000 VNĐ (76%)</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-[#006B3F] h-full w-[76%]" />
              </div>
            </div>

            <div className="p-5 border border-slate-200 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">Đang diễn ra</span>
                <span className="text-xs text-slate-500 font-bold">Hạn còn 30 ngày</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Nước Sạch Cho Buôn Làng Tây Nguyên</h4>
              <p className="text-xs text-slate-600">Mục tiêu: 300,000,000 VNĐ • Đã đạt: 195,000,000 VNĐ (65%)</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[65%]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 5: PROJECTS MANAGEMENT ─── */}
      {activeTab === "projects" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-fadeIn w-full">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-600" />
                Quản Lý Tất Cả Dự Án Toàn Hệ Thống
              </h3>
              <p className="text-xs text-slate-500 mt-1">Tổng quan danh sách hồ sơ dự án từ tất cả các nhà trường đối tác</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase bg-slate-50">
                  <th className="p-3">Mã DA</th>
                  <th className="p-3">Tên Dự án</th>
                  <th className="p-3">Trường nộp</th>
                  <th className="p-3">Kinh phí đề xuất</th>
                  <th className="p-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">#DA-101</td>
                  <td className="p-3 font-semibold text-slate-800">Xây nhà bán trú cho học sinh Mù Cang Chải</td>
                  <td className="p-3 text-slate-600">THPT Nguyễn Đình Chiểu</td>
                  <td className="p-3 font-bold text-[#006B3F]">250,000,000 VNĐ</td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">Đã duyệt</span></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">#DA-102</td>
                  <td className="p-3 font-semibold text-slate-800">Hệ thống lọc nước tinh khiết điểm trường Bản Mù</td>
                  <td className="p-3 text-slate-600">THPT Mù Cang Chải</td>
                  <td className="p-3 font-bold text-[#006B3F]">120,000,000 VNĐ</td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md">Chờ duyệt</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 6: SYSTEM STATISTICS ─── */}
      {activeTab === "stats" && (
        <div className="space-y-6 animate-fadeIn w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Tổng tiền quyên góp</span>
              <p className="text-2xl font-extrabold text-[#006B3F]">1,245,000,000 ₫</p>
              <p className="text-[10px] text-emerald-600 font-bold">↑ +18.4% so với tháng trước</p>
            </div>
            <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Tổng dự án đã duyệt</span>
              <p className="text-2xl font-extrabold text-slate-900">42 Dự án</p>
              <p className="text-[10px] text-slate-500 font-bold">38 Dự án hoàn thành 100%</p>
            </div>
            <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Nhà tài trợ đồng hành</span>
              <p className="text-2xl font-extrabold text-slate-900">3,850 Người</p>
              <p className="text-[10px] text-purple-600 font-bold">128 Tài trợ doanh nghiệp</p>
            </div>
            <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Trường học đối tác</span>
              <p className="text-2xl font-extrabold text-slate-900">24 Trường</p>
              <p className="text-[10px] text-blue-600 font-bold">Toàn bộ 63 tỉnh thành</p>
            </div>
          </div>
        </div>
      )}

      {/* ➕ MODAL 1: CREATING NEW ROLE */}
      {isCreatingRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-pop-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <Crown className="w-5 h-5 text-purple-700" />
                Tạo Role tùy chỉnh mới
              </h3>
              <button
                onClick={() => setIsCreatingRoleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Tên Role mới</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Cán bộ Kế toán Quỹ, Khảo sát viên..."
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Mô tả chức năng</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả phạm vi công việc và trách nhiệm của Role..."
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingRoleModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer"
                >
                  Tạo Role mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🗝️ MODAL 2: CREATING NEW PERMISSION ITEM */}
      {isCreatingPermModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-pop-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-600" />
                Thêm Quyền hạn mới vào Hệ thống
              </h3>
              <button
                onClick={() => setIsCreatingPermModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePermission} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nhóm Module chức năng</label>
                <select
                  value={targetModuleName}
                  onChange={(e) => setTargetModuleName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 cursor-pointer"
                >
                  {permissionGroups.map((g) => (
                    <option key={g.moduleName} value={g.moduleName}>{g.moduleName}</option>
                  ))}
                  <option value="__NEW__">➕ Tạo Module chức năng mới...</option>
                </select>
              </div>

              {targetModuleName === "__NEW__" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Tên Module mới</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: ⚡ Quản lý Hợp đồng & Pháp lý"
                    value={customModuleName}
                    onChange={(e) => setCustomModuleName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    required
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Tên Quyền mới</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Xuất hóa đơn GTGT"
                    value={newPermLabel}
                    onChange={(e) => setNewPermLabel(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Mã ID (Option)</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: fin_tax_export"
                    value={newPermId}
                    onChange={(e) => setNewPermId(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Mô tả chi tiết quyền</label>
                <textarea
                  rows={2}
                  placeholder="Mô tả hành động được phép thực hiện khi có quyền này..."
                  value={newPermDesc}
                  onChange={(e) => setNewPermDesc(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingPermModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#006B3F] hover:bg-[#005030] text-white font-bold rounded-xl text-xs shadow-md cursor-pointer"
                >
                  Tạo Quyền & Thêm vào Ma trận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
