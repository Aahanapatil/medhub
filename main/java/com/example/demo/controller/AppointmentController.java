package com.example.demo.controller;

import com.example.demo.model.Appointment;
import com.example.demo.model.Doctor;
import com.example.demo.model.User;
import com.example.demo.service.AppointmentService;
import com.example.demo.service.DoctorService;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
    
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private UserService userService;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        // Validate both doctor and patient IDs are provided
        if (appointment.getDoctorId() == null || appointment.getPatientId() == null) {
            return ResponseEntity.badRequest().build();
        }
        
        // Fetch and validate doctor exists
        Doctor doctor = doctorService.getDoctorById(appointment.getDoctorId())
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        // Fetch and validate patient exists
        User patient = userService.getUserById(appointment.getPatientId())
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        // Set the names from the retrieved entities
        appointment.setDoctorName(doctor.getName());
        appointment.setPatientName(patient.getName());
        
        // Set default status if not provided
        if (appointment.getStatus() == null) {
            appointment.setStatus("SCHEDULED");
        }
        
        return ResponseEntity.ok(appointmentService.saveAppointment(appointment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody Appointment appointmentDetails) {
        return appointmentService.getAppointmentById(id)
            .map(appointment -> {
                // Allow updating appointment details
                appointment.setAppointmentTime(appointmentDetails.getAppointmentTime());
                appointment.setAppointmentDate(appointmentDetails.getAppointmentDate());
                appointment.setStatus(appointmentDetails.getStatus());
                appointment.setEmail(appointmentDetails.getEmail());
                appointment.setPatientName(appointmentDetails.getPatientName());
                
                // Allow reassigning to a different doctor
                if (appointmentDetails.getDoctorId() != null) {
                    Doctor newDoctor = doctorService.getDoctorById(appointmentDetails.getDoctorId())
                        .orElseThrow(() -> new RuntimeException("Doctor not found"));
                    appointment.setDoctorId(newDoctor.getId());
                    appointment.setDoctorName(newDoctor.getName());
                }
                
                // Note: patientId cannot be changed due to @Column(updatable = false)
                
                return ResponseEntity.ok(appointmentService.saveAppointment(appointment));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        if (appointmentService.getAppointmentById(id).isPresent()) {
            appointmentService.deleteAppointment(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}