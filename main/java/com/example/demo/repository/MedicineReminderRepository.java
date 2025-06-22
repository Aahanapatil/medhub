package com.example.demo.repository;

import com.example.demo.model.MedicineReminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineReminderRepository extends JpaRepository<MedicineReminder, Long> {
    // Add custom query methods if needed
}