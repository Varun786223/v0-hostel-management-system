import { type NextRequest, NextResponse } from "next/server"

const attendanceData: any[] = []

export async function GET(request: NextRequest) {
  const { studentId, month } = Object.fromEntries(request.nextUrl.searchParams)

  const filtered = attendanceData.filter((a) => !studentId || a.studentId === studentId)

  return NextResponse.json(filtered)
}

export async function POST(request: NextRequest) {
  const { studentId, date, status, leaveType } = await request.json()

  const record = {
    id: Math.random(),
    studentId,
    date,
    status, // 'present', 'absent', 'on_leave'
    leaveType, // 'sick', 'casual', 'emergency'
    timestamp: new Date(),
  }

  attendanceData.push(record)
  return NextResponse.json(record)
}
