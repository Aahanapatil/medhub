package com.example.demo.service;

import com.example.demo.model.Referral;
import com.example.demo.repository.ReferralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReferralService {

    @Autowired
    private ReferralRepository referralRepository;

    public List<Referral> getAllReferrals() {
        return referralRepository.findAll();
    }

    public Optional<Referral> getReferralById(Long id) {
        return referralRepository.findById(id);
    }

    public Referral saveReferral(Referral referral) {
        return referralRepository.save(referral);
    }

    public void deleteReferral(Long id) {
        referralRepository.deleteById(id);
    }
}