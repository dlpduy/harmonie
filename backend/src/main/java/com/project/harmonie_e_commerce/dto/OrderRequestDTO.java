package com.project.harmonie_e_commerce.dto;

import java.util.List;

import com.project.harmonie_e_commerce.model.Order.PayMethod;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

@Data
@Builder
public class OrderRequestDTO {
    
    @JsonProperty("consignee_information_id")
    private Integer consigneeInformationId;

    @JsonProperty("system_discount_id")
    private Integer systemDiscountId;

    @JsonProperty("pay_method")
    private PayMethod payMethod;

    @JsonProperty("products")
    private List<OrderProductDTO> products;

    @JsonProperty("store_discounts_ids")
    private List<Integer> storeDiscountsIds;

    @JsonProperty("shipping_discounts_id")
    private Integer shippingDiscountId;
}
