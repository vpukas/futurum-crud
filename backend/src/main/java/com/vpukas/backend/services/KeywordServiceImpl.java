 package com.vpukas.backend.services;

import com.vpukas.backend.entities.Campaign;
import com.vpukas.backend.entities.Keyword;
import com.vpukas.backend.repositories.KeywordRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

 @AllArgsConstructor
@Service
public class KeywordServiceImpl implements KeywordService{
    private final KeywordRepository keywordRepository;
    @Override
    @Transactional
    public List<Keyword> saveKeywords(List<Keyword> keywords, Campaign campaign) {
        if(keywords == null) {
            throw new RuntimeException("Provide keywords please");
        }
        return keywordRepository.saveAll(keywords);
    }
     @Override
     @Transactional
     public void deleteKeywords(Campaign campaign) {
         keywordRepository.deleteAllByCampaign(campaign);
     }
    @Override
    public void changeKeywordsParams(List<Keyword> keywords, Campaign campaign) {
        if (keywords != null) {
            for (Keyword keyword : keywords
            ) {
                keyword.setCampaign(campaign);
            }
        }
    }
    @Override
    public List<Keyword> getAllKeywords(Campaign campaign) {
        return keywordRepository.findAllByCampaign(campaign);
    }

}
