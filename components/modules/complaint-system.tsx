"use client"

import useSWR from "swr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchComplaints } from "@/lib/data"

export function ComplaintSystem() {
  const { data: complaints, isLoading } = useSWR("complaints", fetchComplaints, {
    revalidateOnFocus: true,
    revalidateInterval: 3000,
  })

  const stats = complaints
    ? {
        open: complaints.filter((c) => c.status === "OPEN").length,
        inProgress: complaints.filter((c) => c.status === "IN_PROGRESS").length,
        resolved: complaints.filter((c) => c.status === "RESOLVED").length,
        total: complaints.length,
      }
    : { open: 0, inProgress: 0, resolved: 0, total: 0 }

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Complaint Management</h1>
        <p className="text-gray-500 mt-2">Track and resolve maintenance complaints</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Open</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">{stats.open}</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting action</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">{stats.inProgress}</div>
            <p className="text-xs text-gray-500 mt-1">Being resolved</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-green-600">{stats.resolved}</div>
            <p className="text-xs text-gray-500 mt-1">Completed</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">{stats.total}</div>
            <p className="text-xs text-gray-500 mt-1">All complaints</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">All Complaints</CardTitle>
          <CardDescription className="text-gray-500">
            Maintenance and facility complaints ({complaints?.length || 0})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {complaints && complaints.length > 0 ? (
              complaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{complaint.studentName}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Room {complaint.roomNumber} • {complaint.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Badge
                      className={`text-xs ${
                        complaint.priority === "URGENT"
                          ? "bg-red-100 text-red-800"
                          : complaint.priority === "HIGH"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {complaint.priority}
                    </Badge>
                    <Badge
                      className={`text-xs ${
                        complaint.status === "OPEN"
                          ? "bg-yellow-100 text-yellow-800"
                          : complaint.status === "IN_PROGRESS"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {complaint.status}
                    </Badge>
                    {complaint.status !== "RESOLVED" && (
                      <Button size="sm" className="bg-black hover:bg-gray-900 text-white text-xs">
                        Update
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No complaints</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
