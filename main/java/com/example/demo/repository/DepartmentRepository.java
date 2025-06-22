package com.example.demo.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    // Add custom query methods if needed
}
