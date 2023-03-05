package com.vpukas.backend.services;

import com.vpukas.backend.entities.User;
import com.vpukas.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserDateServiceImpl implements UserDataService{
    private final UserRepository userRepository;

    @Override
    public BigDecimal getBalance(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        User user = userOptional.get();
        return user.getBalance();
    }

    @Override
    public void updateBalance(Long id, BigDecimal previousAmount, BigDecimal newAmount) {
        User user = userRepository.getOne(id);
        user.setBalance(user.getBalance().add(previousAmount.subtract(newAmount)));
        userRepository.save(user);
    }
}
