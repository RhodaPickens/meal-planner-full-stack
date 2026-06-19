package com.mealplanner.meal_planner_backend.dao;

import com.mealplanner.meal_planner_backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // find user by username when logging in
    Optional<User> findByUsername(String username);
}
