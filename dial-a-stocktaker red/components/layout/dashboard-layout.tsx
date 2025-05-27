"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, LogOut, BarChart3, Bell, Settings, User } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: string
  userName: string
  onLogout: () => void
  navigationItems: Array<{
    icon: React.ReactNode
    label: string
    onClick: () => void
    active?: boolean
  }>
}

export default function DashboardLayout({
  children,
  userRole,
  userName,
  onLogout,
  navigationItems,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      admin: "bg-red-500",
      manager: "bg-blue-500",
      stocktaker: "bg-green-500",
      scanner: "bg-purple-500",
      coordinator: "bg-orange-500",
      groupleader: "bg-indigo-500",
      receptionist: "bg-pink-500",
      client: "bg-gray-500",
    }
    return colors[role as keyof typeof colors] || "bg-gray-500"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">Dial-a-Stocktaker</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Dial-a-Stocktaker</h1>
                  <p className="text-xs text-gray-500">Workforce Solution</p>
                </div>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{userName}</p>
                  <Badge className={`${getRoleBadgeColor(userRole)} text-white text-xs`}>
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navigationItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    item.active ? "bg-red-500 hover:bg-red-600 text-white" : ""
                  }`}
                  onClick={item.onClick}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Bell className="w-4 h-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 text-red-600 border-red-200 hover:bg-red-50"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
