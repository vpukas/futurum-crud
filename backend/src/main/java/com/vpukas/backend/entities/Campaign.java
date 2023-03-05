package com.vpukas.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name="campaigns")
@NoArgsConstructor
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private BigDecimal bid;
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "id")
    @JsonIgnore
    private List<Keyword> keyword = new ArrayList<>();
    @Column(nullable = false)
    private BigDecimal fund;
    @Column(nullable = false)
    private Boolean status;
    @Column(nullable = false)
    private BigDecimal radius;
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(nullable = false)
    private Product product;

    private String town;


    public Campaign(String name, BigDecimal bid, BigDecimal fund, Boolean status, BigDecimal radius, User user, Product product, String town) {
        this.name = name;
        this.bid = bid;
        this.fund = fund;
        this.status = status;
        this.radius = radius;
        this.user = user;
        this.product = product;
        this.town = town;
    }
}
