package com.vpukas.backend.controllers;

import com.vpukas.backend.dtos.CampaignDTO;
import com.vpukas.backend.entities.Campaign;
import com.vpukas.backend.services.CampaignServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/campaigns")
@AllArgsConstructor
public class CampaignController {

    private final CampaignServiceImpl campaignService;
    @Secured("ROLE_SELLER")
    @PostMapping
    public ResponseEntity<Campaign> save(
            @RequestBody CampaignDTO campaignDTO
            ) {
        Campaign campaign = campaignService.save(campaignDTO);
        return ResponseEntity.ok(campaign);
    }
}
