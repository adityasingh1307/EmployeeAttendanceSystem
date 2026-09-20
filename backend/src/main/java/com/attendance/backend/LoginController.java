package com.attendance.backend;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class LoginController {

    private final EmployeeRepository employeeRepository;

    public LoginController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @PostMapping("/login")
    public String login(@RequestBody Employee loginData) {

        Employee employee =
                employeeRepository.findByEmail(loginData.getEmail());

        if (employee == null) {
            return "Employee not found";
        }

        if (!employee.getPassword().equals(loginData.getPassword())) {
            return "Invalid password";
        }

        return "Login successful";
    }
}