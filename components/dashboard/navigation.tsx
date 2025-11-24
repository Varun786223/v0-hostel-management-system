"use client"

import { Button } from "@/components/ui/button"
import {
  LogOut,
  Menu,
  X,
  Home,
  DoorOpen,
  CreditCard,
  AlertCircle,
  Bell,
  Clock,
  Users,
  FileText,
  Settings,
} from "lucide-react"
import { useState } from "react"

interface NavigationProps {
  user: any
  currentView: string
  onViewChange: (view: string) => void
  onLogout: () => void
}

export function Navigation({ user, currentView, onViewChange, onLogout }: NavigationProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const getMenuItems = () => {
    const baseItems = [
      { id: "dashboard", label: "Dashboard", icon: Home },
      { id: "allocations", label: "Rooms", icon: DoorOpen },
      { id: "fees", label: "Fees", icon: CreditCard },
      { id: "complaints", label: "Complaints", icon: AlertCircle },
      { id: "notices", label: "Notices", icon: Bell },
      { id: "attendance", label: "Attendance", icon: Clock },
      { id: "visitors", label: "Visitors", icon: Users },
      { id: "notifications", label: "Alerts", icon: Bell },
      { id: "automations", label: "Automations", icon: Settings },
      { id: "reports", label: "Reports", icon: FileText },
    ]

    if (user.role === "STUDENT") {
      return baseItems.filter((item) => !["allocations"].includes(item.id))
    }
    return baseItems
  }

  const menuItems = getMenuItems()

  return (
    <div
      className={`${isSidebarOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen sticky top-0`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        {isSidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">HM</span>
            </div>
            <span className="font-semibold text-sm text-black">HMS</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="h-8 w-8 text-gray-600 hover:bg-gray-100"
        >
          {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const IconComponent = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm flex items-center gap-3 ${
                currentView === item.id ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <IconComponent className="w-4 h-4 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* User Footer */}
      <div className="border-t border-gray-100 p-3 space-y-2">
        {isSidebarOpen && (
          <div className="px-3 py-2 text-sm">
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        )}
        <Button
          variant="outline"
          className="w-full text-sm bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" />
          {isSidebarOpen && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  )
}
