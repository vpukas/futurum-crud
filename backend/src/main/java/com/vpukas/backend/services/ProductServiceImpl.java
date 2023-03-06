package com.vpukas.backend.services;

import com.vpukas.backend.entities.Product;
import com.vpukas.backend.entities.User;
import com.vpukas.backend.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    public Product getProductById(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        return productOptional.orElseThrow(() -> new RuntimeException("Product does not exist"));
    }

    public Set<Product> findByUser(User user) {
        return productRepository.findByUser(user);
    }

}
