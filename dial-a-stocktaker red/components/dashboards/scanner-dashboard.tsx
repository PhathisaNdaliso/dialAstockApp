"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Scan, Upload, CheckCircle, Clock, Package, BarChart3 } from "lucide-react"

interface ScannerDashboardProps {
  onLogout: () => void
}

export default function ScannerDashboard({ onLogout }: ScannerDashboardProps) {
  const [activeView, setActiveView] = useState("scan")
  const { toast } = useToast()

  const navigationItems = [
    {
      icon: <Scan className="w-4 h-4" />,
      label: "Scan Items",
      onClick: () => setActiveView("scan"),
      active: activeView === "scan",
    },
    {
      icon: <Upload className="w-4 h-4" />,
      label: "Upload Data",
      onClick: () => setActiveView("upload"),
      active: activeView === "upload",
    },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      label: "Task Status",
      onClick: () => setActiveView("status"),
      active: activeView === "status",
    },
  ]

  const mockScanStats = {
    itemsScanned: 1247,
    uploadsToday: 5,
    pendingUploads: 2,
    accuracy: 98.5,
  }

  const mockTasks = [
    { id: "TSK-001", location: "Woolworths Electronics", scanned: 245, total: 300, status: "In Progress" },
    { id: "TSK-002", location: "Pick n Pay Grocery", scanned: 180, total: 180, status: "Completed" },
    { id: "TSK-003", location: "Checkers Clothing", scanned: 0, total: 150, status: "Pending" },
  ]

  const handleUpload = (taskId: string) => {
    toast({
      title: "Data Uploaded",
      description: `Scan data for ${taskId} has been uploaded successfully.`,
    })
  }

  const renderScan = () => (
    <div className="space-y-6">
      {/* Scan Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Scanned</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockScanStats.itemsScanned}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uploads</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockScanStats.uploadsToday}</div>
            <p className="text-xs text-muted-foreground">Completed today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockScanStats.pendingUploads}</div>
            <p className="text-xs text-muted-foreground">Awaiting upload</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockScanStats.accuracy}%</div>
            <p className="text-xs text-muted-foreground">Scan accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Scanning */}
      <Card>
        <CardHeader>
          <CardTitle>Active Scanning Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTasks.map((task) => (
              <div key={task.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium">{task.id}</h3>
                    <p className="text-sm text-gray-600">{task.location}</p>
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
                    <span>
                      {task.scanned}/{task.total} items
                    </span>
                  </div>
                  <Progress value={(task.scanned / task.total) * 100} />
                </div>
                {task.status === "In Progress" && (
                  <Button size="sm" className="mt-3 bg-purple-600 hover:bg-purple-700">
                    <Scan className="w-4 h-4 mr-2" />
                    Continue Scanning
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderUpload = () => (
    <Card>
      <CardHeader>
        <CardTitle>Upload Scan Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTasks
            .filter((task) => task.status === "Completed" || task.scanned > 0)
            .map((task) => (
              <div key={task.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{task.id}</h3>
                    <p className="text-sm text-gray-600">{task.location}</p>
                    <p className="text-sm text-gray-500">{task.scanned} items scanned</p>
                  </div>
                  <Button onClick={() => handleUpload(task.id)} className="bg-green-600 hover:bg-green-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderStatus = () => (
    <Card>
      <CardHeader>
        <CardTitle>Task Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTasks.map((task) => (
            <div key={task.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium">{task.id}</h3>
                  <p className="text-sm text-gray-600">{task.location}</p>
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
                  <span>Scanning Progress</span>
                  <span>
                    {task.scanned}/{task.total} items ({Math.round((task.scanned / task.total) * 100)}%)
                  </span>
                </div>
                <Progress value={(task.scanned / task.total) * 100} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (activeView) {
      case "upload":
        return renderUpload()
      case "status":
        return renderStatus()
      default:
        return renderScan()
    }
  }

  return (
    <DashboardLayout userRole="scanner" userName="Scanner User" onLogout={onLogout} navigationItems={navigationItems}>
      {renderContent()}
    </DashboardLayout>
  )
}
