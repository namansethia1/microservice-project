package com.tasknotification.userservice.repository;

import com.tasknotification.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    List<User> findByIsActiveTrue();
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
