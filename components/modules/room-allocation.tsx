"use client"

import useSWR from "swr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchAllocations, fetchRooms } from "@/lib/data"

export function RoomAllocation() {
  const { data: allocations, isLoading: allocationsLoading } = useSWR("allocations", fetchAllocations, {
    revalidateOnFocus: true,
    revalidateInterval: 3000,
  })

  const { data: rooms, isLoading: roomsLoading } = useSWR("rooms", fetchRooms, {
    revalidateOnFocus: true,
    revalidateInterval: 3000,
  })

  const availableRooms = rooms?.filter((r) => r.status === "AVAILABLE") || []
  const occupiedRooms = rooms?.filter((r) => r.status === "OCCUPIED") || []

  if (allocationsLoading || roomsLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96 lg:col-span-2" />
          <Skeleton className="h-96" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Room Allocation</h1>
        <p className="text-gray-500 mt-2">Manage student room assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Total Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-gray-900">{rooms?.length || 0}</p>
            <p className="text-xs text-gray-500 mt-1">Total capacity</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Occupied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-gray-900">{occupiedRooms.length}</p>
            <p className="text-xs text-gray-500 mt-1">Rooms occupied</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-green-600">{availableRooms.length}</p>
            <p className="text-xs text-gray-500 mt-1">Ready for allocation</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Active Allocations</CardTitle>
              <CardDescription className="text-gray-500">
                Current room assignments ({allocations?.length || 0})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {allocations && allocations.length > 0 ? (
                  allocations.map((alloc) => (
                    <div
                      key={alloc.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{alloc.studentName}</p>
                        <p className="text-sm text-gray-500">
                          Room {alloc.roomNumber} • {alloc.allocationDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            alloc.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {alloc.status}
                        </Badge>
                        <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 bg-transparent">
                          Release
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No active allocations</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Available Rooms</CardTitle>
            <CardDescription className="text-gray-500">{availableRooms.length} rooms ready</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {availableRooms.length > 0 ? (
                availableRooms.map((room) => (
                  <div
                    key={room.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <p className="font-medium text-sm text-gray-900">{room.roomNumber}</p>
                    <p className="text-xs text-gray-500">
                      {room.type} • Capacity: {room.capacity}
                    </p>
                    <Button size="sm" className="w-full mt-2 bg-black hover:bg-gray-900 text-white">
                      Allocate
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No available rooms</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
