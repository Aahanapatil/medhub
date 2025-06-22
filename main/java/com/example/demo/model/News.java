package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "news")
public class News extends BaseEntity {
    private String title;
    private String content;

    
    // Getters and Setters
}
