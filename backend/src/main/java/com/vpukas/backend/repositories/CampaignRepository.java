package com.vpukas.backend.repositories;

import com.vpukas.backend.entities.Campaign;
import com.vpukas.backend.entities.Product;
import com.vpukas.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    Campaign findByProduct(Product product);
    Set<Campaign> findAllByUser(User user);
}
