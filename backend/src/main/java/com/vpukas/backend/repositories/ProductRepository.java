package com.vpukas.backend.repositories;

import com.vpukas.backend.entities.Product;
import com.vpukas.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Set<Product> findByUser(User user);
}
