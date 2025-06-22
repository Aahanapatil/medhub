package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "users")
public class User extends BaseEntity {
    private String name;
    @Column(unique = true)
    private String email;
    private String password;
    private String phone;
    private String address;
    private String role; // ROLE_PATIENT, ROLE_DOCTOR, ROLE_ADMIN
    private String bloodGroup;
    private Integer age;
    private String gender;
}