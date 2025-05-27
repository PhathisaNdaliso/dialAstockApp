"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Users, TrendingUp, FileText, UserCheck, Clock, Send } from "lucide-react"

interface GroupLeaderDashboardProps {
  onLogout: () => void
}

export default function GroupLeaderDashboard({ onLogout }: GroupLeaderDashboardProps) {
  const [activeView, setActiveView] = useState("team")
  const [report, setReport] = useState("")
  const { toast } = useToast()

  const navigationItems = [
    {
      icon: <Users className="w-4 h-4" />,
      label: "Team Members",
      onClick: () => setActiveView("team"),
      active: activeView === "team",
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      label: "Job Progress",
      onClick: () => setActiveView("progress"),
      active: activeView === "progress",
    },
    {
      icon: <FileText className="w-4 h-4" />,
      label: "Submit Report",
      onClick: () => setActiveView("report"),
      active: activeView === "report",
    },
  ]

  const mockTeamMembers = [
    { name: "John Smith", role: "Stocktaker", status: "Active", currentTask: "Electronics Count", progress: 75 },
    { name: "Sarah Johnson", role: "Scanner", status: "Active", currentTask: "Barcode Scanning", progress: 60 },
    { name: "Mike Wilson", role: "Stocktaker", status: "On Break", currentTask: "Clothing Audit", progress: 45 },
    { name: "Lisa Brown", role: "Scanner", status: "Active", currentTask: "Grocery Items", progress: 90 },
  ]

  const mockJobProgress = {
    jobId: "JOB-001",
    client: "Woolworths",
    location: "Sandton City",
    overallProgress: 68,
    sections: [
      { name: "Electronics", progress: 85, assigned: "John Smith" },
      { name: "Clothing", progress: 45, assigned: "Mike Wilson" },
      { name: "Grocery", progress: 90, assigned: "Lisa Brown" },
      { name: "Home & Garden", progress: 30, assigned: "Sarah Johnson" },
    ],
  }

  const handleSubmitReport = () => {
    if (report.trim()) {
      toast({
        title: "Report Submitted",
        description: "Your team report has been submitted to management.",
      })
      setReport("")
    }
  }

  const renderTeam = () => (
    <div className="space-y-6">
      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeamMembers.length}</div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Currently Active</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeamMembers.filter((m) => m.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">Working now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Break</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeamMembers.filter((m) => m.status === "On Break").length}</div>
            <p className="text-xs text-muted-foreground">Taking break</p>
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
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{member.name}</span>
                      <Badge variant="outline">{member.role}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{member.currentTask}</p>
                  </div>
                  <Badge variant={member.status === "Active" ? "default" : "secondary"}>{member.status}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Task Progress</span>
                    <span>{member.progress}%</span>
                  </div>
                  <Progress value={member.progress} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProgress = () => (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Job Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{mockJobProgress.jobId}</h3>
                <p className="text-sm text-gray-600">
                  {mockJobProgress.client} • {mockJobProgress.location}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{mockJobProgress.overallProgress}%</div>
                <p className="text-sm text-gray-600">Complete</p>
              </div>
            </div>
            <Progress value={mockJobProgress.overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Section Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Section Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockJobProgress.sections.map((section, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{section.name}</h4>
                    <p className="text-sm text-gray-600">Assigned to: {section.assigned}</p>
                  </div>
                  <span className="text-sm font-medium">{section.progress}%</span>
                </div>
                <Progress value={section.progress} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderReport = () => (
    <Card>
      <CardHeader>
        <CardTitle>Submit Team Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Team Performance Report</label>
          <Textarea
            placeholder="Provide a summary of your team's performance, any issues encountered, and recommendations..."
            value={report}
            onChange={(e) => setReport(e.target.value)}
            rows={8}
          />
        </div>
        <Button
          onClick={handleSubmitReport}
          disabled={!report.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          <Send className="w-4 h-4 mr-2" />
          Submit Report
        </Button>

        {/* Recent Reports */}
        <div className="mt-6">
          <h3 className="font-medium mb-3">Recent Reports</h3>
          <div className="space-y-2">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Weekly Team Summary</span>
                <Badge variant="default">Submitted</Badge>
              </div>
              <p className="text-xs text-gray-600">Submitted 2 days ago</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Job Completion Report</span>
                <Badge variant="default">Submitted</Badge>
              </div>
              <p className="text-xs text-gray-600">Submitted 1 week ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (activeView) {
      case "progress":
        return renderProgress()
      case "report":
        return renderReport()
      default:
        return renderTeam()
    }
  }

  return (
    <DashboardLayout
      userRole="groupleader"
      userName="Group Leader"
      onLogout={onLogout}
      navigationItems={navigationItems}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
