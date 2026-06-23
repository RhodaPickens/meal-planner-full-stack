package com.mealplanner.meal_planner_backend.controllers;

import com.mealplanner.meal_planner_backend.dao.MealIdeaRepository;
import com.mealplanner.meal_planner_backend.dao.UserRepository;
import com.mealplanner.meal_planner_backend.entities.MealIdea;
import com.mealplanner.meal_planner_backend.entities.MealType;
import com.mealplanner.meal_planner_backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
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

    // Create new meal
    @PostMapping
    public ResponseEntity<MealIdea> createMeal(@RequestParam Long userId, @RequestBody MealIdea newMeal) {
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        newMeal.setUser(currentUser);
        MealIdea savedMeal =  mealIdeaRepository.save(newMeal);
        return ResponseEntity.ok(savedMeal);
    }

    // Update meal
    @PutMapping("/{id}")
    public ResponseEntity<MealIdea> updateMeal(@PathVariable Long id, @RequestBody MealIdea updatedMealDetails) {
        MealIdea existingMeal = mealIdeaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meal not found with id: " + id));
        existingMeal.setTitle(updatedMealDetails.getTitle());
        existingMeal.setCalories(updatedMealDetails.getCalories());
        existingMeal.setMealType(updatedMealDetails.getMealType());

        MealIdea savedMeal = mealIdeaRepository.save(existingMeal);
        return ResponseEntity.ok(savedMeal);
    }

    // Delete meal
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        MealIdea existingMeal = mealIdeaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meal not found with id: " + id));
        mealIdeaRepository.delete(existingMeal);
        return ResponseEntity.noContent().build();
    }

}
