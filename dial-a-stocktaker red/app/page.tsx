"use client"

import { useState, useEffect } from "react"
import SplashScreen from "@/components/splash-screen"
import LoginScreen from "@/components/login-screen"
import DashboardRouter from "@/components/dashboard-router"

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"splash" | "login" | "dashboard">("splash")
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    // Show splash screen for 30 seconds
    const timer = setTimeout(() => {
      setCurrentScreen("login")
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (role: string) => {
    setUserRole(role)
    setCurrentScreen("dashboard")
  }

  const handleLogout = () => {
    setUserRole(null)
    setCurrentScreen("login")
  }

  if (currentScreen === "splash") {
    return <SplashScreen onComplete={() => setCurrentScreen("login")} />
  }

  if (currentScreen === "login") {
    return <LoginScreen onLogin={handleLogin} />
  }

  return <DashboardRouter userRole={userRole} onLogout={handleLogout} />
}
