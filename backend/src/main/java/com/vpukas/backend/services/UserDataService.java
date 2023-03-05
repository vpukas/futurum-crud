package com.vpukas.backend.services;

import java.math.BigDecimal;

public interface UserDataService {
    BigDecimal getBalance(Long id);
    void updateBalance(Long id, BigDecimal previousAmount, BigDecimal newAmount);
}
