package com.example.demo.controller;

import com.example.demo.model.Doctor;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctor/login")
public class DoctorLoginController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Doctor doctor = doctorService.findByEmail(loginRequest.getEmail());
        if (doctor != null && doctor.getPassword().equals(loginRequest.getPassword())) {
            String token = jwtUtil.generateToken(doctor.getEmail(), doctor.getRole());
            return ResponseEntity.ok(new JwtResponse(token, doctor.getRole(), doctor.getEmail()));
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    // DTO for login request
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    // DTO for JWT response
    public static class JwtResponse {
        private String token;
        private String role;
        private String email;

        public JwtResponse(String token, String role, String email) {
            this.token = token;
            this.role = role;
            this.email = email;
        }
        public String getToken() { return token; }
        public String getRole() { return role; }
        public String getEmail() { return email; }
    }
}