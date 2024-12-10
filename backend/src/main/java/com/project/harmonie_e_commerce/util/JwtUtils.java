package com.project.harmonie_e_commerce.util;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Map;

public class JwtUtils {

    public static Map<String,String> decodeIdToken(String idToken) {
        DecodedJWT jwt = JWT.decode(idToken);

        String email = jwt.getClaim("email").asString();
        String name = jwt.getClaim("name").asString();
        String sub = jwt.getClaim("sub").asString();
        return Map.of("email", email, "name", name, "sub", sub);
    }
}
