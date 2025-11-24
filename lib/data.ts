// Mock database with realistic data

export interface User {
  id: number
  username: string
  email: string
  role: "STUDENT" | "WARDEN" | "ADMIN"
  firstName: string
  lastName: string
  phone: string
}

export interface Student {
  id: number
  userId: number
  name: string
  enrollmentNumber: string
  department: string
  semester: number
  status: "ACTIVE" | "INACTIVE" | "ON_LEAVE"
  email: string
  phone: string
  roomId: number | null
  checkInDate: string
  checkOutDate: string | null
}

export interface Room {
  id: number
  roomNumber: string
  capacity: number
  floor: number
  type: "SINGLE" | "DOUBLE" | "TRIPLE" | "QUAD"
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE"
  occupants: string[]
  maintenanceNotes: string | null
}

export interface RoomAllocation {
  id: number
  studentId: number
  studentName: string
  roomId: number
  roomNumber: string
  allocationDate: string
  releaseDate: string | null
  status: "ACTIVE" | "RELEASED" | "PENDING"
}

export interface Fee {
  id: number
  studentId: number
  studentName: string
  feeType: "ROOM_CHARGE" | "MAINTENANCE" | "UTILITY" | "OTHER"
  amount: number
  dueDate: string
  paymentDate: string | null
  status: "PENDING" | "PAID" | "OVERDUE" | "WAIVED"
  remarks: string
}

export interface Complaint {
  id: number
  studentId: number
  studentName: string
  roomId: number
  roomNumber: string
  category: "MAINTENANCE" | "CLEANLINESS" | "NOISE" | "WATER" | "ELECTRICITY" | "OTHER"
  description: string
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  createdAt: string
  resolvedAt: string | null
}

export interface Notice {
  id: number
  title: string
  content: string
  createdBy: string
  status: "ACTIVE" | "ARCHIVED" | "DRAFT"
  createdAt: string
  expiresAt: string
}

export interface Announcement {
  id: number
  title: string
  content: string
  category: "GENERAL" | "MAINTENANCE" | "ACADEMIC" | "EVENT" | "EMERGENCY"
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  publishedAt: string
  expiresAt: string
  status: "PUBLISHED" | "ARCHIVED" | "DRAFT"
}

// Demo Users
export const demoUsers: User[] = [
  {
    id: 1,
    username: "student1",
    email: "student1@hostel.edu",
    role: "STUDENT",
    firstName: "Raj",
    lastName: "Kumar",
    phone: "+91-9876543210",
  },
  {
    id: 2,
    username: "warden1",
    email: "warden1@hostel.edu",
    role: "WARDEN",
    firstName: "Priya",
    lastName: "Sharma",
    phone: "+91-9123456789",
  },
  {
    id: 3,
    username: "admin1",
    email: "admin1@hostel.edu",
    role: "ADMIN",
    firstName: "Vikram",
    lastName: "Singh",
    phone: "+91-9000000001",
  },
]

// Demo Students
export const demoStudents: Student[] = [
  {
    id: 1,
    userId: 1,
    name: "Raj Kumar",
    enrollmentNumber: "EN001",
    department: "Computer Science",
    semester: 4,
    status: "ACTIVE",
    email: "student1@hostel.edu",
    phone: "+91-9876543210",
    roomId: 1,
    checkInDate: "2024-01-15",
    checkOutDate: null,
  },
  {
    id: 2,
    userId: 4,
    name: "Priya Gupta",
    enrollmentNumber: "EN002",
    department: "Electronics",
    semester: 3,
    status: "ACTIVE",
    email: "priya@hostel.edu",
    phone: "+91-8765432109",
    roomId: 2,
    checkInDate: "2024-02-10",
    checkOutDate: null,
  },
  {
    id: 3,
    userId: 5,
    name: "Arjun Patel",
    enrollmentNumber: "EN003",
    department: "Mechanical",
    semester: 2,
    status: "ACTIVE",
    email: "arjun@hostel.edu",
    phone: "+91-7654321098",
    roomId: 1,
    checkInDate: "2024-01-20",
    checkOutDate: null,
  },
]

// Demo Rooms
export const demoRooms: Room[] = [
  {
    id: 1,
    roomNumber: "A-101",
    capacity: 2,
    floor: 1,
    type: "DOUBLE",
    status: "OCCUPIED",
    occupants: ["Raj Kumar", "Arjun Patel"],
    maintenanceNotes: null,
  },
  {
    id: 2,
    roomNumber: "A-102",
    capacity: 1,
    floor: 1,
    type: "SINGLE",
    status: "OCCUPIED",
    occupants: ["Priya Gupta"],
    maintenanceNotes: null,
  },
  {
    id: 3,
    roomNumber: "A-103",
    capacity: 4,
    floor: 1,
    type: "QUAD",
    status: "AVAILABLE",
    occupants: [],
    maintenanceNotes: null,
  },
  {
    id: 4,
    roomNumber: "B-201",
    capacity: 2,
    floor: 2,
    type: "DOUBLE",
    status: "MAINTENANCE",
    occupants: [],
    maintenanceNotes: "Ceiling repair ongoing",
  },
]

