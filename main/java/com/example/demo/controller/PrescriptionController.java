package com.example.demo.controller;

import com.example.demo.model.Prescription;
import com.example.demo.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prescriptions")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    @GetMapping
    public List<Prescription> getAllPrescriptions() {
        return prescriptionService.getAllPrescriptions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getPrescriptionById(@PathVariable Long id) {
        return prescriptionService.getPrescriptionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Prescription createPrescription(@RequestBody Prescription prescription) {
        return prescriptionService.savePrescription(prescription);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Prescription> updatePrescription(@PathVariable Long id, @RequestBody Prescription prescriptionDetails) {
        return prescriptionService.getPrescriptionById(id)
                .map(prescription -> {
                    prescription.setAppointment_id(prescriptionDetails.getAppointment_id());
                    prescription.setMedications(prescriptionDetails.getMedications());
                    prescription.setDosage(prescriptionDetails.getDosage());
                    prescription.setInstructions(prescriptionDetails.getInstructions());
                    return ResponseEntity.ok(prescriptionService.savePrescription(prescription));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrescription(@PathVariable Long id) {
        if (prescriptionService.getPrescriptionById(id).isPresent()) {
            prescriptionService.deletePrescription(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}