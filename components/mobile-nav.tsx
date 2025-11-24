"use client"

import { useState } from "react"

interface MobileNavProps {
  currentView: string
  onViewChange: (view: string) => void
}

export function MobileNav({ currentView, onViewChange }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "fees", label: "Fees" },
    { id: "complaints", label: "Complaints" },
    { id: "attendance", label: "Attendance" },
    { id: "visitors", label: "Visitors" },
  ]

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card z-40">
      <div className="flex justify-between items-center">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex-1 py-3 text-xs font-medium transition-colors ${
              currentView === item.id ? "text-primary border-t-2 border-t-primary" : "text-muted-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
