package com.attendance.backend;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository
        extends JpaRepository<Attendance, Integer> {

    List<Attendance> findByEmployeeId(Integer employeeId);

    Attendance findByEmployeeIdAndDate(
            Integer employeeId,
            LocalDate date
    );

    List<Attendance> findByDate(LocalDate date);

    void deleteByDateBefore(LocalDate date);
}