import { type NextRequest, NextResponse } from "next/server"

const visitorLog: any[] = []

export async function GET(request: NextRequest) {
  const { studentId, date } = Object.fromEntries(request.nextUrl.searchParams)

  const filtered = visitorLog.filter((v) => (!studentId || v.studentId === studentId) && (!date || v.date === date))

  return NextResponse.json(filtered)
}

export async function POST(request: NextRequest) {
  const { studentId, visitorName, visitorPhone, checkInTime, checkOutTime, purpose } = await request.json()

  const visitor = {
    id: Math.random(),
    studentId,
    visitorName,
    visitorPhone,
    checkInTime,
    checkOutTime,
    purpose, // 'meeting', 'delivery', 'personal'
    status: "checked_in",
    timestamp: new Date(),
  }

  visitorLog.push(visitor)
  return NextResponse.json(visitor)
}
