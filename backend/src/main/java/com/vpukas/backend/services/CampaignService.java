package com.vpukas.backend.services;

import com.vpukas.backend.dtos.CampaignDTO;
import com.vpukas.backend.entities.Campaign;

public interface CampaignService {

    Campaign save(CampaignDTO campaignDTO);
}
