import { redirect } from "next/navigation";

export default function DashboardIndexPage() {
  // Automatically redirect to school portal overview by default
  redirect("/dashboard/school");
}
