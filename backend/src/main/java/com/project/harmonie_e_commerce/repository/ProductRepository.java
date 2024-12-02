package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.Product;
import com.project.harmonie_e_commerce.model.Store;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    Optional<Product> findById(Integer id);

    Optional<Store> findStoreById(Integer id);

    boolean existsByName(String name);
}
