package com.project.harmonie_e_commerce.component;

import com.project.harmonie_e_commerce.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.SecretKey;
import java.util.*;

public class JwtTokenUtil {
    @Value("${jwt.expiration}")
    private int expiration;
    @Value("${jwt.secretKey}")
    private String secretKey;
    public String generateToken(User user) throws IllegalArgumentException{
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());
        try{
            String token = Jwts.builder()
                    .claims(claims)
                    .subject(user.getEmail())
                    .expiration(new Date(System.currentTimeMillis()+expiration*1000L))
                    .signWith(getSigningKey())
                    .compact();
            return token;
        }catch (Exception e){
            throw new IllegalArgumentException("Cannot generate token, error: "+e.getMessage());
        }
    }
    private SecretKey getSigningKey(){
        byte[] bytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(bytes);
    }

}
