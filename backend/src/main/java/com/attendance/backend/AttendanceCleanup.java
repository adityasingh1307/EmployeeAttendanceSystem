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

        // Previous days are kept (not deleted) so the admin
        // can view them from the "Previous Days" button.
        // Each day starts fresh because the admin table only
        // shows records where date = today.

        System.out.println(
                "New attendance day started: "
                        + today
        );
    }
}