package com.vpukas.backend.services;

import com.vpukas.backend.dtos.CampaignDTO;
import com.vpukas.backend.entities.Campaign;
import com.vpukas.backend.repositories.CampaignRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CampaignServiceImpl implements CampaignService{
    private final CampaignRepository campaignRepository;
    private final UserDetailsServiceImpl userDetailsService;
    private final ProductServiceImpl productService;
    @Override
    public Campaign save(CampaignDTO campaignDTO) {
        Campaign campaign = new Campaign(campaignDTO.getName(),
                campaignDTO.getFund(),
                campaignDTO.getStatus(),
                campaignDTO.getRadius(),
                userDetailsService.getUserById(campaignDTO.getUserId()),
                productService.getProductById(campaignDTO.getProductId())
                );
        return campaignRepository.save(campaign);
    }
}
