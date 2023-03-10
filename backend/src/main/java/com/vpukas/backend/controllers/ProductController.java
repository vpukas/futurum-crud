package com.vpukas.backend.controllers;

import com.vpukas.backend.entities.Product;
import com.vpukas.backend.entities.User;
import com.vpukas.backend.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;
    @GetMapping
    public ResponseEntity<?> getProducts(@AuthenticationPrincipal User user) {
        Set<Product> products = productService.findByUser(user);
        return ResponseEntity.ok(products);
    }

}
