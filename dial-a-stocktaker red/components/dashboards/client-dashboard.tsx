"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Briefcase, Download, MessageSquare, Calendar, FileText, Star } from "lucide-react"

interface ClientDashboardProps {
  onLogout: () => void
}

export default function ClientDashboard({ onLogout }: ClientDashboardProps) {
  const [activeView, setActiveView] = useState("jobs")
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(0)
  const { toast } = useToast()

  const navigationItems = [
    {
      icon: <Briefcase className="w-4 h-4" />,
      label: "View Jobs",
      onClick: () => setActiveView("jobs"),
      active: activeView === "jobs",
    },
    {
      icon: <Download className="w-4 h-4" />,
      label: "Download Reports",
      onClick: () => setActiveView("reports"),
      active: activeView === "reports",
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      label: "Send Feedback",
      onClick: () => setActiveView("feedback"),
      active: activeView === "feedback",
    },
  ]

  const mockJobs = [
    {
      id: "JOB-001",
      location: "Main Store - Sandton",
      scheduledDate: "2024-01-15",
      status: "In Progress",
      progress: 75,
      team: "Team Alpha",
      estimatedCompletion: "2024-01-15 18:00",
    },
    {
      id: "JOB-002",
      location: "Branch Store - Rosebank",
      scheduledDate: "2024-01-20",
      status: "Scheduled",
      progress: 0,
      team: "Team Beta",
      estimatedCompletion: "2024-01-20 17:00",
    },
    {
      id: "JOB-003",
      location: "Warehouse - Midrand",
      scheduledDate: "2024-01-10",
      status: "Completed",
      progress: 100,
      team: "Team Gamma",
      estimatedCompletion: "2024-01-10 16:00",
    },
  ]

  const mockReports = [
    {
      id: "RPT-001",
      jobId: "JOB-003",
      title: "Warehouse Stocktaking Report",
      date: "2024-01-10",
      type: "Final Report",
      size: "2.4 MB",
    },
    {
      id: "RPT-002",
      jobId: "JOB-001",
      title: "Main Store Progress Report",
      date: "2024-01-15",
      type: "Progress Report",
      size: "1.8 MB",
    },
    {
      id: "RPT-003",
      jobId: "JOB-003",
      title: "Inventory Discrepancy Report",
      date: "2024-01-10",
      type: "Discrepancy Report",
      size: "856 KB",
    },
  ]

  const handleDownloadReport = (reportId: string) => {
    toast({
      title: "Download Started",
      description: `Report ${reportId} is being downloaded.`,
    })
  }

  const handleSubmitFeedback = () => {
    if (feedback.trim() && rating > 0) {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback. We appreciate your input!",
      })
      setFeedback("")
      setRating(0)
    }
  }

  const renderJobs = () => (
    <div className="space-y-6">
      {/* Job Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockJobs.filter((j) => j.status === "In Progress").length}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockJobs.filter((j) => j.status === "Scheduled").length}</div>
            <p className="text-xs text-muted-foreground">Upcoming jobs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockJobs.filter((j) => j.status === "Completed").length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Job List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Stocktaking Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockJobs.map((job) => (
              <div key={job.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{job.id}</span>
                      <Badge
                        variant={
                          job.status === "Completed"
                            ? "default"
                            : job.status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {job.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{job.location}</p>
                    <p className="text-sm text-gray-600">Team: {job.team}</p>
                    <p className="text-sm text-gray-600">
                      {job.status === "Completed" ? "Completed" : "Estimated completion"}: {job.estimatedCompletion}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>

                {job.status !== "Scheduled" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{job.progress}%</span>
                    </div>
                    <Progress value={job.progress} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderReports = () => (
    <Card>
      <CardHeader>
        <CardTitle>Available Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockReports.map((report) => (
            <div key={report.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="space-y-1">
                  <h3 className="font-medium">{report.title}</h3>
                  <p className="text-sm text-gray-600">
                    {report.jobId} • {report.date} • {report.size}
                  </p>
                  <Badge variant="outline">{report.type}</Badge>
                </div>
                <Button onClick={() => handleDownloadReport(report.id)} className="bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderFeedback = () => (
    <Card>
      <CardHeader>
        <CardTitle>Send Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating */}
        <div>
          <label className="text-sm font-medium mb-2 block">Rate our service</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`p-1 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                <Star className="w-6 h-6 fill-current" />
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Text */}
        <div>
          <label className="text-sm font-medium mb-2 block">Your feedback</label>
          <Textarea
            placeholder="Please share your experience with our stocktaking service..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={6}
          />
        </div>

        <Button onClick={handleSubmitFeedback} disabled={!feedback.trim() || rating === 0} className="w-full">
          <MessageSquare className="w-4 h-4 mr-2" />
          Submit Feedback
        </Button>

        {/* Previous Feedback */}
        <div className="mt-6">
          <h3 className="font-medium mb-3">Previous Feedback</h3>
          <div className="space-y-2">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Excellent service quality</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
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
      case "reports":
        return renderReports()
      case "feedback":
        return renderFeedback()
      default:
        return renderJobs()
    }
  }

  return (
    <DashboardLayout userRole="client" userName="Client User" onLogout={onLogout} navigationItems={navigationItems}>
      {renderContent()}
    </DashboardLayout>
  )
}
