# Hostel Management System

A role-based Hostel / PG Management System with a **Java backend** and optional modern web frontend. It centralizes student and room management, fee tracking, complaints, and announcements into a single, maintainable system.

---

## Overview

This project is developed as part of the **VITyarthi – Build Your Own Project** initiative for the **Programming in Java** course.

The system addresses common hostel/PG challenges:

- Manual and error-prone room allocation  
- Inaccurate fee tracking and dues monitoring  
- Poor visibility into complaints and maintenance work  
- Inefficient communication of notices and announcements  

The solution provides:

- Multiple core functional modules (Students, Rooms, Fees, Complaints, Notices)  
- Role-based access for **Admin**, **Warden**, and **Student**  
- A Java-based backend with clear modular architecture  

---

## Features

### Core Functional Modules

#### 1. Student & Room Allocation
- Student registration and profile management  
- Room management with capacity and type (Single / Double / Triple / Quad)  
- Room allocation and de-allocation workflows  
- Room status tracking: Available, Occupied, Maintenance  
- Allocation history for audit and traceability  
- Validation to prevent double-booking / over-occupancy  

#### 2. Fee Management
- Configurable fee components (Room Rent, Maintenance, Utilities, Others)  
- Fee generation per student (monthly / semester-wise)  
- Payment status: Pending, Paid, Overdue, Waived  
- Support for multiple payment modes (cash, bank transfer, online – design-ready)  
- Fee summaries and pending dues reports  

#### 3. Complaint & Maintenance Management
- Complaint filing by students with categories (Maintenance, Cleanliness, Noise, Water, Electricity, etc.)  
- Priority levels: Low, Medium, High, Urgent  
- Complaint lifecycle: Open → In Progress → Resolved → Closed  
- Mapping complaints to maintenance tasks  
- Cost estimation and completion tracking for maintenance work  

#### 4. Notices & Announcements
- Creation of notices by Admin/Warden  
- Categories: General, Maintenance, Academic, Event, Emergency  
- Draft, publish, and archive workflow  
- Expiry date handling for automatic hiding of old notices  
- Filtering by category, priority, and date  

### Additional / Optional Modules

- Attendance & leave management for hostel residents  
- Visitor registration and check-in / check-out logging  
- Dashboards for Student, Warden, and Admin  
- Reports and export (CSV/Excel/PDF-ready) for occupancy, fees, complaints, and attendance  
- Notification system (email/SMS/WhatsApp-ready for reminders and alerts)  

---

## Technologies / Tools Used

### Backend (Core – Programming in Java)
- Language: **Java**  
- Framework: **Spring Boot** (or Core Java with layered architecture)  
- ORM: **Spring Data JPA / Hibernate**  
- Database: **PostgreSQL** or **MySQL**  
- Security: **Spring Security**, **JWT** (for role-based access)  

### Frontend (Optional, if implemented)
- Framework: **React** or **Next.js**  
- Language: **TypeScript** / JavaScript  
- Styling: **Tailwind CSS** or CSS frameworks  

### Development & Tooling
- Build Tool: **Maven** or **Gradle**  
- Version Control: **Git**, **GitHub**  
- API Testing: **Postman** / **Insomnia**  
- Unit Testing (optional): **JUnit**  

---

## Project Structure

Example structure (adjust according to your actual implementation):

```text
root/
 ├─ backend/
 │   ├─ src/main/java/com/hostelmgmt/
 │   │    ├─ controller/      # REST controllers
 │   │    ├─ service/         # Business logic
 │   │    ├─ repository/      # Data access
 │   │    ├─ model/           # Entity/model classes
 │   │    ├─ dto/             # Data Transfer Objects
 │   │    └─ config/          # Security & app configuration
 │   ├─ src/main/resources/
 │   │    └─ application.properties
 │   └─ pom.xml
 ├─ frontend/                 # Optional (React/Next.js)
 │   ├─ app/ or src/
 │   ├─ public/
 │   ├─ package.json
 │   └─ next.config.js
 ├─ docs/
 │   ├─ diagrams/             # UML, ER, architecture diagrams
 │   └─ report/               # Final project report (PDF)
 ├─ README.md
 └─ statement.md
```

---

## Steps to Install & Run the Project

### 1. Prerequisites

- Java JDK 17+  
- Maven (if using Maven)  
- PostgreSQL or MySQL  
- Node.js + npm (only if using the web frontend)  
- Git  

### 2. Clone the Repository

```bash
git clone https://github.com/<your-username>/hostel-management-system.git
cd hostel-management-system
```

### 3. Backend Setup (Java)

1. Go to backend directory:

   ```bash
   cd backend
   ```

2. Create a database (example for PostgreSQL):

   ```sql
   CREATE DATABASE hostel_mgmt;
   ```

