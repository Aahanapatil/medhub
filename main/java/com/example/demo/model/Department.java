package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "departments")
public class Department extends BaseEntity {
    private String title;
    private String description;
    private String hodName; // Name of the head of the department
}
