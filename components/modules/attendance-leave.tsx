"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function AttendanceLeave() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [showLeaveForm, setShowLeaveForm] = useState(false)

  const mockAttendance = [
    { id: 1, date: "2024-11-01", status: "present", leaveType: null },
    { id: 2, date: "2024-11-02", status: "present", leaveType: null },
    { id: 3, date: "2024-11-03", status: "absent", leaveType: null },
    { id: 4, date: "2024-11-04", status: "on_leave", leaveType: "Sick Leave" },
    { id: 5, date: "2024-11-05", status: "present", leaveType: null },
  ]

  const attendanceStats = {
    present: mockAttendance.filter((a) => a.status === "present").length,
    absent: mockAttendance.filter((a) => a.status === "absent").length,
    onLeave: mockAttendance.filter((a) => a.status === "on_leave").length,
  }

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowLeaveForm(false)
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Attendance & Leave</h1>
          <p className="text-gray-500 mt-2">Track your attendance record</p>
        </div>
        <Button onClick={() => setShowLeaveForm(!showLeaveForm)} className="bg-black hover:bg-gray-900 text-white">
          Request Leave
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md">
          <div className="text-sm text-gray-500 mb-2 font-medium">Present</div>
          <div className="text-2xl font-semibold text-gray-900">{attendanceStats.present}</div>
          <div className="text-xs text-gray-500 mt-2">Days present</div>
        </Card>
        <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md">
          <div className="text-sm text-gray-500 mb-2 font-medium">Absent</div>
          <div className="text-2xl font-semibold text-red-600">{attendanceStats.absent}</div>
          <div className="text-xs text-gray-500 mt-2">Days absent</div>
        </Card>
        <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md">
          <div className="text-sm text-gray-500 mb-2 font-medium">On Leave</div>
          <div className="text-2xl font-semibold text-gray-900">{attendanceStats.onLeave}</div>
          <div className="text-xs text-gray-500 mt-2">Leave approved</div>
        </Card>
      </div>

      {/* Leave Request Form */}
      {showLeaveForm && (
        <Card className="p-6 bg-white border border-gray-200 shadow-sm border-t-4 border-t-black">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Leave</h2>
          <form onSubmit={handleLeaveSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Start Date</label>
              <Input type="date" className="border-gray-200 bg-white text-gray-900" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">End Date</label>
              <Input type="date" className="border-gray-200 bg-white text-gray-900" />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700 block mb-2">Leave Type</label>
              <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 bg-white">
                <option>Select leave type</option>
                <option>Sick Leave</option>
                <option>Casual Leave</option>
                <option>Emergency</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700 block mb-2">Reason</label>
              <textarea
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 bg-white"
                rows={3}
              />
            </div>
            <Button type="submit" className="col-span-2 bg-black hover:bg-gray-900 text-white">
              Submit Request
            </Button>
          </form>
        </Card>
      )}

      {/* Attendance Table */}
      <Card className="p-6 bg-white border border-gray-200 shadow-sm overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Record - {selectedMonth}</h2>
        <div className="mb-4">
          <Input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border-gray-200 bg-white text-gray-900 max-w-xs"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Date</th>
                <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                <th className="text-left p-3 font-semibold text-gray-700">Details</th>
              </tr>
            </thead>
            <tbody>
              {mockAttendance && mockAttendance.length > 0 ? (
                mockAttendance.map((record) => (
                  <tr key={record.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">{record.date}</td>
                    <td className="p-3">
                      <Badge
                        className={`text-xs ${
                          record.status === "present"
                            ? "bg-green-100 text-green-800"
                            : record.status === "absent"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {record.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-gray-600 text-xs">{record.leaveType || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    No records for this month
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
