package com.vpukas.backend.services;

import com.vpukas.backend.dtos.CampaignDTO;
import com.vpukas.backend.entities.Campaign;
import com.vpukas.backend.entities.User;

import java.util.Optional;
import java.util.Set;

public interface CampaignService {

    Campaign save(CampaignDTO campaignDTO);
    Campaign getCampaignByProduct(Long id);

    Set<Campaign> getCampaignsByUser(User user);
    public Campaign editCampaign(CampaignDTO campaignDTO);

    CampaignDTO getCampaign(Long id);

    void delete(Long id);
}
