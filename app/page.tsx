"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { Dashboard } from "@/components/dashboard/dashboard"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  const handleLogin = (user: any) => {
    setCurrentUser(user)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {isLoggedIn ? <Dashboard user={currentUser} onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />}
    </div>
  )
}
