# Employee Attendance Management System

A simple web-based Employee Attendance Management System built using HTML, CSS, JavaScript, Java Spring Boot, and MySQL.

The system allows employees to log in and mark their attendance, while administrators can manage employees and monitor daily attendance records.

---

## 📌 Features

### 👨‍💼 Employee

- Employee login
- Employee dashboard
- Mark attendance
- Automatically records:
  - Date
  - Time
  - Attendance status
- Attendance status is automatically determined by the system:
  - **Present** → Attendance marked at or before 10:00 AM
  - **Late** → Attendance marked after 10:00 AM
- Prevents duplicate attendance on the same day
- View attendance records
- Employee logout

### 👨‍💻 Admin

- Admin login
- View all employees
- Search employees
- View attendance records
- Search attendance by employee ID
- Filter attendance by status
- Filter attendance by date
- View:
  - Total Employees
  - Today's Attendance
  - Present
  - Late
  - Absent
  - Attendance Rate
- Export attendance records as CSV
- Admin logout

### ⏰ Daily Attendance Reset

The system uses a daily attendance cycle.

- Attendance uses **Indian Standard Time (Asia/Kolkata)**
- Attendance is considered:
  - **Present** at or before 10:00 AM
  - **Late** after 10:00 AM
- Attendance records are automatically reset at **12:00 AM**
- The next day starts with a fresh attendance list

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API
- Local Storage

### Backend

- Java
- Spring Boot
- Spring Data JPA
- REST API
- Maven

### Database

- MySQL

### Testing

- Postman

---

## 📂 Project Structure

```text
Employee-Attendance-System/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── attendance/
│   │       │           └── backend/
│   │       │               ├── BackendApplication.java
│   │       │               ├── Employee.java
│   │       │               ├── EmployeeRepository.java
│   │       │               ├── EmployeeController.java
│   │       │               ├── LoginController.java
│   │       │               ├── Attendance.java
│   │       │               ├── AttendanceRepository.java
│   │       │               ├── AttendanceController.java
│   │       │               └── AttendanceCleanup.java
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   └── pom.xml
│
├── database/
│   └── attendance.sql
│
├── frontend/
│   ├── index.html
│   ├── employee.html
│   ├── admin.html
│   ├── script.js
│   ├── style.css
│   └── clock.js
│
└── README.md