package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.UserDTO;
import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IUserService {
    User createUser(UserDTO userDTO);
    String login(String email, String password) throws DataNotFoundException;
}
