package com.vpukas.backend.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Authority implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String authority;
    @ManyToOne
    @JoinColumn(name = "id", insertable = false, updatable = false)
    private User user;

    public Authority(String authority, User user) {
        this.authority = authority;
        this.user = user;
    }

    public Authority(String authority) {
        this.authority = authority;
    }

}
