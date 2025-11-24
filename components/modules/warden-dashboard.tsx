"use client"

import useSWR from "swr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchStudents, fetchRooms, fetchComplaints, fetchFees } from "@/lib/data"

interface WardenDashboardProps {
  user: any
}

export function WardenDashboard({ user }: WardenDashboardProps) {
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
  const openComplaints = complaints?.filter((c) => c.status === "OPEN").length || 0
  const pendingFees = fees?.filter((f) => f.status === "PENDING").reduce((sum, f) => sum + f.amount, 0) || 0

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Welcome, {user.name}</h1>
        <p className="text-gray-500 mt-2">Warden Dashboard • Real-time Monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">{students?.length || 0}</div>
            <p className="text-xs text-gray-500 mt-1">Active residents</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Occupied Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">
              {occupiedRooms}/{rooms?.length || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {rooms && rooms.length > 0 ? `${Math.round((occupiedRooms / rooms.length) * 100)}% occupancy` : "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Open Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-red-600">{openComplaints}</div>
            <p className="text-xs text-gray-500 mt-1">Pending resolution</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Pending Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">₹{Math.round(pendingFees / 1000)}K</div>
            <p className="text-xs text-gray-500 mt-1">From multiple students</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Complaints</CardTitle>
            <CardDescription className="text-gray-500">Need attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {complaints && complaints.length > 0 ? (
              complaints
                .filter((c) => c.status === "OPEN" || c.status === "IN_PROGRESS")
                .slice(0, 3)
                .map((complaint) => (
                  <div
                    key={complaint.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Room {complaint.roomNumber}</p>
                      <p className="text-xs text-gray-500">{complaint.description}</p>
                    </div>
                    <Button size="sm" className="bg-black hover:bg-gray-900 text-white text-xs">
                      Assign
                    </Button>
                  </div>
                ))
            ) : (
              <p className="text-sm text-gray-500">No open complaints</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
            <CardDescription className="text-gray-500">Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start bg-black hover:bg-gray-900 text-white">Send Announcement</Button>
            <Button className="w-full justify-start bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200">
              Add Student
            </Button>
            <Button className="w-full justify-start bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200">
              Allocate Room
            </Button>
            <Button className="w-full justify-start bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200">
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
