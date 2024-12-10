package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.component.JwtTokenUtil;
import com.project.harmonie_e_commerce.dto.UserDTO;
import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.User;
import com.project.harmonie_e_commerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;

    @Override
    public User createUser(UserDTO userDTO) {

        if(userRepository.existsByEmail(userDTO.getEmail())) {
            throw new DataIntegrityViolationException("Email already exists");
        }
        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
        User newUser = User.builder()
                .fullName(userDTO.getFullName())
                .email(userDTO.getEmail())
                .phone(userDTO.getPhone())
                .sex(userDTO.getSex().name())
                .role(User.Role.USER)
                .password(encodedPassword)
                .dob(userDTO.getDob())
                .build();
        return userRepository.save(newUser);

    }

    @Override
    public String login(String email, String password) throws DataNotFoundException {
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Email or password is incorrect"));

        //TODO: CHECK PASSWORD BY ENCODER
        if (!passwordEncoder.matches(password, existingUser.getPassword())) {
            throw new BadCredentialsException("Email or password is incorrect");
        }
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        email, password, existingUser.getAuthorities()
                );
        authenticationManager.authenticate(authenticationToken);
        return jwtTokenUtil.generateToken(existingUser);
    }

    @Override
    public String loginSocial(String email, String name, String sub) throws DataNotFoundException {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User existingUser;
        if(optionalUser.isEmpty()) {
            User newUser = User.builder()
                    .email(email)
                    .fullName(name)
                    .password("defaultGG")
                    .role(User.Role.USER)
                    .build();
            optionalUser = Optional.of(newUser);
            userRepository.save(newUser);
        }
        User user =optionalUser.get();
        return jwtTokenUtil.generateToken(user);
    }
}
