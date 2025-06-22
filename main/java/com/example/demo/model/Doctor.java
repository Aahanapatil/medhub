package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "doctors")
public class Doctor extends BaseEntity {
    @OneToOne
    private User user;
    @Column(unique = true)
    private String email;
    private String password;
    private String phone;
    private String address;
    private String name;
    private String specialization;
    private String qualification;
    private Integer experience;
    private String licenseNumber;
    private Integer consultationFee;
    private String availability;
    private String role;
}