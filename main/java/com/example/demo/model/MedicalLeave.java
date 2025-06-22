package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.sql.Date;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "medical_leaves")
public class MedicalLeave extends BaseEntity {
    @ManyToOne
    private User patient;
    
    @ManyToOne
    private Doctor issuingDoctor;
    
    private Date startDate;
    private Date endDate;
    private String diagnosis;
    private String reason;
    private String recommendations;
    private Boolean isPartialDay;
    private String documentNumber;
    
    @ManyToOne
    private Appointment relatedAppointment;
}