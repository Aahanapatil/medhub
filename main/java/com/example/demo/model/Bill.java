package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "bills")
public class Bill extends BaseEntity {
    // @OneToOne
    private String patientName;
    private String services;
    private Integer totalAmount;
    private String paymentStatus="unpaid";

    public void billPaid(){
        this.paymentStatus = "paid";
    }
}