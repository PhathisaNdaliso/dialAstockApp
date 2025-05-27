"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Briefcase, FileText, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState("dashboard")

  const navigationItems = [
    {
      icon: <TrendingUp className="w-4 h-4" />,
      label: "Dashboard",
      onClick: () => setActiveView("dashboard"),
      active: activeView === "dashboard",
    },
    {
      icon: <Users className="w-4 h-4" />,
      label: "Users",
      onClick: () => setActiveView("users"),
      active: activeView === "users",
    },
    {
      icon: <Briefcase className="w-4 h-4" />,
      label: "Jobs",
      onClick: () => setActiveView("jobs"),
      active: activeView === "jobs",
    },
    {
      icon: <FileText className="w-4 h-4" />,
      label: "Reports",
      onClick: () => setActiveView("reports"),
      active: activeView === "reports",
    },
  ]

  const mockStats = {
    totalUsers: 1247,
    activeJobs: 23,
    completedJobs: 156,
    pendingReports: 8,
  }

  const mockJobs = [
    { id: "JOB-001", client: "Woolworths", status: "In Progress", progress: 75, team: "Team Alpha" },
    { id: "JOB-002", client: "Pick n Pay", status: "Pending", progress: 0, team: "Team Beta" },
    { id: "JOB-003", client: "Checkers", status: "Completed", progress: 100, team: "Team Gamma" },
    { id: "JOB-004", client: "Spar", status: "In Progress", progress: 45, team: "Team Delta" },
  ]

  const mockUsers = [
    { id: "USR-001", name: "John Smith", role: "Stocktaker", status: "Active", jobs: 12 },
    { id: "USR-002", name: "Sarah Johnson", role: "Scanner", status: "Active", jobs: 8 },
    { id: "USR-003", name: "Mike Wilson", role: "Group Leader", status: "Busy", jobs: 15 },
    { id: "USR-004", name: "Lisa Brown", role: "Coordinator", status: "Active", jobs: 20 },
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeJobs}</div>
            <p className="text-xs text-muted-foreground">+3 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.completedJobs}</div>
            <p className="text-xs text-muted-foreground">+8% completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.pendingReports}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{job.id}</span>
                    <Badge
                      variant={
                        job.status === "Completed" ? "default" : job.status === "In Progress" ? "secondary" : "outline"
                      }
                    >
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {job.client} • {job.team}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-sm font-medium">{job.progress}%</div>
                  <Progress value={job.progress} className="w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderUsers = () => (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{user.name}</span>
                  <Badge variant="outline">{user.role}</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {user.id} • {user.jobs} jobs completed
                </p>
              </div>
              <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderJobs = () => (
    <Card>
      <CardHeader>
        <CardTitle>Job Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockJobs.map((job) => (
            <div key={job.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{job.id}</span>
                  <Badge
                    variant={
                      job.status === "Completed" ? "default" : job.status === "In Progress" ? "secondary" : "outline"
                    }
                  >
                    {job.status}
                  </Badge>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {job.client} • {job.team}
              </p>
              <div className="flex items-center gap-2">
                <Progress value={job.progress} className="flex-1" />
                <span className="text-sm font-medium">{job.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderReports = () => (
    <Card>
      <CardHeader>
        <CardTitle>System Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Monthly Performance Report</h3>
            <p className="text-sm text-gray-600 mb-2">Generated on: {new Date().toLocaleDateString()}</p>
            <Button size="sm">Download PDF</Button>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">User Activity Report</h3>
            <p className="text-sm text-gray-600 mb-2">Last 30 days activity summary</p>
            <Button size="sm">Download PDF</Button>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Financial Summary</h3>
            <p className="text-sm text-gray-600 mb-2">Revenue and cost analysis</p>
            <Button size="sm">Download PDF</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (activeView) {
      case "users":
        return renderUsers()
      case "jobs":
        return renderJobs()
      case "reports":
        return renderReports()
      default:
        return renderDashboard()
    }
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin User" onLogout={onLogout} navigationItems={navigationItems}>
      {renderContent()}
    </DashboardLayout>
  )
}
