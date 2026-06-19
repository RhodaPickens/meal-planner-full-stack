package com.mealplanner.meal_planner_backend.controllers;

import com.mealplanner.meal_planner_backend.dao.UserRepository;
import com.mealplanner.meal_planner_backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    @Autowired
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        Optional<User> foundUser = userRepository.findByUsername(loginRequest.getUsername());

        // check if user exists and password matches
        if (foundUser.isPresent() && foundUser.get().getPassword().equals(loginRequest.getPassword())) {
            return foundUser.get();
        }

        throw new RuntimeException("Invalid username or password");
    }
}
