"use client";
import { useState, useEffect, useRef, useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation";
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
  KeyRound,
  Eye,
  Mail,
  Phone,
  Calendar,
  Award,
  X,
  Edit3,
  Layers,
  Megaphone,
  FolderKanban,
  AlertTriangle,
  ExternalLink,
  RotateCcw,
  Flame,
  Archive
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
      { id: "proj_delete", label: "Xóa dự án", description: "Xóa hẳn dự án khỏi cơ sở dữ liệu" },
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
    description: "Toàn quyền truy cập, tạo, chỉnh sửa và quản lý Thùng rác trên hệ thống",
    colorBadge: "bg-purple-100 text-purple-800 border-purple-200",
    permissionIds: ["proj_create", "proj_edit", "proj_approve", "proj_close", "proj_delete", "fin_view_tx", "fin_disburse", "fin_export_pdf", "user_view", "user_assign_role", "user_suspend"],
    isSystem: true,
  },
  {
    id: "reviewer",
    name: "Hội đồng Thẩm định",
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
  phone: string
  roleIds: string[]
  organization: string
  status: "active" | "suspended"
  createdAt: string
  lastLogin: string
  totalDonated?: number
  projectsCount?: number
  bio?: string
}

const INITIAL_USERS: SystemUser[] = [
  {
    id: "usr-1",
    name: "Nguyễn Hữu Tài",
    email: "huutai@quynhantai.org",
    phone: "0912 345 678",
    roleIds: ["donor", "reviewer"],
    organization: "Tập đoàn Công nghệ & Cá nhân",
    status: "active",
    createdAt: "15-01-2026",
    lastLogin: "24-07-2026 08:30",
    totalDonated: 45000000,
    projectsCount: 3,
    bio: "Nhà tài trợ thường xuyên đồng thời là thành viên hội đồng cố vấn giáo dục.",
  },
  {
    id: "usr-2",
    name: "Ban BGH THPT Nguyễn Đình Chiểu",
    email: "thpt.nguyendinhchieu@edu.vn",
    phone: "028 3829 1234",
    roleIds: ["school", "donor"],
    organization: "Trường THPT Nguyễn Đình Chiểu",
    status: "active",
    createdAt: "10-02-2026",
    lastLogin: "23-07-2026 16:45",
    totalDonated: 10000000,
    projectsCount: 5,
    bio: "Đơn vị trường học đối tác trực thuộc Sở Giáo dục & Đào tạo.",
  },
  {
    id: "usr-3",
    name: "PGS.TS Tran Van Nam",
    email: "tvnam.reviewer@quynhantai.org",
    phone: "0903 112 233",
    roleIds: ["reviewer"],
    organization: "Hội đồng Thẩm định VTAF",
    status: "active",
    createdAt: "01-01-2026",
    lastLogin: "24-07-2026 07:15",
    projectsCount: 12,
    bio: "Chuyên gia thẩm định độc lập các dự án học bổng và xây trường.",
  },
  {
    id: "usr-4",
    name: "Admin Tổng Quỹ VTAF",
    email: "admin@quynhantai.org",
    phone: "0988 999 888",
    roleIds: ["admin", "reviewer", "accountant"],
    organization: "Quỹ Hỗ trợ Nhân tài Việt Nam",
    status: "active",
    createdAt: "01-01-2026",
    lastLogin: "24-07-2026 09:10",
    projectsCount: 25,
    bio: "Tài khoản Quản trị hệ thống cấp cao nhất.",
  },
  {
    id: "usr-5",
    name: "Kế toán trưởng VTAF",
    email: "ketoan@quynhantai.org",
    phone: "0918 777 666",
    roleIds: ["accountant"],
    organization: "Ban Tài chính VTAF",
    status: "active",
    createdAt: "05-03-2026",
    lastLogin: "22-07-2026 14:20",
    bio: "Quản lý đối soát VietQR và lập lệnh giải ngân quỹ.",
  },
]

// Project Admin Interface
interface AdminProject {
  id: string
  title: string
  campaignName: string
  schoolName: string
  goal: number
  raised: number
  status: "active" | "pending" | "closed" | "suspended"
  imageUrl: string
  postedDate: string
  story?: string
}

const INITIAL_PROJECTS: AdminProject[] = [
  {
    id: "p1",
    title: "Dự án cấp phát học bổng khu vực Miền núi phía Bắc",
    campaignName: "Cùng em tới trường - Xây dựng điểm trường Bản Mù",
    schoolName: "Trường THCS Bản Mù - Yên Bái",
    goal: 500000000,
    raised: 250000000,
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    postedDate: "22/07/2026",
    story: "Trao trực tiếp 100 suất học bổng vượt khó học giỏi cho học sinh vùng cao.",
  },
  {
    id: "p2",
    title: "Tài trợ học bổng học thuật cho học sinh THPT Nguyễn Đình Chiểu",
    campaignName: "Cùng em tới trường - Xây dựng điểm trường Bản Mù",
    schoolName: "Trường THPT Nguyễn Đình Chiểu",
    goal: 50000000,
    raised: 35000000,
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    postedDate: "18/07/2026",
    story: "Tài trợ học bổng thi học sinh giỏi Olympic Toán & Lý.",
  },
  {
    id: "p3",
    title: "Dự án đào tạo kỹ năng số cho học sinh vùng sâu vùng xa",
    campaignName: "Ươm mầm tài năng số 2026",
    schoolName: "Trường Tiểu học Pa Tần - Điện Biên",
    goal: 100000000,
    raised: 88000000,
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    postedDate: "15/07/2026",
    story: "Trang bị phòng máy tính hiện đại và đào tạo tin học cơ bản.",
  },
  {
    id: "p4",
    title: "Xây dựng 3 phòng học kiên cố & nhà công vụ tại Pa Tần",
    campaignName: "Cùng em tới trường - Xây dựng điểm trường Bản Mù",
    schoolName: "Trường Tiểu học Pa Tần",
    goal: 200000000,
    raised: 200000000,
    status: "closed",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    postedDate: "01/06/2026",
    story: "Đã hoàn thành 100% mục tiêu xây kiên cố 3 phòng học mái tôn.",
  },
]

