"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { CheckSquare, Clock, AlertTriangle, MapPin, Calendar, Target } from "lucide-react"

interface StocktakerDashboardProps {
  onLogout: () => void
}

export default function StocktakerDashboard({ onLogout }: StocktakerDashboardProps) {
  const [activeView, setActiveView] = useState("tasks")
  const [issueReport, setIssueReport] = useState("")
  const { toast } = useToast()

  const navigationItems = [
    {
      icon: <CheckSquare className="w-4 h-4" />,
      label: "My Tasks",
      onClick: () => setActiveView("tasks"),
      active: activeView === "tasks",
    },
    {
      icon: <Target className="w-4 h-4" />,
      label: "Mark Completed",
      onClick: () => setActiveView("completed"),
      active: activeView === "completed",
    },
    {
      icon: <AlertTriangle className="w-4 h-4" />,
      label: "Report Issues",
      onClick: () => setActiveView("issues"),
      active: activeView === "issues",
    },
  ]

  const mockTasks = [
    {
      id: "TSK-001",
      title: "Count Electronics Section",
      location: "Woolworths - Sandton City",
      status: "In Progress",
      progress: 65,
      deadline: "2024-01-15 18:00",
      priority: "High",
    },
    {
      id: "TSK-002",
      title: "Verify Clothing Inventory",
      location: "Pick n Pay - Rosebank",
      status: "Pending",
      progress: 0,
      deadline: "2024-01-16 16:00",
      priority: "Medium",
    },
    {
      id: "TSK-003",
      title: "Audit Grocery Aisles 1-5",
      location: "Checkers - Hyde Park",
      status: "Completed",
      progress: 100,
      deadline: "2024-01-14 17:00",
      priority: "Low",
    },
  ]

  const handleMarkCompleted = (taskId: string) => {
    toast({
      title: "Task Completed",
      description: `Task ${taskId} has been marked as completed.`,
    })
  }

  const handleReportIssue = () => {
    if (issueReport.trim()) {
      toast({
        title: "Issue Reported",
        description: "Your issue has been submitted to the coordinator.",
      })
      setIssueReport("")
    }
  }

  const renderTasks = () => (
    <div className="space-y-6">
      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 in progress, 1 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Great progress!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">55%</div>
            <p className="text-xs text-muted-foreground">This week's tasks</p>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTasks.map((task) => (
              <div key={task.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{task.title}</span>
                      <Badge
                        variant={
                          task.priority === "High"
                            ? "destructive"
                            : task.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {task.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Due: {task.deadline}
                    </div>
                  </div>
                  <Badge
                    variant={
                      task.status === "Completed" ? "default" : task.status === "In Progress" ? "secondary" : "outline"
                    }
                  >
                    {task.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} />
                </div>

                {task.status !== "Completed" && (
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {task.status === "In Progress" && (
                      <Button
                        size="sm"
                        onClick={() => handleMarkCompleted(task.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCompleted = () => (
    <Card>
      <CardHeader>
        <CardTitle>Mark Tasks as Completed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTasks
            .filter((task) => task.status === "In Progress")
            .map((task) => (
              <div key={task.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.location}</p>
                  </div>
                  <Button onClick={() => handleMarkCompleted(task.id)} className="bg-green-600 hover:bg-green-700">
                    Mark Complete
                  </Button>
                </div>
                <Progress value={task.progress} className="mt-2" />
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderIssues = () => (
    <Card>
      <CardHeader>
        <CardTitle>Report Issues</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Describe the issue</label>
          <Textarea
            placeholder="Please describe any issues you've encountered during your stocktaking tasks..."
            value={issueReport}
            onChange={(e) => setIssueReport(e.target.value)}
            rows={6}
          />
        </div>
        <Button onClick={handleReportIssue} disabled={!issueReport.trim()} className="w-full">
          Submit Issue Report
        </Button>

        {/* Recent Issues */}
        <div className="mt-6">
          <h3 className="font-medium mb-3">Recent Reports</h3>
          <div className="space-y-2">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Barcode Scanner Malfunction</span>
                <Badge variant="outline">Pending</Badge>
              </div>
              <p className="text-xs text-gray-600">Submitted 2 hours ago</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Missing Inventory Items</span>
                <Badge variant="default">Resolved</Badge>
              </div>
              <p className="text-xs text-gray-600">Submitted yesterday</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (activeView) {
      case "completed":
        return renderCompleted()
      case "issues":
        return renderIssues()
      default:
        return renderTasks()
    }
  }

  return (
    <DashboardLayout
      userRole="stocktaker"
      userName="John Stocktaker"
      onLogout={onLogout}
      navigationItems={navigationItems}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
