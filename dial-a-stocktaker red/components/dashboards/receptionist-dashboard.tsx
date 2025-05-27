"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Phone, CalendarIcon, MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface ReceptionistDashboardProps {
  onLogout: () => void
}

export default function ReceptionistDashboard({ onLogout }: ReceptionistDashboardProps) {
  const [activeView, setActiveView] = useState("requests")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [message, setMessage] = useState("")
  const { toast } = useToast()

  const navigationItems = [
    {
      icon: <Phone className="w-4 h-4" />,
      label: "Booking Requests",
      onClick: () => setActiveView("requests"),
      active: activeView === "requests",
    },
    {
      icon: <CalendarIcon className="w-4 h-4" />,
      label: "Schedule Calendar",
      onClick: () => setActiveView("calendar"),
      active: activeView === "calendar",
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      label: "Client Messages",
      onClick: () => setActiveView("messages"),
      active: activeView === "messages",
    },
  ]

  const mockBookingRequests = [
    {
      id: "REQ-001",
      client: "ABC Retail",
      contact: "John Doe",
      phone: "+27 11 123 4567",
      email: "john@abcretail.co.za",
      requestDate: "2024-01-15",
      preferredDate: "2024-01-20",
      status: "Pending",
      priority: "High",
    },
    {
      id: "REQ-002",
      client: "XYZ Store",
      contact: "Jane Smith",
      phone: "+27 21 987 6543",
      email: "jane@xyzstore.co.za",
      requestDate: "2024-01-14",
      preferredDate: "2024-01-18",
      status: "Confirmed",
      priority: "Medium",
    },
    {
      id: "REQ-003",
      client: "Quick Mart",
      contact: "Mike Johnson",
      phone: "+27 31 555 0123",
      email: "mike@quickmart.co.za",
      requestDate: "2024-01-16",
      preferredDate: "2024-01-22",
      status: "Pending",
      priority: "Low",
    },
  ]

  const mockMessages = [
    {
      id: "MSG-001",
      client: "ABC Retail",
      subject: "Urgent: Stocktaking Schedule Change",
      message: "We need to reschedule our stocktaking from next week to this Friday. Please confirm availability.",
      timestamp: "2 hours ago",
      status: "Unread",
    },
    {
      id: "MSG-002",
      client: "XYZ Store",
      subject: "Thank you for excellent service",
      message: "The stocktaking team was professional and efficient. We'd like to book again next month.",
      timestamp: "1 day ago",
      status: "Read",
    },
  ]

  const handleApproveRequest = (requestId: string) => {
    toast({
      title: "Request Approved",
      description: `Booking request ${requestId} has been approved and scheduled.`,
    })
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      toast({
        title: "Message Sent",
        description: "Your message has been sent to the client.",
      })
      setMessage("")
    }
  }

  const renderRequests = () => (
    <div className="space-y-6">
      {/* Request Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockBookingRequests.filter((r) => r.status === "Pending").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockBookingRequests.filter((r) => r.status === "Confirmed").length}
            </div>
            <p className="text-xs text-muted-foreground">Bookings confirmed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockBookingRequests.filter((r) => r.priority === "High").length}</div>
            <p className="text-xs text-muted-foreground">Urgent requests</p>
          </CardContent>
        </Card>
      </div>

      {/* Booking Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Booking Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBookingRequests.map((request) => (
              <div key={request.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{request.client}</span>
                      <Badge
                        variant={
                          request.priority === "High"
                            ? "destructive"
                            : request.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {request.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Contact: {request.contact}</p>
                    <p className="text-sm text-gray-600">Phone: {request.phone}</p>
                    <p className="text-sm text-gray-600">Email: {request.email}</p>
                    <p className="text-sm text-gray-600">Preferred Date: {request.preferredDate}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant={request.status === "Confirmed" ? "default" : "outline"}>{request.status}</Badge>
                    {request.status === "Pending" && (
                      <Button size="sm" onClick={() => handleApproveRequest(request.id)}>
                        Approve
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCalendar = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Schedule Calendar</h2>

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
            <CardTitle>Bookings for {selectedDate?.toLocaleDateString() || "Selected Date"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockBookingRequests
                .filter((request) => request.preferredDate === selectedDate?.toISOString().split("T")[0])
                .map((request) => (
                  <div key={request.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{request.client}</h4>
                        <p className="text-sm text-gray-600">{request.contact}</p>
                      </div>
                      <Badge variant={request.status === "Confirmed" ? "default" : "outline"}>{request.status}</Badge>
                    </div>
                  </div>
                ))}
              {mockBookingRequests.filter(
                (request) => request.preferredDate === selectedDate?.toISOString().split("T")[0],
              ).length === 0 && <p className="text-gray-500 text-center py-4">No bookings for this date</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderMessages = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Client Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMessages.map((msg) => (
              <div key={msg.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{msg.client}</span>
                      <Badge variant={msg.status === "Unread" ? "destructive" : "outline"}>{msg.status}</Badge>
                    </div>
                    <h4 className="text-sm font-medium">{msg.subject}</h4>
                  </div>
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{msg.message}</p>
                <Button size="sm" variant="outline">
                  Reply
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Send Message */}
      <Card>
        <CardHeader>
          <CardTitle>Send Message to Client</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Message</label>
            <Textarea
              placeholder="Type your message to the client..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
          <Button onClick={handleSendMessage} disabled={!message.trim()} className="w-full">
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeView) {
      case "calendar":
        return renderCalendar()
      case "messages":
        return renderMessages()
      default:
        return renderRequests()
    }
  }

  return (
    <DashboardLayout
      userRole="receptionist"
      userName="Receptionist User"
      onLogout={onLogout}
      navigationItems={navigationItems}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