// Campaign Admin Interface
interface AdminCampaign {
  id: string
  name: string
  organizer: string
  goal: number
  raised: number
  projectsCount: number
  status: "active" | "completed"
  startDate: string
  endDate: string
  imageUrl: string
  description?: string
}

const INITIAL_CAMPAIGNS: AdminCampaign[] = [
  {
    id: "c1",
    name: "Cùng em tới trường - Xây dựng điểm trường Bản Mù",
    organizer: "Quỹ Hỗ trợ Nhân tài Việt Nam (VTAF)",
    goal: 1500000000,
    raised: 920000000,
    projectsCount: 4,
    status: "active",
    startDate: "01/06/2026",
    endDate: "31/12/2026",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    description: "Chiến dịch trọng điểm 2026 nhằm kiên cố hóa trường học và trao học bổng toàn quốc.",
  },
  {
    id: "c2",
    name: "Ươm mầm tài năng số 2026",
    organizer: "Ban Công nghệ Quỹ VTAF",
    goal: 500000000,
    raised: 340000000,
    projectsCount: 2,
    status: "active",
    startDate: "01/07/2026",
    endDate: "30/11/2026",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    description: "Chiến dịch trang bị thiết bị công nghệ & học bổng IT cho học sinh nghèo.",
  },
]

// Trash Item Interface for Recycle Bin
interface TrashItem {
  trashId: string
  originalId: string
  title: string
  type: "project" | "campaign" | "user"
  typeName: string
  deletedAt: string
  data: any
}

function AdminDashboardPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setActiveTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(location.pathname + "?" + params.toString());
  };
  const activeTab = (searchParams.get("tab") as any) || "users"
  
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>(INITIAL_PERMISSION_GROUPS)
  const [roles, setRoles] = useState<RoleDefinition[]>(INITIAL_ROLES)
  const [users, setUsers] = useState<SystemUser[]>(INITIAL_USERS)
  const [projects, setProjects] = useState<AdminProject[]>(INITIAL_PROJECTS)
  const [campaigns, setCampaigns] = useState<AdminCampaign[]>(INITIAL_CAMPAIGNS)
  const [trashItems, setTrashItems] = useState<TrashItem[]>([])

  // Filter & Notification states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("all")
  const [selectedRoleIdForMatrix, setSelectedRoleIdForMatrix] = useState<string>("reviewer")
  const [notification, setNotification] = useState<string | null>(null)

  // Soft Delete Confirm Modal State
  const [pendingSoftDelete, setPendingSoftDelete] = useState<{
    type: "project" | "campaign" | "user"
    typeName: string
    id: string
    title: string
    data: any
  } | null>(null)

  // Permanent Delete Confirm Modal State
  const [pendingPermanentDelete, setPendingPermanentDelete] = useState<TrashItem | null>(null)

  // User Edit Modal State
  const [selectedUserDetail, setSelectedUserDetail] = useState<SystemUser | null>(null)
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editPhone, setEditPhone] = useState("")
  const [editOrganization, setEditOrganization] = useState("")
  const [editBio, setEditBio] = useState("")
  const [tempSelectedRoleIds, setTempSelectedRoleIds] = useState<string[]>([])
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  // Project Modal State (Create & Edit)
  const [selectedProject, setSelectedProject] = useState<AdminProject | null>(null)
  const [isCreatingProjectModalOpen, setIsCreatingProjectModalOpen] = useState(false)
  const [projTitle, setProjTitle] = useState("")
  const [projCampaign, setProjCampaign] = useState(INITIAL_CAMPAIGNS[0]?.name || "")
  const [projSchool, setProjSchool] = useState("")
  const [projGoal, setProjGoal] = useState<number>(100000000)
  const [projStatus, setProjStatus] = useState<"active" | "pending" | "closed" | "suspended">("active")
  const [projImageUrl, setProjImageUrl] = useState("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80")
  const [projStory, setProjStory] = useState("")

  // Campaign Modal State (Create & Edit)
  const [selectedCampaign, setSelectedCampaign] = useState<AdminCampaign | null>(null)
  const [isCreatingCampaignModalOpen, setIsCreatingCampaignModalOpen] = useState(false)
  const [campName, setCampName] = useState("")
  const [campOrganizer, setCampOrganizer] = useState("Quỹ Hỗ trợ Nhân tài Việt Nam (VTAF)")
  const [campGoal, setCampGoal] = useState<number>(1000000000)
  const [campStatus, setCampStatus] = useState<"active" | "completed">("active")
  const [campImageUrl, setCampImageUrl] = useState("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80")
  const [campDesc, setCampDesc] = useState("")

  // Role & Permission Modal State
  const [isCreatingRoleModalOpen, setIsCreatingRoleModalOpen] = useState(false)
  const [isCreatingPermModalOpen, setIsCreatingPermModalOpen] = useState(false)
  const [newRoleName, setNewRoleName] = useState("")
  const [newRoleDesc, setNewRoleDesc] = useState("")
  const [targetModuleName, setTargetModuleName] = useState(permissionGroups[0]?.moduleName || "")
  const [customModuleName, setCustomModuleName] = useState("")
  const [newPermLabel, setNewPermLabel] = useState("")
  const [newPermId, setNewPermId] = useState("")
  const [newPermDesc, setNewPermDesc] = useState("")

  // Active Role being configured in Matrix
  const activeMatrixRole = roles.find((r) => r.id === selectedRoleIdForMatrix) || roles[0]

  // Sync inputs when opening User Detail Modal
  useEffect(() => {
    if (selectedUserDetail) {
      setEditName(selectedUserDetail.name)
      setEditEmail(selectedUserDetail.email)
      setEditPhone(selectedUserDetail.phone)
      setEditOrganization(selectedUserDetail.organization)
      setEditBio(selectedUserDetail.bio || "")
      setTempSelectedRoleIds(selectedUserDetail.roleIds)
      setIsEditingProfile(false)
    }
  }, [selectedUserDetail])

  // Sync inputs when opening Project Edit Modal
  useEffect(() => {
    if (selectedProject) {
      setProjTitle(selectedProject.title)
      setProjCampaign(selectedProject.campaignName)
      setProjSchool(selectedProject.schoolName)
      setProjGoal(selectedProject.goal)
      setProjStatus(selectedProject.status)
      setProjImageUrl(selectedProject.imageUrl)
      setProjStory(selectedProject.story || "")
    }
  }, [selectedProject])

  // Sync inputs when opening Campaign Edit Modal
  useEffect(() => {
    if (selectedCampaign) {
      setCampName(selectedCampaign.name)
      setCampOrganizer(selectedCampaign.organizer)
      setCampGoal(selectedCampaign.goal)
      setCampStatus(selectedCampaign.status)
      setCampImageUrl(selectedCampaign.imageUrl)
      setCampDesc(selectedCampaign.description || "")
    }
  }, [selectedCampaign])

  // Toggle role in User Detail Modal
  const handleToggleUserRole = (roleId: string) => {
    setTempSelectedRoleIds((prev) => {
      if (prev.includes(roleId)) {
        if (prev.length === 1) return prev
        return prev.filter((r) => r !== roleId)
      } else {
        return [...prev, roleId]
      }
    })
  }

  // Save User Profile Changes
  const handleSaveUserFullProfile = () => {
    if (!selectedUserDetail) return

    const updatedUser: SystemUser = {
      ...selectedUserDetail,
      name: editName.trim() || selectedUserDetail.name,
      email: editEmail.trim() || selectedUserDetail.email,
      phone: editPhone.trim() || selectedUserDetail.phone,
      organization: editOrganization.trim() || selectedUserDetail.organization,
      bio: editBio.trim(),
      roleIds: tempSelectedRoleIds,
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUserDetail.id ? updatedUser : u))
    )
    setSelectedUserDetail(updatedUser)
    setNotification(`Đã cập nhật thông tin & phân quyền thành công cho tài khoản "${updatedUser.name}"!`)
    setTimeout(() => setNotification(null), 4000)
  }

  // Toggle user active / suspended status
  const handleToggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "suspended" : "active" }
          : u
      )
    )
    if (selectedUserDetail && selectedUserDetail.id === userId) {
      setSelectedUserDetail((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === "active" ? "suspended" : "active",
            }
          : null
      )
    }
    setNotification("Đã cập nhật trạng thái tài khoản thành công!")
    setTimeout(() => setNotification(null), 4000)
  }

  // ─── SOFT DELETE (MOVE TO RECYCLE BIN) ────────────────────────────────────
  const confirmExecuteSoftDelete = () => {
    if (!pendingSoftDelete) return

    const { type, typeName, id, title, data } = pendingSoftDelete

    // Add to trash items list
    const newTrashItem: TrashItem = {
      trashId: `trash_${Date.now()}`,
      originalId: id,
      title: title,
      type: type,
      typeName: typeName,
      deletedAt: new Date().toLocaleString("vi-VN"),
      data: data,
    }

    setTrashItems((prev) => [newTrashItem, ...prev])

    // Remove from active list
    if (type === "project") {
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } else if (type === "campaign") {
      setCampaigns((prev) => prev.filter((c) => c.id !== id))
    } else if (type === "user") {
      setUsers((prev) => prev.filter((u) => u.id !== id))
    }

    setPendingSoftDelete(null)
    setNotification(`Đã chuyển "${title}" vào Thùng rác! Bạn có thể khôi phục lại bất kỳ lúc nào.`)
    setTimeout(() => setNotification(null), 4000)
  }

  // ─── RESTORE FROM RECYCLE BIN ─────────────────────────────────────────────
  const handleRestoreFromTrash = (item: TrashItem) => {
    if (item.type === "project") {
      setProjects((prev) => [item.data, ...prev])
    } else if (item.type === "campaign") {
      setCampaigns((prev) => [item.data, ...prev])
    } else if (item.type === "user") {
      setUsers((prev) => [item.data, ...prev])
    }

    setTrashItems((prev) => prev.filter((t) => t.trashId !== item.trashId))
    setNotification(`Đã khôi phục thành công "${item.title}" trở lại danh sách hoạt động!`)
    setTimeout(() => setNotification(null), 4000)
  }

  // ─── PERMANENT DELETE FROM RECYCLE BIN ────────────────────────────────────
  const confirmExecutePermanentDelete = () => {
    if (!pendingPermanentDelete) return

    setTrashItems((prev) => prev.filter((t) => t.trashId !== pendingPermanentDelete.trashId))
    setNotification(`Đã xóa vĩnh viễn "${pendingPermanentDelete.title}" khỏi hệ thống!`)
    setPendingPermanentDelete(null)
    setTimeout(() => setNotification(null), 4000)
  }

  // ─── ADMIN PROJECT CREATE & UPDATE ────────────────────────────────────────
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!projTitle.trim()) return

    const newProj: AdminProject = {
      id: `p_${Date.now()}`,
      title: projTitle.trim(),
      campaignName: projCampaign,
      schoolName: projSchool.trim() || "Trường học Đối tác VTAF",
      goal: Number(projGoal) || 100000000,
      raised: 0,
      status: projStatus,
      imageUrl: projImageUrl,
      postedDate: new Date().toLocaleDateString("vi-VN"),
      story: projStory.trim(),
    }

    setProjects((prev) => [newProj, ...prev])
    setIsCreatingProjectModalOpen(false)
    setProjTitle("")
    setProjSchool("")
    setProjStory("")
    setNotification(`Đã tạo thành công dự án mới: "${newProj.title}"`)
    setTimeout(() => setNotification(null), 4000)
  }

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProject) return

    const updated: AdminProject = {
      ...selectedProject,
      title: projTitle.trim(),
      campaignName: projCampaign,
      schoolName: projSchool.trim(),
      goal: Number(projGoal),
      status: projStatus,
      imageUrl: projImageUrl,
      story: projStory.trim(),
    }

    setProjects((prev) => prev.map((p) => (p.id === selectedProject.id ? updated : p)))
    setSelectedProject(null)
    setNotification(`Đã cập nhật thành công dự án "${updated.title}"`)
    setTimeout(() => setNotification(null), 4000)
  }

  // ─── ADMIN CAMPAIGN CREATE & UPDATE ───────────────────────────────────────
  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault()
    if (!campName.trim()) return

    const newCamp: AdminCampaign = {
      id: `c_${Date.now()}`,
      name: campName.trim(),
      organizer: campOrganizer.trim() || "Quỹ Hỗ trợ Nhân tài Việt Nam (VTAF)",
      goal: Number(campGoal) || 1000000000,
      raised: 0,
      projectsCount: 0,
      status: campStatus,
      startDate: new Date().toLocaleDateString("vi-VN"),
      endDate: "31/12/2026",
      imageUrl: campImageUrl,
      description: campDesc.trim(),
    }

    setCampaigns((prev) => [newCamp, ...prev])
    setIsCreatingCampaignModalOpen(false)
    setCampName("")
    setCampDesc("")
    setNotification(`Đã khởi tạo chiến dịch mới: "${newCamp.name}"`)
    setTimeout(() => setNotification(null), 4000)
  }

  const handleUpdateCampaign = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCampaign) return

    const updated: AdminCampaign = {
      ...selectedCampaign,
      name: campName.trim(),
      organizer: campOrganizer.trim(),
      goal: Number(campGoal),
      status: campStatus,
      imageUrl: campImageUrl,
      description: campDesc.trim(),
    }

    setCampaigns((prev) => prev.map((c) => (c.id === selectedCampaign.id ? updated : c)))
    setSelectedCampaign(null)
    setNotification(`Đã cập nhật chiến dịch "${updated.name}"`)
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

  // Create New Dynamic Permission Item
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
    const matchesRole = selectedRoleFilter === "all" || u.roleIds.includes(selectedRoleFilter)
    return matchesQuery && matchesRole
  })

  return (
    <div className="space-y-8 animate-fadeIn pb-12 w-full">
      {/* 👑 ADMIN SUPER POWERS BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 backdrop-blur-md text-xs font-bold text-purple-200 border border-purple-400/30">
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              SUPER ADMIN CENTER - TOÀN QUYỀN VÀ THÙNG RÁC LƯU TRỮ
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-extrabold tracking-tight">
              Quản Lý User, Dự Án, Chiến Dịch & Thùng Rác Lưu Trữ
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Tài khoản Admin có toàn quyền tạo mới, chỉnh sửa thông tin và chuyển dữ liệu vào Thùng rác. Dữ liệu xóa được lưu trữ an toàn trong Thùng rác và có thể khôi phục lại bất kỳ lúc nào.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsCreatingProjectModalOpen(true)}
              className="px-3.5 py-2 bg-[#006B3F] hover:bg-[#005030] active:scale-95 text-white font-extrabold rounded-2xl text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer border border-emerald-400/30"
            >
              <Plus className="w-4 h-4" />
              + Tạo Dự án Mới
            </button>

            <button
              onClick={() => setIsCreatingCampaignModalOpen(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-extrabold rounded-2xl text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer border border-indigo-400/30"
            >
              <Megaphone className="w-4 h-4" />
              + Tạo Chiến dịch
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

      {/* 🎛️ NAVIGATION TABS WITH RECYCLE BIN */}
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
          <span>1. Quản lý Tài khoản ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "projects"
              ? "bg-[#006B3F] text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>2. Quản lý Dự án ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("campaigns")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "campaigns"
              ? "bg-[#006B3F] text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>3. Quản lý Chiến dịch ({campaigns.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("roles")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "roles"
              ? "bg-[#006B3F] text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>4. Ma trận Quyền & Role ({roles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("trash")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap relative ${
            activeTab === "trash"
              ? "bg-rose-700 text-white shadow-md"
              : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
          }`}
        >
          <Archive className="w-4 h-4" />
          <span>5. Thùng Rác Lưu Trữ ({trashItems.length})</span>
          {trashItems.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute top-2 right-2" />
          )}
        </button>
      </div>

      {/* ─── TAB 1: USER MANAGEMENT ─── */}
      {activeTab === "users" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-fadeIn w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-purple-700" />
                Danh sách Tài khoản người dùng hệ thống
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bấm vào tài khoản bất kỳ để xem chi tiết, sửa thông tin cá nhân hoặc chuyển vào Thùng rác
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

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
                  <th className="p-3.5 rounded-l-xl">Họ tên & Email</th>
                  <th className="p-3.5">Tổ chức / Đơn vị</th>
                  <th className="p-3.5">Các Vai trò sở hữu</th>
                  <th className="p-3.5">Trạng thái</th>
                  <th className="p-3.5 rounded-r-xl text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedUserDetail(user)}
                    className="hover:bg-purple-50/40 transition-colors cursor-pointer group"
                  >
                    <td className="p-3.5 font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors block text-sm">
                            {user.name}
                          </span>
                          <span className="text-slate-400 text-[11px]">{user.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 text-slate-600 font-semibold">{user.organization}</td>

                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1.5">
                        {user.roleIds.map((rId) => {
                          const rDef = roles.find((r) => r.id === rId)
                          if (!rDef) return null
                          return (
                            <span
                              key={rId}
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${rDef.colorBadge}`}
                            >
                              {rDef.name}
                            </span>
                          )
                        })}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                        user.status === "active" ? "bg-emerald-50 text-[#006B3F] border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}>
                        {user.status === "active" ? "🟢 Hoạt động" : "🔴 Tạm khóa"}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedUserDetail(user)
                          }}
                          className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 font-bold rounded-xl text-[11px] transition-all inline-flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-purple-700" />
                          Sửa Profile
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setPendingSoftDelete({
                              type: "user",
                              typeName: "Tài khoản người dùng",
                              id: user.id,
                              title: user.name,
                              data: user,
                            })
                          }}
                          className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-[11px] transition-all inline-flex items-center gap-1 cursor-pointer border border-rose-200"
                          title="Chuyển vào Thùng rác"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 2: PROJECTS MANAGEMENT ─── */}
      {activeTab === "projects" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-fadeIn w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-[#006B3F]" />
                Quản lý Tất cả Dự án Kêu gọi Quỹ
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bấm nút Xóa để di chuyển dự án vào Thùng rác tạm thời (có thể khôi phục lại)
              </p>
            </div>

            <button
              onClick={() => setIsCreatingProjectModalOpen(true)}
              className="px-4 py-2.5 bg-[#006B3F] hover:bg-[#005030] text-white font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              + Tạo Dự án Mới
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => {
              const progress = Math.min(100, Math.round((proj.raised / proj.goal) * 100))
              return (
                <div
                  key={proj.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold shadow-sm border ${
                        proj.status === "active"
                          ? "bg-emerald-500 text-white border-emerald-400"
                          : proj.status === "closed"
                          ? "bg-slate-800 text-white border-slate-700"
                          : proj.status === "pending"
                          ? "bg-amber-500 text-slate-950 border-amber-400"
                          : "bg-rose-600 text-white border-rose-500"
                      }`}>
                        {proj.status === "active" ? "🟢 Đang quyên góp" : proj.status === "closed" ? "✓ Đã hoàn thành" : proj.status === "pending" ? "⏳ Chờ duyệt" : "🔴 Tạm dừng"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-extrabold text-[#006B3F] block mb-1">
                        {proj.campaignName}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">🏫 {proj.schoolName}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#006B3F]">
                          {new Intl.NumberFormat("vi-VN").format(proj.raised)} VND
                        </span>
                        <span className="text-slate-400">
                          {new Intl.NumberFormat("vi-VN").format(proj.goal)} VND
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#006B3F] transition-all" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-purple-600" />
                      Sửa Dự án
                    </button>

                    <button
                      onClick={() => setPendingSoftDelete({
                        type: "project",
                        typeName: "Dự án quyên góp",
                        id: proj.id,
                        title: proj.title,
                        data: proj,
                      })}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs transition-colors flex items-center gap-1 cursor-pointer border border-rose-200"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      Chuyển Thùng Rác
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ─── TAB 3: CAMPAIGNS MANAGEMENT ─── */}
      {activeTab === "campaigns" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-fadeIn w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-indigo-600" />
                Quản lý Tất cả Chiến dịch Quyên góp
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Chuyển chiến dịch vào Thùng rác để lưu trữ tạm thời thay vì xóa vĩnh viễn ngay lập tức
              </p>
            </div>

            <button
              onClick={() => setIsCreatingCampaignModalOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              + Tạo Chiến dịch Mới
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative h-48 w-full bg-slate-900">
                  <img
                    src={camp.imageUrl}
                    alt={camp.name}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indigo-500 text-white border border-indigo-400 mb-2 inline-block">
                      {camp.status === "active" ? "🟢 Chiến dịch đang hoạt động" : "✓ Hoàn thành"}
                    </span>
                    <h4 className="font-serif font-bold text-lg text-white leading-tight">
                      {camp.name}
                    </h4>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {camp.description || "Chiến dịch kêu góp ủng hộ giáo dục và bồi dưỡng nhân tài Việt Nam."}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Kinh phí huy động</span>
                      <span className="font-bold text-[#006B3F] text-sm">
                        {new Intl.NumberFormat("vi-VN").format(camp.raised)} VND
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">Mục tiêu chiến dịch</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {new Intl.NumberFormat("vi-VN").format(camp.goal)} VND
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedCampaign(camp)}
                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                    Chỉnh sửa Chiến dịch
                  </button>

                  <button
                    onClick={() => setPendingSoftDelete({
                      type: "campaign",
                      typeName: "Chiến dịch kêu gọi",
                      id: camp.id,
                      title: camp.name,
                      data: camp,
                    })}
                    className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-rose-200"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    Chuyển Thùng Rác
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 4: ROLE MATRIX ─── */}
      {activeTab === "roles" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
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

          <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  Ma trận quyền: <span className="text-purple-700">{activeMatrixRole.name}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">{activeMatrixRole.description}</p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold border self-start sm:self-auto ${activeMatrixRole.colorBadge}`}>
                Đang có {activeMatrixRole.permissionIds.length} quyền
              </span>
            </div>

            <div className="space-y-6">
              {permissionGroups.map((group, groupIdx) => (
                <div key={groupIdx} className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 text-sm">{group.moduleName}</h4>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {group.permissions.filter((p) => activeMatrixRole.permissionIds.includes(p.id)).length} / {group.permissions.length} quyền
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 bg-white">
                    {group.permissions.map((perm) => {
                      const isChecked = activeMatrixRole.permissionIds.includes(perm.id)
                      return (
                        <div
                          key={perm.id}
                          onClick={() => handleTogglePermission(activeMatrixRole.id, perm.id)}
                          className="p-4 flex items-start gap-3 hover:bg-slate-50/80 transition-colors cursor-pointer select-none"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="mt-0.5 w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="font-bold text-xs text-slate-900">{perm.label}</span>
                            <p className="text-xs text-slate-500 mt-0.5">{perm.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 5: RECYCLE BIN (THÙNG RÁC LƯU TRỮ) ─── */}
      {activeTab === "trash" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-fadeIn w-full">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Archive className="w-5 h-5 text-rose-600" />
                Thùng Rác Lưu Trữ Tạm Thời ({trashItems.length} mục)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Các dự án, chiến dịch hoặc tài khoản đã xóa được lưu trữ tạm thời tại đây. Bạn có thể khôi phục lại bất kỳ lúc nào hoặc xóa hẳn khỏi hệ thống.
              </p>
            </div>
          </div>

          {trashItems.length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-slate-50/60 rounded-3xl border border-dashed border-slate-200">
              <Archive className="w-12 h-12 text-slate-300 mx-auto stroke-1" />
              <h4 className="font-bold text-slate-700 text-sm">Thùng rác hiện đang trống</h4>
              <p className="text-xs text-slate-400">Các mục khi bị xóa ở các tab sẽ chuyển vào đây để bảo toàn dữ liệu.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              {trashItems.map((item) => (
                <div
                  key={item.trashId}
                  className="p-4 md:p-5 bg-white hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                        item.type === "project"
                          ? "bg-emerald-100 text-[#006B3F] border-emerald-200"
                          : item.type === "campaign"
                          ? "bg-indigo-100 text-indigo-800 border-indigo-200"
                          : "bg-purple-100 text-purple-800 border-purple-200"
                      }`}>
                        {item.typeName}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">Đã xóa lúc: {item.deletedAt}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-mono">ID gốc: {item.originalId}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleRestoreFromTrash(item)}
                      className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#006B3F] font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Khôi phục lại
                    </button>

                    <button
                      onClick={() => setPendingPermanentDelete(item)}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    >
                      <Flame className="w-3.5 h-3.5" />
                      Xóa Vĩnh Viễn
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── 🗑️ MODAL 1: SOFT DELETE CONFIRMATION POPUP ─── */}
      {pendingSoftDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-pop-in">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">Xác Nhận Chuyển Vào Thùng Rác</h3>
                <p className="text-xs text-slate-500">Chuyển {pendingSoftDelete.typeName} vào khu vực lưu trữ tạm</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs space-y-2">
              <p className="text-slate-600">Bạn đang thực hiện xóa đối tượng dưới đây:</p>
              <p className="font-bold text-slate-900 text-sm leading-snug">{pendingSoftDelete.title}</p>
              <div className="pt-2 border-t border-slate-200 text-slate-500 text-[11px] leading-relaxed">
                ℹ️ <strong>Lưu ý:</strong> Mục này sẽ được chuyển vào <strong>Thùng Rác</strong> và tạm thời không xuất hiện trên giao diện công khai. Bạn có thể khôi phục lại bất kỳ lúc nào tại Tab Thùng rác.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setPendingSoftDelete(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={confirmExecuteSoftDelete}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl text-xs shadow-md transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Archive className="w-4 h-4" />
                Đồng ý Chuyển Thùng Rác
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 🔥 MODAL 2: PERMANENT DELETE CONFIRMATION POPUP ─── */}
      {pendingPermanentDelete && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-rose-200 animate-pop-in">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">CẢNH BÁO: XÓA VĨNH VIỄN</h3>
                <p className="text-xs text-rose-600 font-bold">Hành động này KHÔNG THỂ KHÔI PHỤC!</p>
              </div>
            </div>

            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs space-y-2 text-rose-950">
              <p className="font-semibold">Bạn đang chuẩn bị XÓA MẤT HẲN đối tượng này khỏi Cơ sở dữ liệu:</p>
              <p className="font-extrabold text-sm underline">{pendingPermanentDelete.title}</p>
              <p className="text-[11px] text-rose-700 leading-relaxed pt-1">
                ⚠️ Dữ liệu liên quan và lịch sử của mục này sẽ bị tiêu hủy hoàn toàn. Bạn có thực sự chắc chắn muốn tiếp tục không?
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setPendingPermanentDelete(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={confirmExecutePermanentDelete}
                className="px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-extrabold rounded-2xl text-xs shadow-lg transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Flame className="w-4 h-4" />
                Xóa Vĩnh Viễn Ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 👤 MODAL: EDIT USER DETAILS ─── */}
      {selectedUserDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-pop-in my-8">
            <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-6 relative">
              <button
                onClick={() => setSelectedUserDetail(null)}
                className="absolute right-5 top-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center text-xl font-bold shadow-lg border-2 border-white/20">
                  {editName.charAt(0) || selectedUserDetail.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-serif font-bold text-white">
                      {isEditingProfile ? "Chỉnh sửa thông tin Tài khoản" : selectedUserDetail.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className={`px-3 py-1 rounded-full text-xs font-extrabold border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isEditingProfile
                          ? "bg-amber-400 text-slate-950 border-amber-300"
                          : "bg-white/10 hover:bg-white/20 text-purple-200 border-white/20"
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      {isEditingProfile ? "Đang Chỉnh sửa..." : "Chỉnh sửa Hồ sơ"}
                    </button>
                  </div>
                  <p className="text-xs text-purple-200 mt-0.5">{selectedUserDetail.organization}</p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Họ và tên *</label>
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full h-10 px-3 font-semibold text-slate-900 bg-white border border-purple-300 rounded-xl focus:outline-none"
                      />
                    ) : (
                      <p className="font-bold text-slate-900 text-sm bg-white p-2.5 rounded-xl border border-slate-200">{selectedUserDetail.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Email *</label>
                    {isEditingProfile ? (
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full h-10 px-3 font-semibold text-slate-900 bg-white border border-purple-300 rounded-xl focus:outline-none"
                      />
                    ) : (
                      <p className="font-bold text-slate-900 text-sm bg-white p-2.5 rounded-xl border border-slate-200">{selectedUserDetail.email}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Cấp các Vai trò (Multi-Role)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {roles.map((role) => {
                    const isChecked = tempSelectedRoleIds.includes(role.id)
                    return (
                      <div
                        key={role.id}
                        onClick={() => handleToggleUserRole(role.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isChecked
                            ? "bg-purple-50/80 border-purple-300 ring-2 ring-purple-500/20 shadow-xs"
                            : "bg-white border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-1 w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-xs text-slate-900">{role.name}</span>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{role.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-3">
                <button
                  onClick={() => handleToggleUserStatus(selectedUserDetail.id)}
                  className={`px-4 py-2.5 font-bold rounded-2xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer border ${
                    selectedUserDetail.status === "active"
                      ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                      : "bg-emerald-50 text-[#006B3F] border-emerald-200 hover:bg-emerald-100"
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  {selectedUserDetail.status === "active" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedUserDetail(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-colors cursor-pointer"
                  >
                    Đóng
                  </button>
                  <button
                    onClick={handleSaveUserFullProfile}
                    className="px-5 py-2.5 bg-[#006B3F] hover:bg-[#005030] text-white font-extrabold rounded-2xl text-xs transition-colors shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    Lưu Hồ sơ & Role
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── 📦 MODAL: CREATE / EDIT PROJECT ─── */}
      {(isCreatingProjectModalOpen || selectedProject) && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-pop-in my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-[#006B3F]" />
                {selectedProject ? "Chỉnh Sửa Thông Tin Dự Án" : "Khởi Tạo Dự Án Mới (Admin)"}
              </h3>
              <button
                onClick={() => {
                  setIsCreatingProjectModalOpen(false)
                  setSelectedProject(null)
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={selectedProject ? handleUpdateProject : handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên Dự Án *</label>
                <input
                  type="text"
                  required
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  placeholder="Nhập tên dự án kêu gọi quỹ..."
                  className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chiến dịch Thuộc về *</label>
                <select
                  value={projCampaign}
                  onChange={(e) => setProjCampaign(e.target.value)}
                  className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold text-slate-800 cursor-pointer"
                >
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Trường học / Đơn vị *</label>
                  <input
                    type="text"
                    required
                    value={projSchool}
                    onChange={(e) => setProjSchool(e.target.value)}
                    placeholder="Tên trường học đối tác..."
                    className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kinh phí Mục tiêu (VND) *</label>
                  <input
                    type="number"
                    required
                    step={5000000}
                    value={projGoal}
                    onChange={(e) => setProjGoal(Number(e.target.value))}
                    className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold text-[#006B3F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Trạng thái Dự án *</label>
                <select
                  value={projStatus}
                  onChange={(e) => setProjStatus(e.target.value as any)}
                  className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold text-slate-800 cursor-pointer"
                >
                  <option value="active">🟢 Đang kêu gọi (Active)</option>
                  <option value="pending">⏳ Chờ duyệt (Pending)</option>
                  <option value="closed">✓ Đã hoàn thành (Closed)</option>
                  <option value="suspended">🔴 Tạm dừng (Suspended)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Link Ảnh Cover Dự án</label>
                <input
                  type="text"
                  value={projImageUrl}
                  onChange={(e) => setProjImageUrl(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingProjectModalOpen(false)
                    setSelectedProject(null)
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#006B3F] hover:bg-[#005030] text-white font-extrabold rounded-2xl text-xs shadow-md"
                >
                  {selectedProject ? "Cập Nhật Dự Án" : "Khởi Tạo Dự Án"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 📣 MODAL: CREATE / EDIT CAMPAIGN ─── */}
      {(isCreatingCampaignModalOpen || selectedCampaign) && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-pop-in my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-indigo-600" />
                {selectedCampaign ? "Chỉnh Sửa Thông Tin Chiến Dịch" : "Tạo Chiến Dịch Mới (Admin)"}
              </h3>
              <button
                onClick={() => {
                  setIsCreatingCampaignModalOpen(false)
                  setSelectedCampaign(null)
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={selectedCampaign ? handleUpdateCampaign : handleCreateCampaign} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên Chiến Dịch *</label>
                <input
                  type="text"
                  required
                  value={campName}
                  onChange={(e) => setCampName(e.target.value)}
                  placeholder="Ví dụ: Cùng em tới trường 2026..."
                  className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-semibold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Đơn vị Khởi xướng *</label>
                  <input
                    type="text"
                    required
                    value={campOrganizer}
                    onChange={(e) => setCampOrganizer(e.target.value)}
                    className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mục tiêu Tổng (VND) *</label>
                  <input
                    type="number"
                    required
                    step={100000000}
                    value={campGoal}
                    onChange={(e) => setCampGoal(Number(e.target.value))}
                    className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold text-indigo-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Trạng thái Chiến dịch *</label>
                <select
                  value={campStatus}
                  onChange={(e) => setCampStatus(e.target.value as any)}
                  className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold text-slate-800 cursor-pointer"
                >
                  <option value="active">🟢 Đang hoạt động (Active)</option>
                  <option value="completed">✓ Đã hoàn thành (Completed)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Link Banner Ảnh Chiến dịch</label>
                <input
                  type="text"
                  value={campImageUrl}
                  onChange={(e) => setCampImageUrl(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingCampaignModalOpen(false)
                    setSelectedCampaign(null)
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-2xl text-xs shadow-md"
                >
                  {selectedCampaign ? "Cập Nhật Chiến Dịch" : "Khởi Tạo Chiến Dịch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── ➕ MODAL: CREATE NEW ROLE ─── */}
      {isCreatingRoleModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-200 animate-pop-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-500" />
                Tạo Vai trò (Role) Tùy chỉnh Mới
              </h3>
              <button onClick={() => setIsCreatingRoleModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên Vai trò *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Chuyên gia Khảo sát Địa hình..."
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-semibold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreatingRoleModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-2xl text-xs shadow-md"
                >
                  Tạo Vai trò ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 🔑 MODAL: CREATE NEW PERMISSION ─── */}
      {isCreatingPermModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-200 animate-pop-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-600" />
                Thêm Quyền Chức Năng Mới Vào Ma Trận
              </h3>
              <button onClick={() => setIsCreatingPermModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePermission} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên Quyền Hạn *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Xuất sao kê PDF bảo mật..."
                  value={newPermLabel}
                  onChange={(e) => setNewPermLabel(e.target.value)}
                  className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-semibold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreatingPermModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl text-xs shadow-md"
                >
                  Thêm Quyền vào Ma trận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400 font-bold">Đang tải Admin Dashboard...</div>}>
      <AdminDashboardPageContent />
    </Suspense>
  )
}
