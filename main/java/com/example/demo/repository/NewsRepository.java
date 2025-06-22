package com.example.demo.repository;


import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.News;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    // Add custom query methods if needed
}