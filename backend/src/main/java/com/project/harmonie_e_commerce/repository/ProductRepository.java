package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsByName(String name);
}
