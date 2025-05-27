"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, Users, Plus, Clock, MapPin } from "lucide-react"

interface CoordinatorDashboardProps {
  onLogout: () => void
}

export default function CoordinatorDashboard({ onLogout }: CoordinatorDashboardProps) {
  const [activeView, setActiveView] = useState("schedule")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const { toast } = useToast()

  const navigationItems = [
    {
      icon: <CalendarIcon className="w-4 h-4" />,
      label: "Schedule Jobs",
      onClick: () => setActiveView("schedule"),
      active: activeView === "schedule",
    },
    {
      icon: <Users className="w-4 h-4" />,
      label: "Assign Teams",
      onClick: () => setActiveView("teams"),
      active: activeView === "teams",
    },
    {
      icon: <CalendarIcon className="w-4 h-4" />,
      label: "Calendar",
      onClick: () => setActiveView("calendar"),
      active: activeView === "calendar",
    },
  ]

  const mockJobs = [
    {
      id: "JOB-001",
      client: "Woolworths",
      location: "Sandton City",
      date: "2024-01-15",
      time: "09:00",
      team: "Team Alpha",
      status: "Scheduled",
    },
    {
      id: "JOB-002",
      client: "Pick n Pay",
      location: "Rosebank",
      date: "2024-01-16",
      time: "14:00",
      team: null,
      status: "Pending",
    },
    {
      id: "JOB-003",
      client: "Checkers",
      location: "Hyde Park",
      date: "2024-01-17",
      time: "10:00",
      team: "Team Beta",
      status: "Scheduled",
    },
  ]

  const mockTeams = [
    { name: "Team Alpha", members: 5, leader: "John Smith", status: "Available" },
    { name: "Team Beta", members: 4, leader: "Sarah Johnson", status: "Busy" },
    { name: "Team Gamma", members: 6, leader: "Mike Wilson", status: "Available" },
    { name: "Team Delta", members: 3, leader: "Lisa Brown", status: "Available" },
  ]

  const handleAssignTeam = (jobId: string, teamName: string) => {
    toast({
      title: "Team Assigned",
      description: `${teamName} has been assigned to ${jobId}`,
    })
  }

  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Job Scheduling</h2>
        <Button className="bg-red-500 hover:bg-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Schedule New Job
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockJobs.map((job) => (
              <div key={job.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{job.id}</span>
                      <Badge variant={job.status === "Scheduled" ? "default" : "outline"}>{job.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{job.client}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {job.date} at {job.time}
                  </div>
                </div>

                {job.team && (
                  <div className="mt-2">
                    <Badge variant="secondary">{job.team}</Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTeams = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Team Assignment</h2>

      {/* Unassigned Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Jobs Needing Team Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockJobs
              .filter((job) => !job.team)
              .map((job) => (
                <div key={job.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium">
                        {job.id} - {job.client}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {job.location} • {job.date} at {job.time}
                      </p>
                    </div>
                    <Badge variant="outline">Needs Team</Badge>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {mockTeams
                      .filter((team) => team.status === "Available")
                      .map((team) => (
                        <Button
                          key={team.name}
                          size="sm"
                          variant="outline"
                          onClick={() => handleAssignTeam(job.id, team.name)}
                        >
                          Assign {team.name}
                        </Button>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Teams */}
      <Card>
        <CardHeader>
          <CardTitle>Available Teams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTeams.map((team) => (
              <div key={team.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{team.name}</span>
                    <Badge variant={team.status === "Available" ? "default" : "secondary"}>{team.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {team.members} members • Led by {team.leader}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCalendar = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Calendar View</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jobs for {selectedDate?.toLocaleDateString() || "Selected Date"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockJobs
                .filter((job) => job.date === selectedDate?.toISOString().split("T")[0])
                .map((job) => (
                  <div key={job.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{job.client}</h4>
                        <p className="text-sm text-gray-600">
                          {job.time} • {job.location}
                        </p>
                      </div>
                      <Badge variant={job.team ? "default" : "outline"}>{job.team || "No Team"}</Badge>
                    </div>
                  </div>
                ))}
              {mockJobs.filter((job) => job.date === selectedDate?.toISOString().split("T")[0]).length === 0 && (
                <p className="text-gray-500 text-center py-4">No jobs scheduled for this date</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeView) {
      case "teams":
        return renderTeams()
      case "calendar":
        return renderCalendar()
      default:
        return renderSchedule()
    }
  }

  return (
    <DashboardLayout
      userRole="coordinator"
      userName="Coordinator User"
      onLogout={onLogout}
      navigationItems={navigationItems}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
