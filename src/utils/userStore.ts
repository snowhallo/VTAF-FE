export interface SystemUser {
  id: string
  username: string
  password?: string
  name: string
  email: string
  phone?: string
  roleId: string
  organization: string
  status: "active" | "suspended"
  createdAt: string
}

export const INITIAL_SYSTEM_USERS: SystemUser[] = [
  {
    id: "usr-admin",
    username: "admin",
    password: "admin123",
    name: "Admin Tổng Quỹ VTAF",
    email: "admin@quynhantai.org",
    roleId: "admin",
    organization: "Quỹ Hỗ trợ Nhân tài Việt Nam",
    status: "active",
    createdAt: "01-01-2026",
  },
  {
    id: "usr-1",
    username: "huutai",
    password: "123",
    name: "Nguyễn Hữu Tài",
    email: "huutai@quynhantai.org",
    roleId: "donor",
    organization: "Cá nhân",
    status: "active",
    createdAt: "15-01-2026",
  },
  {
    id: "usr-2",
    username: "thpt_nguyendinhchieu",
    password: "123",
    name: "Ban BGH THPT Nguyễn Đình Chiểu",
    email: "thpt.nguyendinhchieu@edu.vn",
    roleId: "school",
    organization: "Trường THPT Nguyễn Đình Chiểu",
    status: "active",
    createdAt: "10-02-2026",
  },
  {
    id: "usr-3",
    username: "reviewer_nam",
    password: "123",
    name: "PGS.TS Tran Van Nam",
    email: "tvnam.reviewer@quynhantai.org",
    roleId: "reviewer",
    organization: "Hội đồng Thẩm định VTAF",
    status: "active",
    createdAt: "01-01-2026",
  },
  {
    id: "usr-5",
    username: "ketoan_vtaf",
    password: "123",
    name: "Kế toán trưởng VTAF",
    email: "ketoan@quynhantai.org",
    roleId: "accountant",
    organization: "Ban Tài chính VTAF",
    status: "active",
    createdAt: "05-03-2026",
  },
]

const USERS_STORAGE_KEY = "mock_system_users"
const CURRENT_USER_KEY = "current_user"
const CURRENT_ROLE_KEY = "dashboard_current_role"

/**
 * Get all users from LocalStorage or seed with INITIAL_SYSTEM_USERS
 */
export function getStoredUsers(): SystemUser[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_SYSTEM_USERS))
      return INITIAL_SYSTEM_USERS
    }
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed
    }
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_SYSTEM_USERS))
    return INITIAL_SYSTEM_USERS
  } catch (e) {
    return INITIAL_SYSTEM_USERS
  }
}

/**
 * Save users array to LocalStorage
 */
export function saveStoredUsers(users: SystemUser[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

/**
 * Register a new user and add to LocalStorage
 */
export function registerNewUser(data: {
  username: string
  email: string
  phone?: string
  password?: string
  roleId?: string
}): SystemUser {
  const users = getStoredUsers()
  
  const newUser: SystemUser = {
    id: `usr-${Date.now()}`,
    username: data.username.trim(),
    password: data.password || "123",
    name: data.username.trim(),
    email: data.email.trim(),
    phone: data.phone || "",
    roleId: data.roleId || "donor", // Default to donor unless specified
    organization: "Tài khoản cá nhân",
    status: "active",
    createdAt: new Date().toLocaleDateString("vi-VN"),
  }

  const updatedUsers = [newUser, ...users]
  saveStoredUsers(updatedUsers)

  // Set current user session
  setCurrentUserSession(newUser)
  return newUser
}

/**
 * Authenticate user by username/email and password
 */
export function authenticateUser(usernameOrEmail: string, passwordInput: string): SystemUser | null {
  const users = getStoredUsers()
  const found = users.find(
    (u) =>
      (u.username.toLowerCase() === usernameOrEmail.toLowerCase() ||
        u.email.toLowerCase() === usernameOrEmail.toLowerCase()) &&
      (!u.password || u.password === passwordInput)
  )

  if (found) {
    setCurrentUserSession(found)
    return found
  }
  return null
}

/**
 * Set active user session in LocalStorage
 */
export function setCurrentUserSession(user: SystemUser): void {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  localStorage.setItem(CURRENT_ROLE_KEY, user.roleId)
}

/**
 * Update user role by Admin
 */
export function updateUserRole(userId: string, newRoleId: string): SystemUser[] {
  const users = getStoredUsers()
  const updated = users.map((u) => (u.id === userId ? { ...u, roleId: newRoleId } : u))
  saveStoredUsers(updated)

  // If the updated user is currently logged in, update session
  try {
    const rawCurr = localStorage.getItem(CURRENT_USER_KEY)
    if (rawCurr) {
      const curr = JSON.parse(rawCurr)
      if (curr.id === userId) {
        curr.roleId = newRoleId
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(curr))
        localStorage.setItem(CURRENT_ROLE_KEY, newRoleId)
      }
    }
  } catch (e) {
    // Ignore error
  }

  return updated
}
