package com.vpukas.backend.controllers;

import com.vpukas.backend.entities.User;
import com.vpukas.backend.services.UserDataService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/userdata")
@AllArgsConstructor
public class UserDataController {

    private final UserDataService userDataService;

    @GetMapping("balance")
    public ResponseEntity<BigDecimal> getBalance(@AuthenticationPrincipal User user) {
        BigDecimal balance = userDataService.getBalance(user.getId());
        return ResponseEntity.ok(balance);
    }
}
