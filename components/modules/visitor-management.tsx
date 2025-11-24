"use client"

import { useState } from "react"
import useSWR from "swr"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function VisitorManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const { data: visitors, mutate } = useSWR(`/api/visitors?date=${selectedDate}`, fetcher)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    visitorName: "",
    visitorPhone: "",
    purpose: "",
    checkInTime: "",
    checkOutTime: "",
  })

  const handleRegisterVisitor = async (e: any) => {
    e.preventDefault()
    await fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, studentId: 1 }),
    })
    mutate()
    setFormData({ visitorName: "", visitorPhone: "", purpose: "", checkInTime: "", checkOutTime: "" })
    setShowForm(false)
  }

  const handleCheckout = async (visitorId: number) => {
    mutate()
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light">Visitor Management</h1>
          <p className="text-sm text-muted-foreground mt-2">Register and manage guest visits</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="text-sm">
          Register Visitor
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 space-y-4 border-t-4 border-t-primary">
          <h2 className="text-lg font-light">Register New Visitor</h2>
          <form onSubmit={handleRegisterVisitor} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Visitor Name"
              value={formData.visitorName}
              onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
              className="border border-border rounded px-3 py-2 text-sm"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.visitorPhone}
              onChange={(e) => setFormData({ ...formData, visitorPhone: e.target.value })}
              className="border border-border rounded px-3 py-2 text-sm"
              required
            />
            <select
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="border border-border rounded px-3 py-2 text-sm"
              required
            >
              <option value="">Select purpose</option>
              <option value="meeting">Meeting</option>
              <option value="delivery">Delivery</option>
              <option value="personal">Personal</option>
            </select>
            <input
              type="time"
              value={formData.checkInTime}
              onChange={(e) => setFormData({ ...formData, checkInTime: e.target.value })}
              className="border border-border rounded px-3 py-2 text-sm"
              required
            />
            <Button type="submit" className="col-span-2">
              Register Visitor
            </Button>
          </form>
        </Card>
      )}

      {/* Date Filter */}
      <div className="flex gap-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-border rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Visitor Log Table */}
      <Card className="p-6 overflow-hidden">
        <h2 className="text-lg font-light mb-4">Visitor Log - {selectedDate}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/30">
              <tr>
                <th className="text-left p-3 font-normal">Visitor Name</th>
                <th className="text-left p-3 font-normal">Purpose</th>
                <th className="text-left p-3 font-normal">Check-in</th>
                <th className="text-left p-3 font-normal">Check-out</th>
                <th className="text-left p-3 font-normal">Status</th>
                <th className="text-left p-3 font-normal">Action</th>
              </tr>
            </thead>
            <tbody>
              {visitors && visitors.length > 0 ? (
                visitors.map((visitor: any) => (
                  <tr key={visitor.id} className="border-b last:border-b-0">
                    <td className="p-3 font-light">{visitor.visitorName}</td>
                    <td className="p-3 text-muted-foreground text-xs capitalize">{visitor.purpose}</td>
                    <td className="p-3 font-light">{visitor.checkInTime}</td>
                    <td className="p-3 font-light">{visitor.checkOutTime || "-"}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-xs">
                        {visitor.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Button size="sm" variant="ghost" onClick={() => handleCheckout(visitor.id)} className="text-xs">
                        Checkout
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-muted-foreground">
                    No visitors registered
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
