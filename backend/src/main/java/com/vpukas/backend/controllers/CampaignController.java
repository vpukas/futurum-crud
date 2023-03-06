package com.vpukas.backend.controllers;

import com.vpukas.backend.dtos.CampaignDTO;
import com.vpukas.backend.entities.Campaign;
import com.vpukas.backend.entities.User;
import com.vpukas.backend.services.CampaignServiceImpl;
import com.vpukas.backend.services.KeywordService;
import com.vpukas.backend.services.UserDataService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Set;

@RestController
@RequestMapping("/api/campaigns")
@AllArgsConstructor
public class CampaignController {

    private final CampaignServiceImpl campaignService;
    private final KeywordService keywordService;
    private final UserDataService userDataService;
    @PostMapping
    public ResponseEntity<CampaignDTO> save(
            @RequestBody CampaignDTO campaignDTO, @AuthenticationPrincipal User user
            ) {
        if(campaignDTO.getKeyword() == null) {
            return ResponseEntity.badRequest().body(new CampaignDTO());
        }
        campaignDTO.setUserId(user.getId());
        Campaign campaign = campaignService.save(campaignDTO);
        CampaignDTO campaignDTO1 = new CampaignDTO(campaign.getId(),
                campaign.getName(),
                campaign.getBid(),
                campaign.getFund(),
                campaign.getStatus(),
                campaign.getUser().getId(),
                campaign.getProduct().getId(),
                campaign.getRadius(),
                campaign.getTown());
        keywordService.changeKeywordsParams(campaignDTO.getKeyword(), campaign);
        keywordService.deleteKeywords(campaign);
        keywordService.saveKeywords(campaignDTO.getKeyword(), campaign);
        userDataService.updateBalance(user.getId(), BigDecimal.valueOf(0), campaign.getFund());
        return ResponseEntity.ok(campaignDTO1);
    }
    @GetMapping("byproduct/{id}")
    public ResponseEntity<Campaign> getCampaignByProduct(@PathVariable Long id) {
        Campaign campaign = campaignService.getCampaignByProduct(id);
        return ResponseEntity.ok(campaign);
    }

    @GetMapping
    public ResponseEntity<Set<Campaign>> getCampaignsByUser(@AuthenticationPrincipal User user){
        Set<Campaign> campaigns = campaignService.getCampaignsByUser(user);
        return ResponseEntity.ok(campaigns);
    }

    @PostMapping("edit")
    public ResponseEntity<Campaign> editCampaign(@RequestBody CampaignDTO campaignDTO) {
        if(campaignDTO.getKeyword() == null) {
            return ResponseEntity.badRequest().body(new Campaign());
        }
        Campaign campaign = campaignService.editCampaign(campaignDTO);
        keywordService.changeKeywordsParams(campaignDTO.getKeyword(), campaign);
        keywordService.deleteKeywords(campaign);
        keywordService.saveKeywords(campaignDTO.getKeyword(), campaign);
        return ResponseEntity.ok(campaign);
    }

    @GetMapping("{id}")
    public ResponseEntity<CampaignDTO> getCampaign(@PathVariable Long id) {
        CampaignDTO campaign = campaignService.getCampaign(id);
        return ResponseEntity.ok(campaign);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteCampaign (@PathVariable Long id) {
            campaignService.delete(id);
            return ResponseEntity.ok("Campaign deleted");
    }
}