3. Configure `src/main/resources/application.properties`:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/hostel_mgmt
   spring.datasource.username=<db-username>
   spring.datasource.password=<db-password>

   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true

   # Security / JWT (if used)
   app.jwt.secret=<your-secret-key>
   app.jwt.expiration=3600000
   ```

4. Build and run the backend:

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

5. Backend will be available at:

   ```
   http://localhost:8080
   ```

### 4. Frontend Setup (Optional)

1. Open a new terminal and go to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local` (or similar) with API base URL:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
   ```

4. Run the frontend:

   ```bash
   npm run dev
   ```

5. Frontend will be available at:

   ```
   http://localhost:3000
   ```

If you do not implement a separate web frontend, you can interact with the backend APIs directly using Postman or a simple Java/HTML client.

---

## Instructions for Testing

### Manual Testing

You can manually test key workflows:

1. **Authentication & Roles**
   - Log in as Admin, Warden, and Student.
   - Verify that each role only sees authorized menus/features.

2. **Student & Room Allocation**
   - Create rooms with different capacities.
   - Register multiple students.
   - Allocate rooms and ensure:
     - Room occupancy updates correctly.
     - Double-booking is not allowed.

3. **Fee Management**
   - Define fee structure for a room type.
   - Generate fees for students.
   - Record payments for some students.
   - Verify pending and overdue fee lists.

4. **Complaint Management**
   - Log in as Student, file complaints with categories and priorities.
   - Log in as Warden/Admin and change complaint status (Open → In Progress → Resolved).
   - Verify complaint history and timestamps.

5. **Notices & Announcements**
   - Create a notice with category and expiry date.
   - Log in as Student and check that the notice is visible.
   - Verify that expired notices are not shown in active list.

### Automated Testing (Optional)

- Add JUnit tests for:
  - Service methods (allocation logic, fee calculation, complaint state transitions).
  - Repository tests using H2 in-memory database.

Run tests:

```bash
mvn test
```

---

## Documentation

Additional documentation is provided in the `docs/` folder:

- Problem statement, objectives, and requirements  
- System architecture diagram  
- Use Case, Class, Sequence, and Workflow diagrams  
- ER diagram and database schema  
- Implementation details and screenshots  
- Testing approach and selected test cases  
- Challenges, learnings, and <img width="1200" height="447" alt="Screenshot 2025-11-24 225019" src="https://github.com/user-attachments/assets/8d041ed9-6747-4252-a00f-b3358ecc4ab2" />
<img width="1341" height="622" alt="Screenshot 2025-11-24 224950" src="https://github.com/user-attachments/assets/f876caba-79be-4dad-9996-be0f409a7a7b" />
<img width="1330" height="630" alt="Screenshot 2025-11-24 224927" src="https://github.com/user-attachments/assets/c6e8a083-aa17-47b3-ae28-45122ae90ef6" />
<img width="1349" height="589" alt="Screenshot 2025-11-24 224904" src="https://github.com/user-attachments/assets/c16c4c4f-a8e9-4f87-8c7c-b2f4adae09f5" />
<img width="1333" height="602" alt="Screenshot 2025-11-24 224845" src="https://github.com/user-attachments/assets/e7bf4bfe-7ee7-4d6e-b272-c95bc60cdcbc" />
<img width="1362" height="610" alt="Screenshot 2025-11-24 224827" src="https://github.com/user-attachments/assets/9cb7c810-7b5f-47a3-8508-42592d9e3ace" />
<img width="1315" height="619" alt="Screenshot 2025-11-24 224658" src="https://github.com/user-attachments/assets/a1ef0604-c317-4e54-9fac-979e27c33df4" />
<img width="1362" height="615" alt="Screenshot 2025-11-24 224639" src="https://github.com/user-attachments/assets/cfaead29-bd2e-463e-808c-61200645ad81" />
<img width="1328" height="624" alt="Screenshot 2025-11-24 224616" src="https://github.com/user-attachments/assets/958c1b38-9e6d-48c8-b411-9a1c8455c1c3" />
<img width="1360" height="632" alt="Screenshot 2025-11-24 224525" src="https://github.com/user-attachments/assets/ae2e6b86-6f7e-4758-b639-51009e78c0d1" />
<img width="1328" height="624" alt="Screenshot 2025-11-24 224616" src="https://github.com/user-attachments/assets/e723283f-027f-49be-8b83-676c9a300690" />
![Uploading Screenshot 2025-11-24 225019.png…]()
future enhancements  

---

## Future Enhancements

- Full online payment gateway integration (Stripe / Razorpay)  
- Email/SMS/WhatsApp notifications for reminders and alerts  
- Native mobile app (Android/iOS) for students and wardens  
- Biometric-based attendance and access control  
- Advanced analytics dashboards (occupancy trends, fee patterns)  
- AI-based complaint classification and auto-routing to staff  

---

## License

This project is created for academic purposes under the **VITyarthi – Build Your Own Project** initiative.  
You may reuse and modify it for learning and non-commercial purposes.
