package com.vpukas.backend.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name="campaigns")
@NoArgsConstructor
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private BigDecimal fund;
    private Boolean status;
    private BigDecimal radius;
    @ManyToOne
    private User user;
    @ManyToOne
    private Product product;

    public Campaign(String name, BigDecimal fund, Boolean status, BigDecimal radius, User user, Product product) {
        this.name = name;
        this.fund = fund;
        this.status = status;
        this.radius = radius;
        this.user = user;
        this.product = product;
    }
}
