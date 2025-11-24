"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginFormProps {
  onLogin: (user: any) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("student1")
  const [password, setPassword] = useState("password")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const demoUsers: Record<string, any> = {
    student1: { id: 1, name: "Rahul Singh", role: "STUDENT", email: "rahul@college.edu" },
    student2: { id: 2, name: "Priya Sharma", role: "STUDENT", email: "priya@college.edu" },
    warden1: { id: 101, name: "Mr. Kumar", role: "WARDEN", email: "kumar@hostel.edu" },
    admin1: { id: 201, name: "Admin User", role: "ADMIN", email: "admin@hostel.edu" },
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    await new Promise((resolve) => setTimeout(resolve, 800))

    const user = demoUsers[username as keyof typeof demoUsers]
    if (user && password === "password") {
      onLogin(user)
    } else {
      setError("Invalid credentials. Try: student1, warden1, or admin1")
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">HM</span>
          </div>
          <h1 className="text-2xl font-semibold mb-2">Hostel Management</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Username</label>
            <Input
              placeholder="student1, warden1, admin1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-10 bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 bg-input border-border"
            />
          </div>

          {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}

          <Button type="submit" className="w-full h-10 font-medium" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        {/* Demo Hint */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground text-center font-medium">Demo Credentials</p>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Student: student1, Warden: warden1, Admin: admin1
            <br />
            Password: password
          </p>
        </div>
      </div>
    </div>
  )
}
