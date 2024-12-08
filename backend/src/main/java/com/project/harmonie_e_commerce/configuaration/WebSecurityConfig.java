package com.project.harmonie_e_commerce.configuaration;

import com.project.harmonie_e_commerce.filter.JwtTokenFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {
    private final JwtTokenFilter jwtTokenFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//         Tắt tính năng CSRF (Cross-Site Request Forgery) trong Spring Security.
        http.csrf(AbstractHttpConfigurer::disable)
                //add a filter before the UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                //config rules for authorize requests
                .authorizeHttpRequests(requests -> {
                    requests.requestMatchers("**")
                            //allow all requests without authentication
                            .permitAll();

                });
        //build the http security configuration and return it
        return http.build();
    }
}