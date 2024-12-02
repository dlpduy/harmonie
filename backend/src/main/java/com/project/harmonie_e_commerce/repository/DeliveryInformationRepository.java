package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.DeliveryInformation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface DeliveryInformationRepository extends JpaRepository<DeliveryInformation, Integer> {

    Optional<DeliveryInformation> findById(Integer id);
}
