package com.project.harmonie_e_commerce.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductInCartResponse {
    private Integer quantity;
    private ProductResponse productResponse;
}
