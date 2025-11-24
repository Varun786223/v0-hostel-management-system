"use client"

import { useState } from "react"
import { Navigation } from "./navigation"
import { StudentDashboard } from "../modules/student-dashboard"
import { WardenDashboard } from "../modules/warden-dashboard"
import { AdminDashboard } from "../modules/admin-dashboard"
import { RoomAllocation } from "../modules/room-allocation"
import { FeeManagement } from "../modules/fee-management"
import { ComplaintSystem } from "../modules/complaint-system"
import { NoticeAnnouncement } from "../modules/notice-announcement"
import AttendanceLeave from "../modules/attendance-leave"
import VisitorManagement from "../modules/visitor-management"
import NotificationsPanel from "../modules/notifications"
import Reports from "../modules/reports"
import Automations from "../modules/automations"

interface DashboardProps {
  user: any
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState("dashboard")

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        if (user.role === "STUDENT") return <StudentDashboard user={user} />
        if (user.role === "WARDEN") return <WardenDashboard user={user} />
        if (user.role === "ADMIN") return <AdminDashboard user={user} />
        return null

      case "allocations":
        return <RoomAllocation />
      case "fees":
        return <FeeManagement />
      case "complaints":
        return <ComplaintSystem />
      case "notices":
        return <NoticeAnnouncement />
      case "attendance":
        return <AttendanceLeave />
      case "visitors":
        return <VisitorManagement />
      case "notifications":
        return <NotificationsPanel />
      case "automations":
        return <Automations />
      case "reports":
        return <Reports />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Navigation user={user} currentView={currentView} onViewChange={setCurrentView} onLogout={onLogout} />
      <div className="flex-1 overflow-auto">{renderView()}</div>
    </div>
  )
}
