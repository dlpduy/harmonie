package com.project.harmonie_e_commerce.response;

import com.project.harmonie_e_commerce.model.Product;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {
    private Integer id;
    @JsonProperty("category")
    private String categoryName;
    private StoreResponse store;
    private String name;
    private String brand;
    private Float price;
    private Integer quantity;
    @JsonProperty("buying_count")
    private Integer buyingCount;
    private String description;
    @JsonProperty("rating_count")
    private Integer ratingCount;
    @JsonProperty("avg_rating")
    private Float avgRating;

    static public ProductResponse fromProduct(Product product) {
        return ProductResponse.builder()
            .id(product.getId())
            .categoryName(product.getCategory().getName())
            .store(StoreResponse.fromStore(product.getStore()))
            .name(product.getName())
            .brand(product.getBrand())
            .price(product.getPrice())
            .quantity(product.getQuantity())
            .buyingCount(product.getBuyingCount())
            .description(product.getDescription())
            .ratingCount(product.getRatingCount())
            .avgRating(product.getAvgRating())
            .build();
    }
}
