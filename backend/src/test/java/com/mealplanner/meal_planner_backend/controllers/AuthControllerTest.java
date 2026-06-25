package com.mealplanner.meal_planner_backend.controllers;

import com.mealplanner.meal_planner_backend.dao.UserRepository;
import com.mealplanner.meal_planner_backend.entities.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AuthControllerTest {

    private AuthController authController;
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        userRepository = Mockito.mock(UserRepository.class);
        authController = new AuthController(userRepository);
    }

    @Test
    public void passwordTooShortShouldFailRegistration() {
        User badUser = new User();
        badUser.setUsername("badUser");
        badUser.setPassword("123");
        when(userRepository.findByUsername("badUser")).thenReturn(Optional.empty());

        String result = authController.register(badUser);
        assertEquals("Password must be between 6 and 25 characters", result);
    }

    @Test
    public void passwordTooLongShouldFailRegistration() {
        User badUser = new User();
        badUser.setUsername("badUser2");
        badUser.setPassword("123456789123456789123456789234");
        when(userRepository.findByUsername("badUser2")).thenReturn(Optional.empty());

        String result = authController.register(badUser);
        assertEquals("Password must be between 6 and 25 characters", result);
    }

    @Test
    public void invalidCredentialsShouldFailLogin() {
        User loginRequest = new User();
        loginRequest.setUsername("wrongUser");
        loginRequest.setPassword("wrongPassword");

        when(userRepository.findByUsername("wrongUser")).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> {
            authController.login(loginRequest);
        });
    }
}
