"use client"

import useSWR from "swr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchNotices, fetchAnnouncements } from "@/lib/data"

export function NoticeAnnouncement() {
  const { data: notices, isLoading: noticesLoading } = useSWR("notices", fetchNotices, {
    revalidateOnFocus: true,
    revalidateInterval: 5000,
  })

  const { data: announcements, isLoading: announcementsLoading } = useSWR("announcements", fetchAnnouncements, {
    revalidateOnFocus: true,
    revalidateInterval: 5000,
  })

  if (noticesLoading || announcementsLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-10 w-48" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Notices & Announcements</h1>
        <p className="text-gray-500 mt-2">Important hostel updates</p>
      </div>

      {/* Announcements Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-black rounded"></div>
          <h2 className="text-xl font-semibold text-gray-900">Announcements</h2>
          <Badge className="bg-gray-200 text-gray-800">{announcements?.length || 0}</Badge>
        </div>

        {announcements && announcements.length > 0 ? (
          announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900">{announcement.title}</CardTitle>
                    <CardDescription className="text-gray-500 mt-1">{announcement.publishedAt}</CardDescription>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Badge className="bg-gray-100 text-gray-700 text-xs">{announcement.category}</Badge>
                    <Badge
                      className={`text-xs ${
                        announcement.priority === "URGENT"
                          ? "bg-red-100 text-red-800"
                          : announcement.priority === "HIGH"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {announcement.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">{announcement.content}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="p-8 border border-gray-200 rounded-lg bg-white text-center">
            <p className="text-gray-500">No announcements</p>
          </div>
        )}
      </div>

      {/* Notices Section */}
      {notices && notices.length > 0 && (
        <div className="space-y-4 mt-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-black rounded"></div>
            <h2 className="text-xl font-semibold text-gray-900">Notices</h2>
            <Badge className="bg-gray-200 text-gray-800">{notices.length}</Badge>
          </div>

          {notices.map((notice) => (
            <Card
              key={notice.id}
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">{notice.title}</CardTitle>
                <CardDescription className="text-gray-500">Posted: {notice.createdAt}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">{notice.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
