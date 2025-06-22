package com.example.demo.service;

import com.example.demo.model.MedicineReminder;
import com.example.demo.repository.MedicineReminderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicineReminderService {

    @Autowired
    private MedicineReminderRepository medicineReminderRepository;

    public List<MedicineReminder> getAllReminders() {
        return medicineReminderRepository.findAll();
    }

    public Optional<MedicineReminder> getReminderById(Long id) {
        return medicineReminderRepository.findById(id);
    }

    public MedicineReminder saveReminder(MedicineReminder reminder) {
        return medicineReminderRepository.save(reminder);
    }

    public void deleteReminder(Long id) {
        medicineReminderRepository.deleteById(id);
    }
}