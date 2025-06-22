package com.example.demo.controller;

import com.example.demo.model.Referral;
import com.example.demo.service.ReferralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/referrals")
public class ReferralController {

    @Autowired
    private ReferralService referralService;

    @GetMapping
    public List<Referral> getAllReferrals() {
        return referralService.getAllReferrals();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Referral> getReferralById(@PathVariable Long id) {
        return referralService.getReferralById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Referral createReferral(@RequestBody Referral referral) {
        return referralService.saveReferral(referral);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Referral> updateReferral(@PathVariable Long id, @RequestBody Referral referralDetails) {
        return referralService.getReferralById(id)
                .map(referral -> {
                    referral.setReferringDoctor(referralDetails.getReferringDoctor());
                    referral.setReferredDoctor(referralDetails.getReferredDoctor());
                    referral.setPatient(referralDetails.getPatient());
                    referral.setReason(referralDetails.getReason());
                    referral.setNotes(referralDetails.getNotes());
                    referral.setReferralDate(referralDetails.getReferralDate());
                    referral.setStatus(referralDetails.getStatus());
                    referral.setSpecialityRequired(referralDetails.getSpecialityRequired());
                    return ResponseEntity.ok(referralService.saveReferral(referral));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReferral(@PathVariable Long id) {
        if (referralService.getReferralById(id).isPresent()) {
            referralService.deleteReferral(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}