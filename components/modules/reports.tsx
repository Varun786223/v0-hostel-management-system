"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Reports() {
  const [reportType, setReportType] = useState("fees")
  const [format, setFormat] = useState("csv")
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState({ start: "2025-01-01", end: "2025-01-31" })

  const handleExportReport = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/reports/export?format=${format}&reportType=${reportType}&startDate=${dateRange.start}&endDate=${dateRange.end}`,
      )

      if (!response.ok) throw new Error("Export failed")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${reportType}_report_${new Date().toISOString().split("T")[0]}.${format === "excel" ? "xlsx" : format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Export failed:", error)
      alert("Failed to export report. Please try again.")
    }
    setLoading(false)
  }

  const reportMetadata = {
    fees: {
      title: "Fee Collection Report",
      description: "Monthly fee collection statistics and payment tracking",
      fields: ["Student ID", "Student Name", "Fee Type", "Amount", "Due Date", "Payment Date", "Status"],
    },
    complaints: {
      title: "Complaint Report",
      description: "Track and analyze complaint resolution metrics",
      fields: ["Complaint ID", "Category", "Priority", "Status", "Date Raised", "Resolution Date", "Days to Resolve"],
    },
    occupancy: {
      title: "Room Occupancy Report",
      description: "Room-wise occupancy and allocation details",
      fields: ["Room Number", "Capacity", "Occupied", "Occupancy Rate", "Current Occupants", "Last Updated"],
    },
    students: {
      title: "Student Demographics",
      description: "Student profile and statistics overview",
      fields: ["Student ID", "Name", "Department", "Semester", "Status", "Room Number", "Check-in Date"],
    },
    attendance: {
      title: "Attendance Report",
      description: "Student attendance tracking and analytics",
      fields: ["Student ID", "Name", "Month", "Present Days", "Absent Days", "Leave Days", "Attendance %"],
    },
    maintenance: {
      title: "Maintenance Report",
      description: "Maintenance tasks and cost analysis",
      fields: ["Task ID", "Room Number", "Issue Type", "Priority", "Status", "Cost", "Completion Date"],
    },
  }

  const currentReport = reportMetadata[reportType as keyof typeof reportMetadata]

  const sampleData = {
    fees: [
      { id: 1, student: "John Doe", type: "Room Charge", amount: 5000, status: "Paid", date: "2025-01-05" },
      { id: 2, student: "Jane Smith", type: "Maintenance", amount: 500, status: "Pending", date: "2025-01-10" },
      { id: 3, student: "Mike Johnson", type: "Utility", amount: 300, status: "Paid", date: "2025-01-08" },
    ],
    complaints: [
      { id: 1, category: "Maintenance", priority: "High", status: "Resolved", days: 2 },
      { id: 2, category: "Cleanliness", priority: "Medium", status: "In Progress", days: 3 },
      { id: 3, category: "Water", priority: "High", status: "Resolved", days: 1 },
    ],
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-light">Reports & Analytics</h1>
        <p className="text-sm text-muted-foreground mt-2">Generate and export reports in multiple formats</p>
      </div>

      <Card className="p-6 space-y-6">
        <h2 className="text-lg font-light">Generate Report</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full border border-border rounded px-3 py-2 text-sm"
            >
              <option value="fees">Fee Collection Report</option>
              <option value="complaints">Complaint Report</option>
              <option value="occupancy">Room Occupancy Report</option>
              <option value="students">Student Demographics</option>
              <option value="attendance">Attendance Report</option>
              <option value="maintenance">Maintenance Report</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Export Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full border border-border rounded px-3 py-2 text-sm"
            >
              <option value="csv">CSV</option>
              <option value="excel">Excel (XLSX)</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full border border-border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full border border-border rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        <Button onClick={handleExportReport} disabled={loading} className="w-full">
          {loading ? "Generating Report..." : `Export as ${format.toUpperCase()}`}
        </Button>
      </Card>

      {/* Report Information */}
      <Card className="p-6">
        <h2 className="text-lg font-light mb-4">{currentReport.title}</h2>
        <p className="text-sm text-muted-foreground mb-4">{currentReport.description}</p>
        <div>
          <label className="text-sm font-medium block mb-2">Report Fields:</label>
          <div className="flex flex-wrap gap-2">
            {currentReport.fields.map((field, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {field}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Sample Data Preview */}
      <Card className="p-6 overflow-hidden">
        <h2 className="text-lg font-light mb-4">Report Preview</h2>
        <div className="overflow-x-auto">
          {reportType === "fees" && (
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/30">
                <tr>
                  <th className="text-left p-3 font-normal">Student</th>
                  <th className="text-left p-3 font-normal">Type</th>
                  <th className="text-left p-3 font-normal">Amount</th>
                  <th className="text-left p-3 font-normal">Status</th>
                  <th className="text-left p-3 font-normal">Date</th>
                </tr>
              </thead>
              <tbody>
                {(sampleData.fees || []).map((row: any) => (
                  <tr key={row.id} className="border-b last:border-b-0">
                    <td className="p-3 font-light">{row.student}</td>
                    <td className="p-3 text-muted-foreground text-xs">{row.type}</td>
                    <td className="p-3 font-light">₹{row.amount}</td>
                    <td className="p-3">
                      <Badge variant={row.status === "Paid" ? "default" : "secondary"} className="text-xs">
                        {row.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-muted-foreground text-xs">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === "complaints" && (
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/30">
                <tr>
                  <th className="text-left p-3 font-normal">Category</th>
                  <th className="text-left p-3 font-normal">Priority</th>
                  <th className="text-left p-3 font-normal">Status</th>
                  <th className="text-left p-3 font-normal">Days to Resolve</th>
                </tr>
              </thead>
              <tbody>
                {(sampleData.complaints || []).map((row: any) => (
                  <tr key={row.id} className="border-b last:border-b-0">
                    <td className="p-3 font-light">{row.category}</td>
                    <td className="p-3">
                      <Badge variant={row.priority === "High" ? "destructive" : "secondary"} className="text-xs">
                        {row.priority}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant={row.status === "Resolved" ? "default" : "secondary"} className="text-xs">
                        {row.status}
                      </Badge>
                    </td>
                    <td className="p-3 font-light">{row.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-medium text-sm mb-3">Fee Collection</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total:</span>
              <span>₹50,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Collected:</span>
              <span>₹45,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Collection Rate:</span>
              <span>90%</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-medium text-sm mb-3">Complaint Analysis</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total:</span>
              <span>47</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Resolved:</span>
              <span>45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg Resolution:</span>
              <span>2.1 days</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-medium text-sm mb-3">Occupancy Rate</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Rooms:</span>
              <span>50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Occupied:</span>
              <span>48</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rate:</span>
              <span>96%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
