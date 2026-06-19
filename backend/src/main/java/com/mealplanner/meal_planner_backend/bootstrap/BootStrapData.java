package com.mealplanner.meal_planner_backend.bootstrap;

import com.mealplanner.meal_planner_backend.dao.MealIdeaRepository;
import com.mealplanner.meal_planner_backend.dao.UserRepository;
import com.mealplanner.meal_planner_backend.entities.MealIdea;
import com.mealplanner.meal_planner_backend.entities.MealType;
import com.mealplanner.meal_planner_backend.entities.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class BootStrapData implements CommandLineRunner {

    private final UserRepository userRepository;
    private final MealIdeaRepository mealIdeaRepository;

    public BootStrapData(UserRepository userRepository, MealIdeaRepository mealIdeaRepository) {
        this.userRepository = userRepository;
        this.mealIdeaRepository = mealIdeaRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        if (userRepository.count() == 0) {
            User hungryHenry = new User();
            hungryHenry.setUsername("HungryHenry");
            hungryHenry.setPassword("password123");
            userRepository.save(hungryHenry);
            System.out.println("Sample user added successfully");

        }

    }
}
