package com.vpukas.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CampaignDTO {
    private Long id;
    private String name;
    private BigDecimal fund;
    private Boolean status;
    private Long userId;
    private Long productId;
    private BigDecimal radius;

}
