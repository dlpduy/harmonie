package com.project.harmonie_e_commerce.response;

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
    private Long id;
    @JsonProperty("category_id")
    private Long categoryId;
    @JsonProperty("store_id")
    private Long storeId;
    private String name;
    private String brand;
    private Float price;
    private Long quantity;
    private Long views;
    @JsonProperty("buying_count")
    private Long buyingCount;
    private String description;
    @JsonProperty("rating_count")
    private Long ratingCount;
    @JsonProperty("avg_rating")
    private Float AvgRating;
}
