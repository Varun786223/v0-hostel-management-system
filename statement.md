# Hostel Management System – Project Statement

## Problem statement

Most hostel and paying guest (PG) facilities still rely on manual registers, spreadsheets, or informal communication (phone calls/WhatsApp) to manage:

- Student/resident information and room allocations  
- Fee collection, payment tracking, and dues  
- Complaint registration and maintenance follow-up  
- Dissemination of notices and important announcements  

This manual approach leads to frequent issues:

- Errors and delays in room allocation and vacancy updates  
- Lack of transparency in fee dues and payment history  
- Untracked or unresolved complaints causing dissatisfaction  
- Inconsistent and unreliable communication with students  

There is a need for an integrated, easy-to-use **Hostel Management System** that centralizes these core operations, reduces manual work, and improves accuracy and transparency for both management and students.

---

## Scope of the project

The project aims to design and implement a **Java-based Hostel Management System** that covers the essential functions required for day-to-day hostel/PG operations.

**In scope:**

- Basic user management for different roles (Admin/Warden, Student)  
- Student information management (add, view, update, remove)  
- Room definition and management (room type, capacity, status)  
- Room allocation and de-allocation with occupancy tracking  
- Fee configuration, fee assignment, and payment status tracking  
- Complaint registration and lifecycle management (Open → Resolved)  
- Creation and viewing of notices and announcements  
- Simple dashboards and/or reports for key data (occupancy, fees, complaints)  
- Persistence of data using files or a relational database  

**Out of scope (for current version):**

- Full-scale online payment gateway integration  
- Native mobile applications  
- Biometric or hardware-based access control  
- Advanced analytics and AI-based features  

The scope is intentionally limited to ensure a complete, working system that demonstrates strong understanding of **Programming in Java**, modular design, and basic software engineering principles.

---

## Target users

- **Admin / Management**
  - Owns and oversees the entire hostel system.  
  - Manages users, rooms, fees, and high-level configuration.  
  - Views consolidated reports for decision-making.

- **Warden / Hostel Staff**
  - Manages day-to-day hostel operations.  
  - Handles room allocations, tracks occupancy, and manages complaints.  
  - Publishes notices and communicates important information to students.

- **Students / Residents**
  - Can view their own profile and room details.  
  - Can view fee status and payment history.  
  - Can register and track complaints.  
  - Can view all active notices and announcements.

- **(Optional) Accounts / Finance Staff**
  - Focused on fee records and payment reconciliation.  
  - Uses fee reports and pending dues lists.

---

## High-level features

1. **Authentication & Role-Based Access**
   - Login system for Admin/Warden and Students.  
   - Role-based menus and permissions.  

2. **Student & Room Management**
   - Create, read, update, and delete student records.  
   - Define rooms with capacity, type, and status (Available/Occupied/Maintenance).  
   - Allocate and de-allocate rooms to students with validation to prevent overbooking.  
   - Maintain room occupancy and allocation history.

3. **Fee Management**
   - Configure fee components (room rent, maintenance, utilities, etc.).  
   - Assign fees to students (monthly/semester-wise).  
   - Track payment status (Pending, Paid, Overdue, Waived).  
   - Generate basic summaries of total collection and pending dues.

4. **Complaint & Maintenance Management**
   - Allow students to lodge complaints with category and priority.  
   - Enable warden/admin to update complaint status and add resolution notes.  
   - Track complaint lifecycle and maintain a history for each student.

5. **Notices & Announcements**
   - Admin/Warden can create and publish notices.  
   - Categorize notices (General, Maintenance, Academic, Event, Emergency).  
   - Set expiry dates and archive old notices.  
   - Students can view all active notices relevant to them.

6. **Basic Dashboards and Reports**
   - Overview of total students and room occupancy.  
   - List of students with pending/overdue fees.  
   - Summary of open and resolved complaints.  
   - Simple views for management to monitor hostel status at a glance.
