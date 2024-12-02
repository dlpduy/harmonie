//package com.project.harmonie_e_commerce.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import com.project.harmonie_e_commerce.model.User;
//
//import java.util.Optional;
//
//@Repository
//public interface UserRepository extends JpaRepository<User, Long> {
//
//    Optional<User> findByCitizenId(String citizenId);
//
//    Optional<User> findByEmail(String email);
//
//    Optional<User> findByPhone(String phone);
//
//    void deleteByCitizenId(String citizenId);
//
//    void deleteByEmail(String email);
//
//    void deleteByPhone(String phone);
//}
