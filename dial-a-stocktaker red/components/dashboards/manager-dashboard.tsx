"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Briefcase, FileText, TrendingUp, UserCheck, Clock } from "lucide-react"

interface ManagerDashboardProps {
  onLogout: () => void
}

export default function ManagerDashboard({ onLogout }: ManagerDashboardProps) {
  const [activeView, setActiveView] = useState("overview")

  const navigationItems = [
    {
      icon: <TrendingUp className="w-4 h-4" />,
      label: "Team Overview",
      onClick: () => setActiveView("overview"),
      active: activeView === "overview",
    },
    {
      icon: <Briefcase className="w-4 h-4" />,
      label: "Job Management",
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

  const mockTeamStats = {
    totalMembers: 45,
    activeMembers: 38,
    onBreak: 4,
    offline: 3,
  }

  const mockJobs = [
    { id: "JOB-001", client: "Woolworths", team: "Team Alpha", progress: 75, status: "In Progress" },
    { id: "JOB-002", client: "Pick n Pay", team: "Team Beta", progress: 30, status: "In Progress" },
    { id: "JOB-003", client: "Checkers", team: "Team Gamma", progress: 100, status: "Completed" },
  ]

  const mockTeamMembers = [
    { name: "John Smith", role: "Stocktaker", status: "Active", currentJob: "JOB-001" },
    { name: "Sarah Johnson", role: "Scanner", status: "Active", currentJob: "JOB-002" },
    { name: "Mike Wilson", role: "Group Leader", status: "On Break", currentJob: null },
    { name: "Lisa Brown", role: "Stocktaker", status: "Active", currentJob: "JOB-001" },
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Team</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeamStats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">Team members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeamStats.activeMembers}</div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Break</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeamStats.onBreak}</div>
            <p className="text-xs text-muted-foreground">Taking break</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offline</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeamStats.offline}</div>
            <p className="text-xs text-muted-foreground">Not available</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTeamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{member.name}</span>
                    <Badge variant="outline">{member.role}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {member.currentJob ? `Working on ${member.currentJob}` : "No active job"}
                  </p>
                </div>
                <Badge
                  variant={
                    member.status === "Active" ? "default" : member.status === "On Break" ? "secondary" : "outline"
                  }
                >
                  {member.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
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
              <div className="flex items-center justify-between mb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{job.id}</span>
                    <Badge variant={job.status === "Completed" ? "default" : "secondary"}>{job.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {job.client} • {job.team}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Manage
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{job.progress}%</span>
                </div>
                <Progress value={job.progress} />
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
        <CardTitle>Team Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Weekly Team Performance</h3>
            <p className="text-sm text-gray-600 mb-2">Team productivity and efficiency metrics</p>
            <Button size="sm">View Report</Button>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Job Completion Summary</h3>
            <p className="text-sm text-gray-600 mb-2">Completed jobs and quality metrics</p>
            <Button size="sm">View Report</Button>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Resource Utilization</h3>
            <p className="text-sm text-gray-600 mb-2">Team allocation and availability</p>
            <Button size="sm">View Report</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (activeView) {
      case "jobs":
        return renderJobs()
      case "reports":
        return renderReports()
      default:
        return renderOverview()
    }
  }

  return (
    <DashboardLayout userRole="manager" userName="Manager User" onLogout={onLogout} navigationItems={navigationItems}>
      {renderContent()}
    </DashboardLayout>
  )
}
