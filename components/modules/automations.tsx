"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Automations() {
  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: "Fee Reminder",
      type: "fee_reminder",
      frequency: "daily",
      time: "09:00",
      enabled: true,
      action: "Send email reminder for pending fees",
    },
    {
      id: 2,
      name: "Complaint Follow-up",
      type: "complaint_followup",
      frequency: "weekly",
      time: "10:00",
      enabled: true,
      action: "Send complaint status updates",
    },
    {
      id: 3,
      name: "Monthly Report",
      type: "report_generation",
      frequency: "monthly",
      time: "23:59",
      enabled: true,
      action: "Generate and email monthly reports",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "fee_reminder",
    frequency: "daily",
    time: "09:00",
    action: "",
  })

  const handleAddAutomation = async (e: any) => {
    e.preventDefault()

    const automation = {
      id: Math.random(),
      ...formData,
      enabled: true,
      createdAt: new Date(),
    }

    await fetch("/api/automations/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(automation),
    })

    setAutomations([...automations, automation])
    setFormData({ name: "", type: "fee_reminder", frequency: "daily", time: "09:00", action: "" })
    setShowForm(false)
  }

  const handleToggleAutomation = async (id: number) => {
    const updated = automations.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    setAutomations(updated)
  }

  const handleDeleteAutomation = (id: number) => {
    setAutomations(automations.filter((a) => a.id !== id))
  }

  const frequencyBadgeVariant = (freq: string) => {
    const variants: any = {
      daily: "default",
      weekly: "secondary",
      monthly: "outline",
    }
    return variants[freq] || "secondary"
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light">Automations & Scheduling</h1>
          <p className="text-sm text-muted-foreground mt-2">Set up automatic tasks and reminders</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="text-sm">
          Create Automation
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 space-y-4 border-t-4 border-t-primary">
          <h2 className="text-lg font-light">Create New Automation</h2>
          <form onSubmit={handleAddAutomation} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-medium block mb-2">Automation Name</label>
              <input
                type="text"
                placeholder="e.g., Fee Reminder"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-border rounded px-3 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full border border-border rounded px-3 py-2 text-sm"
              >
                <option value="fee_reminder">Fee Reminder</option>
                <option value="complaint_followup">Complaint Follow-up</option>
                <option value="announcement">Auto Announcement</option>
                <option value="report_generation">Report Generation</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Frequency</label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full border border-border rounded px-3 py-2 text-sm"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full border border-border rounded px-3 py-2 text-sm"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium block mb-2">Description</label>
              <textarea
                placeholder="What should this automation do?"
                value={formData.action}
                onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                className="w-full border border-border rounded px-3 py-2 text-sm"
                rows={2}
                required
              />
            </div>

            <Button type="submit" className="col-span-2">
              Create Automation
            </Button>
          </form>
        </Card>
      )}

      {/* Automations List */}
      <div className="space-y-3">
        {automations.map((automation) => (
          <Card key={automation.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-sm">{automation.name}</h3>
                  <Badge variant={frequencyBadgeVariant(automation.frequency)} className="text-xs">
                    {automation.frequency}
                  </Badge>
                  {automation.enabled && (
                    <Badge variant="default" className="text-xs">
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{automation.action}</p>
                <p className="text-xs text-muted-foreground">Scheduled for {automation.time} · Next run: Today</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={automation.enabled ? "default" : "outline"}
                  onClick={() => handleToggleAutomation(automation.id)}
                  className="text-xs"
                >
                  {automation.enabled ? "Disable" : "Enable"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteAutomation(automation.id)}
                  className="text-xs text-destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Automation Templates */}
      <Card className="p-6">
        <h2 className="text-lg font-light mb-4">Popular Automation Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded cursor-pointer hover:bg-muted/30 transition-colors">
            <h3 className="font-medium text-sm mb-2">Daily Fee Reminder</h3>
            <p className="text-xs text-muted-foreground mb-3">Send daily reminder for pending fees at 9 AM</p>
            <Button size="sm" variant="outline" className="text-xs w-full bg-transparent">
              Use Template
            </Button>
          </div>

          <div className="p-4 border border-border rounded cursor-pointer hover:bg-muted/30 transition-colors">
            <h3 className="font-medium text-sm mb-2">Weekly Complaint Update</h3>
            <p className="text-xs text-muted-foreground mb-3">Weekly digest of complaint statuses every Monday</p>
            <Button size="sm" variant="outline" className="text-xs w-full bg-transparent">
              Use Template
            </Button>
          </div>

          <div className="p-4 border border-border rounded cursor-pointer hover:bg-muted/30 transition-colors">
            <h3 className="font-medium text-sm mb-2">Monthly Report</h3>
            <p className="text-xs text-muted-foreground mb-3">Generate and send monthly reports on 1st of each month</p>
            <Button size="sm" variant="outline" className="text-xs w-full bg-transparent">
              Use Template
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
