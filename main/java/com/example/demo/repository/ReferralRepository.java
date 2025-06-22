package com.example.demo.repository;

import com.example.demo.model.Referral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReferralRepository extends JpaRepository<Referral, Long> {
    // Add custom query methods if needed
}