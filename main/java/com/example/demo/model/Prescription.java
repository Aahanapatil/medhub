package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
// import com.example.demo.model.Appointment;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "prescriptions")
public class Prescription extends BaseEntity {
    // @OneToOne
    @Column(name="appointment_id",nullable=false)
    private String appointment_id;
    @Column(length = 500)
    private String medications;
    private String dosage;
    @Column(length = 500)
    private String instructions;
}