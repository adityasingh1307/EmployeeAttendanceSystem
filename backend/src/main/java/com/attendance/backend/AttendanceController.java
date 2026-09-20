package com.attendance.backend;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceRepository attendanceRepository;

    public AttendanceController(
            AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    @PostMapping
    public Attendance markAttendance(
            @RequestBody Attendance attendance) {

        // Get current Indian date and time
        ZoneId india = ZoneId.of("Asia/Kolkata");

        ZonedDateTime current =
                ZonedDateTime.now(india);

        LocalDate today =
                current.toLocalDate();

        LocalTime now =
                current.toLocalTime();

        // Check if employee already marked attendance today
        Attendance existing =
                attendanceRepository.findByEmployeeIdAndDate(
                        attendance.getEmployeeId(),
                        today
                );

        // If already marked, don't change the original time
        if (existing != null) {
            return existing;
        }

        // Attendance is late after 10:00 AM
        LocalTime lateTime =
                LocalTime.of(10, 0);

        String status;

        if (now.isAfter(lateTime)) {
            status = "Late";
        } else {
            status = "Present";
        }

        // Save new attendance
        attendance.setDate(today);
        attendance.setTime(now);
        attendance.setStatus(status);

        return attendanceRepository.save(attendance);
    }

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    @GetMapping("/{employeeId}")
    public List<Attendance> getAttendance(
            @PathVariable Integer employeeId) {

        return attendanceRepository
                .findByEmployeeId(employeeId);
    }
}