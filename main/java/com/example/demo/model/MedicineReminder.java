package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.sql.Time;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "medicine_reminders")
public class MedicineReminder extends BaseEntity {
    @ManyToOne
    private User patient;
    
    @ManyToOne
    private Prescription prescription;
    
    private String medicineName;
    private String dosage;
    private Time reminderTime;
    private String frequency; // DAILY, TWICE_DAILY, etc.
    private Boolean isActive;
    private String notes;
    private String mealRelation; // BEFORE_MEAL, AFTER_MEAL, WITH_MEAL
}