package com.project.harmonie_e_commerce.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.harmonie_e_commerce.response.RestResponse;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;



import jakarta.servlet.http.HttpServletResponse;

@ControllerAdvice
public class FormatRestResponse implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter returnType, Class onverterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(
            Object body,
            MethodParameter returnType,
            MediaType selectedContentType,
            Class selectedConverterType,
            ServerHttpRequest request,
            ServerHttpResponse response) {

        HttpServletResponse servletResponse = ((ServletServerHttpResponse) response).getServletResponse();
        int status = servletResponse.getStatus();
        RestResponse<Object> res = new RestResponse<Object>();
        res.setStatusCode(status);


        // if (body instanceof String)
        //     return body;

        // if (status >= 400) {
        //     return body;
        // } else {
        //     res.setData(body);
        //     ApiMessage message = returnType.getMethodAnnotation(ApiMessage.class);
        //     res.setMessage(message != null ? message.value() : "CALL API SUCCESS");

        // }

        // return res;
        


    // If the body is a string (string from error message exception)
    // needs to handle it differently
    if (body instanceof String) {
        res.setMessage(body);
        res.setError(status >= 400 ? "BAD REQUEST" : null);
        res.setData(null); 
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // convert object to JSON format
            String jsonResponse = objectMapper.writeValueAsString(res);
            // set headers to json to let spring know that response is json
            response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
            return jsonResponse;
        } catch (Exception e) {
            throw new RuntimeException("Error serializing response", e);
        }
    }

    // body is other objects
    res.setData(body);
    ApiMessage message = returnType.getMethodAnnotation(ApiMessage.class);
    res.setMessage(message != null ? message.value() : "CALL API SUCCESS");

    return res;
    }

}
