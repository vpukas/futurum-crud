package com.vpukas.backend.services;


import com.vpukas.backend.entities.Campaign;
import com.vpukas.backend.entities.Keyword;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface KeywordService {

    List<Keyword> saveKeywords(List<Keyword> keywords, Campaign campaign);

    @Transactional
    void deleteKeywords(Campaign campaign);

    void changeKeywordsParams(List<Keyword> keywords, Campaign campaign);

    List<Keyword> getAllKeywords(Campaign campaign);

}
