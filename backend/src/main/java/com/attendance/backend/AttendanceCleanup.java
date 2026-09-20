package com.attendance.backend;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;

@Component
public class AttendanceCleanup {

    private final AttendanceRepository attendanceRepository;

    public AttendanceCleanup(
            AttendanceRepository attendanceRepository) {

        this.attendanceRepository = attendanceRepository;
    }

    @Scheduled(
            cron = "0 0 0 * * *",
            zone = "Asia/Kolkata"
    )
    public void clearOldAttendance() {

        LocalDate today =
                LocalDate.now(
                        ZoneId.of("Asia/Kolkata")
                );

        attendanceRepository.deleteByDateBefore(today);

        System.out.println(
                "Attendance reset completed for "
                        + today
        );
    }
}