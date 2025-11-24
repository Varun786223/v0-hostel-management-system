"use client"

import useSWR from "swr"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchStudents, fetchFees, fetchComplaints, fetchAnnouncements } from "@/lib/data"

interface StudentDashboardProps {
  user: any
}

export function StudentDashboard({ user }: StudentDashboardProps) {
  const { data: students, isLoading: studentsLoading } = useSWR("students", fetchStudents, {
    revalidateOnFocus: true,
    revalidateInterval: 5000,
  })

  const { data: fees, isLoading: feesLoading } = useSWR("fees", fetchFees, {
    revalidateOnFocus: true,
    revalidateInterval: 5000,
  })

  const { data: complaints, isLoading: complaintsLoading } = useSWR("complaints", fetchComplaints, {
    revalidateOnFocus: true,
    revalidateInterval: 5000,
  })

  const { data: announcements, isLoading: announcementsLoading } = useSWR("announcements", fetchAnnouncements, {
    revalidateOnFocus: true,
    revalidateInterval: 5000,
  })

  const currentStudent = students?.find((s) => s.userId === user.id)
  const studentFees = fees?.filter((f) => f.studentId === currentStudent?.id) || []
  const studentComplaints = complaints?.filter((c) => c.studentId === currentStudent?.id) || []

  const pendingFees = studentFees.filter((f) => f.status === "PENDING").reduce((sum, f) => sum + f.amount, 0)
  const overdueFees = studentFees.filter((f) => f.status === "OVERDUE").reduce((sum, f) => sum + f.amount, 0)
  const activeComplaints = studentComplaints.filter((c) => c.status === "OPEN" || c.status === "IN_PROGRESS").length

  if (studentsLoading || feesLoading || complaintsLoading || announcementsLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Welcome, {user.name}</h1>
        <p className="text-sm text-gray-500 mt-2">Your hostel dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500 mb-2 font-medium">Room Assignment</div>
          <div className="text-2xl font-semibold text-gray-900">
            {currentStudent?.roomId ? `Room ${currentStudent.roomId}` : "Not Assigned"}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Floor {currentStudent?.roomId ? Math.floor(currentStudent.roomId / 100) : "-"}
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500 mb-2 font-medium">Check-in Date</div>
          <div className="text-2xl font-semibold text-gray-900">{currentStudent?.checkInDate || "—"}</div>
          <div className="text-xs text-gray-500 mt-2">Active status</div>
        </Card>

        <Card
          className={`p-6 bg-white border shadow-sm hover:shadow-md transition-shadow ${overdueFees > 0 ? "border-red-200" : "border-gray-200"}`}
        >
          <div className="text-sm text-gray-500 mb-2 font-medium">Pending Fees</div>
          <div className={`text-2xl font-semibold ${overdueFees > 0 ? "text-red-600" : "text-gray-900"}`}>
            ₹{pendingFees + overdueFees}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {pendingFees + overdueFees > 0 ? "Action needed" : "All paid"}
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500 mb-2 font-medium">Active Complaints</div>
          <div className="text-2xl font-semibold text-gray-900">{activeComplaints}</div>
          <div className="text-xs text-gray-500 mt-2">Being resolved</div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6 bg-white border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Fees</h2>
            <div className="space-y-3">
              {studentFees.length === 0 ? (
                <p className="text-sm text-gray-500">No fees assigned</p>
              ) : (
                studentFees.map((fee) => (
                  <div
                    key={fee.id}
                    className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{fee.feeType.replace(/_/g, " ")}</p>
                      <p className="text-xs text-gray-500">Due: {fee.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{fee.amount}</p>
                      <Badge
                        variant={fee.status === "PAID" ? "default" : "secondary"}
                        className={`text-xs mt-1 ${
                          fee.status === "PAID"
                            ? "bg-green-100 text-green-800"
                            : fee.status === "OVERDUE"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {fee.status}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-white border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h2>
          <div className="space-y-3">
            {announcements?.slice(0, 3).map((ann) => (
              <div key={ann.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">{ann.title}</p>
                  <Badge variant="outline" className="text-xs flex-shrink-0 bg-gray-100 text-gray-700 border-gray-300">
                    {ann.category}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">{ann.content}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
