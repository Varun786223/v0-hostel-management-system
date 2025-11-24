"use client"

import useSWR from "swr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchStudents, fetchRooms, fetchComplaints, fetchFees } from "@/lib/data"

interface AdminDashboardProps {
  user: any
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const { data: students, isLoading: studentsLoading } = useSWR("students", fetchStudents, {
    revalidateOnFocus: true,
    revalidateInterval: 3000,
  })

  const { data: rooms, isLoading: roomsLoading } = useSWR("rooms", fetchRooms, {
    revalidateOnFocus: true,
    revalidateInterval: 3000,
  })

  const { data: complaints, isLoading: complaintsLoading } = useSWR("complaints", fetchComplaints, {
    revalidateOnFocus: true,
    revalidateInterval: 3000,
  })

  const { data: fees, isLoading: feesLoading } = useSWR("fees", fetchFees, {
    revalidateOnFocus: true,
    revalidateInterval: 3000,
  })

  if (studentsLoading || roomsLoading || complaintsLoading || feesLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  const occupiedRooms = rooms?.filter((r) => r.status === "OCCUPIED").length || 0
  const totalFees = fees?.reduce((sum, f) => sum + f.amount, 0) || 0
  const paidFees = fees?.filter((f) => f.status === "PAID").reduce((sum, f) => sum + f.amount, 0) || 0
  const resolvedComplaints = complaints?.filter((c) => c.status === "RESOLVED").length || 0
  const inProgressComplaints = complaints?.filter((c) => c.status === "IN_PROGRESS").length || 0

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">System Administration</h1>
        <p className="text-gray-500 mt-2">Complete system overview • Real-time Statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">{(students?.length || 0) + 4}</div>
            <p className="text-xs text-gray-500 mt-1">{students?.length || 0} Students, 4 Staff</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Total Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">{rooms?.length || 0}</div>
            <p className="text-xs text-gray-500 mt-1">{occupiedRooms} Occupied</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Revenue Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">₹{Math.round((paidFees / 100000) * 10) / 10}L</div>
            <p className="text-xs text-gray-500 mt-1">This semester</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-green-600">99%</div>
            <p className="text-xs text-gray-500 mt-1">Uptime</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">System Statistics</CardTitle>
            <CardDescription className="text-gray-500">Overall metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                label: "Total Complaints",
                value: complaints?.length || 0,
              },
              {
                label: "Resolved",
                value: resolvedComplaints,
              },
              {
                label: "In Progress",
                value: inProgressComplaints,
              },
              {
                label: "Total Fees",
                value: `₹${Math.round(totalFees / 1000)}K`,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                <span className="font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
            <CardDescription className="text-gray-500">System updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              `${students?.length || 0} students registered`,
              `${occupiedRooms} rooms occupied`,
              `${complaints?.length || 0} total complaints`,
              `₹${Math.round(paidFees / 1000)}K fees collected`,
              `${resolvedComplaints} complaints resolved`,
            ].map((item, i) => (
              <div
                key={i}
                className="text-sm p-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-700"
              >
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
