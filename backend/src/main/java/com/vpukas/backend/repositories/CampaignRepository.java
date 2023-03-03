package com.vpukas.backend.repositories;

import com.vpukas.backend.entities.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
}
