package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.sql.Date;
import java.sql.Time;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "appointments")
public class Appointment extends BaseEntity {
    @Column(name = "patient_id", nullable = false, updatable = false)  // prevent patient_id updates
    private Long patientId;

    @Column(name = "doctor_id", nullable = false)
    private Long doctorId;
    
    private String doctorName;
    private String patientName;
    private Time appointmentTime;
    private Date appointmentDate;
    
    @Column(nullable = false)
    private String status; // SCHEDULED, COMPLETED, CANCELLED
    
    private String email;
}