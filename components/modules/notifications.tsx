"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "fee",
      title: "Fee Payment Reminder",
      message: "Your room fee is due on Dec 31",
      time: "2 hours ago",
      read: false,
      channel: "in-app",
    },
    {
      id: 2,
      type: "complaint",
      title: "Complaint Resolved",
      message: "Your water supply complaint has been resolved",
      time: "5 hours ago",
      read: false,
      channel: "in-app",
    },
    {
      id: 3,
      type: "announcement",
      title: "Maintenance Notice",
      message: "Electricity maintenance scheduled for tomorrow 2-4 PM",
      time: "1 day ago",
      read: true,
      channel: "in-app",
    },
  ])

  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState({
    emailFees: true,
    emailComplaints: true,
    emailAnnouncements: true,
    smsFees: false,
    smsComplaints: true,
    smsEmergency: true,
  })

  const handleSendNotification = async (type: string) => {
    const data = {
      fee: { email: "student@example.com", subject: "Fee Payment Due", message: "Your fee is due", type: "fee" },
      complaint: { phone: "+919876543210", message: "Your complaint status has been updated", type: "complaint" },
      announcement: {
        email: "student@example.com",
        subject: "Important Announcement",
        message: "New announcement from hostel",
        type: "announcement",
      },
    }[type as keyof typeof data]

    if (type === "fee" || type === "announcement") {
      await fetch("/api/notifications/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } else {
      await fetch("/api/notifications/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    }
  }

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleSaveSettings = () => {
    console.log("Settings saved:", settings)
    setShowSettings(false)
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light">Notifications & Alerts</h1>
          <p className="text-sm text-muted-foreground mt-2">Manage your notification preferences</p>
        </div>
        <Button onClick={() => setShowSettings(!showSettings)} variant="outline" className="text-sm">
          Settings
        </Button>
      </div>

      {showSettings && (
        <Card className="p-6 space-y-6 border-t-4 border-t-primary">
          <h2 className="text-lg font-light">Notification Preferences</h2>

          <div>
            <h3 className="font-medium text-sm mb-4">Email Notifications</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.emailFees}
                  onChange={(e) => setSettings({ ...settings, emailFees: e.target.checked })}
                  className="rounded border-border"
                />
                <span className="text-sm">Fee payment reminders</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.emailComplaints}
                  onChange={(e) => setSettings({ ...settings, emailComplaints: e.target.checked })}
                  className="rounded border-border"
                />
                <span className="text-sm">Complaint status updates</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.emailAnnouncements}
                  onChange={(e) => setSettings({ ...settings, emailAnnouncements: e.target.checked })}
                  className="rounded border-border"
                />
                <span className="text-sm">General announcements</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">SMS Notifications</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.smsFees}
                  onChange={(e) => setSettings({ ...settings, smsFees: e.target.checked })}
                  className="rounded border-border"
                />
                <span className="text-sm">Overdue fee alerts</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.smsComplaints}
                  onChange={(e) => setSettings({ ...settings, smsComplaints: e.target.checked })}
                  className="rounded border-border"
                />
                <span className="text-sm">Complaint resolved updates</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.smsEmergency}
                  onChange={(e) => setSettings({ ...settings, smsEmergency: e.target.checked })}
                  className="rounded border-border"
                />
                <span className="text-sm">Emergency alerts</span>
              </label>
            </div>
          </div>

          <Button onClick={handleSaveSettings} className="w-full">
            Save Preferences
          </Button>
        </Card>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-light mb-4">Send Test Notifications</h2>
        <div className="grid grid-cols-3 gap-4">
          <Button onClick={() => handleSendNotification("fee")} variant="outline" className="text-sm">
            Email Alert
          </Button>
          <Button onClick={() => handleSendNotification("complaint")} variant="outline" className="text-sm">
            SMS Alert
          </Button>
          <Button onClick={() => handleSendNotification("announcement")} variant="outline" className="text-sm">
            Announcement Email
          </Button>
        </div>
      </div>

      {/* Notification Feed */}
      <div>
        <h2 className="text-lg font-light mb-4">Notification History</h2>
        <div className="space-y-3">
          {notifications.map((notif) => (
            <Card
              key={notif.id}
              className={`p-4 cursor-pointer transition-colors ${notif.read ? "opacity-60 bg-muted/20" : "bg-card"}`}
              onClick={() => handleMarkAsRead(notif.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{notif.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {notif.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {notif.channel}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                </div>
                <div>{!notif.read && <div className="w-2 h-2 rounded-full bg-primary"></div>}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
