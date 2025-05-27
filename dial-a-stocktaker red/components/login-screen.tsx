"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, BarChart3, Eye, EyeOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface LoginScreenProps {
  onLogin: (role: string) => void
}

const demoCredentials = {
  admin: { code: "ADM-00000001", password: "admin123" },
  manager: { code: "MGR-00000022", password: "manager123" },
  stocktaker: { code: "STK-123456790", password: "stock123" },
  scanner: { code: "SCN-098765432", password: "scan123" },
  coordinator: { code: "CRD-001122334", password: "coord123" },
  groupleader: { code: "STK-345678901", password: "lead123" },
  receptionist: { code: "RCP-555666777", password: "receive123" },
  client: { code: "CLT-000000001", password: "client123" },
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [loginCode, setLoginCode] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  const handleLogin = () => {
    if (selectedRole && loginCode && password) {
      onLogin(selectedRole)
    }
  }

  const fillDemoCredentials = (role: string) => {
    setSelectedRole(role)
    setLoginCode(demoCredentials[role as keyof typeof demoCredentials].code)
    setPassword(demoCredentials[role as keyof typeof demoCredentials].password)
  }

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <p className="text-gray-600 mt-2">Login to your account</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Your Role</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="coordinator">Coordinator</SelectItem>
                <SelectItem value="stocktaker">Stocktaker</SelectItem>
                <SelectItem value="scanner">Scanner</SelectItem>
                <SelectItem value="groupleader">Group Leader</SelectItem>
                <SelectItem value="receptionist">Receptionist</SelectItem>
                <SelectItem value="client">Client</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Login Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {selectedRole
                ? `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Login Code`
                : "Login Code"}
            </label>
            <Input
              type="text"
              placeholder="Enter your login code"
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            className="w-full bg-red-500 hover:bg-red-600"
            disabled={!selectedRole || !loginCode || !password}
          >
            Login
          </Button>

          {/* Demo Credentials */}
          <Collapsible open={showDemo} onOpenChange={setShowDemo}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full">
                Demo Credentials
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-4">
              <p className="text-sm text-gray-600 mb-3">Click on a role to auto-fill credentials:</p>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(demoCredentials).map(([role, creds]) => (
                  <Button
                    key={role}
                    variant="outline"
                    className="justify-between h-auto p-3"
                    onClick={() => fillDemoCredentials(role)}
                  >
                    <div className="flex items-center gap-2">
                      <Badge className={`${getRoleBadgeColor(role)} text-white`}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{creds.code}</span>
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-red-500 hover:underline">
                Register
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
