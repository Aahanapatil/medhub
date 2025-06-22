package com.example.demo.repository;

import com.example.demo.model.Doctor;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Optional<Doctor> findByEmail(String email);
    // You can add custom query methods here if needed

    List<Doctor> findBySpecialization(String specialization);
}