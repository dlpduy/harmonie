package com.project.harmonie_e_commerce.dto.request;

import com.project.harmonie_e_commerce.model.User;
import com.project.harmonie_e_commerce.model.Token.TokenType;
import com.project.harmonie_e_commerce.repository.UserRepository;

import jakarta.validation.constraints.NotNull;

import java.sql.Timestamp;



public class TokenCreationRequest {
    @NotNull(message = "Token is required")
    private String token;
    @NotNull(message = "User ID is required")
    private Long user_id;
    private TokenType type;
    private Timestamp expiryDate;

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser(UserRepository userRepository) {
        return userRepository.findById(user_id)
                             .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void setUserID(Long user_id) {
        this.user_id = user_id;
    }

    public TokenType getType() {
        return type;
    }

    public void setType(TokenType type) {
        this.type = type;
    }

    public Timestamp getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Timestamp expiryDate) {
        this.expiryDate = expiryDate;
    }
    
}
