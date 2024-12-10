package com.project.harmonie_e_commerce.controller;

import com.project.harmonie_e_commerce.dto.UserDTO;
import com.project.harmonie_e_commerce.dto.UserLoginDTO;
import com.project.harmonie_e_commerce.model.User;
import com.project.harmonie_e_commerce.response.TokenResponse;
import com.project.harmonie_e_commerce.service.IUserService;
import com.project.harmonie_e_commerce.util.JwtUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO,
                                        BindingResult result) {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            User user = userService.createUser(userDTO);
            return ResponseEntity.ok("User created successfully");
    }

    //No need to validate because u can input everything, if phone number and password are wrong
    // it will alert an error (500)
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDTO userLoginDTO) {
            String token = userService.login(userLoginDTO.getEmail(), userLoginDTO.getPassword());
            return ResponseEntity.ok(new TokenResponse(token));
    }

    @PostMapping("/login-social/{idToken}")
    public ResponseEntity<?> loginSocial(@PathVariable("idToken") String idToken) {
        Map<String,String> info = JwtUtils.decodeIdToken(idToken);
        String token = userService.loginSocial(info.get("email"), info.get("name"), info.get("sub"));
        return ResponseEntity.ok(new TokenResponse(token));
    }
}
