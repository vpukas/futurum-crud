package com.vpukas.backend.services;

import com.vpukas.backend.dtos.CampaignDTO;
import com.vpukas.backend.entities.Campaign;
import com.vpukas.backend.entities.Product;
import com.vpukas.backend.entities.User;
import com.vpukas.backend.repositories.CampaignRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class CampaignServiceImpl implements CampaignService{
    private final CampaignRepository campaignRepository;
    private final UserDetailsServiceImpl userDetailsService;
    private final ProductServiceImpl productService;

    private final KeywordService keywordService;

    private final UserDataService userDataService;


    @Override
    public Campaign save(CampaignDTO campaignDTO) {
        Campaign campaign = new Campaign(campaignDTO.getName(),
                campaignDTO.getBid(),
                campaignDTO.getFund(),
                campaignDTO.getStatus(),
                campaignDTO.getRadius(),
                userDetailsService.getUserById(campaignDTO.getUserId()),
                productService.getProductById(campaignDTO.getProductId()),
                campaignDTO.getTown());

        return campaignRepository.save(campaign);
    }

    @Override
    public Campaign getCampaignByProduct(Long id) {
        Product product = productService.getProductById(id);
        return campaignRepository.findByProduct(product);
    }

    @Override
    public Set<Campaign> getCampaignsByUser(User user) {
        return campaignRepository.findAllByUser(user);
    }

    @Override
    public Campaign editCampaign(CampaignDTO campaignDTO) {
        Campaign campaign1 = campaignRepository.getOne(campaignDTO.getId());
        userDataService.updateBalance(campaignDTO.getUserId(), campaign1.getFund(), campaignDTO.getFund());
        campaign1.setName(campaignDTO.getName());
        campaign1.setRadius(campaignDTO.getRadius());
        campaign1.setFund(campaignDTO.getFund());
        campaign1.setBid(campaignDTO.getBid());
        campaign1.setTown(campaignDTO.getTown());
        return campaignRepository.save(campaign1);
    }
    @Override
    public CampaignDTO getCampaign(Long id) {
        Optional<Campaign> campaignOptional = campaignRepository.findById(id);
        if(campaignOptional.isPresent()) {
            Campaign campaign = campaignOptional.get();
            return new CampaignDTO(campaign.getId(),
                    campaign.getName(),
                    campaign.getBid(),
                    campaign.getFund(),
                    campaign.getStatus(),
                    campaign.getUser().getId(),
                    campaign.getProduct().getId(),
                    campaign.getRadius(),
                    campaign.getTown());
        }
        else {
            throw new RuntimeException("Campaign does not exist");
        }
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Optional<Campaign> campaignOptional = campaignRepository.findById(id);
        if(campaignOptional.isPresent()) {
            Campaign campaign = campaignOptional.get();
            keywordService.deleteKeywords(campaign);
            campaignRepository.delete(campaign);
        }
    }
}
