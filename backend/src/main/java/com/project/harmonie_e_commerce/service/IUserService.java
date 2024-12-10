package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.UserDTO;
import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.User;

public interface IUserService {
    User createUser(UserDTO userDTO);
    String login(String email, String password) throws DataNotFoundException;
    String loginSocial(String email, String name, String sub) throws DataNotFoundException;
}
