package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
// import java.time.LocalDate;
import java.sql.Date;


@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "referrals")
public class Referral extends BaseEntity {
    @ManyToOne
    private Doctor referringDoctor;
    
    @ManyToOne
    private Doctor referredDoctor;
    
    @ManyToOne
    private User patient;
    
    private String reason;
    private String notes;
    private Date referralDate;
    private String status; // PENDING, ACCEPTED, COMPLETED
    private String specialityRequired;
}