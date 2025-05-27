"use client"

import AdminDashboard from "@/components/dashboards/admin-dashboard"
import ManagerDashboard from "@/components/dashboards/manager-dashboard"
import CoordinatorDashboard from "@/components/dashboards/coordinator-dashboard"
import StocktakerDashboard from "@/components/dashboards/stocktaker-dashboard"
import ScannerDashboard from "@/components/dashboards/scanner-dashboard"
import GroupLeaderDashboard from "@/components/dashboards/groupleader-dashboard"
import ReceptionistDashboard from "@/components/dashboards/receptionist-dashboard"
import ClientDashboard from "@/components/dashboards/client-dashboard"

interface DashboardRouterProps {
  userRole: string | null
  onLogout: () => void
}

export default function DashboardRouter({ userRole, onLogout }: DashboardRouterProps) {
  if (!userRole) return null

  const dashboardComponents = {
    admin: AdminDashboard,
    manager: ManagerDashboard,
    coordinator: CoordinatorDashboard,
    stocktaker: StocktakerDashboard,
    scanner: ScannerDashboard,
    groupleader: GroupLeaderDashboard,
    receptionist: ReceptionistDashboard,
    client: ClientDashboard,
  }

  const DashboardComponent = dashboardComponents[userRole as keyof typeof dashboardComponents]

  if (!DashboardComponent) {
    return <div>Invalid role</div>
  }

  return <DashboardComponent onLogout={onLogout} />
}
