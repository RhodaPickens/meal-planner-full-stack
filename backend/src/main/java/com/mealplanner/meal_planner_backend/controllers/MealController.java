package com.mealplanner.meal_planner_backend.controllers;

import com.mealplanner.meal_planner_backend.dao.MealIdeaRepository;
import com.mealplanner.meal_planner_backend.dao.UserRepository;
import com.mealplanner.meal_planner_backend.entities.MealIdea;
import com.mealplanner.meal_planner_backend.entities.MealType;
import com.mealplanner.meal_planner_backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/meals")
public class MealController {

    private final MealIdeaRepository mealIdeaRepository;
    private final UserRepository userRepository;

    // injects repository
    @Autowired
    public MealController(MealIdeaRepository mealIdeaRepository, UserRepository userRepository) {
        this.mealIdeaRepository = mealIdeaRepository;
        this.userRepository = userRepository;
    }

    // sends meal ideas to React
    @GetMapping
    public List<MealIdea> getUserMeals(@RequestParam Long userId) {
        List<MealIdea> userMeals = mealIdeaRepository.findByUserId(userId);

        if (userMeals.isEmpty()) {
            User currentUser = userRepository.findById(userId).orElse(null);

            if (currentUser != null) {
                mealIdeaRepository.save(new MealIdea(null, "Oatmeal with Berries", MealType.BREAKFAST, 200, currentUser));
                mealIdeaRepository.save(new MealIdea(null, "Grilled Chicken Salad", MealType.LUNCH, 300, currentUser));
                mealIdeaRepository.save(new MealIdea(null, "Baked Salmon and Broccoli", MealType.DINNER, 450, currentUser));
                mealIdeaRepository.save(new MealIdea(null, "Beef Jerky and Crackers", MealType.SNACK, 150, currentUser));
                mealIdeaRepository.save(new MealIdea(null, "Greek Yogurt", MealType.SNACK, 120, currentUser));

                userMeals = mealIdeaRepository.findByUserId(userId);
            }
        }

        return userMeals;
    }
}