// Demo Allocations
export const demoAllocations: RoomAllocation[] = [
  {
    id: 1,
    studentId: 1,
    studentName: "Raj Kumar",
    roomId: 1,
    roomNumber: "A-101",
    allocationDate: "2024-01-15",
    releaseDate: null,
    status: "ACTIVE",
  },
  {
    id: 2,
    studentId: 2,
    studentName: "Priya Gupta",
    roomId: 2,
    roomNumber: "A-102",
    allocationDate: "2024-02-10",
    releaseDate: null,
    status: "ACTIVE",
  },
]

// Demo Fees
export const demoFees: Fee[] = [
  {
    id: 1,
    studentId: 1,
    studentName: "Raj Kumar",
    feeType: "ROOM_CHARGE",
    amount: 15000,
    dueDate: "2024-11-30",
    paymentDate: "2024-11-25",
    status: "PAID",
    remarks: "",
  },
  {
    id: 2,
    studentId: 1,
    studentName: "Raj Kumar",
    feeType: "MAINTENANCE",
    amount: 2000,
    dueDate: "2024-12-31",
    paymentDate: null,
    status: "PENDING",
    remarks: "",
  },
  {
    id: 3,
    studentId: 2,
    studentName: "Priya Gupta",
    feeType: "ROOM_CHARGE",
    amount: 15000,
    dueDate: "2024-11-15",
    paymentDate: null,
    status: "OVERDUE",
    remarks: "Payment pending",
  },
]

// Demo Complaints
export const demoComplaints: Complaint[] = [
  {
    id: 1,
    studentId: 1,
    studentName: "Raj Kumar",
    roomId: 1,
    roomNumber: "A-101",
    category: "WATER",
    description: "Water leakage from ceiling",
    status: "IN_PROGRESS",
    priority: "HIGH",
    createdAt: "2024-11-20",
    resolvedAt: null,
  },
  {
    id: 2,
    studentId: 2,
    studentName: "Priya Gupta",
    roomId: 2,
    roomNumber: "A-102",
    category: "ELECTRICITY",
    description: "Frequent power cuts in the room",
    status: "OPEN",
    priority: "MEDIUM",
    createdAt: "2024-11-22",
    resolvedAt: null,
  },
  {
    id: 3,
    studentId: 3,
    studentName: "Arjun Patel",
    roomId: 1,
    roomNumber: "A-101",
    category: "NOISE",
    description: "Excessive noise from adjacent rooms late at night",
    status: "RESOLVED",
    priority: "LOW",
    createdAt: "2024-11-18",
    resolvedAt: "2024-11-20",
  },
]

// Demo Notices
export const demoNotices: Notice[] = [
  {
    id: 1,
    title: "Hostel Maintenance Schedule",
    content:
      "General maintenance will be carried out on weekends starting from November 25, 2024. Please cooperate with the maintenance team.",
    createdBy: "Priya Sharma",
    status: "ACTIVE",
    createdAt: "2024-11-15",
    expiresAt: "2024-12-15",
  },
  {
    id: 2,
    title: "Fee Payment Deadline",
    content: "All outstanding fees must be paid by December 31, 2024. Late payment will attract 10% penalty.",
    createdBy: "Vikram Singh",
    status: "ACTIVE",
    createdAt: "2024-11-01",
    expiresAt: "2024-12-31",
  },
]

// Demo Announcements
export const demoAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Annual Sports Event",
    content:
      "Annual inter-hostel sports event scheduled for December 5-7, 2024. All interested students should register.",
    category: "EVENT",
    priority: "MEDIUM",
    publishedAt: "2024-11-10",
    expiresAt: "2024-12-08",
    status: "PUBLISHED",
  },
  {
    id: 2,
    title: "Emergency Evacuation Drill",
    content:
      "Emergency evacuation drill will be conducted on November 25, 2024 at 10:00 AM. All residents must participate.",
    category: "EMERGENCY",
    priority: "HIGH",
    publishedAt: "2024-11-18",
    expiresAt: "2024-11-26",
    status: "PUBLISHED",
  },
]

// API simulation
export async function fetchUser(username: string, password: string): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = demoUsers.find((u) => u.username === username)
  if (user && password === "password") {
    return user
  }
  return null
}

export async function fetchStudents(): Promise<Student[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return demoStudents
}

export async function fetchRooms(): Promise<Room[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return demoRooms
}

export async function fetchAllocations(): Promise<RoomAllocation[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return demoAllocations
}

export async function fetchFees(): Promise<Fee[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return demoFees
}

export async function fetchComplaints(): Promise<Complaint[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return demoComplaints
}

export async function fetchNotices(): Promise<Notice[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return demoNotices
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return demoAnnouncements
}
