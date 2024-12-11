package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.component.JwtTokenUtil;
import com.project.harmonie_e_commerce.dto.ProfileDTO;
import com.project.harmonie_e_commerce.dto.ResetPasswordDTO;
import com.project.harmonie_e_commerce.dto.UserDTO;
import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.User;
import com.project.harmonie_e_commerce.repository.UserRepository;
import com.project.harmonie_e_commerce.response.GetUserResponse;
import com.project.harmonie_e_commerce.response.StringResponse;
import com.project.harmonie_e_commerce.util.JwtUtils;
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
        String encodedPassword = passwordEncoder.encode(sub);
        User existingUser;
        if(optionalUser.isEmpty()) {
            User newUser = User.builder()
                    .email(email)
                    .fullName(name)
                    .password(encodedPassword)
                    .role(User.Role.USER)
                    .build();
            optionalUser = Optional.of(newUser);
            userRepository.save(newUser);
        }
        User user =optionalUser.get();
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        email, sub, user.getAuthorities()
                );
        authenticationManager.authenticate(authenticationToken);
        return jwtTokenUtil.generateToken(user);
    }

    @Override
    public GetUserResponse getUser(String token) {
        String email = JwtUtils.decodeWebToken(token).get("email");
        System.out.println(email);
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new DataNotFoundException("User not found with email " + email)
        );
        return GetUserResponse.builder()
                .full_name(user.getFullName())
                .role(user.getRole())
                .build();
    }

    @Override
    public User getProfile(String token) {
        String email = JwtUtils.decodeWebToken(token).get("email");
        return userRepository.findByEmail(email).orElseThrow(
                () -> new DataNotFoundException("User not found with email " + email)
        );
    }

    @Override
    public StringResponse updateProfile(ProfileDTO profileDTO, String token) {
        String email = JwtUtils.decodeWebToken(token).get("email");
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new DataNotFoundException("User not found with email " + email)
        );
        user.setDob(profileDTO.getDob());
        user.setPhone(profileDTO.getPhone());
        user.setFullName(profileDTO.getFull_name());
        user.setSex(profileDTO.getSex());

        userRepository.save(user);

        return new StringResponse("Cap nhat thanh cong");
    }

    @Override
    public StringResponse updatePassword(ResetPasswordDTO resetPasswordDTO, String token) {
        String email = JwtUtils.decodeWebToken(token).get("email");
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new DataNotFoundException("User not found with email " + email)
        );

        if (!passwordEncoder.matches(resetPasswordDTO.getOldPassword(), user.getPassword())) {
            throw new BadCredentialsException("OldPassword is incorrect");
        }

        user.setPassword(passwordEncoder.encode(resetPasswordDTO.getNewPassword()));

        userRepository.save(user);
        return new StringResponse("Cap nhat mat khau thanh cong");
    }
}
