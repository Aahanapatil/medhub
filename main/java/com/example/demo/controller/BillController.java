package com.example.demo.controller;

import com.example.demo.model.Bill;
import com.example.demo.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/bills")
public class BillController {

    @Autowired
    private BillService billService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/Get/{id}")
    public ResponseEntity<Bill> getBillById(@PathVariable Long id) {
        return billService.getBillById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public Bill createBill(@RequestBody Bill bill) {
        return billService.saveBill(bill);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/Update/{id}")
    public ResponseEntity<Bill> updateBill(@PathVariable Long id, @RequestBody Bill billDetails) {
        return billService.getBillById(id)
                .map(bill -> {
                    bill.setPatientName(billDetails.getPatientName());
                    bill.setTotalAmount(billDetails.getTotalAmount());
                    bill.setPaymentStatus(billDetails.getPaymentStatus());
                    return ResponseEntity.ok(billService.saveBill(bill));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<Void> deleteBill(@PathVariable Long id) {
        if (billService.getBillById(id).isPresent()) {
            billService.deleteBill(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}