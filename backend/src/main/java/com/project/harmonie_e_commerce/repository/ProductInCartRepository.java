package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.CompositeKey.ProductInCartKey;
import com.project.harmonie_e_commerce.model.ProductInCart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductInCartRepository extends JpaRepository<ProductInCart, ProductInCartKey> {
    List<ProductInCart> findAllByProductInCartKey_CartId(Long cart_id);
    ProductInCart findByProductInCartKey_CartIdAndProductInCartKey_ProductId(Long cart_id, Long product_id);

}
