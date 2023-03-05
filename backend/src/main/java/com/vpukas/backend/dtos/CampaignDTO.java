package com.vpukas.backend.dtos;

import com.vpukas.backend.entities.Keyword;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
public class CampaignDTO {
    private Long id;
    private String name;
    private List<Keyword> keyword;
    private BigDecimal bid;
    private BigDecimal fund;
    private Boolean status;
    private Long userId;
    private Long productId;
    private BigDecimal radius;
    private String town;



    public CampaignDTO(Long id, String name, List<Keyword> keyword, BigDecimal bid, BigDecimal fund, Boolean status, Long userId, Long productId, BigDecimal radius, String town) {
        this.id = id;
        this.name = name;
        this.keyword = keyword;
        this.bid = bid;
        this.fund = fund;
        this.status = status;
        this.userId = userId;
        this.productId = productId;
        this.radius = radius;
        this.town = town;
    }

    public CampaignDTO(Long id, String name, BigDecimal bid, BigDecimal fund, Boolean status, Long userId, Long productId, BigDecimal radius, String town) {
        this.id = id;
        this.name = name;
        this.bid = bid;
        this.fund = fund;
        this.status = status;
        this.userId = userId;
        this.productId = productId;
        this.radius = radius;
        this.town = town;
    }
}
