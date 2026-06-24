package com.mealplanner.meal_planner_backend.controllers;

import com.mealplanner.meal_planner_backend.dao.UserRepository;
import com.mealplanner.meal_planner_backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "This username is already registered";
        }

        String secureHashedPassword = encoder.encode(user.getPassword());
        user.setPassword(secureHashedPassword);
        userRepository.save(user);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        Optional<User> foundUser = userRepository.findByUsername(loginRequest.getUsername());

        // check if user exists and password matches
        if (foundUser.isPresent() && encoder.matches(loginRequest.getPassword(), foundUser.get().getPassword())) {
            return foundUser.get();
        }

        throw new RuntimeException("Invalid username or password");
    }
}
