package com.vpukas.backend.services;

import com.vpukas.backend.entities.Product;
import com.vpukas.backend.entities.User;

import java.util.Set;

public interface ProductService {
    public Product getProductById(Long id);
    public Set<Product> findByUser(User user);
}
