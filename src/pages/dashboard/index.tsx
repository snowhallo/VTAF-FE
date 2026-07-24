import { Navigate } from "react-router-dom"

export default function DashboardIndexPage() {
  const savedRole = localStorage.getItem("dashboard_current_role") || "admin"
  return <Navigate to={`/dashboard/${savedRole}`} replace />
}
