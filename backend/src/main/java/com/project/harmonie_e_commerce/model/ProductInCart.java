package com.project.harmonie_e_commerce.model;

import com.project.harmonie_e_commerce.model.CompositeKey.ProductInCartKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "productsincarts")
public class ProductInCart {
    @EmbeddedId
    private ProductInCartKey productInCartKey;
    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne //TODO: check kiểu CASCADE
    @MapsId("cartId")
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne //TODO: check kiểu CASCADE
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;
}
