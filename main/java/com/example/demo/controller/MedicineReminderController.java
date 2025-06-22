package com.example.demo.controller;

import com.example.demo.model.MedicineReminder;
import com.example.demo.service.MedicineReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicine-reminders")
public class MedicineReminderController {

    @Autowired
    private MedicineReminderService medicineReminderService;

    @GetMapping
    public List<MedicineReminder> getAllReminders() {
        return medicineReminderService.getAllReminders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineReminder> getReminderById(@PathVariable Long id) {
        return medicineReminderService.getReminderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MedicineReminder createReminder(@RequestBody MedicineReminder reminder) {
        return medicineReminderService.saveReminder(reminder);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicineReminder> updateReminder(@PathVariable Long id, @RequestBody MedicineReminder reminderDetails) {
        return medicineReminderService.getReminderById(id)
                .map(reminder -> {
                    reminder.setPatient(reminderDetails.getPatient());
                    reminder.setPrescription(reminderDetails.getPrescription());
                    reminder.setMedicineName(reminderDetails.getMedicineName());
                    reminder.setDosage(reminderDetails.getDosage());
                    reminder.setReminderTime(reminderDetails.getReminderTime());
                    reminder.setFrequency(reminderDetails.getFrequency());
                    reminder.setIsActive(reminderDetails.getIsActive());
                    reminder.setNotes(reminderDetails.getNotes());
                    reminder.setMealRelation(reminderDetails.getMealRelation());
                    return ResponseEntity.ok(medicineReminderService.saveReminder(reminder));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReminder(@PathVariable Long id) {
        if (medicineReminderService.getReminderById(id).isPresent()) {
            medicineReminderService.deleteReminder(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}