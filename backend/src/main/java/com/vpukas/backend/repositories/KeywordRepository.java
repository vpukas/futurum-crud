package com.vpukas.backend.repositories;

import com.vpukas.backend.entities.Campaign;
import com.vpukas.backend.entities.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    public List<Keyword> findAllByCampaign(Campaign campaign);
    public void deleteAllByCampaign(Campaign campaign);
}
