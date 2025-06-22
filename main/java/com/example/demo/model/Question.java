package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
// import com.example.demo.model.Appointment;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "questions")
public class Question extends BaseEntity {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    @Column(length = 500)
    private String questionText;
}
 